import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import type {
  IFormattedCreateBetParams,
  IMarketParams,
  TBetDetails,
  TBetItem,
  TCommentData,
  TCreateBetResponse,
  TCreateCommentData,
} from '@/services/markets/types';

const getMarket = async (params: IMarketParams): Promise<TBetDetails> => {
  const response = await publicAxiosClient.get(`/market`, { params });
  return response.data.data;
};

const createMarket = async (
  params: IFormattedCreateBetParams,
): Promise<TCreateBetResponse> => {
  const response = await privateAxiosClient.post(`/market`, params);
  return response.data;
};

const getSearchMarket = async (params: FilterParams): Promise<TBetItem[]> => {
  const response = await publicAxiosClient.get(`/market/search`, { params });
  return response.data.data;
};

const getMarketDetails = async (id: string): Promise<TBetItem> => {
  const response = await publicAxiosClient.get(`/market/${id}`);
  return response.data.data;
};

const createComment = async (params: TCreateCommentData): Promise<void> => {
  const response = await privateAxiosClient.post(`/market/comments`, params);
  return response.data.data;
};

const getCommentList = async (marketId: string): Promise<TCommentData> => {
  const response = await publicAxiosClient.get(`/market/comments/${marketId}`);
  return response.data.data;
};

const postLikeComment = async (id: string): Promise<void> => {
  const response = await privateAxiosClient.post(`/market/comments/like/${id}`);
  return response.data.data;
};

const getUserComments = async (userId: string): Promise<TCommentData> => {
  const response = await publicAxiosClient.get(
    `/market/comments/user/${userId}`,
  );
  return response.data.data;
};

export const MarketService = {
  getMarket,
  createMarket,
  getSearchMarket,
  getMarketDetails,
  createComment,
  getCommentList,
  postLikeComment,
  getUserComments,
};
