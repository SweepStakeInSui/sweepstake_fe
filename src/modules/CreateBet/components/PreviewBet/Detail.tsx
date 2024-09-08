import { format } from 'date-fns';
import Image from 'next/image';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockAvatar } from '@/mocks/mockAvatar';

import type { IOutcomeData } from '../../../../services/markets/types';

interface IPreviewBetDetailProps {
  title: string;
  startTime: number;
  betType: string;
  outcomes: IOutcomeData[];
}

export default function PreviewBetDetail({
  title,
  startTime,
  betType,
  outcomes,
}: Readonly<IPreviewBetDetailProps>) {
  return (
    <Paper>
      <Stack className="gap-y-0">
        <Flex className="mb-3">
          <Flex className="gap-1">
            <Svg src="/icons/monetization.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              $0 bet
            </Typography.Text>
          </Flex>
          <Separator orientation="vertical" className="h-3 bg-borderMain" />
          <Flex className="gap-1">
            <Svg src="/icons/clock.svg" />
            <Typography.Text
              className="text-text-subtle inline-flex items-center gap-1"
              size={15}
            >
              {format(new Date(startTime), 'MMM dd, yyyy - hh:mm')}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex className="items-start justify-between gap-3 mb-2">
          <Flex className="gap-3">
            <Avatar isRounded={false} className="w-[3.75rem] h-auto aspect-1">
              <AvatarImage src={mockAvatar} />
              <AvatarFallback />
            </Avatar>
            <Typography.Heading size={28}>{title || '--'}</Typography.Heading>
          </Flex>

          <Flex className="gap-0">
            <IconButton isRounded>
              <Svg
                src="/icons/add_circle_outline.svg"
                className="text-icon size-6"
              />
            </IconButton>
            <IconButton isRounded>
              <Svg src="/icons/launch.svg" className="text-icon" />
            </IconButton>
          </Flex>
        </Flex>
        <Flex className="items-center">
          <Typography.Heading className="text-text" size={20}>
            --%
          </Typography.Heading>

          <div>
            <Typography.Text
              className="text-text inline-flex items-center gap-1"
              size={15}
            >
              chance{' '}
              <Typography.Text
                tag="span"
                className="text-text-subtle"
                size={15}
              >
                0
              </Typography.Text>
              <span>
                <Svg
                  src="/icons/info_outline.svg"
                  className="text-icon-subtle"
                />
              </span>
            </Typography.Text>
          </div>
        </Flex>
      </Stack>

      {(() => {
        switch (betType) {
          case 'yesno':
            return (
              <Flex>
                <Typography.Text>Orderbook</Typography.Text>
              </Flex>
            );
          case 'multi':
            return (
              <Stack className="gap-3">
                <Stack className="gap-0">
                  <Flex className="w-full justify-between border-b border-borderSublest px-4 py-3">
                    <Typography.Text size={13} className="text-text-subtle">
                      Outcomes
                    </Typography.Text>

                    <Flex className="w-[21.25rem] justify-between">
                      <Typography.Text size={13} className="text-text-subtle">
                        %Chance
                      </Typography.Text>
                      <Typography.Text size={13} className="text-text-subtle">
                        {' '}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Stack>

                {outcomes.map((outcome, index) => (
                  <Flex
                    className="w-full justify-between"
                    key={outcome.outcome + index.toString()}
                  >
                    <Flex>
                      <div className="relative size-11 rounded-md overflow-hidden">
                        {outcome.picture ? (
                          <Image
                            src={URL.createObjectURL(outcome.picture)}
                            alt={outcome.outcome}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300" />
                        )}
                      </div>
                      <Stack className="items-start">
                        <Typography.Text size={15} weight="medium">
                          {outcome.outcome}
                        </Typography.Text>
                        <Typography.Text size={13} className="text-text-subtle">
                          {outcome.subOutcome}
                        </Typography.Text>
                      </Stack>
                    </Flex>
                    <Flex className="w-[21.25rem] justify-between">
                      <Flex className="w-[6.875rem] items-center gap-1">
                        <Typography.Text size={18} weight="medium">
                          --%
                        </Typography.Text>
                      </Flex>
                      <Flex className="w-[14.375rem]">
                        <Button variant="bet_yes" className="w-full">
                          Bet Yes
                        </Button>
                        <Button variant="bet_no" className="w-full">
                          Bet No
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            );
          default:
            return null;
        }
      })()}
    </Paper>
  );
}
