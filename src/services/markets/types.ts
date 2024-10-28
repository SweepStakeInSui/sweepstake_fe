import type { ICategoryList } from '../categoryService';

export type TCreateBetData = {
  image?: string;
  name: string;
  description?: string;
  colaterralToken: string;
  conditions?: string;
  startTime: number;
  endTime: number;
  category?: string[];
  betType?: string;
  outcomes?: IOutcomeData[];
  sources?: ISourceData[];
};
export type IMarketParams = {
  name?: string;
  user?: string;
  category?: string;
} & PaginationType;
export type IOutcomeData = {
  outcome: string;
  subOutcome: string;
  picture?: File;
};
export type IMarketTopholdersParams = {
  marketId?: string;
} & PaginationType;
export type ISourceData = {
  label: string;
  url: string;
};

export type TCrateBetFormData = {
  startDate: Date;
  startClock: Date;
  endDate: Date;
  endClock: Date;
} & TCreateBetData;

export interface IFormattedCreateBetData
  extends Omit<TCrateBetFormData, 'category'> {
  category?: ICategoryList[];
}
export interface IFormattedCreateBetParams
  extends Omit<TCrateBetFormData, 'category'> {
  category?: string[];
  userId?: string;
}
export type TCreateBetResponseData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  colaterralToken: string;
  conditions_str: string;
};

export type TCreateBetResponse = {
  statusCode: number;
  data: TCreateBetResponseData;
};

export type TOutcome = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  marketId: string;
  type: string;
  askPrice: string;
  bidPrice: string;
  askLiquidity: string;
  bidLiquidity: string;
};

export type TBetItem = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  name: string;
  description: string;
  image?: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  colaterralToken: string;
  payoutTime: number;
  category: string[];
  conditions_str: string;
  status: string;
  outcomes: TOutcome[];
  onchainId: string;
  transactionHash: string;
  source?: ISourceData[];
  volume: string;
  tradeCount: string;
};

export type TBetDetails = {
  items: TBetItem[];
  meta: Meta;
};

export type TBetGrid = {
  statusCode: number;
  data: TBetDetails;
  meta: Meta;
};

export type TCreateCommentData = {
  marketId: string;
  content: string;
  parentCommentId: string | null;
};

export type TCommentList = {
  statusCode: number;
  data: TComment[];
  meta: Meta;
};

export type TgetCommentListService = {
  marketId: string;
};

export type TCommentData = {
  items: TComment[];
  meta: Meta;
};

export type TComment = {
  id: string;
  username?: string;
  userId: string;
  marketId: string;
  avatar?: string;
  timestamp: string;
  content: string;
  replies?: TComment[];
  likes?: number;
  likedBy?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  parentComment: TComment | null;
};
