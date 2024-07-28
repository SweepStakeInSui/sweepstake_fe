import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

interface IMarketsDetailProps {
  title: string;
  chance: number;
  percent: number;
}

export default function MarketsDetail() {
  return (
    <Paper>
      <Flex>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Typography.Heading size={28}>
          Despicable Me 4&quot; Rotten Tomatoes score about ten?
        </Typography.Heading>
      </Flex>
      <Flex className="items-end">
        <Typography.Heading className="text-text" size={20}>
          24.2
        </Typography.Heading>
        <Typography.Text className="text-text-subtle" size={13}>
          chance
        </Typography.Text>
        <Typography.Text className="text-text-support-green" size={12}>
          2%
        </Typography.Text>
        <Typography.Text className="text-text-subtle" size={15}>
          120000 vol
        </Typography.Text>
      </Flex>

      <Stack className="border-b border-borderSublest py-3">
        <Flex className="w-full justify-between">
          <Button variant="ghost">2024</Button>
          <Flex className="w-[21.25rem] justify-between">
            <Typography.Text>%Chance</Typography.Text>
            <Typography.Text>13,000 vol</Typography.Text>
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
