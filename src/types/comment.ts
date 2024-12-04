export type TComment = {
  id: string;
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  replies?: TComment[];
  favorite?: boolean;
  saved?: boolean;
  likeCount?: number;
  likeByMe?: boolean;
};
