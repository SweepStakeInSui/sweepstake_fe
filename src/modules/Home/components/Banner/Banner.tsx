import Image from 'next/image';

import Svg from '@/components/common/Svg';

const Banner = () => {
  return (
    <div className="py-6 mx-auto justify-center flex-col flex items-center bg-bg-primary relative">
      <div className="relative aspect-[167/40]">
        <Image
          src="/logos/sweepstake_hero.svg"
          alt="logo"
          height={64}
          width={282}
          className="object-cover"
        />
      </div>
      <Svg
        src="/images/Flare_Banner.svg"
        className="absolute top-0 w-full h-full"
      />
    </div>
  );
};

export default Banner;
