'use client';

import { useState } from 'react';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import IconButton from '@/components/common/IconButton';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { UpDownButton } from '@/components/common/UpDownButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockAvatar } from '@/mocks/mockAvatar';

import { MarketsAbout } from './components/About';
import MarketsComments from './components/Comments/Comments';
import { MarketsDetail } from './components/Detail';
import { MarketsRelateMarket } from './components/RelateMarket';
import { MarketsRulesSummary } from './components/RulesSummary';

export default function MarketsModule() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Container px={0}>
      <Flex className="items-start gap-0">
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
              <Svg src="/icons/chevron_right.svg" />
            </IconButton>
          </Flex>

          <ScrollArea className="h-full pr-3 overflow-x-hidden">
            <Stack
              className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}
            >
              <Flex className="items-start gap-3 justify-between">
                <Avatar
                  isRounded={false}
                  className="w-[2.5rem] h-auto aspect-1"
                >
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
            <Stack
              className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}
            >
              <Flex className="items-start gap-3 justify-between">
                <Avatar
                  isRounded={false}
                  className="w-[2.5rem] h-auto aspect-1"
                >
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
            <Stack
              className={`${isSidebarOpen ? 'mb-11' : 'mb-4'} transition-all`}
            >
              <Flex className="items-start gap-3 justify-between">
                <Avatar
                  isRounded={false}
                  className="w-[2.5rem] h-auto aspect-1"
                >
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

        <Flex className="transition-all shrink-[100] items-start gap-0">
          <Stack className="shrink-[100]">
            <MarketsDetail />
            <MarketsRulesSummary
              desc="If SpaceX has more than 120 launches in 2024, then the market resolves to Yes. Outcome verified from Federal Aviation Administration."
              openOn="2021-09-20"
              closeOn="2021-09-20"
              payoutOn="2021-09-20"
              series="2021-09-20"
              event="2021-09-20"
              market="2021-09-20"
            />
            <MarketsAbout
              desc={`The "Deadpool & Wolverine" movie, directed by Shawn Levy and starring Ryan Reynolds and Hugh Jackman, is set to release on July 26, 2024. The film's trailer, which premiered during the Super Bowl, broke the record for the most viewed trailer in the first 24 hours with 365 million views. The "Deadpool" franchise has consistently received high Rotten Tomatoes scores, with the first film holding an 85% critics score and the second film holding an 84% critics score.`}
            />
            <MarketsRelateMarket />
            <MarketsComments />
          </Stack>

          <Stack className="sticky border-l border-solid border-borderSubtle p-3 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto">
            <Stack className="gap-7 p-3">
              <Flex className="items-center gap-3 mb-2">
                <Avatar
                  isRounded={false}
                  className="w-[2.5rem] h-auto aspect-1"
                >
                  <AvatarImage src={mockAvatar} />
                  <AvatarFallback />
                </Avatar>
                <Typography.Text>
                  <span className="text-text-support-match">Bet Yes</span>
                  <span>・Before Aug 9</span>
                </Typography.Text>
              </Flex>

              <Stack>
                <Flex className="items-center">
                  <Typography.Text size={13} className="text-text-subtle">
                    Pick a side
                  </Typography.Text>
                  <Svg src="/icons/info_outline.svg" />
                </Flex>
                <Flex>
                  <Button className="w-full" variant="bet_yes">
                    Yes 72
                  </Button>
                  <Button variant="bet_no" className="w-full">
                    No 29
                  </Button>
                </Flex>
              </Stack>

              <UpDownButton label="Price" />

              <Stack className="gap-3">
                <Flex className="justify-between">
                  <Typography.Text size={13} className="text-text-subtle">
                    Contract
                  </Typography.Text>
                  <Typography.Text size={13}>0</Typography.Text>
                </Flex>
                <Flex className="justify-between">
                  <Typography.Text size={13} className="text-text-subtle">
                    Average Price
                  </Typography.Text>
                  <Typography.Text size={13}>$100</Typography.Text>
                </Flex>
                <Flex className="justify-between">
                  <Typography.Text
                    size={13}
                    className="inline-flex gap-1 text-text-subtle"
                  >
                    Payout if Yes wins
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Typography.Text>
                  <Typography.Text size={13}>$0</Typography.Text>
                </Flex>
              </Stack>

              <Button className="w-full">Get Access</Button>
            </Stack>

            <hr className="border-borderSubtle my-5" />

            <Stack>
              <Button variant="ghost" className="w-full justify-start">
                Top Page
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Rule Summary
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                About
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Relate Market
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Idea
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
}
