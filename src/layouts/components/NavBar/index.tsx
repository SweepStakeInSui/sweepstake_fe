'use client';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import type { IconName } from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';
import { Button } from '@/components/ui/button';

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
    <header className="sticky top-0 left-0 w-full bg-elevation-a50/75 dark:bg-elevation-a900/75 backdrop-blur-md">
      <Container>
        <Flex className="justify-between w-full py-1">
          <HomeLogo />

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
            <ModeToggle />
          </Flex>
        </Flex>

        <Flex>
          {bottomNavList.map((item) => (
            <Button key={item} className="first:pl-0">
              {item}
            </Button>
          ))}
        </Flex>
      </Container>
    </header>
  );
}
