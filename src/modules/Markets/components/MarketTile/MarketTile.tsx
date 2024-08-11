import React from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface IMarketTitleProps {
  id: string;
  title: string;
  desc: string;
  percent: number;
  fluctuate: number;
  bids: {
    price: string;
    size: string;
  }[];
}

const MarketTile = ({
  id,
  title,
  desc,
  percent,
  fluctuate,
  bids,
}: IMarketTitleProps) => {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>
        <Flex className="w-full justify-between">
          <Stack className="items-start">
            <Typography.Text size={15} weight="medium">
              {title}
            </Typography.Text>
            <Typography.Text size={13} className="text-text-subtle">
              {desc}
            </Typography.Text>
          </Stack>
          <Flex className="w-[21.25rem] justify-between">
            <Flex className="w-[6.875rem] items-center gap-1">
              <Typography.Text size={18} weight="medium">
                {percent}%
              </Typography.Text>
              <Typography.Text size={13} className="text-text-support-green">
                +{fluctuate}
              </Typography.Text>
            </Flex>
            <Flex className="w-[14.375rem]">
              <Button variant="bet_yes" className="w-full">
                Yes 72¢
              </Button>
              <Button variant="bet_no" className="w-full">
                No 29¢
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </AccordionTrigger>
      <AccordionContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[12.5rem]" />
              <TableHead className="text-right text-13 text-text-subtle">
                Price
              </TableHead>
              <TableHead className="text-right text-13 text-text-subtle">
                Contracts
              </TableHead>
              <TableHead className="text-right text-13 text-text-subtle">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid, index) => (
              <TableRow
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="border border-solid border-borderPlain"
              >
                <TableCell className="relative">
                  <div className="h-[2.625rem] w-full bg-[#FDF1F1]" />
                  {index === 3 && (
                    <div className="py-1 px-2 rounded-md bg-[#EB201E] w-fit absolute top-[50%] left-6 translate-y-[-50%]">
                      <Typography.Text size={12} className="text-text-inverse">
                        Asks
                      </Typography.Text>
                    </div>
                  )}
                </TableCell>
                <TableCell
                  className={`text-right font-semibold text-${index === 3 ? '20' : '13'} text-text-support-red`}
                >
                  {bid.price}
                </TableCell>
                <TableCell className="text-right text-13 text-text-subtle">
                  {bid.size}
                </TableCell>
                <TableCell className="text-right text-13 text-text-subtle">
                  {bid.size}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell className="h-[2.625rem]">
                <div className="py-1 px-2 ml-2 rounded-md bg-[#0FB4BD] w-fit">
                  <Typography.Text size={12} className="text-text-inverse">
                    Yes
                  </Typography.Text>
                </div>
              </TableCell>
              <TableCell className="h-[2.625rem] text-right text-right text-13 text-text-subtle">
                Last 50c
              </TableCell>
              <TableCell colSpan={2} />
            </TableRow>

            {bids.map((bid, index) => (
              <TableRow
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="border border-solid border-borderPlain"
              >
                <TableCell className="relative">
                  {index === 0 && (
                    <div className="py-1 px-2 rounded-md bg-[#358C03] w-fit absolute top-[50%] left-6 translate-y-[-50%]">
                      <Typography.Text size={12} className="text-text-inverse">
                        Bids
                      </Typography.Text>
                    </div>
                  )}
                  <div className="h-[2.625rem] w-full bg-[#E9FCD9]" />
                </TableCell>
                <TableCell
                  className={`text-right font-semibold text-${index === 0 ? '20' : '13'} text-text-support-green`}
                >
                  {bid.price}
                </TableCell>
                <TableCell className="text-right text-13 text-text-subtle">
                  {bid.size}
                </TableCell>
                <TableCell className="text-right text-13 text-text-subtle">
                  {bid.size}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default MarketTile;
