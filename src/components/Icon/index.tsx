import { FC, memo, useMemo } from 'react';
import classnames from 'classnames';
import icons, { IconType, iconsWithDynamicColor } from './icon-data';

import styles from './index.module.less';

export interface IconProps extends React.HTMLProps<HTMLSpanElement> {
  type?: IconType;
  iconUrl?: string;
  size?: number;
}

export const Icon: FC<IconProps> = memo(({ type, iconUrl, size, className, style, ...rest }) => {
  const iconSize = size ?? 24;
  const isDynamicColor = type && iconsWithDynamicColor.includes(type);
  const iconStyle = useMemo(() => {
    const bg = isDynamicColor
      ? null
      : {
          backgroundImage: `url(${iconUrl ?? icons[type!]})`,
          backgroundSize: `${iconSize}px`,
        };
    return {
      height: `${iconSize}px`,
      width: `${iconSize}px`,
      ...bg,
      ...style,
    };
  }, [iconSize, iconUrl, type, isDynamicColor]);
  return (
    <span
      aria-hidden="true"
      dangerouslySetInnerHTML={
        isDynamicColor
          ? {
              __html: icons[type],
            }
          : undefined
      }
      {...rest}
      className={classnames(styles.icon, className)}
      style={iconStyle}
    />
  );
});

export const LoadingIcon: FC<IconProps> = (props) => {
  return (
    <Icon
      size={24}
      className={classnames(props.className, styles.spinning)}
      type="loading"
      {...props}
    />
  );
};

export type { IconType };
