'use client';

import { useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Svg from '@/components/common/Svg';
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
import { bets } from '@/mocks/mockBet';

import Flex from '../common/Flex';
import Typography from '../common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface BetItemProps {
  bet: {
    img: string;
    name: string;
    chance: number;
    count: number;
  };
}
export const BetItem: React.FC<BetItemProps> = ({ bet }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm" isRounded>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback />
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
const SelectBet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const bet = bets.find((item) => item.name === value) || bets[0];

  return (
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
                  value={item.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className="p-1 rounded-sm gap-x-2"
                >
                  <BetItem bet={item} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectBet;
