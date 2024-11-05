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
