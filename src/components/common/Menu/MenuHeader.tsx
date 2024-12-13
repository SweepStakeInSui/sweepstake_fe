'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import React, { useRef, useState } from 'react';
import { VisuallyHidden } from 'react-aria';
import { useSelector } from 'react-redux';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useWallet } from '@/components/connectWallet/useWallet';
import { NotificationDrawer } from '@/components/Login/Notification';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip } from '@/components/ui/tooltip';
import { menuListLogin, navList } from '@/constants/navList';
import useBalance from '@/hooks/useBalance';
import { selectProfile } from '@/store/profileSlice';
import { handleBignumber } from '@/utils/handleBignumber';

import Flex from '../Flex';
import { FormatNumber } from '../FormatNumber';
import Stack from '../Stack';
import Svg from '../Svg';
import { ThemeToggle } from '../ThemeToggle';
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
interface ActionProps {
  handleNextSlide: () => void;
}
export const MenuItem = ({ item, className }: MenuItemProps) => {
  const router = useRouter();
  const handleClick = () => {
    if (item.slug === 'theme') {
      return;
    }
    if (item.onClick) {
      item.onClick();
    } else {
      router.push(`/${item.slug}`);
    }
  };
  return (
    <button
      className={`px-2 py-3 lg:py-2 cursor-pointer flex rounded-md w-full ${className}`}
      onClick={handleClick}
    >
      <div className="flex gap-x-2.5 items-center w-full">
        <span className="size-6 flex items-center justify-center">
          <Svg src={item.icon} />
        </span>
        <Typography.Text size={15} weight="medium" className="text-text">
          {item.title}
        </Typography.Text>
      </div>
      {item.slug === 'theme' && <ThemeToggle option="switch" />}
    </button>
  );
};
const Wallet: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const balance = useBalance();

  return (
    <div className="p-4 text-text bg-b-10 dark:bg-bg-balance rounded-sm relative overflow-hidden">
      <Flex className="z-10 relative mb-0.5 justify-between">
        <Flex>
          <Typography.Text
            size={13}
            weight="medium"
            className="text-text-subtle"
          >
            Wallet Balance
          </Typography.Text>
          <Tooltip content="Refresh balance">
            <div className="cursor-pointer">
              <Svg src="/icons/refresh.svg" />
            </div>
          </Tooltip>
        </Flex>
        <button onClick={handleNextSlide}>
          <Svg
            src="/icons/swap_vert.svg"
            width={24}
            height={24}
            className="text-[#666666]"
          />
        </button>
      </Flex>
      <Typography.Heading
        weight="semibold"
        size={24}
        className="text-text flex"
      >
        $<FormatNumber number={balance || 0} />
      </Typography.Heading>
      <Flex className="mt-5 relative z-10">
        <Link href="/deposit" className="flex-1 ">
          <Button variant="primary" size="medium" className="w-full">
            Deposit
          </Button>
        </Link>
        <Link href="/deposit" className="flex-1 ">
          <Button
            variant="ghost"
            size="medium"
            className=" w-full bg-wht-a80/80 dark:bg-wht-a20/20"
          >
            <Typography.Text size={14} weight="semibold" className="text-text">
              Transfer
            </Typography.Text>
          </Button>
        </Link>
        <Link href="/profile?tab=activity">
          <Button
            variant="ghost"
            size="medium"
            className="bg-wht-a80/80 dark:bg-wht-a20/20"
          >
            <Svg src="/icons/history.svg" />
          </Button>
        </Link>
      </Flex>
      <div className="absolute bottom-1 -left-2 mix-blend-color-burn blur-sm z-0">
        <Image
          src="/icons/FlareBlue.svg"
          alt="flare"
          width={147}
          height={108}
        />
      </div>
    </div>
  );
};
const Portfolio: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const { profile } = useSelector(selectProfile);

  return (
    <div className="p-4 text-text bg-r-10 dark:bg-r-95 rounded-sm relative overflow-hidden">
      <Flex className="z-10 relative mb-0.5 justify-between">
        <Flex>
          <Typography.Text
            size={13}
            weight="medium"
            className="text-text-subtle "
          >
            Portfolio
          </Typography.Text>
          <Tooltip content="Refresh balance">
            <div className="cursor-pointer">
              <Svg src="/icons/refresh.svg" />
            </div>
          </Tooltip>
        </Flex>
        <button onClick={handleNextSlide}>
          <Svg
            src="/icons/swap_vert.svg"
            width={24}
            height={24}
            className="text-[#666666]"
          />
        </button>
      </Flex>
      <Typography.Heading
        weight="semibold"
        size={24}
        className="text-text flex"
      >
        $
        <FormatNumber
          number={handleBignumber.divideDecimal(profile?.balance) || 0}
        />
      </Typography.Heading>
      <Flex className="mt-5 relative z-10">
        <Link href="/deposit" className="flex-1">
          <Button
            variant="ghost"
            size="medium"
            className="w-full bg-wht-a80/80 dark:bg-wht-a20/20"
          >
            <Typography.Text size={14} weight="semibold" className="text-text">
              Withdraw
            </Typography.Text>
          </Button>
        </Link>
        <Link href="/profile?tab=activity">
          <Button
            variant="ghost"
            size="medium"
            className="bg-opacity-85 bg-wht-a80/80 dark:bg-wht-a20/20"
          >
            <Svg src="/icons/history.svg" />
          </Button>
        </Link>
      </Flex>
      <div className="absolute bottom-1 -left-2 mix-blend-color-burn blur-sm z-0">
        <Image src="/icons/Flare.svg" alt="flare" width={147} height={108} />
      </div>
    </div>
  );
};
export const ActionUser: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div>
      <Swiper
        effect="cards"
        modules={[EffectCards]}
        direction="vertical"
        slidesPerView={1}
        ref={swiperRef}
        loop
        className="mySwiper swiper-header mt-6"
      >
        <SwiperSlide className="swiper-action">
          <Wallet handleNextSlide={handleNextSlide} />
        </SwiperSlide>
        <SwiperSlide className="swiper-action">
          <Portfolio handleNextSlide={handleNextSlide} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const MenuHeader = () => {
  const { isLoggedIn } = useSelector(selectProfile);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { onDisconnect } = useWallet();
  const router = useRouter();
  return (
    <>
      <div className="hidden-mobile">
        <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-11 p-0"
              aria-label="dropdown_menu"
            >
              <Svg src="/icons/menu.svg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[370px] px-2.5 py-3 bg-bg-surface "
            align="end"
          >
            <ActionUser />
            <DropdownMenuGroup className="mt-1">
              {menuListLogin(onDisconnect).map((item) => (
                <DropdownMenuItem
                  key={item.slug}
                  onSelect={(event) => {
                    if (item.close === true) {
                      event.preventDefault();
                    }
                  }}
                >
                  <MenuItem item={item} />
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden-PC">
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="size-11 p-0"
              aria-label="drawer_menu"
            >
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
            <ScrollArea className="overflow-y-auto w-full">
              <Stack className="gap-y-3 mt-3">
                <Flex>
                  {navList.map((nav) => (
                    <DrawerClose key={nav.href} className="basis-1/3">
                      <button
                        onClick={() => router.push(nav.href)}
                        className="w-full"
                      >
                        <Stack className="basis-1/3 items-center bg-bg-sublest rounded-sm py-4">
                          <Svg src={nav.icon} />
                          <Typography.Text
                            size={13}
                            className="text-text-subtle"
                            weight="semibold"
                          >
                            {nav.name}
                          </Typography.Text>
                        </Stack>
                      </button>
                    </DrawerClose>
                  ))}
                </Flex>

                {isLoggedIn && (
                  <>
                    <ActionUser />

                    <div>
                      <NotificationDrawer />

                      <DrawerClose className="w-full">
                        {menuListLogin(onDisconnect).map((item) => (
                          <MenuItem key={item.slug} item={item} />
                        ))}
                      </DrawerClose>
                    </div>
                  </>
                )}
              </Stack>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default MenuHeader;
