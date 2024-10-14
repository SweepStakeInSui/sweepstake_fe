import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import type {
  IFormattedCreateBetData,
  TBetDetails,
  TBetItem,
  TCommentData,
  TCreateBetResponse,
  TCreateCommentData,
} from '@/services/markets/types';

const getMarketService = async (
  params: PaginationType,
): Promise<TBetDetails> => {
  const response = await publicAxiosClient.get(`/market`, { params });
  return response.data.data;
};

const createMarketService = async (
  body: IFormattedCreateBetData,
): Promise<TCreateBetResponse> => {
  const response = await privateAxiosClient.post(`/market`, body);
  return response.data;
};

const getSearchMarketService = async (
  params: FilterParams,
): Promise<TBetItem[]> => {
  const response = await publicAxiosClient.get(`/market/search`, { params });
  return response.data.data;
};

const getMarketDetailsService = async (id: string): Promise<TBetItem> => {
  const response = await publicAxiosClient.get(`/market/${id}`);
  return response.data.data;
};

const createCommentService = async (
  body: TCreateCommentData,
): Promise<void> => {
  const response = await privateAxiosClient.post(`/market/comments`, body);
  return response.data.data;
};

const getCommentListService = async (
  marketId: string,
): Promise<TCommentData> => {
  const response = await publicAxiosClient.get(`/market/comments/${marketId}`);
  return response.data.data;
};

export const marketService = {
  getMarketService,
  createMarketService,
  getSearchMarketService,
  getMarketDetailsService,
  createCommentService,
  getCommentListService,
};
