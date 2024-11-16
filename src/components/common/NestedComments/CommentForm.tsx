import type { UseMutateFunction } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import ConnectButton from '@/components/connectWallet/ConnectButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { TCreateCommentData } from '@/services/markets/types';
import { selectProfile } from '@/store/profileSlice';

import Flex from '../Flex';
import Typography from '../Typography';

interface ICommentFormProps {
  marketId: string;
  onCreate?: UseMutateFunction<void, Error, TCreateCommentData, unknown>;
  isPending?: boolean;
}

const CommentForm = ({ marketId, onCreate, isPending }: ICommentFormProps) => {
  const [commentText, setCommentText] = React.useState('');
  const { isLoggedIn } = useSelector(selectProfile);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 800) {
      setCommentText(text);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.length > 800) {
      toast.error('Comment cannot exceed 800 characters');
      return;
    }

    onCreate?.({
      parentCommentId: null,
      content: commentText,
      marketId,
    });
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <Textarea
          className="pb-14"
          placeholder="What is your prediction?"
          value={commentText}
          onChange={handleTextChange}
          maxLength={800}
        />
        <Flex className="absolute bottom-3 right-3">
          <Typography.Text
            size={13}
            className={`text-text-subtle ${commentText.length === 800 ? 'text-text-support-red' : ''}`}
          >
            {800 - commentText.length} left
          </Typography.Text>
          {isLoggedIn ? (
            <Button
              variant="secondary"
              type="submit"
              disabled={isPending || !commentText || commentText.length > 800}
            >
              {isPending ? 'Posting...' : 'Post'}
            </Button>
          ) : (
            <ConnectButton
              hasIcon={false}
              content="Post"
              className="w-fit h-fit px-4 py-2"
              variant="secondary"
              disabled={isPending || !commentText || commentText.length > 800}
            />
          )}
        </Flex>
      </div>
    </form>
  );
};

export default CommentForm;
