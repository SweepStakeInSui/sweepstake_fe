import Image from 'next/image';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Flex from '../common/Flex';
import Svg from '../common/Svg';
import Typography from '../common/Typography';
import { Button } from '../ui/button';

const LoggedIn = () => {
  const menuListLogin = [
    {
      slug: 'account',
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
      <Button className="gap-x-2">
        <Svg src="/icons/add.svg" />
        Fund
      </Button>

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
                  className="flex gap-x-2.5 items-center"
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
