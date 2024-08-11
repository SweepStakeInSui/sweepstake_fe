import React from 'react';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockAvatar } from '@/mocks/mockAvatar';

const Watchlist = () => {
  return (
    <div>
      {Array.from({ length: 6 }, (_, index) => (
        <Flex
          key={index}
          className="items-start gap-3 px-2 py-3 justify-between"
        >
          <Flex>
            <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
              <AvatarFallback />
            </Avatar>
            <div>
              <Typography.Text size={15} className="line-clamp-2">
                Richest person in the world at the end of this dang year?
              </Typography.Text>
              <Typography.Text size={13} className="inline-flex gap-2">
                <span className="text-text-subtle">Micheal Jack</span>
                <span className="text-text-support-match">72c</span>
                <span className="text-text-support-green">+13</span>
              </Typography.Text>
            </div>
          </Flex>
          <Button variant="ghost" className="p-0">
            Remove
          </Button>
        </Flex>
      ))}
    </div>
  );
};

export default Watchlist;
