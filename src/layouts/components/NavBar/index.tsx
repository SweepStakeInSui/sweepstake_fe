'use client';

import { useRouter } from 'next/navigation';

import { Login } from '@/components/Authentication';
import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { ModalSearchHeader } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { navList } from '@/constants/navList';

import HomeLogo from '../HomeLogo';

export default function NavBar(): React.ReactElement {
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 w-full bg-dyb-5/85 dark:bg-dyb-95/85 backdrop-blur-sm z-50">
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
                  <Flex className="justify-between border border-borderSubtle text-elevation-a500 px-3 h-11 rounded-md text-xs w-[380px] group cursor-pointer transition-all duration-150 ease-linear hover:bg-elevation-a200 hover:text-elevation-a600">
                    <Flex>
                      <Svg
                        src="/icons/search.svg"
                        className="text-icon-sublest"
                      />
                      <Typography.Text size={12} className="text-text-sublest">
                        Search market or people
                      </Typography.Text>
                    </Flex>
                    <div className="text-text-sublest">/</div>
                  </Flex>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-0">
                <ModalSearchHeader />
              </DialogContent>
            </Dialog>
            <Login />
            {/* <ModeToggle /> */}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}
