import Flex from '@/components/common/Flex';
import { SourceLinks } from '@/components/common/SourceLinks';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import type { ISourceData } from '@/services/markets/types';

interface IPreviewBetAboutProps {
  desc: string;
  sources: ISourceData[];
}

export default function PreviewBetAbout({
  desc,
  sources,
}: Readonly<IPreviewBetAboutProps>) {
  return (
    <div>
      <Typography.Heading size={24} className="mb-2">
        About
      </Typography.Heading>
      <Typography.Text size={15} className="text-text-subtle mb-4">
        {desc}
      </Typography.Text>

      {sources.length > 0 && (
        <Flex className="p-3 items-start rounded-md bg-dyb-0 border border-borderSublest">
          <Svg src="/icons/link.svg" className="size-5" />
          <Typography.Text size={15} className="text-text-subtle">
            Sources from <SourceLinks sources={sources} />
          </Typography.Text>
        </Flex>
      )}
    </div>
  );
}
