import type { BetOutcomeType } from '@/enums/bet-status';
import type {
  IFormattedCreateBetParams,
  TOutcome,
} from '@/services/markets/types';

import type { ProfileTypes } from './profile';

export interface PositionItemProps extends BaseEntity {
  image?: string;
  balance: string;
  outcome: TOutcome & { market: IFormattedCreateBetParams };
  outcomeId: string;
  userId: string;
}
export interface PositionsProps {
  items: PositionItemProps[];
  meta: Meta;
}
export interface IActivityItem extends BaseEntity {
  image: string;
  name: string;
  shares: number;
  price: number;
  status: BetOutcomeType;
  amount: number;
  transactionHash: string;
  timestamp: number;
  userId: string;
  outcomeId: string;
  marketId: string;
  type: string;
  side: string;
  fullfilled: number;
  slippage: number;
  outcome: TOutcome & { market: IFormattedCreateBetParams };
  user: ProfileTypes;
}
export interface ActivityProps {
  items: IActivityItem[];
  meta: Meta;
}

export interface IPosition {
  balance: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  outcomeId: string;
  updatedAt: string;
  userId: string;
}
export interface IPositionsData {
  items: IPosition[];
  meta: Meta;
}
