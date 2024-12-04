'use client';

import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { selectProfile } from '@/store/profileSlice';

import Balance from '../Balance/Balance';
import { PortfolioDeposit } from '../Portfolio';

export interface ActionProps {
  handleNextSlide: () => void;
}
const ActionDeposit = () => {
  const { profile } = useSelector(selectProfile);

  const swiperRef = useRef<any>(null);
  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div className="px-10 lg:px-0 py-5 lg:sticky top-16">
      <Swiper
        effect="cards"
        modules={[EffectCards]}
        direction="vertical"
        slidesPerView={1}
        ref={swiperRef}
        loop
        className="mySwiper swiper-deposit"
      >
        <SwiperSlide className="swiper-action">
          <Balance handleNextSlide={handleNextSlide} />
        </SwiperSlide>
        <SwiperSlide className="swiper-action">
          {profile && <PortfolioDeposit handleNextSlide={handleNextSlide} />}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default ActionDeposit;
