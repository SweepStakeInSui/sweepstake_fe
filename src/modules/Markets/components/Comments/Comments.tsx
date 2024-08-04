import React from 'react';

import { CommentForm, CommentList } from '@/components/common/NestedComments';
import Paper from '@/components/common/Paper';
import Typography from '@/components/common/Typography';
import { mockNestedComments } from '@/mocks/mockComments';

const MarketsComments = () => {
  return (
    <Paper>
      <Typography.Heading size={24} className="mb-2">
        Ideas
      </Typography.Heading>
      <section>
        <CommentForm />
        <CommentList comments={mockNestedComments} />
      </section>
    </Paper>
  );
};

export default MarketsComments;
