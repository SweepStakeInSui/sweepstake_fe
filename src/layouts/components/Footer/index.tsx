'use client';

import Link from 'next/link';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { socialList } from '@/constants/socialList';

import HomeLogo from '../HomeLogo';

export default function Footer() {
  return (
    <footer className="py-5 lg:py-10 border-solid border-t-[1px] border-borderSubtle bg-bg-primary">
      <Container size="sm">
        <Flex className="h-full justify-between items-start flex-wrap gap-8">
          <Stack>
            <HomeLogo />
            <Typography.Text size={13} className="text-text-sublest">
              Copyright © 2024 SweepStakes. All rights reserved.
            </Typography.Text>
          </Stack>
          <Stack>
            <Typography.Text
              size={12}
              className="text-text-sublest px-2"
              weight="semibold"
            >
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
      </Container>
    </footer>
  );
}
