import { useEffect, useState } from 'react';

import { DataTable } from '@/components/common/data-table/data-table';
import { activityData } from '@/mocks/mockActivity';
import type { ActivityProps } from '@/types/table';

import { columns } from './activity-table-columns';

async function getData(): Promise<ActivityProps[]> {
  return activityData;
}

export default function Activity() {
  const [data, setData] = useState<ActivityProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: ActivityProps[] = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
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
