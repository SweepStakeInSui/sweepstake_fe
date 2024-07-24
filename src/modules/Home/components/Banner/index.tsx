import React from 'react';

import { Icons } from '@/components/common/Icon';
import Typography from '@/components/common/Typography';

const Banner = () => {
  return (
    <div className="py-6 mx-auto justify-center flex-col flex items-center bg-banner-home">
      <Icons.Logo width={253} height={61} />
      <Typography.Heading size={24} className="text-white" weight="normal">
        Your next generation prediction market
      </Typography.Heading>
    </div>
  );
};

export default Banner;
