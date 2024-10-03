type PaginationType = {
  page: number;
  limit: number;
};

type Message = 'success' | 'error';

type ResponseMeta = {
  timestamp: Date;
  message: Message;
};

type FilterParams = {
  name: string;
};
