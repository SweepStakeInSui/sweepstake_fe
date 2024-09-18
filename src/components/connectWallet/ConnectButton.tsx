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

const ConnectButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Flex>
            <Svg src="/icons/Wallet.svg" className="hidden-lg" />
            Connect Wallet
          </Flex>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[338px] lg:max-w-md lg:pb-10 rounded-lg">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Choose your wallet to connect</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-5">
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
