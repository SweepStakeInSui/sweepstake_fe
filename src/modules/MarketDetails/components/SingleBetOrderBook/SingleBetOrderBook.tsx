import React from 'react';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import {
  Accordion,
  // AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const SingleBetOrderBook = () => {
  return (
    <Accordion type="single">
      <AccordionItem value="1">
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
        {/* <AccordionContent></AccordionContent> */}
      </AccordionItem>
    </Accordion>
  );
};

export default SingleBetOrderBook;
