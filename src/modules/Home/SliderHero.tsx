import Image from 'next/image';
import React from 'react';

const SliderHero = () => {
  return (
    <div>
      <Image
        src="/images/home.png"
        alt="hero_img"
        width={1840}
        height={200}
        className="object-cover"
      />
    </div>
  );
};

export default SliderHero;
