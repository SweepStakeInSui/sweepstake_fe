export interface NotificationItem extends BaseEntity {
  userId: string;
  message: string;
  type: 'deposit' | 'withdraw';
  timestamp: number;
  status: '0' | '1';
}

export interface NotificationData {
  items: NotificationItem[];
  meta: Meta;
}
