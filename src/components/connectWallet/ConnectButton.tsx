import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Flex from '../common/Flex';
import Stack from '../common/Stack';
import Svg from '../common/Svg';
import { Web3AuthConnect } from '../Login';
import SuiDappKit from '../Login/SuiDappKit';
import { Button } from '../ui/button';

interface IConnectButtonProps {
  hasIcon?: boolean;
  content?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const ConnectButton = ({
  hasIcon = true,
  content = 'Connect Wallet',
  className,
  variant,
  disabled,
}: IConnectButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant={variant}
          className={className}
          disabled={disabled}
        >
          <Flex>
            {hasIcon && (
              <Svg src="/icons/Wallet.svg" className="hidden-mobile" />
            )}
            {content}
          </Flex>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[338px] lg:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Choose your wallet to connect</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 p-4 lg:pt-5 lg:pb-10 lg:px-6">
          <Stack className="w-full gap-y-4 ">
            <SuiDappKit />
            <Web3AuthConnect setOpen={setOpen} />
          </Stack>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectButton;
