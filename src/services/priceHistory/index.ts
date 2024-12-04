import publicAxiosClient from '@/app/configs/httpClient/publicAxiosClient';
import type {
  TPriceHistoryParams,
  TPriceHistoryResponse,
} from '@/services/priceHistory/types';

const getPriceHistory = async (
  params: TPriceHistoryParams,
): Promise<TPriceHistoryResponse> => {
  const response = await publicAxiosClient.get(
    `/price-history/${params.marketId}`,
    { params },
  );
  return response.data;
};

export const PriceHistoryService = {
  getPriceHistory,
};
