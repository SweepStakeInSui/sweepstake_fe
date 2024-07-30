import Flex from '@/components/common/Flex';
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

// interface IMarketsDetailProps {
//   title: string;
//   chance: number;
//   percent: number;
// }

export default function MarketsDetail() {
  return (
    <Paper>
      <Flex className="items-start gap-3 mb-2">
        <Avatar isRounded={false} className="w-[3.75rem] h-auto aspect-1">
          <AvatarImage src={mockAvatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Typography.Heading size={28}>
          Despicable Me 4&quot; Rotten Tomatoes score about ten?
        </Typography.Heading>
        <Svg src="/icons/launch.svg" />
      </Flex>
      <Flex className="items-start">
        <Typography.Heading className="text-text" size={20}>
          24.2
        </Typography.Heading>
        <Typography.Text className="text-text-subtle" size={13}>
          chance
        </Typography.Text>
        <Typography.Text className="text-text-support-green" size={12}>
          +2%
        </Typography.Text>
        <Typography.Text
          className="text-text-subtle inline-flex gap-1"
          size={15}
        >
          120,000 vol
          <span>
            <Svg src="/icons/info_outline.svg" />
          </span>
        </Typography.Text>
      </Flex>

      <Stack className="border-b border-borderSublest py-3">
        <Flex className="w-full justify-between">
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
        <Flex className="w-full justify-between">
          <Stack>
            <Typography.Text size={15} weight="medium">
              Before Aug 9
            </Typography.Text>
            <Typography.Text size={13} className="text-text-subtle">
              SpaceXlauches in 2023
            </Typography.Text>
          </Stack>
          <Flex className="w-[21.25rem] justify-between">
            <Flex className="w-[6.875rem]">
              <Typography.Text>83%</Typography.Text>
              <Typography.Text>+13</Typography.Text>
            </Flex>
            <Flex className="w-[14.375rem]">
              <Button variant="bet_yes" className="w-full">
                Yes 72
              </Button>
              <Button variant="bet_no" className="w-full">
                No 29
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Paper>
  );
}
