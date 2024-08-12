'use client';

import type { ColumnDef } from '@tanstack/react-table';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { PositionsProps } from '@/types/table';

export const columns: ColumnDef<PositionsProps>[] = [
  {
    accessorKey: 'market',
    header: 'Market',
    cell: ({ row }) => {
      const { name, status, image } = row.original;

      return (
        <Flex className="justify-between space-x-2">
          <Flex>
            <Avatar size="md" isRounded>
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
    header: 'Shares',
  },
  {
    accessorKey: 'avg',
    header: 'Avg',
  },
  {
    accessorKey: 'current',
    header: 'Current',
  },
  {
    accessorKey: 'value',
    header: () => {
      return <div className="flex justify-end py-2 text-right">Value</div>;
    },
    cell: ({ row }) => {
      const { value, valueChanges, valuePercent } = row.original;

      return (
        <Stack className="items-end">
          <div>${value}</div>
          <Flex className="text-text-support-green font-normal gap-0">
            <div>{valueChanges}</div>({valuePercent}%)
          </Flex>
        </Stack>
      );
    },
  },
];
