import Container from '@/components/common/Container';

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container className="bg-bg-surface">{children}</Container>;
}
