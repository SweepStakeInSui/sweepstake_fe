import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { notificationService } from '@/services/notificationService';
import { selectProfile } from '@/store/profileSlice';

export const useNotification = () => {
  const { isLoggedIn } = useSelector(selectProfile);
  const queryClient = useQueryClient();
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  const { data: dataNotification } = useInfiniteQuery({
    queryKey: ['getNotification'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await notificationService.getNotification({
        page: pageParam,
        limit: 12,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.items.length < 12) return undefined;
      return pages.length + 1;
    },
    enabled: isLoggedIn,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  const { mutate: notificationSeenMutate } = useMutation({
    mutationFn: (idBet: string[]) =>
      notificationService.notificationSeen({ notificationIds: idBet }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotification'] });
    },
  });

  useEffect(() => {
    if (dataNotification?.pages) {
      const hasUnreadNotifications = dataNotification.pages.some((page) =>
        page.items.some((item) => item.status === '0'),
      );
      setHasUnread(hasUnreadNotifications);
    }
  }, [JSON.stringify(dataNotification)]);

  const handleReadAll = () => {
    const allIds =
      dataNotification?.pages?.flatMap((page) =>
        page.items.filter((item) => item.status === '0').map((item) => item.id),
      ) || [];

    if (allIds.length > 0) {
      notificationSeenMutate(allIds);
    }
  };

  return {
    hasUnread,
    dataNotification,
    handleReadAll,
  };
};
