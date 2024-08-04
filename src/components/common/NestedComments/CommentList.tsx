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
        block: 'center',
      });
      replyTextareaRef.current.focus();
    }
  }, [replyingTo]);

  const renderComments = (commentsArray: TComment[]) => {
    return commentsArray.map((comment) => (
      <div key={comment.id} className="mb-4">
        <Comment
          id={comment.id}
          author={comment.author}
          avatar={comment.avatar}
          timestamp={comment.timestamp}
          content={comment.content}
          likeCount={comment.likeCount}
          replyCount={comment.replies?.length}
          onReply={() => setReplyingTo(comment.id)}
          onLike={() => toggleLike(comment.id)}
          onShare={() => console.log(`Share comment ${comment.id}`)}
          likedByMe={likedComments.has(comment.id)}
        />
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-2 pl-4">
            {renderComments(comment.replies)}
          </div>
        )}
        {replyingTo === comment.id && (
          <div className="relative ml-8 mt-2 pl-4">
            <Textarea
              ref={replyTextareaRef}
              placeholder="Write your reply..."
            />
            <Button
              variant="secondary"
              onClick={() => setReplyingTo(null)}
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
