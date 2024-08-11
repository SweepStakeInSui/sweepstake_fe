import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { mockAvatar } from '@/mocks/mockAvatar';

import { MarketTiles } from '../MarketTiles';

// interface IMarketsDetailProps {
//   title: string;
//   chance: number;
//   percent: number;
// }

const statistic = [
  {
    id: '1',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
  {
    id: '2',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
  {
    id: '3',
    title: 'Before Aug 9',
    desc: 'SpaceXlauches in 2023',
    percent: 86,
    fluctuate: 13,
    bids: [
      {
        price: '0.511',
        size: '11815.88',
      },
      {
        price: '0.513',
        size: '15701.06',
      },
      {
        price: '0.514',
        size: '19214.42',
      },
      {
        price: '0.515',
        size: '716.36',
      },
    ],
    asks: [
      {
        price: '0.521',
        size: '50.08',
      },
      {
        price: '0.52',
        size: '1137.18',
      },
      {
        price: '0.519',
        size: '5547.94',
      },
      {
        price: '0.518',
        size: '566.25',
      },
    ],
  },
];

export default function MarketsDetail() {
  return (
    <Paper>
      <Stack className="gap-y-0">
        <Flex className="mb-3">
          <Flex className="gap-1">
            <Svg src="/icons/monetization.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              $120,000,000 bet
            </Typography.Text>
          </Flex>
          <Separator orientation="vertical" className="h-3 bg-borderMain" />
          <Flex className="gap-1">
            <Svg src="/icons/clock.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              Aug 21, 2024
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex className="items-start justify-between gap-3 mb-2">
          <Flex className="gap-3">
            <Avatar isRounded={false} className="w-[3.75rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
              <AvatarFallback />
            </Avatar>
            <Typography.Heading size={28}>
              Despicable Me 4&quot; Rotten Tomatoes score about ten?
            </Typography.Heading>
          </Flex>

          <Flex className="gap-0">
            <IconButton isRounded>
              <Svg
                src="/icons/add_circle_outline.svg"
                className="text-icon size-6"
              />
            </IconButton>
            <IconButton isRounded>
              <Svg src="/icons/launch.svg" className="text-icon" />
            </IconButton>
          </Flex>
        </Flex>
        <Flex className="items-center">
          <Typography.Heading className="text-text" size={20}>
            24.2
          </Typography.Heading>

          <div>
            <Typography.Text
              className="text-text inline-flex items-center gap-1"
              size={15}
            >
              forscast{' '}
              <Typography.Text
                tag="span"
                className="text-text-support-green"
                size={15}
              >
                +2%
              </Typography.Text>
              <span>
                <Svg
                  src="/icons/info_outline.svg"
                  className="text-icon-subtle"
                />
              </span>
            </Typography.Text>
          </div>
        </Flex>
      </Stack>

      <Stack className="gap-3">
        <Stack className="gap-0">
          <Flex className="w-full justify-between border-b border-borderSublest">
            <Select defaultValue="2024">
              <SelectTrigger className="bg-transparent border-none w-fit gap-2 pl-0 text-13 text-text-subtle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Flex className="w-[21.25rem] justify-between">
              <Typography.Text size={13} className="text-text-subtle">
                %Chance
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                13,000 vol
              </Typography.Text>
            </Flex>
          </Flex>
          <MarketTiles data={statistic} />
        </Stack>

        <Button
          variant="ghost"
          className="text-text-support-blue pl-0 hover:bg-transparent active:bg-transparent"
        >
          2 more markets
          <span>
            <Svg src="/icons/chevron_right.svg" className="rotate-90" />
          </span>
        </Button>
      </Stack>
    </Paper>
  );
}
