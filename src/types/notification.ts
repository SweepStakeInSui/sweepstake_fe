export interface NotificationItem extends BaseEntity {
  userId: string;
  message: string;
  type: 'deposited' | 'withdraw';
  timestamp: number;
  status: '0' | '1';
  data: TNotificationData;
  user: {
    username: string;
    avatar: string;
  };
}

export type TNotificationData = {
  amount?: string;
  user?: {
    username: string;
    avatar: string;
  };
  comment?: {
    content: string;
    marketId: string;
  };
};

export interface NotificationData {
  items: NotificationItem[];
  meta: Meta;
}
