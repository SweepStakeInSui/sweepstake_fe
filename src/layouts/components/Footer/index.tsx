'use client';

import Link from 'next/link';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { socialList } from '@/constants/socialList';

import HomeLogo from '../HomeLogo';

export default function Footer() {
  return (
    <footer className="py-10 border-solid border-t-[1px] border-borderMain">
      <Container>
        <Flex className="h-full justify-between items-start">
          <Stack>
            <HomeLogo />
            <Typography.Text size={13} className="text-text-sublest">
              Copyright © 2024 SweepStack. All rights reserved.
            </Typography.Text>
          </Stack>
          <Flex className="gap-20 items-start">
            <Stack>
              <Typography.Text size={12} className="text-text-sublest px-2">
                COMPANY
              </Typography.Text>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  Contract
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  Join our Stack
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  Privacy Policy
                </Typography.Text>
              </Button>
            </Stack>

            <Stack>
              <Typography.Text size={12} className="text-text-sublest px-2">
                PRODUCTS
              </Typography.Text>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  Viction Wallet (Extension)
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  Viction Wallet (iOS)
                </Typography.Text>
              </Button>
              <Button variant="ghost" className="px-2 py-1">
                <Typography.Text className="text-text" size={14}>
                  VicMaster
                </Typography.Text>
              </Button>
            </Stack>

            <Stack>
              <Typography.Text size={12} className="text-text-sublest px-2">
                FOLLOW US
              </Typography.Text>
              <Flex className="gap-0">
                {socialList.map((social) => (
                  <Link href={social.href} target="_blank" key={social.name}>
                    <IconButton isRounded>
                      <Svg src={social.icon} aria-label={social.name} />
                    </IconButton>
                  </Link>
                ))}
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </footer>
  );
}
