import MarketsLayout from '@/app/markets/[id]/layout';
import MarketDetailsModule from '@/modules/MarketDetails';

interface MarketsPageProps {
  params: {
    id: string;
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
