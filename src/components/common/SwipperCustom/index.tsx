'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

import Svg from '../Svg';

interface SwiperCustomProps {
  children: React.ReactNode;
  slidesPerView?: 'auto' | number;
  spaceBetween?: number;
  size?: number;
}

const SwiperCustom: React.FC<SwiperCustomProps> = ({
  children,
  slidesPerView = 'auto',
  spaceBetween = 12,
  size = 48,
}) => {
  const swiperRef = useRef<any>(null);
  const [showPrevButton, setShowPrevButton] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(true);
  const goNext = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef && swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
    setShowNextButton(true);
  };
  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current.swiper;

    setShowPrevButton(!swiperInstance.isBeginning);
    setShowNextButton(!swiperInstance.isEnd);
  };
  const swiperProps: any = {
    navigation: true,
    modules: [Navigation],
    spaceBetween,
    ref: swiperRef,
    slidesPerGroup: 2,
    onSlideChange: handleSlideChange,
    slidesPerView: 'auto',
    // breakpoints:
    //   slidesPerView === 'auto'
    //     ? {}
    //     : {
    //         0: {
    //           slidesPerView: 1.3,
    //           spaceBetween: 30,
    //         },
    //         480: {
    //           slidesPerView: 1.3,
    //           spaceBetween: 30,
    //         },
    //         768: {
    //           slidesPerView: 2.5,
    //           spaceBetween: 30,
    //         },
    //         1024: {
    //           slidesPerView: 4,
    //           spaceBetween: 12,
    //         },
    //       },
  };

  if (slidesPerView !== 'auto') {
    swiperProps.slidesPerView = slidesPerView;
  }
  return (
    <div className="relative swiper-custom">
      <button
        type="button"
        className={`flex items-center justify-center  text-dark1 swiper-button-prev-custom  ${
          !showPrevButton && 'hidden'
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <Svg src="/icons/chevron_right.svg" className="rotate-180" />
      </button>
      <Swiper {...swiperProps}>{children}</Swiper>
      <button
        type="button"
        className={`flex items-center justify-center  text-dark1 swiper-button-next-custom  ${
          !showNextButton && 'hidden'
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        onClick={goNext}
        aria-label="Next slide"
      >
        <Svg src="/icons/chevron_right.svg" />
      </button>
    </div>
  );
};

export default SwiperCustom;
