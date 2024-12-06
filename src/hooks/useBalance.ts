import type { CoinBalance } from '@mysten/sui.js/client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import configs from '@/configs';
import { USDC_DECIMALS } from '@/constants';
import { selectProfile } from '@/store/profileSlice';

type AddressProps = {
  address: string;
};
const formatBalance = (balance: CoinBalance) => {
  return Number.parseInt(balance.totalBalance) / 10 ** USDC_DECIMALS;
};
// const getBalance = async ({ address }: AddressProps) => {
//   if (address) {
//     const client = new SuiClient({ url: getFullnodeUrl(configs.network) });
//     const balance = await client.getBalance({
//       owner: address,
//     });
//     return formatBalance(balance);
//   }
//   return 0;
// };
export const getBalanceUSDC = async ({ address }: AddressProps) => {
  if (address) {
    const client = new SuiClient({ url: getFullnodeUrl(configs.network) });
    const balance = await client.getBalance({
      owner: address,
      coinType:
        '0xba8ce0ab447ccb78484cc0932cb776d3c76bf6f05f36923c931d8d1a96375b88::USDC::USDC',
    });
    console.log({
      balance: formatBalance(balance),
    });

    return formatBalance(balance);
  }
  return 0;
};
const useBalance = () => {
  const { profile, isLoggedIn } = useSelector(selectProfile);
  const query = useQuery({
    queryKey: ['useBalance', profile?.address],
    queryFn: async () => {
      if (profile?.address) {
        const balance = await getBalanceUSDC({ address: profile.address });
        return balance;
      }
      return 0;
    },
    refetchInterval: 3000,
    enabled: isLoggedIn,
  });
  return query.data;
};
export default useBalance;
