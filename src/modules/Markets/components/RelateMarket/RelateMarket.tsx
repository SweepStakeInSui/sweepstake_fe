import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { bets } from '@/mocks/mockBet';

export default function MarketsRelateMarket() {
  return (
    <div>
      <Typography.Heading size={24} weight="semibold" className="mb-4">
        Relate Market
      </Typography.Heading>

      {bets.map((bet) => (
        <div className="flex items-center gap-2 py-3 px-2 mb-4" key={bet.name}>
          <Avatar size="md" isRounded={false}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback />
          </Avatar>
          <div className="text-left">
            <Typography.Text
              size={15}
              weight="semibold"
              className="text-text mb-[2px]"
            >
              {bet.name}
            </Typography.Text>
            <Flex className="gap-x-1">
              <div style={{ width: 12, height: 12 }}>
                <CircularProgressbar
                  value={bet.chance}
                  styles={buildStyles({
                    pathColor: `rgba(1, 70, 244)`,
                  })}
                />
              </div>
              <Typography.Text
                size={13}
                className="text-text-support-blue mr-1"
              >
                {bet.chance} % Chances
              </Typography.Text>
              <Typography.Text size={13} className="text-text-support-green">
                +{bet.count}
              </Typography.Text>
            </Flex>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant="ghost" className="">
          See more
        </Button>
      </div>
    </div>
  );
}
