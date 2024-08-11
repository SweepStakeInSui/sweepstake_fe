import { SelectValue } from '@radix-ui/react-select';
import React from 'react';

import { CommentForm, CommentList } from '@/components/common/NestedComments';
import Paper from '@/components/common/Paper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { mockNestedComments } from '@/mocks/mockComments';

const tabs = [
  {
    label: 'Ideas',
    value: 'ideas',
  },
  {
    label: 'Top Holders',
    value: 'topHolders',
  },
  {
    label: 'Activity',
    value: 'activity',
  },
];

const MarketsComments = () => {
  return (
    <Paper>
      <Select defaultValue="ideas">
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
      <section>
        <CommentForm />
        <CommentList comments={mockNestedComments} />
      </section>
    </Paper>
  );
};

export default MarketsComments;
