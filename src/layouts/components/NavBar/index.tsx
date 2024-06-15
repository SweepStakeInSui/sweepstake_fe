'use client';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import type { IconName } from '@/components/common/Icon';
import { Icons } from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';

import { ModeToggle } from '../ModeToggle';

const navList = [
  {
    name: 'Market',
    icon: 'Market',
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

export default function NavBar(): React.ReactElement {
  return (
    <nav className="px-10">
      <Container>
        <Flex className="justify-between w-full">
          <Icons.Logo />
          <div className="flex">
            {navList.map((item) => (
              <IconButton
                key={item.name}
                icon={item.icon as IconName}
                text={item.name}
              />
            ))}
          </div>

          <ModeToggle />
        </Flex>
      </Container>
    </nav>
  );
}
