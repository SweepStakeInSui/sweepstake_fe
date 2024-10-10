import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DatePicker } from '@/components/common/DatePicker';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { UpDownButton } from '@/components/common/UpDownButton';
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
import { Tooltip } from '@/components/ui/tooltip';
import { setBet } from '@/store/betSlice';

interface ISellActionProps {
  isLimit: boolean;
}
const TooltipPrice = () => {
  return (
    <Stack className=" max-w-96">
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          What do the prices mean?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Prices reflect odds of&nbsp;
          <span className="text-text-support-match">72% Yes</span>
          &nbsp;and&nbsp;
          <span className="text-text-support-blue">29% No</span>. If you&#39;re
          right, the payout per contract is $1 (and if not, you get $0).
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          Why don&#39;t they add up to 100?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Slight offsets happen due to market uncertainty. Imagine selling
          lemonade at a stand. You offer $1, the highest you’d pay (bid). The
          seller sets their lowest price $1.20 (ask). The $0.20 gap leaves room
          for bargaining (spread).
        </Typography.Text>
      </div>
    </Stack>
  );
};

const SellAction = ({ isLimit }: ISellActionProps) => {
  const [isSetExpiration, setIsSetExpiration] = useState(false);
  const dispatch = useDispatch();
  const { id, yes, no, type } = useSelector((state: any) => state.bet);

  const onNoClick = (event: any) => {
    event?.stopPropagation();
    dispatch(setBet({ type: 0, id, yes, no }));
  };

  const onYesClick = (event: any) => {
    event?.stopPropagation();
    dispatch(setBet({ type: 1, id, yes, no }));
  };

  return (
    <div>
      <Stack className="gap-0">
        <Stack className="mb-7">
          <Flex className="items-center">
            <Typography.Text size={13} className="text-text-subtle">
              Pick a side
            </Typography.Text>
            <Tooltip content={<TooltipPrice />} side="bottom">
              <div>
                <Svg src="/icons/info_outline.svg" />
              </div>
            </Tooltip>
          </Flex>
          <Flex>
            <Button
              className="w-full"
              variant={`bet_yes${type ? '_active' : ''}`}
              onClick={onYesClick}
            >
              Yes {yes}
            </Button>
            <Button
              variant={`bet_no${!type ? '_active' : ''}`}
              className="w-full"
              onClick={onNoClick}
            >
              No {no}
            </Button>
          </Flex>
        </Stack>

        {isLimit ? (
          <Stack className="gap-y-7">
            <UpDownButton label="Limit Price" placeholder="$0" />
            <UpDownButton label="Share" placeholder="0" />

            <Flex>
              <Checkbox
                id="expiration"
                aria-labelledby="expiration-label"
                onClick={() => setIsSetExpiration(!isSetExpiration)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                id="expiration-label"
                htmlFor="expiration"
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Typography.Text size={15}>Set Expiration</Typography.Text>
              </label>
            </Flex>

            {isSetExpiration && (
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
            )}

            <Stack className="gap-3">
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Estimated Cost
                  <Tooltip content={<p>Includes a fee of $0</p>}>
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Typography.Text size={13}>$100</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Payout if Yes wins
                  <Tooltip
                    content="This market closes when the outcome occurs.
Projected payout 2 hours after closing."
                  >
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Typography.Text size={13}>$0</Typography.Text>
              </Flex>
            </Stack>

            <Button className="w-full">Get Access</Button>
          </Stack>
        ) : (
          <Stack className="gap-y-7">
            <UpDownButton label="Price" placeholder="$0" />

            <Stack className="gap-3">
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Contract
                </Typography.Text>
                <Typography.Text size={13}>$0</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Average Price
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
        )}
      </Stack>
    </div>
  );
};

export default SellAction;
