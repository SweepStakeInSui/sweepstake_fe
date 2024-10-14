import React from 'react';

import { CommentList } from '@/components/common/NestedComments';
import { mockNestedComments } from '@/mocks/mockComments';
import { TComment } from '@/services/markets/types';

const Mention = () => {
  return (
    <div>
      <CommentList comments={mockNestedComments as TComment[]} isForDisplay />
    </div>
  );
};

export default Mention;
