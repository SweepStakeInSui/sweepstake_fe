import { useRouter } from 'next/navigation';

import { Icons } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';

export default function HomeLogo() {
  const router = useRouter();

  return (
    <Button
      className="px-0"
      onClick={() => {
        router.push('/');
      }}
    >
      <Icons.Logo />
    </Button>
  );
}
