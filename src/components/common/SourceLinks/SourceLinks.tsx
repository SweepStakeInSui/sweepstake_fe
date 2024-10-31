import Link from 'next/link';
import React from 'react';

interface SourceLink {
  title: string;
  url: string;
}

interface SourceLinksProps {
  sources?: SourceLink[];
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  return sources?.map((source, index) => (
    <React.Fragment key={source?.url}>
      <Link href={source?.url || ''} className="text-text-support-blue">
        {source?.title}
      </Link>
      {index < Number(sources?.length) - 2 && ', '}
      {index === Number(sources?.length) - 2 && ', and '}
    </React.Fragment>
  ));
};

export default SourceLinks;
