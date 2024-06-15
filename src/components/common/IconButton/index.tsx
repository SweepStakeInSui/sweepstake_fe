import { Button } from '@/components/ui/button';

import { Icons } from '../Icon';

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
    <Button>
      <IconComponent />
      <p className="text-[10px] font-medium">{text ?? icon}</p>
    </Button>
  );
}
