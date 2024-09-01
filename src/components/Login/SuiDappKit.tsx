import {
  useConnectWallet,
  useCurrentAccount,
  useWallets,
} from '@mysten/dapp-kit';
import Image from 'next/image';

import Flex from '../common/Flex';
import Stack from '../common/Stack';
import Typography from '../common/Typography';
import { Button } from '../ui/button';

const SuiDappKit = () => {
  const wallets = useWallets();
  const account = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  // const { mutate: disconnect } = useDisconnectWallet();
  return (
    <Stack className="gap-y-4">
      {wallets.map((wallet) => (
        <div key={wallet.name}>
          <button
            className="w-full"
            onClick={() => {
              connect(
                { wallet },
                {
                  onSuccess: () => console.log('connected', account),
                },
              );
            }}
          >
            {wallet.name === 'Sui Wallet' && (
              <Button
                className="bg-[#4DA2FF] w-full hover:bg-[#4592E5] active:bg-[#3978bb]"
                size="lg"
              >
                <Flex>
                  <Image
                    src="/images/SuiIcon.png"
                    width={20}
                    height={20}
                    alt="Sui_Icon"
                  />
                  <Typography.Text
                    className="text-text-inverse"
                    weight="semibold"
                  >
                    Connect With Sui Wallet
                  </Typography.Text>
                </Flex>
              </Button>
            )}
            {wallet.name === 'Suiet' && (
              <Button variant="terriary" size="lg" className="w-full">
                <Flex>
                  <Image
                    src="/images/Suiet.png"
                    width={20}
                    height={20}
                    alt="Sui_Icon"
                  />
                  <Typography.Text
                    className="text-text-subtle"
                    weight="semibold"
                  >
                    Connect With Suiet
                  </Typography.Text>
                </Flex>
              </Button>
            )}
          </button>
        </div>
      ))}
    </Stack>
  );
};

export default SuiDappKit;
