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

interface IHomeSlide {
  title: string;
  forcast: number;
  percent: number;
  vol: number;
  desc: {
    title: string;
    content: string;
  };
}

function HomeSlide({
  title,
  forcast,
  percent,
  vol,
  desc,
}: Readonly<IHomeSlide>) {
  return (
    <div className="dark p-7 w-[50rem] h-[23.4rem] rounded-md relative grid grid-cols-12 bg-[#302D2D] before:content-[''] before:absolute before:rounded-md before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-conic after:content-[''] after:w-[50%] after:h-full after:absolute after:right-0 after:bg-[image:url(/images/Flare.png)] after:bg-no-repeat after:bg-contain after:mix-blend-color-dodge">
      <Stack className="relative z-10 col-span-6">
        <Stack>
          <Typography.Heading size={20} weight="bold" className="text-text">
            {title}
          </Typography.Heading>
          <Flex>
            <Flex className="items-end">
              <Typography.Text className="text-text" size={16}>
                {forcast}
              </Typography.Text>
              <Typography.Text className="text-text-subtle" size={12}>
                forcast
              </Typography.Text>
              <Typography.Text className="text-text-support-green" size={12}>
                {percent}%
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="text-text-subtle">
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
          <Button variant="bet_yes_ghost" className="w-full">
            Bet Yes
          </Button>
          <Button variant="bet_no_ghost" className="w-full">
            Bet No
          </Button>
        </Flex>
      </Stack>
      <Stack className="relative z-10 col-span-6">
        <Typography.Heading className="text-text" size={24}>
          {desc.title}
        </Typography.Heading>
        <Typography.Text className="text-text-subtle" size={13}>
          {desc.content}
        </Typography.Text>
      </Stack>
    </div>
  );
}

interface IHomeNavigationProps {
  activeIndex: number;
  slides: IHomeSlide[];
}

function SwiperButtonPrev({
  activeIndex,
  slides,
}: Readonly<IHomeNavigationProps>) {
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
        className="text-text-subtle"
      >{`< ${prevTitle}`}</Typography.Text>
    </button>
  );
}

function SwiperButtonNext({
  activeIndex,
  slides,
}: Readonly<IHomeNavigationProps>) {
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
        className="text-text-subtle"
      >{`${nextTile} >`}</Typography.Text>
    </button>
  );
}

interface ISliderProps {
  slides: IHomeSlide[];
}

export default function HomeSlider({ slides }: Readonly<ISliderProps>) {
  const [realIndex, setRealIndex] = useState(0);
  const pagination = {
    clickable: true,
    renderBullet(_: number, className: string) {
      return `<span class="${className}"></span>`;
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
              <HomeSlide {...slide} />
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
