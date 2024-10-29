import React from 'react';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import {
  Accordion,
  AccordionContent,
  // AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OrderBook } from '@/components/charts/OrderBook';

interface SingleBetOrderBookProps {
  data: {
    asks?: {
      price: string;
      liquidity: string;
    }[];
    bids?: {
      price: string;
      liquidity: string;
    }[];
  };
}

const SingleBetOrderBook = ({ data }: SingleBetOrderBookProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="orderbook">
        <AccordionTrigger>
          <Flex className="w-full justify-between">
            <Flex>
              <Typography.Text size={15}>Order book</Typography.Text>
              <Svg src="/icons/info_outline.svg" />
            </Flex>
            <Svg
              src="/icons/chevron_right.svg"
              className="rotate-90 h-4 w-4 opacity-50"
            />
          </Flex>
        </AccordionTrigger>
        <AccordionContent>
          <OrderBook asks={data?.asks} bids={data?.bids} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SingleBetOrderBook;
