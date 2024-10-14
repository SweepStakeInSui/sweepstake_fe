import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type {
  IPostOrderRequest,
  TPostOrderResponse,
} from '@/services/orders/types';

const postOrder = async (
  body: IPostOrderRequest,
): Promise<TPostOrderResponse> => {
  const response = await privateAxiosClient.post(`/order`, body);
  return response.data;
};

export const orderService = {
  postOrder,
};
