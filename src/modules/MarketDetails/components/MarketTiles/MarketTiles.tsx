import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DrawerTrigger } from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BetOutcomeType } from '@/enums/bet-status';
import useWindowSize from '@/hooks/common/useWindowSize';
import type { TBetItem } from '@/services/markets/types';
import { setBet } from '@/store/betSlice';
import { handleBignumber } from '@/utils/handleBignumber';

interface IMarketTitleProps {
  isSingleBet?: boolean;
  data: TBetItem;
}

export const MarketTile = ({ isSingleBet, data }: IMarketTitleProps) => {
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();
  const betState = useSelector((state: any) => state.bet);

  const outcomeYes = useMemo(
    () => data.outcomes.filter((item) => item.type === BetOutcomeType.YES)[0],
    [data],
  );
  const outcomeNo = useMemo(
    () => data.outcomes.filter((item) => item.type === BetOutcomeType.NO)[0],
    [data],
  );

  const onNoClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event?.stopPropagation();
    if (!isMobile) event?.preventDefault();
    const noPrice = betState.isBid
      ? { bidPriceNo: outcomeNo.bidPrice }
      : { askPriceNo: outcomeNo.askPrice };
    dispatch(
      setBet({ ...betState, id: data.id, type: BetOutcomeType.NO, noPrice }),
    );
  };

  const onYesClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event?.stopPropagation();
    if (!isMobile) event?.preventDefault();
    const yesPrice = betState.isBid
      ? { bidPriceYes: outcomeYes.bidPrice }
      : { askPriceYes: outcomeYes.askPrice };
    dispatch(
      setBet({ ...betState, id: data.id, type: BetOutcomeType.YES, yesPrice }),
    );
  };

  return (
    <AccordionItem value={data.id}>
      <Flex className="flex flex-col lg:flex-row justify-between w-full gap-0">
        {!isSingleBet && (
          <AccordionTrigger className="w-full">
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <Flex className="w-full justify-between p-0">
                <Stack className="items-start">
                  <Typography.Text size={15} weight="medium">
                    {data.name}
                  </Typography.Text>
                  <Typography.Text size={13} className="text-text-subtle">
                    {data.description}
                  </Typography.Text>
                </Stack>

                <Flex className="lg:w-[9.875rem] items-center gap-1">
                  {/* <Typography.Text size={18} weight="medium">
                  {percent}%
                </Typography.Text>
                <Typography.Text size={13} className="text-text-support-green">
                  +{fluctuate}
                </Typography.Text> */}
                </Flex>
              </Flex>
            </div>
          </AccordionTrigger>
        )}

        <Flex className="w-full lg:w-[14.375rem] justify-center pb-4 lg:pb-0">
          <DrawerTrigger asChild>
            <Button
              variant={`bet_yes${data.id === betState.id && betState.type === BetOutcomeType.YES ? '_active' : ''}`}
              className="w-full"
              onClick={onYesClick}
            >
              Yes{' '}
              {betState.isBid
                ? handleBignumber.divideDecimal(outcomeYes.bidPrice)
                : handleBignumber.divideDecimal(outcomeYes.askPrice)}
              ¢
            </Button>
          </DrawerTrigger>

          <DrawerTrigger asChild>
            <Button
              variant={`bet_no${data.id === betState.id && betState.type === BetOutcomeType.NO ? '_active' : ''}`}
              className="w-full"
              onClick={onNoClick}
            >
              No{' '}
              {betState.isBid
                ? handleBignumber.divideDecimal(outcomeNo.bidPrice)
                : handleBignumber.divideDecimal(outcomeNo.askPrice)}
              ¢
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
                Shares
              </TableHead>
              <TableHead className="text-right text-13 text-text-subtle">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* TODO: update when backend is ready */}
            {/* {bids.map((bid, index) => (
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
            ))} */}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

// interface IMarketTiles {
//   data: TOutcome;
// }

// export const MarketTiles = ({ data }: IMarketTiles) => {
//   return (
//     <Accordion type="single" collapsible className="w-full">
//       {data.map((item) => (
//         <MarketTile key={item.id} {...item} />
//       ))}
//     </Accordion>
//   );
// };

// export default MarketTiles;
