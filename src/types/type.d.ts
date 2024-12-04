type TOption = {
  value: string;
  label: React.ReactNode;
};
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  timeStamp?: string;
  message?: string;
}

interface IErrorResponse {
  statusCode: number;
  message: string;
  response: {
    data: {
      statusCode: number;
      meta: {
        message: string;
      };
    };
  };
}

type FilterTimes = '1d' | '1w' | '1m' | '1y' | 'all';
