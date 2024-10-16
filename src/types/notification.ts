export interface NotificationItem extends BaseEntity {
  userId: string;
  message: string;
  type: 'deposited' | 'withdraw';
  timestamp: number;
  status: '0' | '1';
  data: {
    amount: string;
  };
}

export interface NotificationData {
  items: NotificationItem[];
  meta: Meta;
}
