'use client';

import type { ColumnDef } from '@tanstack/react-table';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAvatar } from '@/mocks/mockAvatar';
import type { TBetItem } from '@/services/markets/types';
import { formatDate } from '@/utils/formatDate';

export const columns: ColumnDef<TBetItem>[] = [
  {
    accessorKey: 'bets',
    header: 'Bets',
    cell: ({ row }) => {
      const { name } = row.original;

      return (
        <Flex className="justify-between space-x-2">
          <Flex>
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={mockAvatar} />
              <AvatarFallback />
            </Avatar>
            <div>{name}</div>
          </Flex>
        </Flex>
      );
    },
  },
  {
    accessorKey: 'startday',
    header: 'Start day',
    cell: ({ row }) => {
      const { startTime } = row.original;
      return (
        <Typography.Text className="text-text">
          {formatDate.formatDateFromTimestamp(startTime)}
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'endday',
    header: 'End day',
    cell: ({ row }) => {
      const { endTime } = row.original;
      return (
        <Typography.Text className="text-text">
          {formatDate.formatDateFromTimestamp(endTime)}
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Typography.Text className="text-text">
          {status || 'On-going'}
        </Typography.Text>
      );
    },
  },
];
