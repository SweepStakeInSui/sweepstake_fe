'use client';

import { useState } from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAvatar } from '@/mocks/mockAvatar';

import { useSectionIndicatorSignal } from '../../useSectionIndicatorSignal';
import BuyAction from './BuyAction';
import SellAction from './SellAction';

const sections = [
  {
    label: 'Top Page',
    id: '/',
  },
  {
    label: 'Rule Summary',
    id: 'rule-summary',
  },
  {
    label: 'About',
    id: 'about',
  },
  {
    label: 'Relate Market',
    id: 'relate-market',
  },
  {
    label: 'Idea',
    id: 'idea',
  },
];

const MarketsActionForm = () => {
  const [selectedValue, setSelectedValue] = useState('market');

  const { activeSection } = useSectionIndicatorSignal();

  const tabsProfile = [
    { id: 1, value: 'buy', title: 'Buy' },
    { id: 2, value: 'sell', title: 'Sell' },
  ];

  return (
    <Stack className="no-scrollbar sticky gap-y-0 border-l border-solid border-borderSubtle p-3 top-2 lg:top-[4.75rem] w-full lg:w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto">
      <Stack className="gap-4 p-3">
        <Flex className="items-center gap-3 mb-2">
          <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
            <AvatarImage src={mockAvatar} />
            <AvatarFallback />
          </Avatar>
          <Typography.Text>
            <span className="text-text-support-match">Bet Yes</span>
            <span>・Before Aug 9</span>
          </Typography.Text>
        </Flex>

        <div className="relative">
          <div className="absolute right-0">
            <Select defaultValue="market" onValueChange={setSelectedValue}>
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
              <BuyAction isLimit={selectedValue === 'limit'} />
            </TabsContent>
            <TabsContent value="sell" className="mt-0">
              <SellAction />
            </TabsContent>
          </Tabs>
        </div>
      </Stack>

      <Stack className="gap-4 hidden-mobile">
        <hr className="border-borderSubtle my-5" />

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
                src="icons/arrow_right_alt.svg"
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
