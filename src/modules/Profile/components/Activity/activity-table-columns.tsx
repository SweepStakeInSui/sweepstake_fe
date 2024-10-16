'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import type { IActivityItem } from '@/types/table';
import { formatDate } from '@/utils/formatDate';
import { handleBignumber } from '@/utils/handleBignumber';

export const columns: ColumnDef<IActivityItem>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'market',
    header: 'Market',
    cell: ({ row }) => {
      const { name, status, image } = row.original;

      return (
        <Flex className="justify-between space-x-2">
          <Flex>
            <CustomAvatar src={image} />

            <div>{name}</div>
          </Flex>
          <Button variant={status === 'Yes' ? 'bet_yes' : 'bet_no'}>
            {status}
          </Button>
        </Flex>
      );
    },
  },

  {
    accessorKey: 'shares',
    header: () => {
      return <div className="flex justify-end py-2 text-left">Shares</div>;
    },
    cell: ({ row }) => {
      const { shares } = row.original;
      return (
        <Flex className="justify-end">
          <Typography.Text size={15}>{shares}</Typography.Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => {
      return <div className="flex justify-end py-2 text-left">Amount</div>;
    },
    cell: ({ row }) => {
      const { timestamp, amount } = row.original;
      return (
        <Stack className="flex items-end text-left gap-1">
          <Typography.Text size={15}>
            ${handleBignumber.divideDecimal(amount)}
          </Typography.Text>
          <Typography.Text size={13} className="text-text-sublest">
            {formatDate.formatDateFromTimestamp(timestamp)}
          </Typography.Text>
        </Stack>
      );
    },
  },
];
