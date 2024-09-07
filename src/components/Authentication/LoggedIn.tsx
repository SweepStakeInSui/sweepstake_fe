import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAvatar } from '@/mocks/mockAvatar';
import { mockNotifications } from '@/mocks/mockNotifications';

import Flex from '../common/Flex';
import Stack from '../common/Stack';
import Svg from '../common/Svg';
import Typography from '../common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
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
          <Avatar>
            <AvatarImage src={mockAvatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
  const router = useRouter();
  const pathname = usePathname();

  const menuListLogin = [
    {
      slug: 'profile',
      title: 'Account',
      icon: <Svg src="/icons/mood.svg" />,
    },
    {
      slug: 'leaderboard',
      title: 'Leaderboard',
      icon: <Svg src="/icons/leaderboard.svg" />,
    },
    {
      slug: 'activity',
      title: 'My Activity',
      icon: <Svg src="/icons/timeline.svg" />,
    },
    {
      slug: 'settings',
      title: 'Settings',
      icon: <Svg src="/icons/settings.svg" />,
    },
    {
      slug: 'logout',
      title: 'Log out',
      icon: <Svg src="/icons/logout.svg" />,
    },
  ];
  const inforUser = [
    {
      infor: 'Balance',
      amount: 0,
      add: true,
    },
    {
      infor: 'Referrals',
      amount: 20,
    },
  ];
  return (
    <Flex>
      {pathname !== '/create-bet' && (
        <Button className="gap-x-2" onClick={() => router.push('/create-bet')}>
          <Svg src="/icons/add.svg" />
          Create Bet
        </Button>
      )}

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
          className="w-[370px] px-2.5 py-3 bg-bg-surface"
          align="end"
        >
          <Flex className="">
            {inforUser.map((user) => (
              <div
                key={user.infor}
                className="p-4 basis-1/2 text-text bg-r-10 rounded-sm relative overflow-hidden"
              >
                <Flex className="justify-between z-10 relative">
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text mb-1"
                  >
                    {user.infor}
                  </Typography.Text>
                  {user.add && (
                    <Button
                      variant="secondary"
                      className="py-0.5 px-1 rounded-sm"
                    >
                      <Flex className="gap-0">
                        <Svg src="/icons/add.svg" className="size-4" />
                        <Typography.Text
                          size={12}
                          className="text-text-inverse"
                        >
                          Add
                        </Typography.Text>
                      </Flex>
                    </Button>
                  )}
                </Flex>
                <Typography.Heading
                  size={24}
                  weight="semibold"
                  className="text-text"
                >
                  ${user.amount}
                </Typography.Heading>
                <div className="absolute -bottom-4 -left-2 mix-blend-color-burn blur-sm z-0">
                  <Image
                    src="/icons/Flare.svg"
                    alt="flare"
                    width={147}
                    height={108}
                  />
                </div>
              </div>
            ))}
          </Flex>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="py-3 flex justify-between">
              <Link href="/" className="flex gap-x-2.5 items-center">
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
              <Link href="/">
                <Typography.Text
                  size={13}
                  weight="semibold"
                  className="text-text-support-red"
                >
                  Create Bet
                </Typography.Text>
              </Link>
            </DropdownMenuItem>

            {menuListLogin.map((item) => (
              <DropdownMenuItem className="py-3" key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  className="flex gap-x-2.5 items-center w-full"
                >
                  <span className="size-6 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <Typography.Text
                    size={15}
                    weight="medium"
                    className="text-text"
                  >
                    {item.title}
                  </Typography.Text>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  );
};

export default LoggedIn;
