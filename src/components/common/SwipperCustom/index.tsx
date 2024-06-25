'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useEffect, useRef, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import type { SwiperContainer } from 'swiper/element/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper } from 'swiper/react';

interface SwiperCustomProps {
  children: React.ReactNode;
  slidesPerView: number;
}

const SwiperCustom: React.FC<SwiperCustomProps> = ({
  children,
  slidesPerView,
}) => {
  const swiperRef = useRef<SwiperContainer | any>(null);
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
  };
  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance.isBeginning) {
      setShowPrevButton(false);
    } else {
      setShowPrevButton(true);
    }

    if (swiperInstance.isEnd) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
  };
  // useEffect(() => {
  //   const swiperContainer = swiperRef.current;
  //   const params = {
  //     navigation: true,
  //     injectStyles: [
  //       `
  //         .swiper-button-next,
  //         .swiper-button-prev {
  //           background-color: white;
  //           padding: 8px 16px;
  //           border-radius: 100%;
  //           border: 2px solid black;
  //           color: red;
  //         }
  //     `,
  //     ],
  //   };

  //   Object.assign(swiperContainer, params);
  //   // swiperContainer.initialize();
  // }, []);
  useEffect(() => {
    if (swiperRef.current.swiper.slides.length <= slidesPerView) {
      setShowNextButton(false);
    }
  }, [slidesPerView]);

  return (
    <div className="relative swiper-custom">
      <button
        type="button"
        className={`flex items-center justify-center text-3xl text-dark1 swiper-button-prev-custom ${
          !showPrevButton && 'hidden'
        }`}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <GoChevronLeft />
      </button>
      <Swiper
        navigation
        modules={[Navigation]}
        className="hidden mySwiper lg:block md:block"
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
            spaceBetween: 30,
          },
          480: {
            slidesPerView: 1.3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
      >
        {children}
      </Swiper>
      <button
        type="button"
        className={`flex items-center justify-center text-3xl text-dark1 swiper-button-next-custom ${
          !showNextButton && 'hidden'
        }`}
        onClick={goNext}
        aria-label="Next slide"
      >
        <GoChevronRight />
      </button>
    </div>
  );
};

export default SwiperCustom;
