import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type {
  IPostOrderRequest,
  TPostOrderResponse,
} from '@/services/orders/types';
import type { ActivityProps } from '@/types/table';

const postOrder = async (
  body: IPostOrderRequest,
): Promise<TPostOrderResponse> => {
  const response = await privateAxiosClient.post(`/order`, body);
  return response.data;
};
const getOrder = async (params: PaginationType): Promise<ActivityProps> => {
  const response = await privateAxiosClient.get(`/order`, { params });
  return response.data.data;
};
export const orderService = {
  postOrder,
  getOrder,
};
