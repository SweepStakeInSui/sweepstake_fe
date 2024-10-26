import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { defaultImg } from '@/constants/defaultImg';
import ViewAll from '@/modules/Home/components/ViewAll';
import { removeWatchList, selectWatchList } from '@/store/watchListSlice';

import { mockWatchList } from '../../../../mocks/mockWatchList';

const MarketsWatchList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items } = useSelector(selectWatchList);
  const dispatch = useDispatch();

  return (
    <div>
      {items.length > 0 && (
        <aside
          className={`sticky flex flex-col top-[4.75rem] px-6 pr-3 py-5 ${isSidebarOpen ? 'w-[17.5rem]' : 'w-[5.5rem]'} h-[calc(100vh-4.75rem)] border-r border-solid border-borderSubtle overflow-hidden transition-all`}
        >
          <Flex className="relative justify-end pr-3 mb-6">
            <Typography.Heading
              weight="bold"
              size={20}
              className={`absolute left-0 ${isSidebarOpen ? 'scale-1' : 'scale-0'} transition-all`}
            >
              Watchlist
            </Typography.Heading>

            <Tooltip content="Expand Watchlist" side="right">
              <div>
                <IconButton
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="aspect-1 size-10"
                >
                  <Svg
                    src="/icons/circle_right.svg"
                    className={isSidebarOpen ? 'rotate-180' : ''}
                  />
                </IconButton>
              </div>
            </Tooltip>
          </Flex>

          <ScrollArea className="h-full pr-3 overflow-x-hidden no-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="mb-4">
                <Stack
                  className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}
                >
                  <Flex className="items-start gap-3 justify-between">
                    <Avatar
                      isRounded={false}
                      className="w-[2.5rem] h-auto aspect-1"
                    >
                      <AvatarImage src={item.image || defaultImg} />
                      <AvatarFallback />
                    </Avatar>
                    <Button
                      variant="ghost"
                      className={`p-0 ${isSidebarOpen ? 'scale-1' : 'scale-0'}`}
                      onClick={() => {
                        dispatch(removeWatchList({ id: item.id }));
                      }}
                    >
                      Remove
                    </Button>
                  </Flex>
                  <div
                    className={`overflow-hidden ${isSidebarOpen ? 'scale-1' : 'scale-0 h-0'}`}
                  >
                    <Typography.Text size={15} className="line-clamp-2">
                      {item.name}
                    </Typography.Text>
                    <Typography.Text size={13} className="inline-flex gap-2">
                      <span className="text-text-subtle">Jhonny</span>
                      <span className="text-text-support-match">11</span>
                      <span className="text-text-support-green">+2</span>
                    </Typography.Text>
                  </div>
                </Stack>
              </div>
            ))}

            {mockWatchList.length > 5 &&
              (isSidebarOpen ? (
                <ViewAll className="text-text-subtle hover:after:h-0" />
              ) : (
                <Flex className="justify-center">
                  <IconButton className="aspect-1 size-10">
                    <Svg src="/icons/three_dots.svg" />
                  </IconButton>
                </Flex>
              ))}
          </ScrollArea>
        </aside>
      )}
    </div>
  );
};

export default MarketsWatchList;
