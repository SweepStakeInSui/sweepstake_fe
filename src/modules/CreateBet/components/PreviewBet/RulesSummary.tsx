import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

interface IRulesSummaryProps {
  desc: string;
  openOn: string;
  closeOn: string;
  payoutOn: string;
  series: string;
  event: string;
  market: string;
}

export default function PreviewBetRulesSummary({
  desc,
  openOn,
  closeOn,
  payoutOn,
  series,
  event,
  market,
}: Readonly<IRulesSummaryProps>) {
  return (
    <Paper>
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
        <Stack className="border-borderSublest rounded-md border mb-5">
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Svg src="/icons/lock_open.svg" />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Opened on {openOn}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                10:00PM EDT
              </Typography.Text>
            </Stack>
          </Flex>
          <Flex className="px-4 py-3 items-start">
            <Svg src="/icons/lock_outline.svg" />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Closes by {closeOn}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                10:00PM EDT
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
          <Flex className="px-4 py-3">
            <Flex>
              <Typography.Text size={13} className="text-text-subtle">
                Series:
              </Typography.Text>
              <Typography.Text size={13} className="text-icon-support-blue">
                {series}
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text size={13} className="text-text-subtle">
                Event:
              </Typography.Text>
              <Typography.Text size={13} className="text-icon-support-blue">
                {event}
              </Typography.Text>
            </Flex>
            <Flex>
              <Typography.Text size={13} className="text-text-subtle">
                Market:
              </Typography.Text>
              <Typography.Text size={13} className="text-icon-support-blue">
                {market}
              </Typography.Text>
            </Flex>
          </Flex>
        </Stack>
        <Flex className="gap-0">
          <Button variant="ghost">Hide timeline</Button>
          <Button variant="ghost">View full rule</Button>
        </Flex>
      </Stack>
    </Paper>
  );
}
