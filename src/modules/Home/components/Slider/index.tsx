'use client';

import './index.scss';

import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import SelectWithStats from '@/components/common/SelectWithStats';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

type TSlide = {
  title: string;
  forcast: number;
  percent: number;
  vol: number;
  desc: {
    title: string;
    content: string;
  };
};

function Slide({ title, forcast, percent, vol, desc }: TSlide) {
  return (
    <div className="p-7 w-[50rem] h-[23.4rem] rounded-md relative grid grid-cols-12 bg-[#302D2D] before:content-[''] before:absolute before:rounded-md before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-conic after:content-[''] after:w-[50%] after:h-full after:absolute after:right-0 after:bg-[image:url(/images/Flare.png)] after:bg-no-repeat after:bg-contain after:mix-blend-color-dodge">
      <Stack className="relative z-10 col-span-6">
        <Stack>
          <Typography.Heading
            size={20}
            weight="bold"
            className="text-dyb-5 dark:text-dyb-100"
          >
            {title}
          </Typography.Heading>
          <Flex>
            <Flex className="items-end">
              <Typography.Text className="text-dyb-5" size={16}>
                {forcast}
              </Typography.Text>
              <Typography.Text className="text-dyb-30" size={12}>
                forcast
              </Typography.Text>
              <Typography.Text className="text-green-400" size={12}>
                {percent}%
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="text-dyb-30">
                {vol} vol
              </Typography.Text>
            </Flex>
          </Flex>
        </Stack>
        <div />
        <div>
          <SelectWithStats />
        </div>
        <Flex className="w-full">
          <Button variant="bet_yes" className="w-full bg-opacity-15">
            Bet Yes
          </Button>
          <Button variant="bet_no" className="w-full">
            Bet No
          </Button>
        </Flex>
      </Stack>
      <Stack className="relative z-10 col-span-6">
        <Typography.Heading className="text-dyb-5" size={24}>
          {desc.title}
        </Typography.Heading>
        <Typography.Text className="text-dyb-30" size={13}>
          {desc.content}
        </Typography.Text>
      </Stack>
    </div>
  );
}

interface ISliderActionsProps {
  activeIndex: number;
  slides: TSlide[];
}

function SwiperButtonPrev({ activeIndex, slides }: ISliderActionsProps) {
  const swiper = useSwiper();
  const [prevTitle, setPrevTitle] = useState('');

  useEffect(() => {
    const prevIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setPrevTitle(slides[prevIndex].title);
  }, [activeIndex]);

  return (
    <button onClick={() => swiper.slidePrev()}>
      <Typography.Text
        size={12}
        className="text-dyb-70"
      >{`< ${prevTitle}`}</Typography.Text>
    </button>
  );
}

function SwiperButtonNext({ activeIndex, slides }: ISliderActionsProps) {
  const swiper = useSwiper();
  const [nextTile, setNextTile] = useState('');

  useEffect(() => {
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setNextTile(slides[nextIndex].title);
  }, [activeIndex]);

  return (
    <button onClick={() => swiper.slideNext()}>
      <Typography.Text
        size={12}
        className="text-dyb-70"
      >{`${nextTile} >`}</Typography.Text>
    </button>
  );
}

interface ISliderProps {
  slides: TSlide[];
}

export default function Slider({ slides }: ISliderProps) {
  const [realIndex, setRealIndex] = useState(0);
  const pagination = {
    clickable: true,
    renderBullet(_: number, className: string) {
      return `<span class="${className}" />`;
    },
  };

  return (
    <Stack className="hero-slide">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        pagination={pagination}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={16}
        slidesPerView="auto"
        centeredSlides
        className="hero_swipper"
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.title}>
              <Slide {...slide} />
            </SwiperSlide>
          );
        })}

        <div className="relative py-3 w-screen h-12 border-y border-t-dyb-20 border-b-dyb-20 text-r-200">
          <Container className="relative w-full h-full">
            <div className="relative z-20 w-fit translate-y-[-12%]">
              <SwiperButtonPrev
                key={`prev_${realIndex}`}
                activeIndex={realIndex}
                slides={slides}
              />
            </div>
            <div className="absolute top-0 right-6 z-10 w-fit  translate-y-[-12%]">
              <SwiperButtonNext
                key={`next_${realIndex}`}
                activeIndex={realIndex}
                slides={slides}
              />
            </div>
          </Container>
        </div>
      </Swiper>
    </Stack>
  );
}
