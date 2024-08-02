import React from 'react';

import Comments from '@/components/common/Comments/comments';
import Paper from '@/components/common/Paper';
import { mockNestedComments } from '@/mocks/mockComments';

const MarketsComments = () => {
  return (
    <Paper>
      <Comments comments={mockNestedComments} />
    </Paper>
  );
};

export default MarketsComments;
