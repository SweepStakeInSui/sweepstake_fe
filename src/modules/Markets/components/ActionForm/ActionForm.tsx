import React from 'react';

import { DatePicker } from '@/components/common/DatePicker';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { UpDownButton } from '@/components/common/UpDownButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimePicker } from '@/components/ui/time-picker';
import { mockAvatar } from '@/mocks/mockAvatar';

const MarketsActionForm = () => {
  return (
    <Stack className="sticky border-l border-solid border-borderSubtle p-3 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto">
      <Stack className="gap-4 p-3">
        <Flex className="items-center gap-3 mb-2">
          <Avatar isRounded={false} className="w-[2.5rem] h-auto aspect-1">
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

        <UpDownButton label="Price" placeholder="$0" />
        <UpDownButton label="Share" placeholder="0" />

        <Flex>
          <Checkbox id="expiration" aria-labelledby="expiration-label" />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            id="expiration-label"
            htmlFor="expiration"
            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Typography.Text size={15}>Set Expiration</Typography.Text>
          </label>
        </Flex>

        <Stack>
          <Select>
            <SelectTrigger className="rounded-md border border-field-border bg-field-background h-[3.375rem]">
              <SelectValue placeholder="End of day" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="End of day">End of day</SelectItem>
                <SelectItem value="End of day">End of day</SelectItem>
                <SelectItem value="End of day">End of day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <DatePicker />
            </div>
            <div className="col-span-1">
              <TimePicker />
            </div>
          </div>
        </Stack>

        <Stack className="gap-3">
          <Flex className="justify-between">
            <Typography.Text
              size={13}
              className="inline-flex items-center gap-1 text-text-subtle"
            >
              Estimated Cost
              <span>
                <Svg src="/icons/info_outline.svg" />
              </span>
            </Typography.Text>
            <Typography.Text size={13}>$100</Typography.Text>
          </Flex>
          <Flex className="justify-between">
            <Typography.Text
              size={13}
              className="inline-flex items-center gap-1 text-text-subtle"
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
  );
};

export default MarketsActionForm;
