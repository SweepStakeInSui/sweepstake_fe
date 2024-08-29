import Image from 'next/image';
import React from 'react';

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
import Typography from '../common/Typography';
import { Button } from '../ui/button';

const ConnectButton = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg">
            <Flex>
              <Svg src="/icons/Wallet.svg" />
              Connect Wallet
            </Flex>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md pb-10">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>Choose your wallet to connect</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-5">
            <Stack className="w-full gap-y-4 ">
              <Button className="bg-[#4DA2FF] w-full" size="lg">
                <Image
                  src="/images/SuiIcon.png"
                  width={20}
                  height={20}
                  alt="Sui_Icon"
                />
                <Flex>
                  <Typography.Text
                    className="text-text-inverse"
                    weight="semibold"
                  >
                    Connect With Sui Wallet
                  </Typography.Text>
                </Flex>
              </Button>
              <Button className="w-full" variant="secondary" size="lg">
                <Typography.Text
                  className="text-text-inverse"
                  weight="semibold"
                >
                  Connect With Social Wallet
                </Typography.Text>
              </Button>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectButton;
