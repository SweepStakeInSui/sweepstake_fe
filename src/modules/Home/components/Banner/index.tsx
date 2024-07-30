import Image from 'next/image';
import React from 'react';

import Typography from '@/components/common/Typography';

const Banner = () => {
  return (
    <div className="py-6 mx-auto mb-10 justify-center flex-col flex items-center bg-banner-home">
      <div className="relative h-10 aspect-[167/40]">
        <Image src="/logos/logo.png" alt="logo" fill />
      </div>
      <Typography.Heading size={24} className="text-white dark" weight="normal">
        Your next generation prediction market
      </Typography.Heading>
    </div>
  );
};

export default Banner;
