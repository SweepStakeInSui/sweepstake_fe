interface ChainConfig {
  chainNamespace: any;
  chainId: string;
  rpcTarget: string;
  displayName: string;
  blockExplorerUrl: string;
  ticker: string;
  tickerName: string;
  logo: string;
}

export interface ConfigsProps {
  chainConfig: ChainConfig;
  network: 'testnet' | 'mainnet';
  chain: 'sui:testnet' | 'sui:mainnet';
}
