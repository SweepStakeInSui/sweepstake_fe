import { queryOptions } from '@tanstack/react-query';

import { OrderService } from '@/services/orders';

export const activityOptions = queryOptions({
  queryKey: ['activity'],
  queryFn: async () => {
    const result = await OrderService.getOrder({
      page: 1,
      limit: 5,
    });
    return result;
  },
});
