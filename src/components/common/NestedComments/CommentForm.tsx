import React from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import Flex from '../Flex';
import Typography from '../Typography';

const CommentForm = () => {
  return (
    <form>
      <div className="relative mb-4">
        <Textarea className="pb-14" placeholder="What is your prediction?" />
        <Flex className="absolute bottom-3 right-3">
          <Typography.Text size={13} className="text-text-subtle">
            800 left
          </Typography.Text>
          <Button variant="secondary">Post</Button>
        </Flex>
      </div>
    </form>
  );
};

export default CommentForm;
