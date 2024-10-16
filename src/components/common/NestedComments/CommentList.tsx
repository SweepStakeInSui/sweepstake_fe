import { Fragment, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { TComment } from '@/services/markets/types';

import { MentionInput } from '../MentionInput';
import Comment from './Comment';

interface ICommentListProps {
  comments: TComment[];
  isMinimal?: boolean;
  isForDisplay?: boolean;
}

const CommentList = ({
  comments,
  isMinimal = false,
  isForDisplay = false,
}: ICommentListProps) => {
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{
    id: string;
    author: string;
  } | null>(null);
  const replyTextareaRef = useRef<HTMLDivElement>(null);

  // Functions
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
  };

  // Effects
  useEffect(() => {
    if (replyingTo && replyTextareaRef.current) {
      replyTextareaRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  // TODO: handleReply
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleReply = (_commentId: string, _author: string) => {
    setReplyingTo(null);
  };

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
              timestamp={comment.createdAt}
              onReply={() =>
                setReplyingTo({ id: comment.id, author: comment.author })
              }
              onLike={() => toggleLike(comment.id)}
              onShare={() => console.log(`Share comment ${comment.id}`)}
              likedByMe={likedComments.has(comment.id)}
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
                  userData={{ id: '1', display: replyingTo.author }}
                  // placeholder={`Reply to ${replyingTo.author}`}
                />
                <Button
                  variant="secondary"
                  onClick={() => handleReply(replyingTo.id, replyingTo.author)}
                  className="absolute bottom-3 right-3"
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
