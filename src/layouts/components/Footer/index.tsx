'use client';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

import HomeLogo from '../HomeLogo';

export default function Footer() {
  return (
    <footer className="py-10 border-solid border-t-[1px] border-dyb-20">
      <Container>
        <Flex className="h-full justify-between items-start">
          <Stack>
            <HomeLogo />
            <Typography.Text size={13} className="text-dyb-50">
              Copyright © 2024 SweepStack. All rights reserved.
            </Typography.Text>
          </Stack>
          <Flex className="gap-20 items-start">
            <Stack>
              <Typography.Text size={12} className="text-dyb-50 px-2">
                COMPANY
              </Typography.Text>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  Contract
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  Join our Stack
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  Privacy Policy
                </Typography.Text>
              </Button>
            </Stack>

            <Stack>
              <Typography.Text size={12} className="text-dyb-50 px-2">
                PRODUCTS
              </Typography.Text>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  Viction Wallet (Extension)
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  Viction Wallet (iOS)
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text
                  className="text-dyb-95 dark:text-wht-a90"
                  size={14}
                >
                  VicMaster
                </Typography.Text>
              </Button>
            </Stack>

            <Stack>
              <Typography.Text size={12} className="text-dyb-50 px-2">
                FOLLOW US
              </Typography.Text>
              <Flex className="gap-0">
                <IconButton icon="Discord" />
                <IconButton icon="Telegram" />
                <IconButton icon="X" />
                <IconButton icon="Github" />
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
}
