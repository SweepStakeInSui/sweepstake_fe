import Image from 'next/image';
import Link from 'next/link';

interface IHomeLogoProps {
  className?: string;
  variant?: 'default' | 'squared';
}

export default function HomeLogo({ variant }: Readonly<IHomeLogoProps>) {
  return (
    <Link href="/">
      {(!variant || variant === 'default') && (
        <div className="relative h-10 aspect-[167/40]">
          <Image src="/logos/sweepstake_footer.svg" alt="logo" fill />
        </div>
      )}
      {variant === 'squared' && (
        <div className="relative w-10 aspect-square">
          <Image src="/logos/square-logo.png" alt="logo" fill />
        </div>
      )}
    </Link>
  );
}
