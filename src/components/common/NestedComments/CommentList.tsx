import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { TComment } from '@/types/comment';

import Comment from './Comment';

interface ICommentListProps {
  comments: TComment[];
}

const CommentList = ({ comments }: ICommentListProps) => {
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

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
    return commentsArray.map((comment) => (
      <div key={comment.id} className="mb-4">
        <Comment
          {...comment}
          onReply={() => !isNested && setReplyingTo(comment.id)}
          onLike={() => toggleLike(comment.id)}
          onShare={() => console.log(`Share comment ${comment.id}`)}
          likedByMe={likedComments.has(comment.id)}
        />
        {!isNested && comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-2">
            {renderComments(comment.replies, true)}
          </div>
        )}
        {replyingTo === comment.id && !isNested && (
          <div className="relative ml-8 mt-2">
            <Textarea
              ref={replyTextareaRef}
              placeholder={`Reply to @${comment.author}...`}
            />
            <Button
              variant="secondary"
              onClick={() => handleReply(comment.id, comment.author)}
              className="absolute bottom-3 right-3"
            >
              Submit Reply
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return <div className="space-y-4">{renderComments(comments)}</div>;
};

export default CommentList;
