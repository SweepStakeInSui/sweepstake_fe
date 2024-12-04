export type TLeaderboardItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  username: string;
  address: string;
  email?: string;
  avatar: string;
  balance: string;
  volume: string;
};

export type TLeaderBoard = {
  statusCode: number;
  data: TLeaderboardItem[];
  meta: Meta;
};
