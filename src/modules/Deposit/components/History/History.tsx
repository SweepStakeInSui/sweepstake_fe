import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Empty from '@/components/common/Empty';
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
import { options } from '@/constants/marketSub';
import { URL_SCAN } from '@/constants/navList';
import type {
  ITransactionHistory,
  TransactionHistoryParams,
} from '@/services/userService';
import { UserService } from '@/services/userService';
import { formatDate } from '@/utils/formatDate';
import { handleBignumber } from '@/utils/handleBignumber';

interface HistoryItemProps {
  item: ITransactionHistory;
}

const HistoryItem = ({ item }: HistoryItemProps) => {
  return (
    <Link href={`${URL_SCAN}tx/${item.transactionHash}`} target="_blank">
      <Flex className="justify-between">
        <div className="size-8 rounded-full bg-bg-sublest flex justify-center items-center flex-shrink-0">
          <Svg
            src={`/icons/${item.type === 'deposit' ? 'arrow_downward.svg' : 'arrow_upward.svg'}`}
            className={`${item.type === 'deposit' ? 'text-text-support-green' : 'text-text-support-red'}`}
          />
        </div>
        <div className="flex-1">
          <Flex className=" justify-between py-3">
            <Stack>
              <Typography.Text className="text-text flex gap-1.5">
                <span className="first-letter:uppercase">{item.type}</span>{' '}
                <span>
                  {handleBignumber.divideDecimal(item.amount, 9)} USDT
                </span>
              </Typography.Text>
              <Flex className=" cursor-pointer">
                <Typography.Text className="text-text-subtle" size={13}>
                  From 0x890...PK0hQ
                </Typography.Text>
                <Tooltip content="View on Suiscan">
                  <Link
                    href={`${URL_SCAN}tx/${item.transactionHash}`}
                    target="_blank"
                  >
                    <Svg
                      src="/icons/north_east.svg"
                      className="text-[#8F8F8F] hover:text-text-support-blue"
                    />
                  </Link>
                </Tooltip>
              </Flex>
            </Stack>
            <Typography.Text size={12} className="text-text-subtle">
              {formatDate.formatTimeAgo(item.timestamp)}
            </Typography.Text>
          </Flex>
          <Separator />
        </div>
      </Flex>
    </Link>
  );
};
const History = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const { ref, inView } = useInView();
  const { data, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ['transaction-history', selectedType],
      queryFn: async ({ pageParam = 1 }) => {
        const requestOptions: TransactionHistoryParams = {
          page: pageParam,
          limit: 12,
        };
        if (selectedType) {
          requestOptions.type = selectedType;
        }

        const res = await UserService.transactionHistory(requestOptions);
        return res;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.items.length < 12) return undefined;
        return pages.length + 1;
      },
    },
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (isError || !data) {
    return <Empty content="No transactions found" className="py-30" />;
  }
  const dataHistory = data.pages.flatMap((page) => page.items);
  console.log(dataHistory);

  return (
    <div className="p-5">
      <Flex className="justify-between">
        <Typography.Heading className="text-text" size={24} weight="semibold">
          History
        </Typography.Heading>
        <Select
          onValueChange={(value) => {
            const selectedOption = options.find(
              (option) => option.content === value,
            );
            setSelectedType(selectedOption ? selectedOption.slug : '');
          }}
        >
          <SelectTrigger className="w-fit min-w-[100px] h-8">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.content} value={option.content}>
                <Typography.Text size={14}>{option.content}</Typography.Text>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Flex>
      {/* <EmptyHistory /> */}

      <div className="mt-4">
        {dataHistory.map((history: ITransactionHistory) => (
          <div key={history.id}>
            <HistoryItem item={history} />
          </div>
        ))}
        <div ref={ref} className="h-10 mt-4">
          {isFetchingNextPage && (
            <Typography.Text>Loading more...</Typography.Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
