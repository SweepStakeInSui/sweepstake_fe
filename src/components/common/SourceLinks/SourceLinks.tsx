import Link from 'next/link';
import React from 'react';

interface SourceLink {
  label: string;
  link: string;
}

interface SourceLinksProps {
  sources: SourceLink[];
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources }) => {
  return (
    <>
      {sources.map((source, index) => (
        <React.Fragment key={source.link}>
          <Link href={source.link} className="text-text-support-blue">
            {source.label}
          </Link>
          {index < sources.length - 2 && ', '}
          {index === sources.length - 2 && ', and '}
        </React.Fragment>
      ))}
    </>
  );
};

export default SourceLinks;
