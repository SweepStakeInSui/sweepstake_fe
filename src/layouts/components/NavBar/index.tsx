'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { ModalSearchHeader } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import HomeLogo from '../HomeLogo';

const navList = [
  {
    name: 'Markets',
    icon: 'Markets',
    href: '/markets',
  },
  {
    name: 'Election',
    icon: 'Election',
    href: '/election',
  },
  {
    name: 'Activity',
    icon: 'Activity',
    href: '/activity',
  },
  {
    name: 'Ranks',
    icon: 'Ranks',
    href: '/ranks',
  },
];

export default function NavBar(): React.ReactElement {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 w-full bg-elevation-a50/75 dark:bg-elevation-a900/75 backdrop-blur-md z-50">
      <Container>
        <Flex className="justify-between w-full py-4">
          <Flex className="gap-x-4">
            <HomeLogo variant="squared" />

            <Flex className="gap-x-0">
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

          <Flex>
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <Flex className="border border-dyb-15 text-elevation-a500 p-2 rounded-md text-xs w-[300px] group cursor-pointer transition-all duration-150 ease-linear hover:bg-elevation-a200 hover:text-elevation-a600">
                    <SearchIcon
                      width={16}
                      height={16}
                      className="stroke-dyb-50"
                    />
                    <Typography.Text size={12} className="text-dyb-50">
                      Search
                    </Typography.Text>
                  </Flex>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <ModalSearchHeader />
              </DialogContent>
            </Dialog>
            <Flex>
              <Button variant="ghost">Log In</Button>
              <Button>Sign up</Button>
            </Flex>
            {/* <ModeToggle /> */}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
