import { useEffect, useState } from 'react';

import { DataTable } from '@/components/common/data-table/data-table';
import { positionsData } from '@/mocks/mocksPositions';
import type { PositionsProps } from '@/types/table';

import { columns } from './positions-table-columns';

async function getData(): Promise<PositionsProps[]> {
  return positionsData;
}

export default function Positions() {
  const [data, setData] = useState<PositionsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: PositionsProps[] = await getData();
        setData(result);
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
