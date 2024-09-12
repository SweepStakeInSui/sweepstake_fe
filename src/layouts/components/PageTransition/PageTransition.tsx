import './index.scss';

import Stack from '@components/common/Stack';
import Image from 'next/image';
import React from 'react';

const PageTransition = () => {
  return (
    <Stack className="loading z-50 fixed top-0 left-0 w-screen h-screen bg-bg-container flex items-center justify-center">
      <div className="relative w-full h-full">
        <div className="relative w-fit top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Image
            src="/logos/square-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="grayscale"
          />
          <Image
            src="/logos/square-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="absolute top-0 logoSquare-grayscale"
          />
        </div>
      </div>
    </Stack>
  );
};

export default PageTransition;
