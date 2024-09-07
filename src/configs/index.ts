import MainnetConfigs from './mainnet';
import TestnetConfigs from './testnet';

const envConfigs =
  !process?.env?.NEXT_PUBLIC_NETWORK ||
  process?.env?.NEXT_PUBLIC_NETWORK === 'testnet'
    ? TestnetConfigs
    : MainnetConfigs;

const configs = {
  ...envConfigs,
  // contracts...
};
export default configs;
