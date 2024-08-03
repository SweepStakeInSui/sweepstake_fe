import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import { SourceLinks } from '@/components/common/SourceLinks';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

interface IMarketsAboutProps {
  desc: string;
}

export default function MarketsAbout({ desc }: Readonly<IMarketsAboutProps>) {
  return (
    <Paper>
      <Typography.Heading size={24} className="mb-2">
        About
      </Typography.Heading>
      <Typography.Text size={15} className="text-text-subtle mb-4">
        {desc}
      </Typography.Text>

      <Flex className="p-3 items-start rounded-md bg-dyb-0 border border-borderSublest">
        <Svg src="/icons/link.svg" className="size-5" />
        <Typography.Text size={15} className="text-text-subtle">
          Sources from{' '}
          <SourceLinks
            sources={[
              { label: 'GitHub', link: 'https://github.com' },
              { label: 'DataHub.io', link: 'https://datahub.io' },
              { label: 'Data.gov', link: 'https://data.gov' },
              {
                label: 'U.S. Energy Information Administration (EIA)',
                link: 'https://www.eia.gov',
              },
            ]}
          />
        </Typography.Text>
      </Flex>
    </Paper>
  );
}
