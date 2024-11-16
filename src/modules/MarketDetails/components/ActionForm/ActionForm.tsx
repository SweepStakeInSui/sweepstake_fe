'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defaultImg } from '@/constants/defaultImg';
import { sections } from '@/constants/navList';
import { BetOutcomeType, EBetOpenStatus } from '@/enums/bet-status';
import BetAction from '@/modules/MarketDetails/components/ActionForm/BetAction';
import { selectOrderbook, setOrderInput } from '@/store/orderbookSlice';
import { selectProfile } from '@/store/profileSlice';
import { toEST } from '@/utils/toEST';

import { useSectionIndicatorSignal } from '../../useSectionIndicatorSignal';

interface MarketsActionFormProps {
  image?: string;
  startTime: number;
  endTime: number;
  payoutOn: number;
}

const MarketsActionForm = ({
  image,
  startTime,
  endTime,
  payoutOn,
}: MarketsActionFormProps) => {
  const dispatch = useDispatch();
  const { isClickOn } = useSelector(selectOrderbook);
  const { isLoggedIn } = useSelector(selectProfile);
  const { type } = useSelector((state: any) => state.bet);
  const { activeSection } = useSectionIndicatorSignal();

  // States
  const [selectedValue, setSelectedValue] = useState('market');
  const [betStatus, setBetStatus] = useState({
    title: EBetOpenStatus.OPEN,
    isActive: true,
  });

  const tabsProfile = [
    { id: 1, value: 'buy', title: 'Buy' },
    { id: 2, value: 'sell', title: 'Sell' },
  ];

  useEffect(() => {
    if (isClickOn) setSelectedValue('limit');
  }, [isClickOn]);

  useEffect(() => {
    if (selectedValue === 'market')
      dispatch(setOrderInput({ isClickOn: false, price: 0 }));
  }, [selectedValue, dispatch]);

  useEffect(() => {
    const now = new Date().getTime();
    const start = startTime * 1000;
    const end = endTime * 1000;

    if (now < start)
      setBetStatus({ title: EBetOpenStatus.UPCOMING, isActive: false });
    else if (now > end) {
      setBetStatus({ title: EBetOpenStatus.CLOSED, isActive: false });
    } else {
      setBetStatus({ title: EBetOpenStatus.OPEN, isActive: true });
    }
  }, [isLoggedIn, startTime, endTime]);

  return (
    <Stack className="no-scrollbar sticky gap-y-0 border-l border-solid border-borderSubtle p-3 top-2 lg:top-[4.75rem] w-full lg:w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto">
      <Stack className="gap-4 p-3">
        {betStatus.isActive ? (
          <>
            <Flex className="items-center gap-3 mb-2">
              <div className="relative size-[2.5rem] aspect-1 rounded-md overflow-hidden">
                <Image
                  src={image || defaultImg}
                  fill
                  alt=""
                  objectFit="cover"
                />
              </div>
              <Typography.Text>
                <span
                  className={
                    type === BetOutcomeType.YES
                      ? `text-text-support-match`
                      : 'text-text-support-blue'
                  }
                >
                  Bet {type === BetOutcomeType.YES ? 'Yes' : 'No'}
                </span>
                <span>
                  ・Before {format(toEST(new Date(endTime * 1000)), 'MMM dd')}
                </span>
              </Typography.Text>
            </Flex>

            <div className="relative">
              <div className="absolute right-0">
                <Select
                  defaultValue="market"
                  value={selectedValue}
                  onValueChange={setSelectedValue}
                >
                  <SelectTrigger className="bg-transparent border-none w-fit gap-2 pr-0 text-14 text-text-subtle -translate-y-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectGroup>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="mb-5">
                  {tabsProfile.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.value}>
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="buy" className="mt-0">
                  <BetAction isLimit={selectedValue === 'limit'} isBid />
                </TabsContent>
                <TabsContent value="sell" className="mt-0">
                  <BetAction
                    isLimit={selectedValue === 'limit'}
                    isBid={false}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <Stack className="gap-0">
            <div className="bg-bg-sublest rounded-md p-2 w-fit mb-7">
              <Svg src="/icons/alarm_on.svg" className="w-8 h-8" />
            </div>
            <Typography.Heading
              size={28}
              className="text-text-support-red mb-2"
              weight="semibold"
            >
              {betStatus.title}
            </Typography.Heading>
            <Typography.Text size={15} className="text-text-subtle">
              Projected will payout on{' '}
              {payoutOn
                ? format(toEST(new Date(payoutOn * 1000)), 'MMM dd, yyyy')
                : ''}
            </Typography.Text>
          </Stack>
        )}
      </Stack>

      <Stack className="gap-4 hidden-mobile">
        <hr className="border-borderSubtle mt-5 mb-1" />

        <Stack>
          {sections.map((section) => (
            <button
              type="button"
              key={section.id}
              className={`
          w-full group flex justify-between p-3 hover:bg-bg-hovered rounded-lg text-16 ${activeSection.value === section.id ? 'text-text' : 'text-text-sublest'}`}
              onClick={() => {
                const element = document.getElementById(section.id);
                if (!element) return;
                window.scroll({
                  top: element.offsetTop - 70,
                  behavior: 'smooth',
                });
              }}
            >
              {section.label}
              <Svg
                src="/icons/arrow_right_alt.svg"
                className="group-hover:opacity-100 opacity-0 transition-all duration-250"
              />
            </button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MarketsActionForm;
