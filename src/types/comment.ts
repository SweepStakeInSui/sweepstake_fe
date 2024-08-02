export type TComment = {
  id: number;
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  replies?: TComment[];
  favorite?: boolean;
  saved?: boolean;
};
