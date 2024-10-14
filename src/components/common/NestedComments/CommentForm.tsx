'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { marketService } from '@/services/markets';

import Flex from '../Flex';
import Typography from '../Typography';

interface ICommentFormProps {
  marketId: string;
}

const CommentForm = ({ marketId }: ICommentFormProps) => {
  const [commentText, setCommentText] = React.useState('');
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: marketService.createCommentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCommentMutation.mutate({
      parentCommentId: '',
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
          <Button
            variant="secondary"
            type="submit"
            disabled={createCommentMutation.isPending}
          >
            {createCommentMutation.isPending ? 'Posting...' : 'Post'}
          </Button>
        </Flex>
      </div>
    </form>
  );
};

export default CommentForm;
