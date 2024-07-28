import Paper from '@/components/common/Paper';
import Typography from '@/components/common/Typography';

interface IMarketsAboutProps {
  desc: string;
}

export default function MarketsAbout({ desc }: Readonly<IMarketsAboutProps>) {
  return (
    <Paper>
      <Typography.Heading size={24}>About</Typography.Heading>
      <Typography.Text size={15}>{desc}</Typography.Text>
    </Paper>
  );
}
