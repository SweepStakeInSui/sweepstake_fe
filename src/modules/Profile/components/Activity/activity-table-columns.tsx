'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
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
    size: 60,
  },
  {
    accessorKey: 'market',
    header: 'Market',
    size: 440,
    cell: ({ row }) => {
      const { outcome, status, price, marketId } = row.original;
      const { image } = outcome.market;

      return (
        <Flex className="justify-between space-x-2 w-full">
          <Flex>
            <CustomAvatar src={image} size="md" isRounded={false} />

            <Link href={`/markets/${marketId}`}>
              <Typography.Text size={14} weight="medium">
                {outcome.market.name}
              </Typography.Text>
            </Link>
          </Flex>
          <Button
            variant={status === 'Yes' ? 'bet_yes' : 'bet_no'}
            className="flex gap-x-1 items-center]"
          >
            <p className="first-letter:!uppercase text-sm font-semibold">
              {status}
            </p>
            <FormatNumber number={handleBignumber.divideDecimal(price)} />$
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
    size: 90,
    cell: ({ row }) => {
      const { amount } = row.original;
      return (
        <Flex className="justify-end">
          <Typography.Text size={14} weight="medium">
            {amount || '-'}$
          </Typography.Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => {
      return (
        <div className="flex justify-end py-2 text-left w-full">Amount</div>
      );
    },
    size: 148,
    cell: ({ row }) => {
      const { timestamp, amount, outcome } = row.original;
      return (
        <Stack className="flex items-end text-left gap-1 w-full">
          <Typography.Text size={14} weight="medium" className="flex">
            <FormatNumber
              number={
                +amount * +handleBignumber.divideDecimal(outcome.bidPrice)
              }
            />
            $
          </Typography.Text>
          <Typography.Text
            size={13}
            className="text-text-sublest"
            weight="medium"
          >
            {formatDate.formatDateFromTimestamp(timestamp)}
          </Typography.Text>
        </Stack>
      );
    },
  },
];
