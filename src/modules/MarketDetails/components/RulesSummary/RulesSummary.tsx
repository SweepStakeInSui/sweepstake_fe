import { format } from 'date-fns';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Separator } from '@/components/ui/separator';

interface IRulesSummaryProps {
  desc: string;
  openOn?: number;
  closeOn?: number;
  payoutOn: string;
  categories?: string[];
}

export default function MarketsRulesSummary({
  desc,
  openOn,
  closeOn,
  payoutOn,
  categories,
}: Readonly<IRulesSummaryProps>) {
  return (
    <div>
      <Stack className="gap-0">
        <Typography.Heading
          tag="h5"
          size={24}
          weight="semibold"
          className="mb-2"
        >
          Rules Summary
        </Typography.Heading>
        <Typography.Text size={15} className="text-text-subtle mb-5">
          {desc}
        </Typography.Text>
        <Stack className="border-borderSublest rounded-md border">
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Svg src="/icons/lock_open.svg" />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Opened on{' '}
                {openOn ? format(new Date(openOn * 1000), 'yyyy-MM-dd') : ''}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                {openOn ? format(new Date(openOn * 1000), 'HH:mm aa') : ''}
              </Typography.Text>
            </Stack>
          </Flex>
          <Flex className="px-4 py-3 items-start border-b border-borderSublest">
            <Svg src="/icons/lock_outline.svg" />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Closes by
                {closeOn ? format(new Date(closeOn * 1000), 'yyyy-MM-dd') : ''}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                {closeOn ? format(new Date(closeOn * 1000), 'HH:mm aa') : ''}
              </Typography.Text>
            </Stack>
          </Flex>
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Svg src="/icons/attach_money.svg" />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Projected payout on {payoutOn}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                10:00PM EDT
              </Typography.Text>
            </Stack>
          </Flex>

          {categories && categories?.length > 0 && (
            <Flex className="px-4 py-3">
              <Flex>
                <Typography.Text size={13} className="text-text-subtle">
                  {categories && categories?.length > 1
                    ? 'Categories: '
                    : 'Category: '}
                </Typography.Text>
                {categories?.map((category, index) => (
                  <Flex key={category + index.toString()}>
                    <Typography.Text
                      size={13}
                      className="text-icon-support-blue"
                      key={category + index.toString()}
                    >
                      {category}
                    </Typography.Text>
                    {categories.length - 1 !== index && (
                      <Separator orientation="vertical" className="size-1" />
                    )}
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Stack>
      </Stack>
    </div>
  );
}