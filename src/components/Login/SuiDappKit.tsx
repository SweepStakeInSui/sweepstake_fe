/* eslint-disable */
import {
  useConnectWallet,
  useCurrentAccount,
  useSignPersonalMessage,
  useWallets,
} from '@mysten/dapp-kit';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { ConnectionType } from '@/enums/ConnectionType';
import { AuthService } from '@/services/authService';
import { login } from '@/store/profileSlice';

import Flex from '../common/Flex';
import Stack from '../common/Stack';
import Typography from '../common/Typography';
import { useWallet } from '../connectWallet/useWallet';
import { Button } from '../ui/button';

const SuiDappKit = () => {
  const { setWallet } = useWallet();
  const wallets = useWallets();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const { mutate: connect } = useConnectWallet();
  const account = useCurrentAccount();
  const dispatch = useDispatch();
  const loginSuiWallets = async () => {
    if (account) {
      const nonce = await AuthService.getNonce(account.address);
      await signPersonalMessage(
        {
          message: new TextEncoder().encode(nonce),
        },
        {
          onSuccess: async (result) => {
            const { accessToken, refreshToken } = await AuthService.login(
              account.address,
              result.signature,
            );

            dispatch(login({ accessToken, refreshToken }));
            setWallet(ConnectionType.SuiWallet);
          },
        },
      );
    }
  };
  return (
    <Stack className="gap-y-4">
      {wallets.map((wallet) => (
        <div key={wallet.name}>
          <div
            className="w-full"
            onClick={async () => {
              connect(
                { wallet },
                {
                  onSuccess: async () => await loginSuiWallets(),
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
                  <Typography.Text className="text-white" weight="semibold">
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
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default SuiDappKit;
