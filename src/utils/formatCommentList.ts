import type { TComment } from '@/services/markets/types';

export const formatComments = (comments: TComment[]) => {
  const commentMap = new Map<string, TComment>();
  const topLevelComments: TComment[] = [];

  // First pass: Map all comments and create missing parent comments
  comments.forEach((comment) => {
    if (!commentMap.has(comment.id)) {
      comment.replies = [];
      commentMap.set(comment.id, comment);
    }

    if (comment.parentComment && !commentMap.has(comment.parentComment.id)) {
      const parentComment: TComment = {
        ...comment.parentComment,
        replies: [],
        parentComment: null,
      };
      commentMap.set(parentComment.id, parentComment);
    }
  });
  // Second pass: Organize comments into the tree structure
  commentMap.forEach((comment) => {
    if (comment.parentComment) {
      const parentComment = commentMap.get(comment.parentComment.id);
      if (parentComment) {
        parentComment.replies?.push(comment);
      }
    } else {
      topLevelComments.push(comment);
    }
  });

  return topLevelComments;
};
