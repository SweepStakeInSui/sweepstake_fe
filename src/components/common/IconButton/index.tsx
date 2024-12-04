import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';

import Stack from '../Stack';

interface IconButtonProps extends ButtonProps {
  children?: React.ReactNode;
  isRounded?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function IconButton({
  children,
  isRounded,
  className,
  onClick,
  disabled,
}: Readonly<IconButtonProps>): React.ReactElement {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`h-full p-2 hover:bg-elevation-a100 dark:hover:bg-elevation-a800 ${isRounded ? 'rounded-full' : ''} ${className}`}
      disabled={disabled}
    >
      <Stack className="items-center gap-1">{children}</Stack>
    </Button>
  );
}
