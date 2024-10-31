import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotification } from '@/hooks/useNotification';
import { notificationService } from '@/services/notificationService';
import { selectProfile } from '@/store/profileSlice';
import type { NotificationItem, TNotificationData } from '@/types/notification';
import { formatDate } from '@/utils/formatDate';
import { handleBignumber } from '@/utils/handleBignumber';

interface INotifItemProps {
  id: string;
  user?: {
    username?: string;
    avatar: string;
  };
  type:
    | 'comment-reply'
    | 'comment-like'
    | 'betNo'
    | 'betYes'
    | 'withdraw'
    | 'deposited';
  date: string;
  status: string;
  amount?: string;
  content?: string;
  data?: TNotificationData;
}

const NotifItem = ({
  user,
  type,
  date,
  status,
  content,
  amount,
  id,
  data,
}: INotifItemProps) => {
  const queryClient = useQueryClient();
  const { mutate: notificationSeenMutate } = useMutation({
    mutationFn: (idBet: string[]) =>
      notificationService.notificationSeen({ notificationIds: idBet }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getNotification'] });
    },
  });

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        notificationSeenMutate([id]);
      }}
    >
      <Flex className="relative gap-x-2.5 items-center">
        {status === '0' && (
          <div className="absolute right-0 top-0 bg-[#EB201E] rounded-full size-1.5" />
        )}
        <div className="relative">
          {(() => {
            switch (type) {
              case 'comment-reply':
                return <CustomAvatar src={data?.user?.avatar} />;
              case 'comment-like':
                return <CustomAvatar src={data?.user?.avatar} />;
              default:
                return <CustomAvatar src={user?.avatar} />;
            }
          })()}
          <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%]">
            {(() => {
              switch (type) {
                case 'comment-reply':
                  return (
                    <div className="p-1 bg-dyb-95 rounded-full">
                      <Svg
                        src="/icons/chat_bubble.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                case 'comment-like':
                  return (
                    <div className="p-1 bg-r-50 rounded-full">
                      <Svg
                        src="/icons/favorite_filled.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                case 'betNo':
                case 'withdraw':
                  return (
                    <div className="p-1 bg-b-50 rounded-full">
                      <Svg
                        src="/icons/online_prediction.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                case 'betYes':
                case 'deposited':
                  return (
                    <div className="p-1 bg-ma-50 rounded-full">
                      <Svg
                        src="/icons/online_prediction.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </div>
        <Stack className="flex-col items-start gap-1">
          {(() => {
            switch (type) {
              case 'comment-reply':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text-subtle line-clamp-2"
                  >
                    <b className="text-text">@{data?.user?.username}</b> replied
                    to your comment: &quot;{data?.comment?.content}&quot;
                  </Typography.Text>
                );
              case 'comment-like':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text-subtle line-clamp-2"
                  >
                    <b className="text-text">@{data?.user?.username}</b> liked
                    your comment: &quot;{data?.comment?.content}&quot;
                  </Typography.Text>
                );
              case 'betNo':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text"
                  >
                    Your <span className="text-text-support-blue">Bet No</span>{' '}
                    order has been filled
                  </Typography.Text>
                );
              case 'withdraw':
              case 'deposited':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text"
                  >
                    You have {type} {handleBignumber.divideDecimal(amount ?? 0)}{' '}
                    USDT to your account
                  </Typography.Text>
                );
              case 'betYes':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text"
                  >
                    Your{' '}
                    <span className="text-text-support-match">Bet Yes</span>{' '}
                    order has been filled
                  </Typography.Text>
                );
              default:
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text"
                  >
                    {content}
                  </Typography.Text>
                );
            }
          })()}
          <Typography.Text
            size={13}
            weight="medium"
            className="text-text-sublest"
          >
            {date}
          </Typography.Text>
        </Stack>
      </Flex>
    </div>
  );
};
const NotiData = () => {
  const { ref, inView } = useInView();
  const { isLoggedIn } = useSelector(selectProfile);

  const {
    data: dataNotification,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {dataNotification?.pages &&
      dataNotification?.pages.length > 0 &&
      dataNotification.pages[0]?.items.length > 0 ? (
        dataNotification.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((item: NotificationItem) => (
              <Flex
                key={item.id}
                className="py-3 flex justify-between hover:bg-bg-hovered rounded-sm"
              >
                <NotifItem
                  id={item.id}
                  type={item.type}
                  date={formatDate.formatDateFromTimestamp(item.timestamp)}
                  content={item.message}
                  status={item.status}
                  amount={item.data?.amount}
                  user={item.user}
                  data={item.data}
                />
              </Flex>
            ))}
          </React.Fragment>
        ))
      ) : (
        <div className="text-center py-3">No notifications available.</div>
      )}
      <div ref={ref}>
        {isFetchingNextPage && (
          <Typography.Text
            size={15}
            className="h-10 text-center text-text-sublest"
          >
            Loading more...
          </Typography.Text>
        )}
      </div>
    </div>
  );
};

export const NotificationDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { hasUnread, handleReadAll } = useNotification();

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-11 p-0">
          <Svg src="/icons/notif.svg" />
          {hasUnread && (
            <div className="absolute translate-x-2 -translate-y-2 bg-[#EB201E] rounded-full size-1.5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[370px] px-2.5 py-3 bg-bg-surface max-h-[65vh] overflow-scroll"
        align="end"
      >
        <DropdownMenuLabel className="flex justify-between items-center">
          <Typography.Heading size={20}>Notification</Typography.Heading>
          <Button variant="ghost" onClick={handleReadAll}>
            <Typography.Text
              size={13}
              className="text-text-subtle font-semibold"
            >
              Read All
            </Typography.Text>
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <ScrollArea>
            <NotiData />
          </ScrollArea>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NotificationDrawer = () => {
  const { hasUnread, handleReadAll } = useNotification();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="px-2 py-3 lg:py-2 cursor-pointer rounded-md w-full hover:bg-bg-hovered">
          <Flex className="justify-between w-full">
            <Flex>
              <span className="size-6 flex items-center justify-center relative">
                <Svg src="/icons/notif.svg" />
              </span>
              <Typography.Text size={15} weight="medium" className="text-text">
                Notification
              </Typography.Text>
            </Flex>
            {hasUnread && (
              <div className="bg-[#EB201E] rounded-full size-1.5" />
            )}
          </Flex>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full px-5 py-3">
        <DrawerHeader className="text-left p-0 flex justify-between items-center">
          <DrawerClose>
            <Flex className="cursor-pointer">
              <Svg src="/icons/arrow_back_ios.svg" />
              <Typography.Text
                size={13}
                className="text-text-subtle"
                weight="semibold"
              >
                Back
              </Typography.Text>
            </Flex>
          </DrawerClose>
          <Button variant="ghost" onClick={handleReadAll}>
            <Typography.Text
              size={13}
              className="text-text-subtle font-semibold"
            >
              Read All
            </Typography.Text>
          </Button>
        </DrawerHeader>
        <ScrollArea>
          <NotiData />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
