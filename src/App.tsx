import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Routes } from './Routes';
import { Layout } from './Layout';
import styles from './app.module.less';
import { MBoxContractProvider, NFTContractProvider, Web3Provider } from './contexts';

function App() {
  return (
    <Router>
      <Web3Provider>
        <NFTContractProvider>
          <MBoxContractProvider>
            <Layout>
              <Routes />
            </Layout>
          </MBoxContractProvider>
        </NFTContractProvider>
      </Web3Provider>
      <Toaster
        position="top-right"
        containerClassName={styles.toastContainer}
        toastOptions={{
          className: styles.toast,
        }}
      />
    </Router>
  );
}

export default App;
