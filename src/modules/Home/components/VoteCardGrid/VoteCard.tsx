'use client';

import Image from 'next/image';
import { useRouter } from 'next-nprogress-bar';
import { useTheme } from 'next-themes';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import { AddWatchListButton } from '@/components/common/AddWatchListButton';
import Flex from '@/components/common/Flex';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { defaultImg } from '@/constants/defaultImg';
// import { bets } from '@/mocks/mockBet';
import type { TBetItem } from '@/services/markets/types';

import Stack from '../../../../components/common/Stack';
import { Skeleton } from '../../../../components/ui/skeleton';

// interface BetItemProps {
//   bet: {
//     img: string;
//     name: string;
//     chance: number;
//     count: number;
//   };
// }

// const BetItem: React.FC<BetItemProps> = ({ bet }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <Avatar size="sm" isRounded>
//         <AvatarImage src="https://github.com/shadcn.png" />
//         <AvatarFallback />
//       </Avatar>
//       <div className="text-left">
//         <Typography.Text size={13} className="text-text mb-[2px]">
//           {bet.name}
//         </Typography.Text>
//         <Flex className="gap-x-1">
//           <div style={{ width: 12, height: 12 }}>
//             <CircularProgressbar
//               value={bet.chance}
//               styles={buildStyles({
//                 pathColor: `rgba(1, 70, 244)`,
//               })}
//             />
//           </div>
//           <Typography.Text size={12} className="text-text-support-blue mr-1">
//             {bet.chance} % Chances
//           </Typography.Text>
//           <Typography.Text size={12} className="text-text-support-green">
//             +{bet.count}
//           </Typography.Text>
//         </Flex>
//       </div>
//     </div>
//   );
// };

export const VoteCardSkeleton = () => {
  return (
    <div className="p-4 border border-borderSublest rounded-lg relative bg-bg-surface">
      <Flex className="gap-x-4">
        <Skeleton className="size-12" />
        <div className="w-full shrink-[999]">
          <Stack className="gap-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[70%] h-4" />
          </Stack>
          <Flex className="text-text-sublest mt-2">
            <Skeleton className="w-[40%] h-3" />
            <Skeleton className="w-[60%] h-3" />
          </Flex>
        </div>
      </Flex>
      <div className="my-4 relative">
        <Skeleton className="w-full h-13" />
      </div>
      <Flex>
        <Skeleton className="w-full h-9" />
        <Skeleton className="w-full h-9" />
      </Flex>
    </div>
  );
};

interface VoteCardProps {
  data: TBetItem;
}

const VoteCard = ({ data }: VoteCardProps) => {
  const { theme } = useTheme();
  const { name } = data;
  // const [open, setOpen] = useState<boolean>(false);
  // const [value, setValue] = useState('');
  const router = useRouter();
  // const bet = bets.find((item) => item.name === value) || bets[0];

  return (
    <div
      onClick={() => {
        router.push(`/markets/${data.id}`);
      }}
      role="presentation"
      className="p-4 border group border-borderSublest rounded-lg relative bg-bg-surface cursor-pointer hover:shadow-card-bet-home transition-all duration-150"
    >
      <div className="relative">
        <Flex className="gap-x-4">
          <Image
            src={data.image || defaultImg}
            width={300}
            height={300}
            alt="avatar"
            className="object-cover w-12 h-12 rounded-sm"
          />
          <div className="flex-1">
            <Typography.Text
              size={15}
              className="text-text text-left line-clamp-1 group-hover:underline underline-offset-2"
            >
              {name}
            </Typography.Text>
            <Flex className="text-text-sublest mt-1">
              <Typography.Text size={12} className="text-text-sublest">
                3k bet
              </Typography.Text>
              <div className="w-px bg-borderSubtle h-2.5" />
              <AddWatchListButton bet={data} showText />
            </Flex>
          </div>
        </Flex>
        {/* TODO: For multiple bets */}
        {/* <div className="my-4 relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button
                role="combobox"
                aria-expanded={open}
                aria-controls="bet-options"
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
            <PopoverContent
              className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-1"
              onClick={(e) => e.stopPropagation()}
            >
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
        </div> */}
        <div className="mt-4 mb-10">
          <Flex className="mb-2">
            <div style={{ width: 12, height: 12 }}>
              <CircularProgressbar
                value={92}
                styles={buildStyles({
                  pathColor: `rgba(1, 70, 244)`,
                })}
              />
            </div>
            <Typography.Text size={12} className="text-text-support-blue">
              92% Chances
            </Typography.Text>
          </Flex>

          <div
            className={`w-full h-0.5 rounded-md ${theme === 'light' ? 'bg-b-5' : 'bg-wht-a5'}`}
          >
            <div
              className="h-full bg-b-40 rounded-md"
              style={{ width: '92%' }}
            />
          </div>
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

export default VoteCard;
