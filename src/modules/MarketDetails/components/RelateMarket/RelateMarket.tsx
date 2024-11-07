import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { defaultImg } from '@/constants/defaultImg';
import { ROUTE } from '@/constants/routes';
import { MarketService } from '@/services/markets';
import { handleBignumber } from '@/utils/handleBignumber';

interface RelateMarketProps {
  marketId?: string;
  categories?: string[];
}

export default function MarketsRelateMarket({
  marketId,
  categories,
}: RelateMarketProps) {
  const formattedCategories = useMemo(
    () => categories?.map((cate) => cate).join(', '),
    [categories],
  );

  const { data: relateMarkets } = useQuery({
    queryKey: ['relate-market', categories],
    queryFn: () =>
      MarketService.getMarket({
        page: 1,
        limit: 5,
        category: formattedCategories,
      }),
  });

  const filterRelateMarkets = useMemo(
    () => relateMarkets?.data.items.filter((market) => market.id !== marketId),
    [relateMarkets, marketId],
  );

  return (
    filterRelateMarkets &&
    filterRelateMarkets.length > 0 && (
      <div>
        <Typography.Heading size={24} weight="semibold" className="mb-4">
          Relate Market
        </Typography.Heading>

        {filterRelateMarkets.map((market) => (
          <Link
            href={`${ROUTE.MARKETS}/${market.id}`}
            className="flex items-center gap-2 py-3 px-2 mb-4 hover:bg-bg-sublest transition-all rounded-sm overflow-hidden"
            key={market.name}
          >
            <Avatar size="md" isRounded={false}>
              <AvatarImage src={market.image || defaultImg} />
              <AvatarFallback />
            </Avatar>
            <div className="text-left">
              <Typography.Text
                size={15}
                weight="semibold"
                className="text-text mb-[2px]"
              >
                {market.name}
              </Typography.Text>
              <Flex className="gap-x-1">
                <div style={{ width: 12, height: 12 }}>
                  <CircularProgressbar
                    value={Number(
                      handleBignumber.divideDecimal(market.percentage),
                    )}
                    styles={buildStyles({
                      pathColor: `rgba(1, 70, 244)`,
                    })}
                  />
                </div>
                <Typography.Text
                  size={13}
                  className="text-text-support-blue mr-1"
                >
                  {Number(handleBignumber.divideDecimal(market.percentage))}%
                  Chances
                </Typography.Text>
                {/* TODO: update when have data */}
                {/* <Typography.Text size={13} className="text-text-support-green">
                  +50
                </Typography.Text> */}
              </Flex>
            </div>
          </Link>
        ))}

        <div className="flex justify-center">
          <Link
            href={`${ROUTE.MARKETS}?category=${formattedCategories}`}
            className=""
          >
            See more
          </Link>
        </div>
      </div>
    )
  );
}
