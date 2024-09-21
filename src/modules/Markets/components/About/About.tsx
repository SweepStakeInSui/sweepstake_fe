import Flex from '@/components/common/Flex';
import { SourceLinks } from '@/components/common/SourceLinks';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

interface IMarketsAboutProps {
  desc: string;
}

export default function MarketsAbout({ desc }: Readonly<IMarketsAboutProps>) {
  return (
    <div>
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
              { title: 'GitHub', url: 'https://github.com' },
              { title: 'DataHub.io', url: 'https://datahub.io' },
              { title: 'Data.gov', url: 'https://data.gov' },
              {
                title: 'U.S. Energy Information Administration (EIA)',
                url: 'https://www.eia.gov',
              },
            ]}
          />
        </Typography.Text>
      </Flex>
    </div>
  );
}
