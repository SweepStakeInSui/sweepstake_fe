import Container from '../../components/common/Container';

export default function MarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container px={0} className="bg-bg-surface">
      {children}
    </Container>
  );
}
