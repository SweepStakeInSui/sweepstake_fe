import { ConnectModal } from '@mysten/dapp-kit';
import Image from 'next/image';

import Flex from '../common/Flex';
import Typography from '../common/Typography';
import { Button } from '../ui/button';

const SuiDappKit = () => {
  return (
    <ConnectModal
      trigger={
        <Button
          className="bg-[#4DA2FF] w-full hover:bg-[#4592E5] active:bg-[#3978bb]"
          size="lg"
        >
          <Image
            src="/images/SuiIcon.png"
            width={20}
            height={20}
            alt="Sui_Icon"
          />
          <Flex>
            <Typography.Text className="text-text-inverse" weight="semibold">
              Connect With Sui Wallet
            </Typography.Text>
          </Flex>
        </Button>
      }
    />
  );
};

export default SuiDappKit;
