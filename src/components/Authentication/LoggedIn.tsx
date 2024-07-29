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
import { Icons } from '../common/Icon';
import Typography from '../common/Typography';
import { Button } from '../ui/button';

const LoggedIn = () => {
  const menuListLogin = [
    {
      slug: 'account',
      title: 'Account',
      icon: <Icons.Mood />,
    },
    {
      slug: 'leaderboard',
      title: 'Leaderboard',
      icon: <Icons.LeaderBoard />,
    },
    {
      slug: 'activity',
      title: 'My Activity',
      icon: <Icons.Activity />,
    },
    {
      slug: 'account',
      title: 'Account',
      icon: <Icons.Setting />,
    },
    {
      slug: 'account',
      title: 'Log out',
      icon: <Icons.Logout />,
    },
  ];
  const inforUser = [
    {
      infor: 'Balance',
      amount: 0,
    },
    {
      infor: 'Referrals',
      amount: 20,
    },
  ];
  return (
    <Flex>
      <Button className="gap-x-2">
        <Icons.Add width={24} height={24} />
        Fund
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-11 p-0">
            <Icons.Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[370px] px-2.5 py-3 bg-bg-surface">
          <Flex className="">
            {inforUser.map((user) => (
              <div
                key={user.infor}
                className="p-4 basis-1/2 text-text bg-b-10 rounded-sm relative overflow-hidden"
                // style={{
                //   background: `url('/images/menu_login.png') lightgray 50% / cover no-repeat`,
                // }}
              >
                <Typography.Text
                  size={15}
                  weight="medium"
                  className="text-text mb-1"
                >
                  Balance
                </Typography.Text>
                <Typography.Heading
                  size={24}
                  weight="semibold"
                  className="text-text"
                >
                  ${user.amount}
                </Typography.Heading>
                <div className="absolute -bottom-4 -left-2 opacity-45 mix-blend-color-burn">
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
