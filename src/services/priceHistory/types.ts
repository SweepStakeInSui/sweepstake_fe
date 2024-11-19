export type TSnapshotTime = '1m' | '30m' | '1h' | '4h' | '1d' | '7d' | '30d';
export type TPriceHistoryParams = {
  start?: string;
  end?: string;
  marketId: string;
  time: TSnapshotTime;
};

export type TPriceHistoryResponse = {
  status: number;
  data: TPriceHistoryItem[];
  meta: Meta;
};

export type TPriceHistoryItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  marketId: string;
  price: number;
  timestamp: number;
  snapshotTime: TSnapshotTime;
};
