import type { TComment } from '@/services/markets/types';

export const formatComments = (comments: TComment[]) => {
  const commentMap = new Map<string, TComment>();
  const topLevelComments: TComment[] = [];

  comments.forEach((comment) => {
    comment.replies = [];
    commentMap.set(comment.id, comment);

    if (comment.parentComment) {
      const parentComment = commentMap.get(comment.parentComment.id);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
      }
    } else {
      topLevelComments.push(comment);
    }
  });
  return topLevelComments;
};
