import { Button, ButtonProps, Icon, LoadingIcon, SNSShare, VideoPlayer } from '@/components';
import { RouteKeys } from '@/configs';
import { BoxRSS3Node } from '@/contexts/RSS3Provider';
import { MaskBoxQuery } from '@/graphql-hooks';
import { useERC20Token, useERC721 } from '@/hooks';
import { ZERO } from '@/lib';
import { BoxOnChain, MediaType } from '@/types';
import { toLocalUTC } from '@/utils';
import classnames from 'classnames';
import { utils } from 'ethers';
import { FC, HTMLProps, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocales } from '../useLocales';
import { CountdownButton } from './CountdownButton';
import styles from './index.module.less';

export interface MaskboxProps extends HTMLProps<HTMLDivElement> {
  boxOnSubgraph: MaskBoxQuery['maskbox'];
  boxOnChain: BoxOnChain | null;
  boxOnRSS3: Partial<Pick<BoxRSS3Node, 'name' | 'mediaType' | 'mediaUrl' | 'activities'>> | null;
  inList?: boolean;
  onPurchase?: () => void;
}

export const Maskbox: FC<MaskboxProps> = ({
  boxOnSubgraph,
  boxOnRSS3,
  boxOnChain,
  className,
  inList,
  onPurchase,
  ...rest
}) => {
  const t = useLocales();
  const box = useMemo(
    () => ({
      ...boxOnChain,
      ...boxOnRSS3,
      ...boxOnSubgraph,
      name: boxOnRSS3?.name ?? boxOnSubgraph?.name ?? boxOnChain?.name,
    }),
    [boxOnChain, boxOnRSS3, boxOnSubgraph],
  );
  const chainId = box.chain_id;
  const boxId = box.box_id;
  const payment = box.payment?.[0];
  const history = useHistory();
  const paymentToken = useERC20Token(payment?.token_addr);

  const startTime = box?.start_time ? toLocalUTC(box.start_time * 1000).getTime() : 0;
  const started = box.started === true && startTime > Date.now();

  const price = useMemo(() => {
    if (payment?.price && paymentToken?.decimals) {
      const digit = utils.formatUnits(payment.price, paymentToken.decimals);
      return `${digit} ${paymentToken.symbol}`;
    }
  }, [payment?.price, paymentToken?.decimals]);
  const isSoldout = useMemo(() => !!box.remaining?.eq(ZERO), [box.remaining]);
  const { isApproveAll } = useERC721(box.nft_address);

  const buttonText = useMemo(() => {
    if (isSoldout) return t('Sold out');
    if (box.expired) {
      return t('Ended');
    } else if (!isApproveAll) {
      return t('Canceled');
    } else if (inList) {
      return t('View Details');
    }

    return price ? t('Draw ( {price}/Time )', { price }) : <LoadingIcon size={24} />;
  }, [inList, price, isSoldout, isApproveAll, t]);

  const boxLink = `${RouteKeys.Details}?chain=${chainId}&box=${boxId}`;
  const allowToBuy = price && started && !box.expired && !isSoldout && isApproveAll;
  const buttonProps: ButtonProps = {
    className: styles.drawButton,
    colorScheme: 'primary',
    disabled: !inList && !allowToBuy,
    onClick: () => {
      if (inList) {
        history.push(boxLink);
      } else if (box.started && !box.expired && onPurchase) {
        onPurchase();
      }
    },
  };

  const total = useMemo(() => {
    // TODO If the box is set to sell all,
    // and the creator get a new NFT after creating the box
    // then remaining will be greater than total.
    // This will be fixed from the contract later
    if (box.total && box.remaining && box.remaining.gt(box.total)) {
      return box.remaining;
    }
    return box.total;
  }, [box.total, box.remaining]);

  const BoxCover = (
    <div className={styles.media}>
      {(() => {
        if (!box?.mediaUrl) return <Icon type="mask" size={48} />;

        switch (box.mediaType as MediaType) {
          case MediaType.Video:
            return <VideoPlayer src={box.mediaUrl} width="480" height="320" />;
          case MediaType.Audio:
            return <audio src={box.mediaUrl} controls />;
          default:
            return (
              <img
                src={box.mediaUrl}
                loading="lazy"
                width="480"
                height="320"
                alt={box.name ?? '-'}
              />
            );
        }
      })()}
    </div>
  );

  const name = box.name ?? '-';
  return (
    <div className={classnames(styles.maskbox, className)} {...rest}>
      {inList ? <Link to={boxLink}>{BoxCover}</Link> : BoxCover}
      <div className={styles.interaction}>
        <dl className={styles.infoList}>
          <dt className={styles.name} title={box.name}>
            {inList ? <Link to={boxLink}>{name}</Link> : name}
          </dt>
          <dd className={styles.infoRow}>{t('Lucky Draw')}</dd>
          <dd className={styles.infoRow}>{t('Get your unique card (NFT) by lucky draw')}</dd>
          <dd className={styles.infoRow}>
            {total ? `${total.sub(box.remaining!).toString()}/${total.toString()}` : '-/-'}
          </dd>
          <dd className={styles.infoRow}>
            {t('Limit')} : {box.personal_limit?.toString()}
          </dd>
        </dl>
        {started ? (
          <Button {...buttonProps}>{buttonText}</Button>
        ) : (
          <CountdownButton {...buttonProps} startTime={startTime!} />
        )}
      </div>
      {inList ? null : <SNSShare boxName={box.name ?? ''} className={styles.snsShare} />}
    </div>
  );
};
