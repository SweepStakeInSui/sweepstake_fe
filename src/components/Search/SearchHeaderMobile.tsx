'use client';

import { useState } from 'react';
import { VisuallyHidden } from 'react-aria';

import Svg from '../common/Svg';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import SearchHeader from './SearchHeader';

const SearchHeaderMobile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerTrigger asChild>
        <Svg
          src="/icons/search.svg"
          width={24}
          height={24}
          className="self-center cursor-pointer"
        />
      </DrawerTrigger>
      <DrawerContent className="h-full w-full">
        <DrawerHeader className="text-left">
          <VisuallyHidden>
            <DrawerTitle>Search</DrawerTitle>
          </VisuallyHidden>
          <SearchHeader handleCloseDrawer={handleCloseDrawer} />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchHeaderMobile;
