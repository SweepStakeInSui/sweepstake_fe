import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { marketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';

import { columns } from './bets-created-table-columns';

const BetsCreated = () => {
  const { profile, isLoggedIn } = useSelector(selectProfile);
  const { data, isPending, isError } = useQuery({
    queryKey: ['getCreateBetUser', profile?.address],
    queryFn: async () => {
      const result = await marketService.getMarketService({
        page: 1,
        limit: 30,
        user: profile.address,
      });
      return result;
    },
    enabled: !!isLoggedIn,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Empty content="No bet found" />;
  }
  console.log(data);

  return (
    <div className="">
      <DataTable columns={columns} data={data.items} title="bet" />
    </div>
  );
};

export default BetsCreated;
