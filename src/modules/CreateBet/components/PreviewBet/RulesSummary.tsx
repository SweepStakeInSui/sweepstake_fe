import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import type { ICategoryList } from '@/services/categoryService';

import { Separator } from '../../../../components/ui/separator';

interface IRulesSummaryProps {
  desc: string;
  startDate: string;
  startClock: string;
  endDate: string;
  endClock: string;
  payoutOn: string;
  category?: ICategoryList[];
}

export default function PreviewBetRulesSummary({
  desc,
  startDate,
  startClock,
  endDate,
  endClock,
  payoutOn,
  category,
}: Readonly<IRulesSummaryProps>) {
  return (
    <Stack className="gap-0">
      <Typography.Heading tag="h5" size={24} weight="semibold" className="mb-2">
        Rules Summary
      </Typography.Heading>
      <div className="text-wrap">
        <Typography.Text size={15} className="text-text-subtle mb-5">
          {desc}
        </Typography.Text>
      </div>
      <Stack className="border-borderSublest rounded-md border">
        <Flex className="px-4 py-3 border-b border-borderSublest items-start">
          <Svg src="/icons/lock_open.svg" />
          <Stack>
            <Typography.Text size={15} weight="medium">
              Opened on {startDate}
            </Typography.Text>
            <Typography.Text size={13} className="text-text-subtle">
              {startClock}
            </Typography.Text>
          </Stack>
        </Flex>
        <Flex className="px-4 py-3 items-start border-b border-borderSublest">
          <Svg src="/icons/lock_outline.svg" />
          <Stack>
            <Typography.Text size={15} weight="medium">
              Closes by {endDate}
            </Typography.Text>
            <Typography.Text size={13} className="text-text-subtle">
              {endClock}
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
              -- EDT
            </Typography.Text>
          </Stack>
        </Flex>
        {category && category?.length > 0 && (
          <Flex className="px-4 py-3">
            <Flex className="flex-wrap">
              <Typography.Text size={13} className="text-text-subtle">
                {category && category?.length > 1
                  ? 'Categories: '
                  : 'Category: '}
              </Typography.Text>
              {category?.map((item, index) => (
                <>
                  <Typography.Text
                    size={13}
                    className="text-icon-support-blue"
                    key={item.id}
                  >
                    {item.name}
                  </Typography.Text>
                  {category.length - 1 !== index && (
                    <Separator orientation="vertical" className="size-1" />
                  )}
                </>
              ))}
            </Flex>
          </Flex>
        )}
      </Stack>
    </Stack>
  );
}
