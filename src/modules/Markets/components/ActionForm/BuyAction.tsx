import React, { useState } from 'react';

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

interface IBuyActionProps {
  isLimit: boolean;
}

const BuyAction = ({ isLimit }: IBuyActionProps) => {
  const [isSetExpiration, setIsSetExpiration] = useState(false);

  return (
    <div>
      <Stack className="gap-0">
        <Stack className="mb-7">
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

export default BuyAction;
