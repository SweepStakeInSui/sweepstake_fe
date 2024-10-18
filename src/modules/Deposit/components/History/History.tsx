import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';

const HistoryItem = () => {
  return (
    <Flex className="justify-between">
      <div className="size-8 rounded-full bg-bg-sublest flex justify-center items-center flex-shrink-0">
        <Svg src="/icons/arrow_upward.svg" />
      </div>
      <div className="flex-1">
        <Flex className=" justify-between py-3">
          <Stack>
            <Typography.Text className="text-text">
              Deposite 200,000 USDT
            </Typography.Text>
            <Flex className=" cursor-pointer">
              <Typography.Text className="text-text-subtle" size={13}>
                From 0x890...PK0hQ
              </Typography.Text>
              <Tooltip content="View on Suiscan">
                <div>
                  <Svg
                    src="/icons/north_east.svg"
                    className="text-[#8F8F8F] hover:text-text-support-blue"
                  />
                </div>
              </Tooltip>
            </Flex>
          </Stack>
          <Typography.Text size={12} className="text-text-subtle">
            2 minutes ago
          </Typography.Text>
        </Flex>
        <Separator />
      </div>
    </Flex>
  );
};
const History = () => {
  const options = [
    {
      slug: 'all',
      content: 'All',
    },
    {
      slug: 'deposit',
      content: 'Deposit',
    },
    {
      slug: 'withdraw',
      content: 'Withdraw',
    },
  ];
  return (
    <div className="p-5">
      <Flex className="justify-between">
        <Typography.Heading className="text-text" size={24} weight="semibold">
          History
        </Typography.Heading>
        <Select>
          <SelectTrigger className="w-fit min-w-[100px] h-8">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.slug} value={option.slug}>
                <Typography.Text size={14}>{option.content}</Typography.Text>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Flex>
      {/* <EmptyHistory /> */}

      <div className="mt-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index}>
            <HistoryItem />
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
