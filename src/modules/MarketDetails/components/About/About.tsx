import Flex from '@/components/common/Flex';
import { SourceLinks } from '@/components/common/SourceLinks';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';

interface IMarketsAboutProps {
  desc?: string;
  source?: {
    title: string;
    url: string;
  }[];
}

export default function MarketsAbout({
  desc,
  source,
}: Readonly<IMarketsAboutProps>) {
  return (
    desc && (
      <div>
        <Typography.Heading size={24} className="mb-2">
          About
        </Typography.Heading>
        <Typography.Text size={15} className="text-text-subtle mb-4">
          {desc}
        </Typography.Text>

        {source && source.length > 0 && (
          <Flex className="p-3 items-start rounded-md bg-bg-sublest border border-borderSublest">
            <Svg src="/icons/link.svg" className="size-5" />
            <Typography.Text size={15} className="text-text-subtle">
              {source?.length > 1 ? 'Sources' : 'Source'} from{' '}
              <SourceLinks sources={source} />
            </Typography.Text>
          </Flex>
        )}
      </div>
    )
  );
}
