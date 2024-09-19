import type { CoinBalance } from '@mysten/sui.js/client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import configs from '@/configs';
import { selectProfile } from '@/store/profileSlice';

type AddressProps = {
  address?: string;
};
const formatBalance = (balance: CoinBalance) => {
  return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
};
const getBalance = async ({ address }: AddressProps) => {
  if (address) {
    const client = new SuiClient({ url: getFullnodeUrl(configs.network) });
    const balance = await client.getBalance({
      owner: address,
    });
    return formatBalance(balance);
  }
  return null;
};
const useBalance = () => {
  const { profile, isLoggedIn } = useSelector(selectProfile);
  const query = useQuery({
    queryKey: ['useBalance', profile?.address],
    queryFn: async () => {
      if (profile?.address) {
        const balance = await getBalance({ address: profile.address });
        return balance;
      }
      return null;
    },
    enabled: isLoggedIn,
  });
  return query.data;
};
export default useBalance;
