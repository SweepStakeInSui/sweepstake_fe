// 'use client';

import Stack from '@/components/common/Stack';
import Flex from '@/components/common/Flex';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/common/Icon';
import Container from '@/components/common/Container';

export default function Footer() {
  return (
    <footer className='bg-elevation-a100 p-4'>
      <Container>
        <Flex className="h-full justify-between items-stretch">
          <Stack className="justify-between">
            <Stack>
              <Icons.Logo />
              <h6 className="text-sm">The worlds largest prediction market.</h6>
              <Flex>
                <Button variant="secondary_light">POWERED BY SUI</Button>
                <Button variant="secondary_light">
                  <span className="bg-secondary-green-a400 w-2 h-2 mr-4 rounded-full" />
                  ALL SYSTEMS OPERATIONAL
                </Button>
              </Flex>
            </Stack>
            <p>SWEEPSTAKE Inc. © 2024</p>
          </Stack>

          <Flex className="items-start gap-12">
            <Stack>
              <Stack className="items-start gap-0">
                <p>Market</p>
                <button className="text-sm text-elevation-a400">
                  Politics
                </button>
                <button className="text-sm text-elevation-a400">Crypto</button>
                <button className="text-sm text-elevation-a400">Sports</button>
                <button className="text-sm text-elevation-a400">
                  Middle East
                </button>
                <button className="text-sm text-elevation-a400">
                  Pop Culture
                </button>
                <button className="text-sm text-elevation-a400">
                  Business
                </button>
                <button className="text-sm text-elevation-a400">Science</button>
                <button className="text-sm text-elevation-a400">All</button>
              </Stack>
              <button className="text-sm text-elevation-a400">
                Privacy Policy
              </button>
            </Stack>
            <Stack className="h-full justify-between gap-[unset]">
              <Stack className="items-start gap-0">
                <p>Resources</p>
                <button className="text-sm text-elevation-a400">Contact</button>
                <button className="text-sm text-elevation-a400">Learn</button>
                <button className="text-sm text-elevation-a400">
                  Developers
                </button>
                <button className="text-sm text-elevation-a400">Blog</button>
                <button className="text-sm text-elevation-a400">Careers</button>
              </Stack>
              <button className="text-sm text-elevation-a400">
                Terms of Service
              </button>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
}
