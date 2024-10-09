import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useWindowSize from '@/hooks/common/useWindowSize';
import { setBet } from '@/store/betSlice';

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
  yes: number;
  no: number;
}

const MarketTile = ({
  id,
  title,
  desc,
  percent,
  fluctuate,
  bids,
  yes,
  no,
}: IMarketTitleProps) => {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const { id: storedId, type } = useSelector((state: any) => state.bet);

  const onNoClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event?.stopPropagation();
    if (!isMobile) event?.preventDefault();
    dispatch(setBet({ type: 0, id, yes, no }));
  };

  const onYesClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event?.stopPropagation();
    if (!isMobile) event?.preventDefault();
    dispatch(setBet({ type: 1, id, yes, no }));
  };

  return (
    <AccordionItem value={id}>
      <Flex className="flex flex-col lg:flex-row justify-between w-full gap-0">
        <AccordionTrigger className="w-full">
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <Flex className="w-full justify-between p-0">
              <Stack className="items-start">
                <Typography.Text size={15} weight="medium">
                  {title}
                </Typography.Text>
                <Typography.Text size={13} className="text-text-subtle">
                  {desc}
                </Typography.Text>
              </Stack>

              <Flex className="lg:w-[9.875rem] items-center gap-1">
                <Typography.Text size={18} weight="medium">
                  {percent}%
                </Typography.Text>
                <Typography.Text size={13} className="text-text-support-green">
                  +{fluctuate}
                </Typography.Text>
              </Flex>
            </Flex>
          </div>
        </AccordionTrigger>
        <Flex className="w-full lg:w-[14.375rem] justify-center pb-4 lg:pb-0">
          <DrawerTrigger asChild>
            <Button
              variant={`bet_yes${type && storedId === id ? '_active' : ''}`}
              className="w-full"
              onClick={onYesClick}
            >
              Yes {yes}¢
            </Button>
          </DrawerTrigger>

          <DrawerTrigger asChild>
            <Button
              variant={`bet_no${!type && storedId === id ? '_active' : ''}`}
              className="w-full"
              onClick={onNoClick}
            >
              No {no}¢
            </Button>
          </DrawerTrigger>
        </Flex>
      </Flex>

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
                <div className="py-1 px-2 ml-3 rounded-md bg-[#0FB4BD] w-fit">
                  <Typography.Text size={12} className="text-text-inverse">
                    Yes
                  </Typography.Text>
                </div>
              </TableCell>
              <TableCell className="h-[2.625rem] text-right text-13 text-text-subtle">
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

interface IMarketTiles {
  data: IMarketTitleProps[];
}

const MarketTiles = ({ data }: IMarketTiles) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item) => (
        <MarketTile key={item.id} {...item} />
      ))}
    </Accordion>
  );
};

export default MarketTiles;
