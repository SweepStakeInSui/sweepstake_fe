'use client';

import React from 'react';

import type { TComment } from '@/types/comment';

import { Comment } from '../Comment';

interface ICommentsProps {
  comments: TComment[];
}

const Comments = ({ comments }: ICommentsProps) => {
  const renderComments = (commentsArray: TComment[]) => {
    return commentsArray.map((comment) => (
      <div key={comment.id} className="mb-4">
        <Comment
          author={comment.author}
          avatar={comment.avatar}
          timestamp={comment.timestamp}
          content={comment.content}
          onReply={() => console.log(`Reply to comment ${comment.id}`)}
          onLike={() => console.log(`Like comment ${comment.id}`)}
          onShare={() => console.log(`Share comment ${comment.id}`)}
        />
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-2 pl-4">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ));
  };

  return <div className="space-y-4">{renderComments(comments)}</div>;
};

export default Comments;
