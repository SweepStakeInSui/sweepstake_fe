import { CHAIN_NAMESPACES } from '@web3auth/base';

import type { ConfigsProps } from './configTypes';

const configs: ConfigsProps = {
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    chainId: '4c78adac',
    rpcTarget: 'https://fullnode.testnet.sui.io:443',
    displayName: 'Sui Testnet',
    blockExplorerUrl: 'https://suiexplorer.com/?network=testnet',
    ticker: 'SUI',
    tickerName: 'Sui',
    logo: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=029',
  },
  network: 'testnet',
  chain: 'sui:testnet',
};

export default configs;
