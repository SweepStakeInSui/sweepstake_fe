'use client';

import Typography from '../common/Typography';
import { useWallet } from '../connectWallet/useWallet';
import { Button } from '../ui/button';

interface Web3AuthConnectProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Web3AuthConnect: React.FC<Web3AuthConnectProps> = ({ setOpen }) => {
  const { loginWeb3Auth } = useWallet();

  // const createBet = async () => {
  //   if (!provider) {
  //     uiConsole('provider not initialized yet');
  //     return;
  //   }

  //   const rpc = new SuiRPC(provider);
  //   const transactionHash = await rpc.createBet();
  //   console.log(transactionHash);

  //   uiConsole(`TxHash: ${transactionHash}`);
  // };
  const handleLoginWeb3Auth = async () => {
    setOpen(false);
    await loginWeb3Auth();
  };

  return (
    <Button
      className="w-full"
      variant="secondary"
      size="lg"
      onClick={handleLoginWeb3Auth}
    >
      <Typography.Text className="text-text-inverse" weight="semibold">
        Connect With Social Wallet
      </Typography.Text>
    </Button>
  );
};

export default Web3AuthConnect;
