'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import Stack from '@/components/common/Stack';
import { Button } from '@/components/ui/button';

function Slide() {
  return (
    <div
      className="text-"
      style={{
        background: '#302d2d',
      }}
    >
      <Stack>
        <div className="text-">
          <Typography.Heading size={20} weight="bold">
            Despicable Me 4" Rotten Tomatoes score about ten?
          </Typography.Heading>
          <Flex>
            <Flex>
              <Typography.Text size={16}>24.2</Typography.Text>
              <Typography.Text size={12}>forcast</Typography.Text>
              <Typography.Text size={12}>+13%</Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text>120,000 vol</Typography.Text>
            </Flex>
          </Flex>
        </div>
        <div></div>
        <div></div>
        <Flex>
          <Button variant="bet_yes">Bet Yes</Button>
          <Button variant="bet_no">Bet No</Button>
        </Flex>
      </Stack>
      <Stack>
        <Typography.Heading>Texas braces for Beryl</Typography.Heading>
        <Typography.Text>
          Tropical Storm Beryl (formerly Hurricane Beryl) is set to strengthen
          and hit South Texas late Sunday, bringing damaging winds, storm surge,
          and flooding, CNN reports. This will be the first tropical storm to
          hit the US this season.
        </Typography.Text>
      </Stack>
    </div>
  );
}

export default function Slider() {
  return (
    <Swiper modules={[EffectFade]} effect="fade">
      {[1, 2, 3].map((i, el) => {
        return (
          <SwiperSlide>
            <Slide />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
