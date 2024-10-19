import type { UseMutateFunction } from '@tanstack/react-query';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { TComment, TCreateCommentData } from '@/services/markets/types';

import { MentionInput } from '../MentionInput';
import Comment from './Comment';

interface ICommentListProps {
  userId?: string;
  marketId?: string;
  comments: TComment[];
  isMinimal?: boolean;
  isForDisplay?: boolean;
  onCreate?: UseMutateFunction<void, Error, TCreateCommentData, unknown>;
  onLike?: UseMutateFunction<void, Error, string, unknown>;
  isPending?: boolean;
}

const CommentList = ({
  userId,
  marketId,
  comments,
  isMinimal = false,
  isForDisplay = false,
  onCreate,
  onLike,
  isPending,
}: ICommentListProps) => {
  // STATES
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [commentText, setCommentText] = useState('');

  // REFS
  const replyTextareaRef = useRef<HTMLDivElement>(null);

  // FUNCTIONS
  const toggleLike = (commentId: string) => {
    setLikedComments((prevLiked) => {
      const newLiked = new Set(prevLiked);
      if (newLiked.has(commentId)) {
        newLiked.delete(commentId);
      } else {
        newLiked.add(commentId);
      }
      return newLiked;
    });
    onLike?.(commentId);
  };

  const handleReply = (parentCommentId: string) => {
    setReplyingTo(null);
    if (marketId) {
      onCreate?.({
        parentCommentId,
        content: commentText,
        marketId,
      });
    }
    setCommentText('');
  };

  // EFFECTS
  useEffect(() => {
    if (replyingTo && replyTextareaRef.current) {
      replyTextareaRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  useEffect(() => {
    if (comments.length > 0) {
      setLikedComments(
        new Set(
          comments
            .filter((comment) => comment.likedBy?.includes(userId as string))
            .map((comment) => comment.id),
        ),
      );
    }
  }, [comments]);

  const renderComments = (commentsArray: TComment[], isNested = false) => {
    return commentsArray?.map((comment, index) => (
      <Fragment key={comment.id}>
        {!isNested && index > 0 && (
          <hr className="my-3 border-t border-borderSublest" />
        )}
        <div key={comment.id} className="mb-4">
          <div>
            <Comment
              {...comment}
              likeCount={comment.likes}
              replyCount={comment.replies?.length}
              timestamp={comment.createdAt}
              onReply={() =>
                setReplyingTo({
                  id: comment.id,
                  username: comment.username || comment.userId,
                })
              }
              onLike={() => toggleLike(comment.id)}
              onShare={() => console.log(`Share comment ${comment.id}`)}
              likedByMe={
                comment.likedBy?.includes(userId as string) ||
                likedComments.has(comment.id)
              }
              isMinimal={isMinimal}
              isReplies={isNested}
              isForDisplay={isForDisplay}
            />
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-8 mt-2">
                {renderComments(comment.replies, true)}
              </div>
            )}
          </div>

          {!isNested &&
            replyingTo &&
            (replyingTo.id === comment.id ||
              comment.replies?.some((reply) => replyingTo.id === reply.id)) && (
              <div className="relative ml-8 mt-2" ref={replyTextareaRef}>
                <MentionInput
                  value={commentText}
                  onChange={(value) => setCommentText(value)}
                  userData={{ id: '1', display: replyingTo.username }}
                  placeholder={`Reply to ${replyingTo.username}`}
                />
                <Button
                  variant="secondary"
                  onClick={() => handleReply(replyingTo.id)}
                  className="absolute bottom-3 right-3"
                  disabled={isPending || !commentText}
                >
                  Reply
                </Button>
              </div>
            )}
        </div>
      </Fragment>
    ));
  };

  return <div className="space-y-4">{renderComments(comments)}</div>;
};

export default CommentList;
