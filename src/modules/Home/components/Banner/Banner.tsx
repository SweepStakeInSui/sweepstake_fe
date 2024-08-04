import Image from 'next/image';
import React from 'react';

import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

const Banner = () => {
  return (
    <div className="py-6 mx-auto mb-10 justify-center flex-col flex items-center bg-dyb-5 relative">
      <div className="relative h-10 aspect-[167/40]">
        <Image src="/logos/logo.png" alt="logo" fill />
      </div>
      <Typography.Heading
        size={24}
        className="text-text-subtle"
        weight="normal"
      >
        Your next generation prediction market
      </Typography.Heading>
      <Svg src="/images/Flare_Banner.svg" className="absolute top-0" />
    </div>
  );
};

export default Banner;
