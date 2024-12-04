import { CHAIN_NAMESPACES } from '@web3auth/base';

import type { ConfigsProps } from './configTypes';

const configs: ConfigsProps = {
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    chainId: '35834a8a',
    rpcTarget: 'https://fullnode.mainnet.sui.io:443',
    displayName: 'Sui Mainnet',
    blockExplorerUrl: 'https://suiexplorer.com/',
    ticker: 'SUI',
    tickerName: 'Sui',
    logo: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=029',
  },
  network: 'mainnet',
  chain: 'sui:mainnet',
};

export default configs;
