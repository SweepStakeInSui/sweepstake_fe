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
        <Stack className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}>
          <Flex className="items-start gap-3 justify-between">
            <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
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
              Richest person in the world at the end of this dang year?
            </Typography.Text>
            <Typography.Text size={13} className="inline-flex gap-2">
              <span className="text-text-subtle">Micheal Jack</span>
              <span className="text-text-support-match">72c</span>
              <span className="text-text-support-green">+13</span>
            </Typography.Text>
          </div>
        </Stack>
        <Stack className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}>
          <Flex className="items-start gap-3 justify-between">
            <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
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
              Richest person in the world at the end of this dang year?
            </Typography.Text>
            <Typography.Text size={13} className="inline-flex gap-2">
              <span className="text-text-subtle">Micheal Jack</span>
              <span className="text-text-support-match">72c</span>
              <span className="text-text-support-green">+13</span>
            </Typography.Text>
          </div>
        </Stack>
        <Stack className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}>
          <Flex className="items-start gap-3 justify-between">
            <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
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
              Richest person in the world at the end of this dang year?
            </Typography.Text>
            <Typography.Text size={13} className="inline-flex gap-2">
              <span className="text-text-subtle">Micheal Jack</span>
              <span className="text-text-support-match">72c</span>
              <span className="text-text-support-green">+13</span>
            </Typography.Text>
          </div>
        </Stack>
      </ScrollArea>
    </aside>
  );
};

export default MarketsWatchList;
