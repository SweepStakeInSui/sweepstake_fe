'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { VisuallyHidden } from 'react-aria';

import { useWallet } from '@/components/connectWallet/useWallet';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { menuListLogin, navList } from '@/constants/navList';

import Flex from '../Flex';
import Stack from '../Stack';
import Svg from '../Svg';
import Typography from '../Typography';

interface MenuItemProps {
  item: {
    slug: string;
    onClick?: () => void;
    icon: string;
    title: string;
  };
  className?: string;
}

export const MenuItem = ({ item, className }: MenuItemProps) => {
  const router = useRouter();

  return (
    <button
      className={`py-3 cursor-pointer hover:bg-bg-hovered ${className}`}
      onClick={item.onClick ? item.onClick : () => router.push(`/${item.slug}`)}
    >
      <div className="flex gap-x-2.5 items-center w-full">
        <span className="size-6 flex items-center justify-center">
          <Svg src={item.icon} />
        </span>
        <Typography.Text size={15} weight="medium" className="text-text">
          {item.title}
        </Typography.Text>
      </div>
    </button>
  );
};
const ActionUser: React.FC = () => {
  return (
    <div className="p-4 text-text bg-r-10 rounded-sm relative overflow-hidden">
      <Flex className="z-10 relative mb-0.5">
        <Typography.Text size={13} weight="medium" className="text-text-subtle">
          Balance
        </Typography.Text>
        <Svg src="/icons/refresh.svg" className="cursor-pointer" />
      </Flex>
      <Typography.Heading weight="semibold" size={24} className="text-text">
        $0
      </Typography.Heading>
      <Flex className="mt-5 relative z-10">
        <Button variant="ghost" size="medium" className="flex-1 bg-white">
          <Link href="/deposit">
            <Typography.Text size={14} weight="semibold" className="text-text">
              Deposit
            </Typography.Text>
          </Link>
        </Button>
        <Button variant="ghost" size="medium" className="flex-1 bg-white">
          <Link href="/withdraw">
            <Typography.Text size={14} weight="semibold" className="text-text">
              Withdraw
            </Typography.Text>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="bg-white">
          <Svg src="/icons/history.svg" />
        </Button>
      </Flex>
      <div className="absolute bottom-1 -left-2 mix-blend-color-burn blur-sm z-0">
        <Image src="/icons/Flare.svg" alt="flare" width={147} height={108} />
      </div>
    </div>
  );
};

const MenuHeader = () => {
  const { onDisconnect } = useWallet();
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="ghost" className="size-11 p-0">
            <Svg src="/icons/menu.svg" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full w-full px-5 py-3">
          <DrawerHeader className="text-left p-0">
            <VisuallyHidden>
              <DrawerTitle>Menu</DrawerTitle>
            </VisuallyHidden>
            <DrawerClose className="flex justify-end">
              <Svg src="/icons/close.svg" />
            </DrawerClose>
          </DrawerHeader>
          <Stack className="gap-y-3 mt-3">
            <Flex>
              {navList.map((nav) => (
                <Stack
                  key={nav.href}
                  className="basis-1/3 items-center bg-bg-sublest rounded-sm py-4"
                >
                  <Svg src={nav.icon} />
                  <Typography.Text
                    size={13}
                    className="text-text-subtle"
                    weight="semibold"
                  >
                    {nav.name}
                  </Typography.Text>
                </Stack>
              ))}
            </Flex>
            <ActionUser />
            {menuListLogin(onDisconnect).map((item) => (
              <MenuItem key={item.slug} item={item} />
            ))}
          </Stack>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MenuHeader;