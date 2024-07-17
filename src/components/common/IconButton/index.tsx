import { Button } from '@/components/ui/button';

import { Icons } from '../Icon';
import Stack from '../Stack';

interface IconButtonProps {
  icon: keyof typeof Icons;
  text?: string;
}

export default function IconButton({
  icon,
  text,
}: Readonly<IconButtonProps>): React.ReactElement {
  const IconComponent = Icons[icon];

  return (
    <Button
      variant="ghost"
      className="h-full p-2 hover:bg-elevation-a100 dark:hover:bg-elevation-a800"
    >
      <Stack className="items-center gap-1">
        <IconComponent />
        {text && (
          <p className="text-xs font-bold text-elevation-a500">
            {text ?? icon}
          </p>
        )}
      </Stack>
    </Button>
  );
}
