import { format } from 'date-fns';
import Image from 'next/image';

import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockAvatar } from '@/mocks/mockAvatar';

import type { IOutcomeData } from '../../../../services/markets/types';

interface IPreviewBetDetailProps {
  name: string;
  startTime: number;
  betType?: string;
  outcomes?: IOutcomeData[];
}

export default function PreviewBetDetail({
  name,
  startTime,
  betType,
  outcomes,
}: Readonly<IPreviewBetDetailProps>) {
  return (
    <div>
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
            <div className="relative size-[3.75rem] aspect-1 rounded-md overflow-hidden">
              <Image src={mockAvatar} fill alt="" objectFit="cover" />
            </div>

            <Typography.Heading size={28} className="hidden-mobile">
              {name || '--'}
            </Typography.Heading>
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

        <Typography.Heading
          size={28}
          className="hidden-PC line-clamp-2 shrink-[999]"
        >
          {name || '--'}
        </Typography.Heading>

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
                  <Flex className="hidden-mobile w-full justify-between border-b border-borderSublest py-1">
                    <Typography.Text size={13} className="text-text-subtle">
                      Outcome
                    </Typography.Text>

                    <Flex className="w-[21.25rem]">
                      <Typography.Text size={13} className="text-text-subtle">
                        %Chance
                      </Typography.Text>
                    </Flex>
                  </Flex>

                  {outcomes?.map((outcome, index) => {
                    return (
                      <Flex
                        key={outcome.outcome + index.toString()}
                        className="flex flex-col lg:flex-row gap-0 justify-between w-full py-4 border-b border-borderSublest"
                      >
                        <div className="w-full">
                          <div className="flex flex-col lg:flex-row justify-between w-full">
                            <Flex className="w-full justify-between pb-3 lg:pb-0">
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
                                  <Typography.Text
                                    size={13}
                                    className="text-text-subtle"
                                  >
                                    {outcome.subOutcome}
                                  </Typography.Text>
                                </Stack>
                              </Flex>

                              <Flex className="lg:w-[9.875rem] items-center gap-1">
                                <Typography.Text size={18} weight="medium">
                                  --%
                                </Typography.Text>
                                <Typography.Text
                                  size={13}
                                  className="text-text-support-green"
                                >
                                  --
                                </Typography.Text>
                              </Flex>
                            </Flex>
                          </div>
                        </div>
                        <Flex className="w-full lg:w-[14.375rem] justify-center">
                          <Button variant="bet_yes" className="w-full">
                            Yes
                          </Button>

                          <Button variant="bet_no" className="w-full">
                            No
                          </Button>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Stack>
              </Stack>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
