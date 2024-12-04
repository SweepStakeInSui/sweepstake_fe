'use client';

import { useRouter } from 'next-nprogress-bar';
import React from 'react';

import Flex from '../Flex';
import Svg from '../Svg';
import Typography from '../Typography';

const Back = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <Flex className="cursor-pointer">
        <Svg src="/icons/arrow_back_ios.svg" />
        <Typography.Text
          size={13}
          className="text-text-subtle"
          weight="semibold"
        >
          Back
        </Typography.Text>
      </Flex>
    </button>
  );
};

export default Back;
