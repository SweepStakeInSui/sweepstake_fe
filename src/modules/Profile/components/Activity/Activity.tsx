import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { OrderService } from '@/services/orders';
import { selectProfile } from '@/store/profileSlice';

import { columns } from './activity-table-columns';

export default function Activity() {
  const { profile, isLoggedIn } = useSelector(selectProfile);

  const { data, fetchNextPage, isFetching, isError, isPending } =
    useInfiniteQuery({
      queryKey: ['getActivity', profile],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await OrderService.getOrder({
          page: pageParam,
          limit: 10,
          user: profile.id,
        });
        return result;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.meta && lastPage.meta.itemCount < 10) return undefined;
        return pages.length + 1;
      },
      enabled: !!isLoggedIn,
      placeholderData: keepPreviousData,
    });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Empty content="No activity found" />;
  }

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        title="activity"
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  );
}
