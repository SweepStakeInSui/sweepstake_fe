/* eslint-disable */
'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import ConnectButton from '@/components/connectWallet/ConnectButton';
import LoggedIn from '@/components/Login/LoggedIn';
import { navList } from '@/constants/navList';
import { UserService } from '@/services/userService';
import { selectProfile, userData } from '@/store/profileSlice';
import type { ProfileTypes } from '@/types/profile';

import { MenuHeader } from '@/components/common/Menu';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { SearchHeader, SearchHeaderMobile } from '@/components/Search';
import { useEffect } from 'react';
import HomeLogo from '../HomeLogo';

export default function NavBar(): React.ReactElement {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(selectProfile);

  const { data } = useQuery<ProfileTypes>({
    queryKey: ['user-infor'],
    queryFn: async () => {
      const res = await UserService.getUserInfor();
      return res;
    },
    refetchInterval: 3000,
    enabled: isLoggedIn,
  });
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(userData({ profile: data }));
    }
  }, [isLoggedIn, data]);

  return (
    <header className="sticky top-0 left-0 w-full backdrop-blur-md bg-bg-surface border-b border-borderSubtle border-solid z-50">
      <Container size="sm">
        <Flex className="justify-between w-full py-4">
          <Flex className="gap-x-4">
            <HomeLogo variant="squared" />

            <Flex className="gap-x-0 hidden-mobile">
              {navList.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className="px-3 text-text-subtle text-[13px] font-semibold"
                >
                  {item.name}
                </Link>
              ))}
            </Flex>
          </Flex>

          <Flex className="grow justify-end gap-x-2 lg:gap-x-5">
            <div className="hidden-mobile flex-grow ">
              <SearchHeader />
            </div>
            {isLoggedIn ? (
              <LoggedIn />
            ) : (
              <Flex>
                <ConnectButton />
                <ThemeToggle option="toggle" />
              </Flex>
            )}
            {!isLoggedIn && (
              <div className="hidden-PC">
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
