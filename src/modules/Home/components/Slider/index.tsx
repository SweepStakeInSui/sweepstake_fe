'use client';

import './index.scss';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { MarketLineChart } from '@/components/charts/MarketLineChart';
import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { defaultImg } from '@/constants/defaultImg';
import { MarketService } from '@/services/markets';
import type { TBetItem } from '@/services/markets/types';
import { PriceHistoryService } from '@/services/priceHistory';
import { getMemoizedTimeRange } from '@/utils/getMemoizedTimeRange';
import { handleBignumber } from '@/utils/handleBignumber';

interface IHomeSlide {
  slide: TBetItem;
}

function HomeSlide({ slide }: Readonly<IHomeSlide>) {
  const timeRange = getMemoizedTimeRange('1m');

  const { data: priceHistoryData } = useQuery({
    queryKey: ['priceHistory', slide.id, '1m'],
    queryFn: () =>
      PriceHistoryService.getPriceHistory({
        start: (timeRange.start / 1000).toFixed(0),
        end: (timeRange.end / 1000).toFixed(0),
        marketId: slide.id,
        time: '1m',
      }),
    enabled: !!slide.id,
  });

  const formattedPriceHistory = useMemo(() => {
    const result: number[][] = [];
    priceHistoryData?.data?.map((item) => {
      return result.push([
        Number(item?.timestamp) * 1000,
        Number(handleBignumber.divideDecimal(item?.price)),
      ]);
    });
    return result;
  }, [priceHistoryData?.data]);

  return (
    <Link
      href={`/markets/${slide.id}`}
      className="p-4 lg:p-7 w-[388px] lg:w-[50rem] h-[23.4rem] rounded-xl relative grid grid-cols-12 bg-bg-surface"
    >
      <Stack className="relative z-10 col-span-12 lg:col-span-6">
        <Stack>
          <Stack>
            <Typography.Heading
              size={20}
              weight="bold"
              className="text-text line-clamp-2"
            >
              {slide?.name}
            </Typography.Heading>
            <Flex className="items-baseline">
              <Flex className="items-end">
                <Typography.Text
                  className="text-text"
                  size={16}
                  weight="medium"
                >
                  {handleBignumber.divideDecimal(slide.percentage)}%
                  <Typography.Text
                    tag="span"
                    className="text-text-subtle"
                    size={12}
                  >
                    {' '}
                    chance
                  </Typography.Text>
                  <Typography.Text
                    className="text-text-support-green"
                    size={12}
                    tag="span"
                  >
                    {' '}
                    +5%
                  </Typography.Text>
                </Typography.Text>
              </Flex>
              <Flex>
                <Typography.Text
                  className="text-text-subtle flex gap-0.5"
                  size={12}
                >
                  <FormatNumber
                    number={handleBignumber.divideDecimal(slide?.volume)}
                    tag="span"
                  />{' '}
                  vol
                </Typography.Text>
              </Flex>
            </Flex>
          </Stack>
          <div>
            {/* <SelectBet /> */}
            <div className="relative w-full aspect-[675/223]">
              <MarketLineChart
                size="sm"
                data={[
                  {
                    showInLegend: false,
                    name: 'Chance',
                    data: formattedPriceHistory,
                    type: 'line',
                    color: '#32BFC9',
                  },
                ]}
                visibilityState={[true, true]}
              />
            </div>
          </div>
        </Stack>
        <Flex className="w-full flex-1 items-end">
          <Button variant="bet_yes" className="w-full group">
            Bet Yes
          </Button>
          <Button variant="bet_no" className="w-full">
            Bet No
          </Button>
        </Flex>
      </Stack>
      <Stack className="relative z-10 col-span-6 justify-between hidden-mobile">
        <Stack>
          <Typography.Heading className="text-text line-clamp-2" size={24}>
            {slide?.name}
          </Typography.Heading>
          <Typography.Text className="text-text-subtle line-clamp-5" size={13}>
            {slide?.description}
          </Typography.Text>
        </Stack>
        <Avatar
          isRounded={false}
          size="sm"
          className="w-full flex-auto min-h-[165px] max-h-[165px]"
        >
          <AvatarImage
            src={slide?.image || defaultImg}
            alt="silder_bet"
            className="object-cover"
          />
          <AvatarFallback className="rounded-md" />
        </Avatar>
      </Stack>
    </Link>
  );
}

interface IHomeNavigationProps {
  activeIndex: number;
  slides: TBetItem[];
}

function SwiperButtonPrev({
  activeIndex,
  slides,
}: Readonly<IHomeNavigationProps>) {
  const swiper = useSwiper();
  const [prevTitle, setPrevTitle] = useState('');

  useEffect(() => {
    const prevIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setPrevTitle(slides[prevIndex]?.name);
  }, [activeIndex, slides]);

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
    setNextTile(slides[nextIndex]?.name);
  }, [activeIndex, slides]);

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

export default function HomeSlider() {
  const [realIndex, setRealIndex] = useState(0);
  const pagination = {
    clickable: true,
    renderBullet(_: number, className: string) {
      return `<span class="${className}"></span>`;
    },
  };
  const { data: dataPopular } = useSuspenseQuery({
    queryKey: ['marketPopular'],
    queryFn: async () => {
      const result = await MarketService.getMarketPopular({
        page: 1,
        limit: 6,
      });
      return result;
    },
  });

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
        {dataPopular.data.items.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <HomeSlide slide={slide} />
            </SwiperSlide>
          );
        })}

        <div className="relative py-3 w-screen h-12 text-text-subtle mt-2">
          <Container className="relative w-full h-full translate-y-[20%] z-20">
            <div className="relative w-fit pl-4">
              <SwiperButtonPrev
                key={`prev_${realIndex}`}
                activeIndex={realIndex}
                slides={dataPopular.data.items}
              />
            </div>
            <div className="absolute top-0 right-4 lg:right-6 z-10 w-fit translate-y-[-12%]">
              <SwiperButtonNext
                key={`next_${realIndex}`}
                activeIndex={realIndex}
                slides={dataPopular.data.items}
              />
            </div>
          </Container>
        </div>
      </Swiper>
    </Stack>
  );
}
