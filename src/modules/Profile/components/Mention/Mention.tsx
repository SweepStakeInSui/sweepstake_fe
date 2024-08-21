import { CommentList } from '@/components/common/NestedComments';
import { mockNestedComments } from '@/mocks/mockComments';
import React from 'react';

const Mention = () => {
  return (
    <div>
      <CommentList comments={mockNestedComments} isForDisplay />
    </div>
  );
};

export default Mention;
