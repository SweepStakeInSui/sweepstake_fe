'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Stack from '../components/common/Stack';
import Typography from '../components/common/Typography';
import { Button } from '../components/ui/button';

const Error = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Stack className="items-center gap-y-6">
        <div className="relative w-[354px] h-[188px]">
          <Image src="/images/404.png" alt="404" fill />
        </div>
        <Typography.Heading size={32} className="text-center">
          Oops! Something went wrong
        </Typography.Heading>
        <Link href="/">
          <Button variant="terriary">Back to Home</Button>
        </Link>
      </Stack>
    </div>
  );
};

export default Error;
