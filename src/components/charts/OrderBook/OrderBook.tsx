import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Badge } from '@/components/ui/badge';
import { EBetStatusOption } from '@/enums/bet-status';
import React, { useMemo } from 'react';

const OrderHeader = () => {
  return (
    <Flex className="px-3 h-11">
      <Flex className="flex-1 justify-end" />
      <Flex className="w-11 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          Price
        </Typography.Text>
      </Flex>
      <Flex className="flex-1 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          Shares
        </Typography.Text>
      </Flex>
      <Flex className="flex-1 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          Total
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

interface OrderRowProps {
  side: EBetStatusOption.BID | EBetStatusOption.ASK;
  price: number;
  shares: number;
  total?: number;
  max: number;
  isLast?: boolean;
}

const OrderRow = ({
  side,
  price,
  shares,
  total = 0,
  max,
  isLast,
}: OrderRowProps) => {
  return (
    <Flex className="relative px-3 w-full h-11">
      <div
        className={`absolute top-0 left-0 ${side === EBetStatusOption.ASK ? 'bg-[#EB201E14]' : 'bg-[#3DA00314]'} h-full`}
        style={{
          width: `${(total / max) * 100}%`,
        }}
      />

      {isLast && (
        <Badge
          className={`text-white ${side === EBetStatusOption.ASK ? 'bg-r-50' : 'bg-gr-70'}`}
        >
          {side === EBetStatusOption.ASK
            ? `${EBetStatusOption.ASK}s`
            : `${EBetStatusOption.BID}s`}
        </Badge>
      )}
      <Flex className="flex-1 justify-end" />
      <Flex className="w-11 justify-end">
        <Typography.Text
          size={isLast ? 18 : 13}
          weight="medium"
          className={`${side === EBetStatusOption.ASK ? 'text-text-support-red' : 'text-text-support-green'}`}
        >
          {price}
        </Typography.Text>
      </Flex>
      <Flex className="flex-1 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          {shares}
        </Typography.Text>
      </Flex>
      <Flex className="flex-1 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          {total}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

interface OrderBookProps {
  asks?: {
    price: number | string;
    liquidity: number | string;
    total?: number;
  }[];
  bids?: {
    price: number | string;
    liquidity: number | string;
    total?: number;
  }[];
}

const OrderBook = ({ asks, bids }: OrderBookProps) => {
  // Find max of all total of asks and bids
  const max = useMemo(() => {
    const asksTotal = asks?.reduce((acc, ask) => acc + (ask?.total || 0), 0);
    const bidsTotal = bids?.reduce((acc, bid) => acc + (bid?.total || 0), 0);
    return Math.max(asksTotal || 0, bidsTotal || 0);
  }, [asks, bids]);
  return (
    <div>
      <OrderHeader />
      {asks?.map((ask, index) => (
        <OrderRow
          key={`${ask.price}-${index.toString()}`}
          side={EBetStatusOption.ASK}
          price={Number(ask?.price)}
          shares={Number(ask?.liquidity)}
          total={ask?.total}
          max={max}
        />
      ))}
      {bids?.map((bid, index) => (
        <OrderRow
          key={`${bid.price}-${index.toString()}`}
          side={EBetStatusOption.BID}
          price={Number(bid?.price)}
          shares={Number(bid?.liquidity)}
          total={bid?.total}
          max={800}
        />
      ))}
    </div>
  );
};

export default OrderBook;
