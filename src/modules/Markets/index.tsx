import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';

import MarketsAbout from './components/About';
import MarketsDetail from './components/Detail';
import MarketsRelateMarket from './components/RelateMarket';
import MarketsRulesSummary from './components/RulesSummary';

export default function MarketsModule() {
  return (
    <Container>
      <div className="grid grid-cols-12">
        <Stack className="col-span-9">
          <MarketsDetail />
          <MarketsAbout desc="This is a description of the markets module" />
          <MarketsRulesSummary
            desc="text"
            openOn="2021-09-20"
            closeOn="2021-09-20"
            payoutOn="2021-09-20"
            series="2021-09-20"
            event="2021-09-20"
            market="2021-09-20"
          />
          <MarketsRelateMarket />
        </Stack>
        <Stack className="col-span-3">
          <Paper>
            <Stack>
              <Typography.Text>Pick a side</Typography.Text>
              <Flex>
                <Button className="w-full">Yes 72</Button>
                <Button variant="bet_no" className="w-full">
                  No 29
                </Button>
              </Flex>
              <Stack>
                <Flex className="justify-between">
                  <Typography.Text className="text-text-subtle">
                    Contract
                  </Typography.Text>
                  <Typography.Text>0</Typography.Text>
                </Flex>
                <Flex className="justify-between">
                  <Typography.Text className="text-text-subtle">
                    Average Price
                  </Typography.Text>
                  <Typography.Text>$100</Typography.Text>
                </Flex>
                <Flex className="justify-between">
                  <Typography.Text className="text-text-subtle">
                    Payout if Yes wins
                  </Typography.Text>
                  <Typography.Text>$0</Typography.Text>
                </Flex>
                <Button className="w-full">Get Access</Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
}
