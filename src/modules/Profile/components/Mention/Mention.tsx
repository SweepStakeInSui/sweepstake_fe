import React from 'react';

import { CommentList } from '@/components/common/NestedComments';
import { mockNestedComments } from '@/mocks/mockComments';

const Mention = () => {
  return (
    <div>
      <CommentList comments={mockNestedComments} isForDisplay />
    </div>
  );
};

export default Mention;
