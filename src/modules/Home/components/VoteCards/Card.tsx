'use client';

import Image from 'next/image';
import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BetItemProps {
  bet: {
    img: string;
    name: string;
    chance: number;
    count: number;
  };
}
const BetItem: React.FC<BetItemProps> = ({ bet }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm" isRounded>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-left">
        <Typography.Text size={13} className="text-text mb-[2px]">
          {bet.name}
        </Typography.Text>
        <Flex className="gap-x-1">
          <div style={{ width: 12, height: 12 }}>
            <CircularProgressbar
              value={bet.chance}
              styles={buildStyles({
                pathColor: `rgba(1, 70, 244)`,
              })}
            />
          </div>
          <Typography.Text size={12} className="text-text-support-blue mr-1">
            {bet.chance} % Chances
          </Typography.Text>
          <Typography.Text size={12} className="text-text-support-green">
            +{bet.count}
          </Typography.Text>
        </Flex>
      </div>
    </div>
  );
};
const Card = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');

  const bets = [
    {
      img: 'https://github.com/shadcn.png',
      name: 'Elon Musk',
      chance: 12,
      count: 6,
    },
    {
      img: 'https://github.com/shadcn.png',
      name: 'Jeff Bezos',
      chance: 43,
      count: 3,
    },
    {
      img: 'https://github.com/shadcn.png',
      name: 'Bill Gates',
      chance: 23,
      count: 3,
    },
    {
      img: 'https://github.com/shadcn.png',
      name: 'Mark Zuckerberg',
      chance: 6,
      count: 12,
    },
    {
      img: 'https://github.com/shadcn.png',
      name: 'Larry Page',
      chance: 91,
      count: 1,
    },
  ];
  const bet = bets.find((item) => item.name === value) || bets[0];
  return (
    <div className="p-4 border border-borderSublest rounded-lg relative bg-bg-surface">
      <div className="relative">
        <Flex className="gap-x-4">
          <Image
            src="/images/avatar.png"
            width={300}
            height={300}
            alt="avatar"
            className="object-cover w-12 h-12 rounded-sm"
          />
          <div>
            <Typography.Text size={15} className="text-text">
              Richest person in the world at the end of the year?
            </Typography.Text>
            <Typography.Text size={10} className="text-text-sublest">
              32,900 vol
            </Typography.Text>
          </div>
        </Flex>
        <div className="my-4 relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                role="combobox"
                aria-expanded={open}
                aria-label="Select bet"
                className="w-full justify-between flex border rounded-md border-borderSubtle p-2 items-center"
              >
                {value || bets.length > 0 ? (
                  <BetItem bet={bet} />
                ) : (
                  'No Bets Available'
                )}
                <Svg
                  src="/icons/chevron_right.svg"
                  className="rotate-90 text-icon-subtle"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-1">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {bets.map((item) => (
                      <CommandItem
                        key={item.name}
                        value={bet.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="p-1 rounded-sm gap-x-2"
                      >
                        <BetItem bet={bet} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Flex>
          <Button variant="bet_yes" className="w-full group gap-x-1">
            Bet Yes
            <Svg
              src="/icons/trending_up.svg"
              className="w-0 group-hover:w-4 transition-all duration-150 ease-linear group-focus:w-0"
            />
          </Button>
          <Button variant="bet_no" className="w-full group gap-x-1">
            Bet No
            <Svg
              src="/icons/trending_down.svg"
              className="w-0 group-hover:w-4 transition-all duration-150 ease-linear group-focus:w-0"
            />
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Card;
