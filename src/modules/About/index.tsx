'use client';

import {
  ConnectButton,
  useSignAndExecuteTransaction,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

import configs from '@/configs';
import { setCookieToken } from '@/utils/token';

export default function AboutModule() {
  const { mutateAsync: signTransaction } = useSignTransaction();
  const client = useSuiClient();
  // const [digest, setDigest] = useState('');
  // const getBalance = async () => {
  //   if (account) {
  //     const client = new SuiClient({ url: getFullnodeUrl('testnet') });
  //     const balance = await client.getBalance({
  //       owner: account.address,
  //     });
  //     console.log(balance);

  //     return balance;
  //   }
  // };
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          // Select additional data to return
          showObjectChanges: true,
        },
      }),
  });

  const handleCreateBet = async () => {
    try {
      const transaction = new Transaction();
      transaction.moveCall({
        target:
          '0x621c091c3eb8b07b3df5833d27d1e77d0600ebcb92ea997234d622be1c56bf9e::bet_marketplace::create_bet',
        arguments: [
          transaction.pure.string('PEPE MEME COIN 2024'),
          transaction.pure.u64(1725012006),
          transaction.pure.u64(1727699406),
        ],
      });
      signAndExecuteTransaction(
        {
          transaction,
          chain: configs.chain,
        },
        {
          onSuccess: (result) => {
            console.log('Transaction executed successfully:', result);
          },
          onError: (error) => {
            console.error('Transaction failed:', error);
          },
        },
      );
    } catch (error) {
      console.error('Error in handleCreateBet:', error);
    }
  };
  const handleCreateBetTEST = async () => {
    try {
      const transaction = new Transaction();
      transaction.setSender(
        '0x2f371d30a31e95367ccfe382e3bc5466818d34e1909f5af93adcd9aea29132aa',
      );
      transaction.moveCall({
        target:
          '0x621c091c3eb8b07b3df5833d27d1e77d0600ebcb92ea997234d622be1c56bf9e::bet_marketplace::create_bet',
        arguments: [
          transaction.pure.string('PEPE MEME COIN 2024'),
          transaction.pure.u64(1725012006),
          transaction.pure.u64(1727699406),
        ],
      });

      console.log('Transaction created:', transaction);

      const { bytes, signature } = await signTransaction({
        transaction,
        chain: configs.chain,
      });
      console.log({
        bytes,
        signature,
      });

      const executeResult = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        requestType: 'WaitForLocalExecution',
        options: {
          showEffects: true,
          showBalanceChanges: true,
          showEvents: true,
          showObjectChanges: true,
        },
      });

      console.log('Transaction executed successfully:', executeResult);
    } catch (error) {
      console.error('Error in createBet:', error);
    }
  };
  return (
    <div>
      <ConnectButton />
      <button onClick={handleCreateBet}>Sign and execute transaction</button>
      <br />
      <button onClick={handleCreateBetTEST}>Sign empty transaction</button>
      <br />
      <button
        onClick={() => {
          setCookieToken('123AT', 'RF');
        }}
      >
        Cookie Set
      </button>
      <br />
    </div>
  );
}
