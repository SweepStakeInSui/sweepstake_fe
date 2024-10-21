'use client';

import type { ColumnDef } from '@tanstack/react-table';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockAvatar } from '@/mocks/mockAvatar';
import type { PositionItemProps } from '@/types/table';
import { handleBignumber } from '@/utils/handleBignumber';

export const columns: ColumnDef<PositionItemProps>[] = [
  {
    accessorKey: 'market',
    header: 'Market',
    cell: ({ row }) => {
      const { outcome } = row.original;

      return (
        <Flex className="justify-between space-x-2">
          <Flex>
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={mockAvatar} />
              <AvatarFallback />
            </Avatar>
            <Typography.Text size={14} weight="medium">
              {outcome.market.name}
            </Typography.Text>
          </Flex>
          <Button variant={outcome.type === 'Yes' ? 'bet_yes' : 'bet_no'}>
            {outcome.type}
          </Button>
        </Flex>
      );
    },
  },
  {
    accessorKey: 'shares',
    header: 'Shares',
    cell: ({ row }) => {
      const { balance } = row.original;
      return (
        <Typography.Text size={14} weight="medium">
          {balance}
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'avg',
    header: 'Avg',
    cell: () => {
      return (
        <Typography.Text size={14} weight="medium">
          -¢
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'current',
    header: 'Current',
    cell: ({ row }) => {
      const { outcome } = row.original;
      return (
        <Typography.Text size={14} weight="medium">
          {handleBignumber.divideDecimal(outcome.bidPrice)}¢
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'value',
    header: () => {
      return <div className="flex justify-end py-2 text-right">Value</div>;
    },
    cell: ({ row }) => {
      const { outcome, balance } = row.original;

      return (
        <Stack className="items-end">
          <div>
            ${+balance * +handleBignumber.divideDecimal(outcome.bidPrice)}
          </div>
          {/* TODO: Update data */}
          {/* <Flex className="text-text-support-green font-normal gap-0">
            <div>0</div>(0%)
          </Flex> */}
        </Stack>
      );
    },
  },
];
