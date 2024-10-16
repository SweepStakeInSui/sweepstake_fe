import type { UseMutateFunction } from '@tanstack/react-query';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { TCreateCommentData } from '@/services/markets/types';

import Flex from '../Flex';
import Typography from '../Typography';

interface ICommentFormProps {
  marketId: string;
  onCreate?: UseMutateFunction<void, Error, TCreateCommentData, unknown>;
  isPending?: boolean;
}

const CommentForm = ({ marketId, onCreate, isPending }: ICommentFormProps) => {
  const [commentText, setCommentText] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.({
      parentCommentId: null,
      content: commentText,
      marketId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <Textarea
          className="pb-14"
          placeholder="What is your prediction?"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Flex className="absolute bottom-3 right-3">
          <Typography.Text size={13} className="text-text-subtle">
            {800 - commentText.length} left
          </Typography.Text>
          <Button variant="secondary" type="submit" disabled={isPending}>
            {isPending ? 'Posting...' : 'Post'}
          </Button>
        </Flex>
      </div>
    </form>
  );
};

export default CommentForm;
