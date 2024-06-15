'use client';

import { useTheme } from 'next-themes';

import type { IconName } from '@/components/common/Icon';
import { Icons } from '@/components/common/Icon';
import IconButton from '@/components/common/IconButton';
import { Button } from '@/components/ui/button';

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
  const { setTheme } = useTheme();

  return (
    <nav className="px-10">
      <div className="flex justify-between w-full text-">
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

        <Button onClick={() => setTheme('light')}>Toggle theme</Button>
      </div>
    </nav>
  );
}
