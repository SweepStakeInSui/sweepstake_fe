/* eslint-disable */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import ConnectButton from '@/components/connectWallet/ConnectButton';
import LoggedIn from '@/components/Login/LoggedIn';
import { Button } from '@/components/ui/button';
import { navList } from '@/constants/navList';
import { UserService } from '@/services/userService';
import { selectProfile } from '@/store/profileSlice';
import type { ProfileTypes } from '@/types/profile';

import { SearchHeader, SearchHeaderMobile } from '@/components/Search';
import HomeLogo from '../HomeLogo';
import { MenuHeader } from '@/components/common/Menu';

export default function NavBar(): React.ReactElement {
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectProfile);
  const { data } = useQuery<ProfileTypes>({
    queryKey: ['user-infor'],
    queryFn: async () => {
      const res = await UserService.getUserInfor();
      return res;
    },
    enabled: isLoggedIn,
  });
  return (
    <header className="sticky top-0 left-0 w-full bg-dyb-5/85 dark:bg-dyb-95/85 backdrop-blur-sm z-50">
      <Container size="sm">
        <Flex className="justify-between w-full py-4">
          <Flex className="gap-x-4">
            <Link href="/">
              <HomeLogo variant="squared" />
            </Link>

            <Flex className="gap-x-0 hidden-lg">
              {navList.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  onClick={() => router.push(item.href)}
                  className="px-3"
                >
                  {item.name}
                </Button>
              ))}
            </Flex>
          </Flex>

          <Flex className="grow justify-end gap-x-2 lg:gap-x-5">
            <div className="hidden-lg flex-grow ">
              <SearchHeader />
            </div>
            {isLoggedIn ? <LoggedIn /> : <ConnectButton />}
            {!isLoggedIn && (
              <div className="hidden-sm">
                <SearchHeaderMobile />
                <MenuHeader />
              </div>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
