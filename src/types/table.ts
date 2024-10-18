import type { BetOutcomeType } from '@/enums/bet-status';

export interface PositionsProps {
  id: number;
  image: string;
  name: string;
  shares: number;
  avg: number;
  current: number;
  status: 'Yes' | 'No';
  value: number;
  valueChanges: number;
  valuePercent: number;
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
