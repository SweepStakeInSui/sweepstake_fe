import React from 'react';

import { Comments } from '@/components/common/Comments';
import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockNestedComments } from '@/mocks/mockComments';

const MarketsComments = () => {
  return (
    <Paper>
      <Typography.Heading size={24} className="mb-2">
        Ideas
      </Typography.Heading>
      <div className="relative mb-4">
        <Textarea className="pb-14" placeholder="What is your prediction?" />
        <Flex className="absolute bottom-3 right-3">
          <Typography.Text size={13} className="text-text-subtle">
            800 left
          </Typography.Text>
          <Button variant="secondary">Post</Button>
        </Flex>
      </div>
      <Comments comments={mockNestedComments} />
    </Paper>
  );
};

export default MarketsComments;
