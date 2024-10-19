import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { orderService } from '@/services/orders';
import { selectProfile } from '@/store/profileSlice';
import type { ActivityProps } from '@/types/table';

import { columns } from './activity-table-columns';

export default function Activity() {
  const { profile, isLoggedIn } = useSelector(selectProfile);

  const { data, isError, isPending } = useQuery<ActivityProps>({
    queryKey: ['getActivity', profile?.id],
    queryFn: async () => {
      const result = await orderService.getOrder({
        page: 1,
        limit: 30,
      });
      return result;
    },
    enabled: !!isLoggedIn,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Empty content="No activity found" />;
  }
  return (
    <div className="">
      <DataTable columns={columns} data={data.items} title="activity" />
    </div>
  );
}
