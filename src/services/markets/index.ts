import privateAxiosClient from '@/app/configs/httpClient/privateAxiosClient';
import type {
  IFormattedCreateBetData,
  TBetDetails,
  TBetItem,
  TCreateBetResponse,
} from '@/services/markets/types';

const getMarketService = async (
  params: PaginationType,
): Promise<TBetDetails> => {
  const response = await privateAxiosClient.get(`/market`, { params });
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
  const response = await privateAxiosClient.get(`/market/search`, { params });
  return response.data.data;
};

const getMarketDetailsService = async (id: string): Promise<TBetItem> => {
  const response = await privateAxiosClient.get(`/market/${id}`);
  return response.data.data;
};
export const marketService = {
  getMarketService,
  createMarketService,
  getSearchMarketService,
  getMarketDetailsService,
};
