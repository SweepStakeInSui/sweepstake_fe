import Link from 'next/link';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { menuListLogin } from '@/constants/navList';
import { mockNotifications } from '@/mocks/mockNotifications';

import Flex from '../common/Flex';
import { ActionUser, MenuItem } from '../common/Menu/MenuHeader';
import Stack from '../common/Stack';
import Svg from '../common/Svg';
import Typography from '../common/Typography';
import { useWallet } from '../connectWallet/useWallet';
import { SearchHeaderMobile } from '../Search';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface INotifItemProps {
  user?: {
    name?: string;
    avatar: string;
  };
  type: 'comment' | 'like' | 'betNo' | 'betYes';
  timestamp: string;
  isRead?: boolean;
  content?: string;
}

const NotifItem = ({
  user,
  type,
  timestamp,
  isRead,
  content,
}: INotifItemProps) => {
  return (
    <Link href="/" className="w-full">
      <Flex className="relative gap-x-2.5 items-center">
        {!isRead && (
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
                  return (
                    <div className="p-1 bg-b-50 rounded-full">
                      <Svg
                        src="/icons/online_prediction.svg"
                        className="text-dyb-0 size-4"
                      />
                    </div>
                  );
                case 'betYes':
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
                return null;
            }
          })()}
          <Typography.Text
            size={13}
            weight="medium"
            className="text-text-sublest"
          >
            {new Date(timestamp).toLocaleDateString()}
          </Typography.Text>
        </Stack>
      </Flex>
    </Link>
  );
};

const LoggedIn = () => {
  const { onDisconnect } = useWallet();
  return (
    <Flex>
      <Link href="/create-bet">
        <Button className="gap-x-2" size="lg">
          <Svg src="/icons/add.svg" className="hidden-mobile" />
          Create bet
        </Button>
      </Link>
      <div className="hidden-PC">
        <SearchHeaderMobile />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-11 p-0">
            <Svg src="/icons/notif.svg" />
            <div className="absolute translate-x-2 -translate-y-2 bg-[#EB201E] rounded-full size-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[370px] px-2.5 py-3 bg-bg-surface"
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
              {mockNotifications.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  className="py-3 flex justify-between"
                >
                  <NotifItem
                    user={item.user}
                    type={item.type as 'comment' | 'like' | 'betYes' | 'betNo'}
                    timestamp={item.timestamp}
                    content={item.content}
                    isRead={item.isRead}
                  />
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-11 p-0">
            <Svg src="/icons/menu.svg" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[370px] px-2.5 py-3 bg-bg-surface "
          align="end"
        >
          <ActionUser />
          <DropdownMenuGroup className="mt-1">
            <DropdownMenuItem className="py-3 flex justify-between cursor-pointer">
              <Link href="/" className="flex gap-x-2.5 items-center ">
                <span className="size-6 flex items-center justify-center">
                  <Svg src="/icons/my_bet.svg" />
                </span>
                <Typography.Text
                  size={15}
                  weight="medium"
                  className="text-text"
                >
                  My bet
                </Typography.Text>
              </Link>
            </DropdownMenuItem>

            {menuListLogin(onDisconnect).map((item) => (
              <DropdownMenuItem key={item.slug}>
                <MenuItem item={item} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
};

export default LoggedIn;
