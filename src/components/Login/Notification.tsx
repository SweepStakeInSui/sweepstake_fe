import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
import { notificationService } from '@/services/notificationService';
import { selectProfile } from '@/store/profileSlice';
import type { NotificationData, NotificationItem } from '@/types/notification';
import { formatDate } from '@/utils/formatDate';
import { handleBignumber } from '@/utils/handleBignumber';

interface INotifItemProps {
  id: string;
  user?: {
    name?: string;
    avatar: string;
  };
  type: 'comment' | 'like' | 'betNo' | 'betYes' | 'withdraw' | 'deposited';
  date: string;
  status: string;
  amount?: string;
  content?: string;
}

const NotifItem = ({
  user,
  type,
  date,
  status,
  content,
  amount,
  id,
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
          <CustomAvatar />
          <div className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%]">
            {(() => {
              switch (type) {
                case 'comment':
                  return (
                    <div className="p-1 bg-dyb-95 rounded-full">
                      <Svg
                        src="/icons/chat_bubble.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                case 'like':
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
              case 'comment':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text-subtle line-clamp-2"
                  >
                    <b className="text-text">@{user?.name}</b> replied to your
                    comment: `&quot;{content}`&quot;
                  </Typography.Text>
                );
              case 'like':
                return (
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text-subtle line-clamp-2"
                  >
                    <b className="text-text">@{user?.name}</b> liked your
                    comment: `&quot;{content}`&quot;
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
  const { isLoggedIn } = useSelector(selectProfile);
  const { data: dataNotification } = useQuery({
    queryKey: ['getNotification'],
    queryFn: async () => {
      const res = await notificationService.getNotification({
        page: 1,
        limit: 30,
      });
      return res;
    },
    enabled: isLoggedIn,
  });

  return (
    <div>
      {dataNotification?.items && dataNotification.items.length > 0 ? (
        dataNotification.items.map((item: NotificationItem) => (
          <Flex
            key={item.id}
            className="py-3 flex justify-between hover:bg-bg-hovered rounded-sm"
          >
            {/* TODO: OBJECT DATA */}
            <NotifItem
              id={item.id}
              type={item.type}
              date={formatDate.formatDateFromTimestamp(item.timestamp)}
              content={item.message}
              status={item.status}
              amount={item.data?.amount}
            />
          </Flex>
        ))
      ) : (
        <div className="text-center py-3">No notifications available.</div>
      )}
    </div>
  );
};
export const NotificationDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  const dataNotification: NotificationData | undefined =
    queryClient.getQueryData(['getNotification']);
  const [isRead, setIsRead] = useState<boolean>(false);

  useEffect(() => {
    if (dataNotification?.items) {
      const allRead = dataNotification.items.every(
        (item) => item.status !== '0',
      );
      setIsRead(allRead);
    }
  }, [JSON.stringify(dataNotification)]);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-11 p-0">
          <Svg src="/icons/notif.svg" />
          {!isRead && (
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
          <Link href="/">
            <Typography.Text
              size={13}
              className="text-text-subtle font-semibold"
            >
              Read All
            </Typography.Text>
          </Link>
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
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button className="px-2 py-3 lg:py-2 cursor-pointer rounded-md w-full hover:bg-bg-hovered">
          <div className="flex gap-x-2.5 items-center w-full">
            <span className="size-6 flex items-center justify-center">
              <Svg src="/icons/notif.svg" />
            </span>
            <Typography.Text size={15} weight="medium" className="text-text">
              Notification
            </Typography.Text>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full px-5 py-3">
        <DrawerHeader className="text-left p-0">
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
        </DrawerHeader>
        <ScrollArea>
          <NotiData />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
