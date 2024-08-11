import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockAvatar } from '@/mocks/mockAvatar';

const watchList = [
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Mike Jason',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Micheal Jack',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Michella Zach',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Mike Jason',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Micheal Jack',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Michella Zach',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Mike Jason',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Micheal Jack',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
  {
    avatar: mockAvatar,
    title: 'Richest person in the world at the end of this dang year?',
    author: 'Michella Zach',
    price: '$72,000,000',
    priceChange: '+13',
    priceChangePercentage: '13%',
    date: '2022-01-01',
  },
];

const MarketsWatchList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <aside
      className={`sticky flex flex-col top-[4.75rem] px-6 pr-3 py-5 ${isSidebarOpen ? 'w-[17.5rem]' : 'w-[5.5rem]'} h-[calc(100vh-4.75rem)] border-r border-solid border-borderSubtle overflow-hidden transition-all`}
    >
      <Flex className="relative justify-end pr-3 mb-6">
        <Typography.Heading
          weight="bold"
          size={20}
          className={`absolute left-0 ${isSidebarOpen ? 'scale-1' : 'scale-0'} transition-all`}
        >
          Watch List
        </Typography.Heading>

        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="aspect-1 size-10"
        >
          <Svg
            src="/icons/circle_right.svg"
            className={isSidebarOpen ? 'rotate-180' : ''}
          />
        </IconButton>
      </Flex>

      <ScrollArea className="h-full pr-3 overflow-x-hidden">
        {watchList.slice(4).map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="mb-4">
            <Stack
              className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}
            >
              <Flex className="items-start gap-3 justify-between">
                <Avatar
                  isRounded={false}
                  className="w-[2.5rem] h-auto aspect-1"
                >
                  <AvatarImage src={item.avatar} />
                  <AvatarFallback />
                </Avatar>
                <Button
                  variant="ghost"
                  className={`p-0 ${isSidebarOpen ? 'scale-1' : 'scale-0'}`}
                >
                  Remove
                </Button>
              </Flex>
              <div
                className={`overflow-hidden ${isSidebarOpen ? 'scale-1' : 'scale-0 h-0'}`}
              >
                <Typography.Text size={15} className="line-clamp-2">
                  {item.title}
                </Typography.Text>
                <Typography.Text size={13} className="inline-flex gap-2">
                  <span className="text-text-subtle">{item.author}</span>
                  <span className="text-text-support-match">
                    {item.priceChange}
                  </span>
                  <span className="text-text-support-green">
                    +{item.priceChangePercentage}
                  </span>
                </Typography.Text>
              </div>
            </Stack>
          </div>
        ))}

        {watchList.length > 5 && (
          <Flex className="justify-center">
            <IconButton className="aspect-1 size-10">
              <Svg src="/icons/three_dots.svg" />
            </IconButton>
          </Flex>
        )}
      </ScrollArea>
    </aside>
  );
};

export default MarketsWatchList;
