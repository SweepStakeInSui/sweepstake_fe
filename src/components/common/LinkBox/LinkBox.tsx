import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { defaultImg } from '@/constants/defaultImg';
import { MarketService } from '@/services/markets';

import Flex from '../Flex';
import Stack from '../Stack';
import Typography from '../Typography';

interface ILinkBoxProps {
  marketId: string;
  href: string;
  title?: string;
  bet?: {
    type: 'yes' | 'no';
    subject: string;
    chance: number;
  };
}

const LinkBox = ({ marketId, href, title, bet }: ILinkBoxProps) => {
  const betType = useMemo(() => {
    return bet?.type === 'yes' ? 'Yes' : 'No';
  }, [bet]);

  const { data: betData } = useQuery({
    queryKey: ['bet', marketId],
    queryFn: async () => MarketService.getMarketDetails(marketId),
    enabled: !!marketId,
  });

  return (
    <Link href={href}>
      <Flex className={`rounded-md bg-btn-bet${betType} p-4`}>
        <div className="relative rounded-md overflow-hidden w-10 h-10">
          <Image src={betData?.image || defaultImg} alt="avt" fill />
        </div>
        <Stack>
          <Typography.Text size={15} className="text-text">
            {title}
          </Typography.Text>
          {bet ? (
            <Typography.Text
              size={13}
              className={`text-text-support-${bet?.type === 'yes' ? 'match' : 'blue'}`}
            >
              {`${betType} • ${bet?.subject} • ${bet?.chance}% Chance`}
            </Typography.Text>
          ) : (
            <Typography.Text size={13}>&nbsp;</Typography.Text>
          )}
        </Stack>
      </Flex>
    </Link>
  );
};

export default LinkBox;
