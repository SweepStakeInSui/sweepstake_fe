import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import Typography from '@/components/common/Typography';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BetOutcomeType, EBetStatusOption } from '@/enums/bet-status';
import { setBet } from '@/store/betSlice';
import { setOrderInput } from '@/store/orderbookSlice';

const OrderBookHeader = () => {
  return (
    <Flex className="px-3 h-11 sticky top-0 bg-bg-surface z-10">
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

interface OrderBookSpreadProps {
  type: BetOutcomeType;
}

const OrderBookSpread = ({ type }: OrderBookSpreadProps) => {
  return (
    <Flex className="px-3 h-11">
      <Flex className="flex-1">
        <Badge
          className={`text-white px-1.5 rounded-sm ${type === BetOutcomeType.NO ? 'bg-b-60' : 'bg-ma-60'}`}
        >
          {type}
        </Badge>
      </Flex>
      <Flex className="w-11 justify-end">
        <Typography.Text size={13} className="text-text-subtle">
          Last
          {/* TODO: orderbook - get last price from orderbook */}
        </Typography.Text>
      </Flex>
      <Flex className="flex-1 justify-end" />
      <Flex className="flex-1 justify-end" />
    </Flex>
  );
};

interface OrderBookRowProps {
  side: EBetStatusOption.BID | EBetStatusOption.ASK;
  price: number;
  shares: number;
  total?: number;
  max: number;
  isLast?: boolean;
}

const OrderBookRow = ({
  side,
  price,
  shares,
  total = 0,
  max,
  isLast,
}: OrderBookRowProps) => {
  const dispatch = useDispatch();

  const handleOrderbookRowClick = () => {
    dispatch(setOrderInput({ isClickOn: true, price }));
  };

  return (
    <div onClick={handleOrderbookRowClick}>
      <Flex className="relative px-3 w-full h-11 hover:bg-bg-hovered transition-colors cursor-pointer">
        <div
          className={`absolute top-0 left-0 ${side === EBetStatusOption.ASK ? 'bg-[#EB201E14]' : 'bg-[#3DA00314]'} h-full`}
          style={{
            width: `${(total / max) * 100}%`,
          }}
        />

        <Flex className="flex-1">
          {isLast && (
            <Badge
              className={`text-white px-1.5 rounded-sm ${side === EBetStatusOption.ASK ? 'bg-r-50' : 'bg-gr-70'}`}
            >
              {side === EBetStatusOption.ASK
                ? `${EBetStatusOption.ASK}s`
                : `${EBetStatusOption.BID}s`}
            </Badge>
          )}
        </Flex>
        <Flex className="w-11 justify-end">
          <Typography.Text
            size={isLast ? 18 : 13}
            weight="medium"
            className={`${side === EBetStatusOption.ASK ? 'text-text-support-red' : 'text-text-support-green'}`}
          >
            <FormatNumber number={price} tag="span" />¢
          </Typography.Text>
        </Flex>
        <Flex className="flex-1 justify-end">
          <Typography.Text size={13} className="text-text-subtle">
            <FormatNumber number={shares} tag="span" />
          </Typography.Text>
        </Flex>
        <Flex className="flex-1 justify-end">
          <Typography.Text size={13} className="text-text-subtle">
            <FormatNumber number={total} tag="span" />
          </Typography.Text>
        </Flex>
      </Flex>
    </div>
  );
};

interface OrderBookProps {
  type: BetOutcomeType;
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

const OrderBook = ({ type, asks, bids }: OrderBookProps) => {
  const betState = useSelector((state: any) => state.bet);
  const dispatch = useDispatch();

  const max = useMemo(() => {
    const maxTotalAsks = asks?.[asks.length - 1]?.total || 0;
    const maxTotalBids = bids?.[bids.length - 1]?.total || 0;

    return Math.max(maxTotalAsks, maxTotalBids);
  }, [asks, bids]);

  const onBetClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    betType: 'YES' | 'NO',
  ) => {
    event?.stopPropagation();
    dispatch(
      setBet({
        ...betState,
        type: BetOutcomeType[betType],
      }),
    );
  };

  return (
    <div className="max-h-[500px] overflow-auto">
      <Tabs value={betState.type}>
        <TabsList>
          <TabsTrigger
            onClick={(e) => onBetClick(e, 'YES')}
            key="orderbook-yes"
            value={BetOutcomeType.YES}
          >
            Bet Yes
          </TabsTrigger>
          <TabsTrigger
            onClick={(e) => onBetClick(e, 'NO')}
            key="orderbook-no"
            value={BetOutcomeType.NO}
          >
            Bet No
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <OrderBookHeader />
      {asks
        ?.toReversed()
        ?.map((ask, index) => (
          <OrderBookRow
            key={`${ask.price}-${index.toString()}`}
            side={EBetStatusOption.ASK}
            price={Number(ask?.price)}
            shares={Number(ask?.liquidity)}
            total={ask?.total}
            max={max}
            isLast={index === asks.length - 1}
          />
        ))}
      <OrderBookSpread type={type} />
      {bids?.map((bid, index) => (
        <OrderBookRow
          key={`${bid.price}-${index.toString()}`}
          side={EBetStatusOption.BID}
          price={Number(bid?.price)}
          shares={Number(bid?.liquidity)}
          total={bid?.total}
          max={max}
          isLast={index === 0}
        />
      ))}
    </div>
  );
};

export default OrderBook;
