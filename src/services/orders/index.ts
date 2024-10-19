import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import type {
  IPostOrderRequest,
  TPostOrderResponse,
} from '@/services/orders/types';
import type { ActivityProps } from '@/types/table';

type TOrderParams = {
  user?: string;
} & PaginationType;
const postOrder = async (
  body: IPostOrderRequest,
): Promise<TPostOrderResponse> => {
  const response = await privateAxiosClient.post(`/order`, body);
  return response.data;
};
const getOrder = async (params: TOrderParams): Promise<ActivityProps> => {
  const response = await publicAxiosClient.get(`/order`, { params });
  return response.data.data;
};
export const orderService = {
  postOrder,
  getOrder,
};
