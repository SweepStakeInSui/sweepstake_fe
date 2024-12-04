import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { MarketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';

import { columns } from './bets-created-table-columns';

const BetsCreated = () => {
  const { profile, isLoggedIn } = useSelector(selectProfile);
  const { data, fetchNextPage, isFetching, isError, isPending } =
    useInfiniteQuery({
      queryKey: ['getCreateBetUser', profile?.id],
      queryFn: async ({ pageParam = 1 }) => {
        const result = await MarketService.getMarket({
          page: pageParam,
          limit: 10,
          user: profile?.id,
        });
        return result.data;
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
    return <Empty content="No bet found" />;
  }

  return (
    <div className="">
      <DataTable
        columns={columns}
        data={data}
        title="bet"
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  );
};

export default BetsCreated;
