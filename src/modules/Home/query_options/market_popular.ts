import { queryOptions } from '@tanstack/react-query';

import { MarketService } from '@/services/markets';

export const marketPopularOptions = queryOptions({
  queryKey: ['marketPopular'],
  queryFn: async () => {
    const result = await MarketService.getMarketPopular({
      page: 1,
      limit: 10,
    });
    return result;
  },
});
