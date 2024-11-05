'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { defaultImg } from '@/constants/defaultImg';
import type { PositionItemProps } from '@/types/table';
import { handleBignumber } from '@/utils/handleBignumber';

export const columns: ColumnDef<PositionItemProps>[] = [
  {
    accessorKey: 'market',
    header: 'Market',
    size: 365,
    cell: ({ row }) => {
      const { outcome } = row.original;
      const { image } = outcome.market;

      return (
        <Flex className="justify-between space-x-2 w-full">
          <Flex>
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={image || defaultImg} />
              <AvatarFallback />
            </Avatar>
            <Link href={`/markets/${outcome.marketId}`}>
              <Typography.Text size={14} weight="medium">
                {outcome.market.name}
              </Typography.Text>
            </Link>
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
    size: 90,
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
    size: 90,
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
    size: 90,
    cell: ({ row }) => {
      const { outcome } = row.original;
      return (
        <Typography.Text size={14} weight="medium">
          <FormatNumber
            number={handleBignumber.divideDecimal(outcome.bidPrice)}
            tag="span"
          />
          ¢
        </Typography.Text>
      );
    },
  },
  {
    accessorKey: 'value',
    header: () => {
      return <div className="flex justify-end text-right w-full">Value</div>;
    },
    size: 148,
    cell: ({ row }) => {
      const { outcome, balance } = row.original;

      return (
        <Stack className="items-end w-full">
          <Typography.Text size={14} className="text-nowrap">
            $
            <FormatNumber
              number={
                +balance * +handleBignumber.divideDecimal(outcome.bidPrice)
              }
              tag="span"
            />
          </Typography.Text>
          {/* TODO: Update data */}
          {/* <Flex className="text-text-support-green font-normal gap-0">
            <div>0</div>(0%)
          </Flex> */}
        </Stack>
      );
    },
  },
];
