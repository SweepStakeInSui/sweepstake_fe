import Flex from '@/components/common/Flex';
import { Icons } from '@/components/common/Icon';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
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

export default function MarketsRulesSummary({
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
      <Stack>
        <Typography.Heading size={24} weight="semibold">
          Rules Summary
        </Typography.Heading>
        <Typography.Text size={15} className="text-text-subtle">
          {desc}
        </Typography.Text>
        <Stack className="border-borderSublest rounded-md border">
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Icons.Link />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Opened on {openOn}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                10:00PM EDT
              </Typography.Text>
            </Stack>
          </Flex>
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Icons.Link />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Opened on {openOn}
              </Typography.Text>
              <Typography.Text size={13} className="text-text-subtle">
                10:00PM EDT
              </Typography.Text>
            </Stack>
          </Flex>
          <Flex className="px-4 py-3 border-b border-borderSublest items-start">
            <Icons.Link />
            <Stack>
              <Typography.Text size={15} weight="medium">
                Opened on {openOn}
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
        <Flex>
          <Button variant="ghost">Hide timeline</Button>
          <Button variant="ghost">View full rule</Button>
        </Flex>
      </Stack>
    </Paper>
  );
}
