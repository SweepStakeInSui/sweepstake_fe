import { SelectValue } from '@radix-ui/react-select';
import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { mockRecentActivities } from '@/mocks/mockRecentAcitivities';
import { mockTopVolumeThisWeek } from '@/mocks/mockTopVolumeThisWeek';

import { Activity } from '../Activity';
import { MarketsComments } from '../Comments';
import { TopHolders } from '../TopHolders';

interface ILevelSectionProps {
  id: string;
}

const LevelSection = ({ id }: ILevelSectionProps) => {
  const [select, setSelect] = useState<string>('ideas');
  const tabs = [
    {
      label: 'Ideas',
      value: 'ideas',
      panel: <MarketsComments id={id} />,
    },
    {
      label: 'Top Holders',
      value: 'topHolders',
      panel: <TopHolders data={mockTopVolumeThisWeek} />,
    },
    {
      label: 'Activity',
      value: 'activity',
      panel: <Activity data={mockRecentActivities} />,
    },
  ];
  const selectedTab = tabs.find((item) => item.value === select);

  return (
    <div>
      <Select defaultValue={select} onValueChange={setSelect}>
        <SelectTrigger className="w-fit border-none text-24 font-semibold mb-4 gap-2 pl-0">
          <SelectValue placeholder="Ideas" />
        </SelectTrigger>
        <SelectContent>
          {tabs.map((tab) => (
            <SelectItem key={tab.value} value={tab.value}>
              {tab.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTab ? selectedTab.panel : null}
    </div>
  );
};

export default LevelSection;