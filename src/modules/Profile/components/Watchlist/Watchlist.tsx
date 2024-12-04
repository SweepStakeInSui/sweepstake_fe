import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Empty from '@/components/common/Empty';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { defaultImg } from '@/constants/defaultImg';
import { removeWatchList, selectWatchList } from '@/store/watchListSlice';

const Watchlist = () => {
  const { items } = useSelector(selectWatchList);

  const dispatch = useDispatch();
  if (items.length === 0) {
    return <Empty content="No watchlist found" />;
  }
  return (
    <div>
      {items.map((item) => (
        <Flex
          key={item.id}
          className="items-start gap-3 px-2 py-3 justify-between"
        >
          <Flex>
            <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
              <AvatarImage src={item.image || defaultImg} />
              <AvatarFallback />
            </Avatar>
            <div>
              <Typography.Text size={15} className="line-clamp-2">
                {item.name}
              </Typography.Text>
              {/* TODO: Update when we have multiple bets */}
              {/* <Typography.Text size={13} className="inline-flex gap-2">
                <span className="text-text-subtle">Micheal Jack</span>
                <span className="text-text-support-match">72c</span>
                <span className="text-text-support-green">+13</span>
              </Typography.Text> */}
            </div>
          </Flex>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => {
              dispatch(removeWatchList({ id: item.id }));
            }}
          >
            Remove
          </Button>
        </Flex>
      ))}
    </div>
  );
};

export default Watchlist;
