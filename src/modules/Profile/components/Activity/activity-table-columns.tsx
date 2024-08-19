'use client';

import type { ColumnDef } from '@tanstack/react-table';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { ActivityProps } from '@/types/table';

export const columns: ColumnDef<ActivityProps>[] = [
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
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={image} />
              <AvatarFallback />
            </Avatar>
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
      const { time, amount } = row.original;
      return (
        <Stack className="flex items-end text-left gap-1">
          <Typography.Text size={15}>${amount}</Typography.Text>
          <Typography.Text size={13} className="text-text-sublest">
            {time}
          </Typography.Text>
        </Stack>
      );
    },
  },
];
