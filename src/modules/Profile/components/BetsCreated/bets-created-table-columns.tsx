'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { defaultImg } from '@/constants/defaultImg';
import type { TBetItem } from '@/services/markets/types';
import { formatDate } from '@/utils/formatDate';

export const columns: ColumnDef<TBetItem>[] = [
  {
    accessorKey: 'bets',
    header: 'Bets',
    size: 370,
    cell: ({ row }) => {
      const { image, name, id } = row.original;

      return (
        <Flex className="justify-between space-x-2">
          <Flex>
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={image || defaultImg} />
              <AvatarFallback />
            </Avatar>
            <Link href={`/markets/${id}`}>
              <Typography.Text size={14} weight="medium">
                {name}
              </Typography.Text>
            </Link>
          </Flex>
        </Flex>
      );
    },
  },
  {
    accessorKey: 'startday',
    header: 'Start day',
    size: 140,
    cell: ({ row }) => {
      const { startTime } = row.original;
      return (
        <Typography.Text className="text-text" size={14} weight="medium">
          {formatDate.formatDateFromTimestamp(startTime)}
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'endday',
    header: 'End day',
    size: 140,
    cell: ({ row }) => {
      const { endTime } = row.original;
      return (
        <Typography.Text className="text-text" size={14} weight="medium">
          {formatDate.formatDateFromTimestamp(endTime)}
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 140,
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Typography.Text className="text-text" size={14} weight="medium">
          {status || 'On-going'}
        </Typography.Text>
      );
    },
  },
];
