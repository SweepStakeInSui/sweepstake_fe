import type { Metadata, ResolvingMetadata } from 'next';

import MarketsLayout from '@/app/markets/[id]/layout';
import MarketDetailsModule from '@/modules/MarketDetails';

interface MarketsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: MarketsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const market = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/market/${params.id}`,
  )
    .then((res) => res.json())
    .then((res) => res.data);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Sweepstakes | ${market.name}`,
    description: `Follow market predictions for "${market.name}", or join the trading action yourself.`,
    twitter: {
      site: 'https://x.com/Sweepstakes_Mkt',
      images: [market.image, ...previousImages],
    },
    metadataBase: new URL('https://app.sweepstakes.market/'),
    openGraph: {
      title: `Sweepstakes | ${market.name}`,
      description: `Follow market predictions for "${market.name}", or join the trading action yourself.`,
      images: [market.image, ...previousImages],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function MarketsPage({ params }: MarketsPageProps) {
  // TODO: use useParams
  const { id } = params;
  return (
    <MarketsLayout>
      <MarketDetailsModule id={id} />
    </MarketsLayout>
  );
}
