import MarketsLayout from '@/app/markets/[id]/layout';
import MarketsModule from '@/modules/Markets';

interface MarketsPageProps {
  params: {
    id: string;
  };
}

export default function MarketsPage({ params }: MarketsPageProps) {
  const { id } = params;
  return (
    <MarketsLayout>
      <MarketsModule id={id} />
    </MarketsLayout>
  );
}
