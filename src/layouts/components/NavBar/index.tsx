'use client';

import { SearchIcon } from 'lucide-react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import type { IconName } from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';
import { ModalSearchHeader } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import HomeLogo from '../HomeLogo';
import { ModeToggle } from '../ModeToggle';

const navList = [
  {
    name: 'Markets',
    icon: 'Markets',
  },
  {
    name: 'Election',
    icon: 'Election',
  },
  {
    name: 'Activity',
    icon: 'Activity',
  },
  {
    name: 'Ranks',
    icon: 'Ranks',
  },
];

const bottomNavList = [
  'All',
  'Politics',
  'Midle East',
  'Sports',
  'Crypto',
  'Pop Culture',
  'Business',
  'Science',
];

export default function NavBar(): React.ReactElement {
  return (
    <header className="sticky top-0 left-0 w-full bg-elevation-a50/75 dark:bg-elevation-a900/75 backdrop-blur-md z-50">
      <Container>
        <Flex className="justify-between w-full py-2">
          <Flex className="gap-x-4">
            <HomeLogo />

            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Flex className="border border-elevation-a400 text-elevation-a500 p-2 rounded-lg text-xs w-[300px] group cursor-pointer transition-all duration-150 ease-linear hover:bg-elevation-a200 hover:text-elevation-a600">
                    <SearchIcon width={16} height={16} />
                    <p className=" ">Search all of Sweep Stack</p>
                  </Flex>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <ModalSearchHeader />
              </DialogContent>
            </Dialog>
          </Flex>
          <Flex>
            <Flex className="gap-0">
              {navList.map((item) => (
                <IconButton
                  key={item.name}
                  icon={item.icon as IconName}
                  text={item.name}
                />
              ))}
            </Flex>
            <Flex>
              <Button variant="secondary">Log In</Button>
              <Button>Sign up</Button>
            </Flex>
            <ModeToggle />
          </Flex>
        </Flex>

        <Flex>
          {bottomNavList.map((item) => (
            <Button
              variant="ghost"
              key={item}
              className="first:pl-0 text-elevation-a600 text-xs"
            >
              {item}
            </Button>
          ))}
        </Flex>
      </Container>
    </header>
  );
}
