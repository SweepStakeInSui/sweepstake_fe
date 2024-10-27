import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { UserService } from '@/services/userService';

import { columns } from './positions-table-columns';

export default function Positions() {
  const {
    data: positionsData,
    fetchNextPage,
    isFetching,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ['getPositions'],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await UserService.positions({
        page: pageParam,
        limit: 12,
      });
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.meta && lastPage.meta.itemCount < 12) return undefined;
      return (pages?.length ?? 0) + 1;
    },
    placeholderData: keepPreviousData,
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Empty content="No position found" />;
  }
  return (
    <div className="">
      <DataTable
        columns={columns}
        data={positionsData}
        title="position"
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  );
}
