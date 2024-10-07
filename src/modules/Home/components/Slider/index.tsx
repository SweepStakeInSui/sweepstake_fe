'use client';

import './index.scss';

import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { SelectBet } from '@/components/SelectBet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <div className="p-4 lg:p-7 w-[388px] lg:w-[50rem] h-[23.4rem] rounded-xl relative grid grid-cols-12 bg-bg-surface">
      <Stack className="relative z-10 col-span-12 lg:col-span-6">
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
                chance
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
          <SelectBet />
        </div>
        <Flex className="w-full">
          <Button variant="bet_yes" className="w-full group">
            Bet Yes
          </Button>
          <Button variant="bet_no" className="w-full">
            Bet No
          </Button>
        </Flex>
      </Stack>
      <Stack className="relative z-10 col-span-6 justify-between gap-y-11 hidden-mobile">
        <Stack>
          <Typography.Heading className="text-text" size={24}>
            {desc.title}
          </Typography.Heading>
          <Typography.Text className="text-text-subtle" size={13}>
            {desc.content}
          </Typography.Text>
        </Stack>
        <Avatar isRounded={false} size="sm" className="w-full flex-auto">
          <AvatarImage src="./images/slider.png" alt="silder_bet" />
          <AvatarFallback className="rounded-md" />
        </Avatar>
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
      <Typography.Text size={12} className="text-text-subtle inline-flex">
        <span className="w-4">
          <Svg
            src="/icons/chevron_right.svg"
            className="text-inherit rotate-180"
          />
        </span>
        <span className="hidden-mobile">{prevTitle}</span>
        <span className="hidden-PC">Previous</span>
      </Typography.Text>
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
      <Typography.Text size={12} className="text-text-subtle inline-flex">
        <span className="hidden-mobile">{`${nextTile} `}</span>
        <span className="hidden-PC">Next</span>
        <span className="w-4 h-4">
          <Svg
            key="next"
            src="/icons/chevron_right.svg"
            className="text-inherit"
          />
        </span>
      </Typography.Text>
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
    <Stack className="hero-slide bg-slider-home dark:bg-slider-home-dark pb-3">
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
        // breakpoints={{
        //   0: {
        //     slidesPerView: 1,
        //     spaceBetween: 16,
        //   },
        //   480: {
        //     slidesPerView: 2.5,
        //     spaceBetween: 30,
        //   },
        //   768: {
        //     slidesPerView: 2.5,
        //     spaceBetween: 30,
        //   },
        // }}
        onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.title}>
              <HomeSlide {...slide} />
            </SwiperSlide>
          );
        })}

        <div className="relative py-3 w-screen h-12 text-text-subtle mt-2">
          <Container className="relative w-full h-full translate-y-[20%] z-20">
            <div className="relative w-fit pl-4">
              <SwiperButtonPrev
                key={`prev_${realIndex}`}
                activeIndex={realIndex}
                slides={slides}
              />
            </div>
            <div className="absolute top-0 right-4 lg:right-6 z-10 w-fit translate-y-[-12%]">
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
