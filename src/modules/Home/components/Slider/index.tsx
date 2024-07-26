'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    <div className="p-7 w-[800px] rounded-md relative grid grid-cols-12 bg-[#302D2D] before:content-[''] before:absolute before:rounded-md before:left-0 before:top-0 before:w-full before:h-full before:bg-gradient-conic">
      <Stack className="relative z-10 col-span-6">
        <Stack>
          <Typography.Heading
            size={20}
            weight="bold"
            className="light: text-dyb-5 dark:text-dyb-100"
          >
            {title}
          </Typography.Heading>
          <Flex>
            <Flex>
              <Typography.Text
                className="light: text-dyb-5 dark:text-dyb-100"
                size={16}
              >
                {forcast}
              </Typography.Text>
              <Typography.Text
                className="light: text-dyb-5 dark:text-dyb-100"
                size={12}
              >
                forcast
              </Typography.Text>
              <Typography.Text
                className="light: text-dyb-5 dark:text-dyb-100"
                size={12}
              >
                {percent}%
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text className="light: text-dyb-5 dark:text-dyb-100">
                {vol} vol
              </Typography.Text>
            </Flex>
          </Flex>
        </Stack>
        <div />
        <div>
          <SelectWithStats />
        </div>
        <Flex>
          <Button variant="bet_yes_ghost">Bet Yes</Button>
          <Button variant="bet_no_ghost">Bet No</Button>
        </Flex>
      </Stack>
      <Stack className="relative z-10 col-span-6">
        <Typography.Heading className="light: text-dyb-5 dark:text-dyb-100">
          {desc.title}
        </Typography.Heading>
        <Typography.Text className="light: text-dyb-5 dark:text-dyb-100">
          {desc.content}
        </Typography.Text>
      </Stack>
    </div>
  );
}

interface ISliderProps {
  slides: TSlide[];
}

export default function Slider({ slides }: ISliderProps) {
  const pagination = {
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={pagination}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      spaceBetween={16}
      slidesPerView={2}
      centeredSlides
      className="hero_swipper"
    >
      {slides.map((slide) => {
        return (
          <SwiperSlide key={slide.title}>
            <Slide {...slide} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
