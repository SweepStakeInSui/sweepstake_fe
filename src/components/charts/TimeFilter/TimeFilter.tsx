import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const timeFilter = [
  {
    label: '1D',
    value: '1d',
  },
  {
    label: '1W',
    value: '1w',
  },
  {
    label: '1M',
    value: '1m',
  },
  {
    label: '1Y',
    value: '1y',
  },
  {
    label: 'ALL',
    value: 'all',
  },
];

interface TimeFilterProps {
  onTimeChange?: (value: string) => void;
}

const TimeFilter = ({ onTimeChange }: TimeFilterProps) => {
  return (
    <Tabs
      className="flex justify-center align-center mt-10 mb-6"
      defaultValue="1m"
    >
      <TabsList className="border border-borderSubtle rounded-full w-full lg:w-fit py-1 px-1 h-full">
        {timeFilter.map((item) => (
          <TabsTrigger
            onClick={() => onTimeChange?.(item.value)}
            key={item.value}
            value={item.value}
            className="lg:mx-0 -mb-[2px] inline-flex items-center whitespace-nowrap border-transparent px-2 py-2 text-14 transition-all text-text first-of-type:ml-0 disabled:pointer-events-none disabled:text-muted-foreground data-[state=active]:bg-bg-r_50 rounded-full data-[state=active]:border-text data-[state=inactive]:hover:border-btn-text-hover data-[state=active]:font-semibold data-[state=active]:text-white
            border-b-0 w-full lg:w-[80px] justify-center h-full"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TimeFilter;
