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
import { mockAvatar } from '@/mocks/mockAvatar';

import { MarketTile } from '../MarketTile';

// interface IMarketsDetailProps {
//   title: string;
//   chance: number;
//   percent: number;
// }

export default function MarketsDetail() {
  return (
    <Paper>
      <Flex className="items-start justify-between gap-3 mb-2">
        <Flex className="gap-3">
          <Avatar isRounded={false} className="w-[3.75rem] h-auto aspect-1">
            <AvatarImage src={mockAvatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Typography.Heading size={28}>
            Despicable Me 4&quot; Rotten Tomatoes score about ten?
          </Typography.Heading>
        </Flex>

        <Flex className="gap-0">
          <IconButton isRounded>
            <Svg src="/icons/add_circle_outline.svg" className="text-icon" />
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

        <div className="pr-2 border-r border-borderMain">
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
              <Svg src="/icons/info_outline.svg" />
            </span>
          </Typography.Text>
        </div>

        <Typography.Text
          className="text-text inline-flex items-center gap-1"
          size={15}
        >
          $120,000,000 bet
          <span>
            <Svg src="/icons/info_outline.svg" />
          </span>
        </Typography.Text>
      </Flex>

      <Stack className="gap-3">
        <Flex className="w-full justify-between border-b border-borderSublest">
          <Select>
            <SelectTrigger className="bg-transparent border-none w-fit text-text-subtle gap-2 pl-0">
              <SelectValue placeholder="2024" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
        {/* TODO: Replace key index */}
        {Array.from({ length: 3 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MarketTile key={index} />
        ))}
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
