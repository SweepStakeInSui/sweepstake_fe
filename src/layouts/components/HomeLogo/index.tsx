import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IHomeLogoProps {
  className?: string;
  variant?: 'default' | 'squared';
}

export default function HomeLogo({
  className,
  variant,
}: Readonly<IHomeLogoProps>) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn('p-0', className)}
      onClick={() => {
        router.push('/');
      }}
    >
      {(!variant || variant === 'default') && <Icons.Logo />}
      {variant === 'squared' && (
        <div className="relative w-10 aspect-square">
          <Image src="/logos/square-logo.svg" alt="logo" fill />
        </div>
      )}
    </Button>
  );
}
