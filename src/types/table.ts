import type { BetStatus } from '@/enums/bet-status';

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
export interface ActivityProps {
  id: number;
  image: string;
  name: string;
  shares: number;
  price: number;
  status: 'Yes' | 'No';
  amount: number;
  time: string;
  type: BetStatus;
}
