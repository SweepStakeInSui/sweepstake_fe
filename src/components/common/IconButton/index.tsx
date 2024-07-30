import { Button } from '@/components/ui/button';

import Stack from '../Stack';

interface IconButtonProps {
  children?: React.ReactNode;
  isRounded?: boolean;
}

export default function IconButton({
  children,
  isRounded,
}: Readonly<IconButtonProps>): React.ReactElement {
  return (
    <Button
      variant="ghost"
      className={`h-full p-2 hover:bg-elevation-a100 dark:hover:bg-elevation-a800 ${isRounded ? 'rounded-full' : ''}`}
    >
      <Stack className="items-center gap-1">{children}</Stack>
    </Button>
  );
}
