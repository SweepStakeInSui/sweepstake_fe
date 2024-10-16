import { useQuery } from '@tanstack/react-query';

import { DataTable } from '@/components/common/data-table/data-table';
import Empty from '@/components/common/Empty';
import { UserService } from '@/services/userService';
import type { PositionsProps } from '@/types/table';

import { columns } from './positions-table-columns';

// async function getData(): Promise<PositionsProps[]> {
//   return positionsData;
// }

export default function Positions() {
  const {
    data: positionsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['getPositions'],
    queryFn: async () => {
      const result: PositionsProps[] = await UserService.positions({
        page: 1,
        limit: 10,
      });
      return result;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Empty content="No position found" />;
  }
  return (
    <div className="">
      <DataTable columns={columns} data={positionsData} title="position" />
    </div>
  );
}
