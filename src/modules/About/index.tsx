'use client';

import {
  ConnectButton,
  useAccounts,
  useAutoConnectWallet,
  useConnectWallet,
  useCurrentWallet,
  useDisconnectWallet,
  useSignAndExecuteTransaction,
  useWallets,
} from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import {
  Ed25519Keypair,
  Ed25519PublicKey,
} from '@mysten/sui.js/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';

export default function AboutModule() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const autoConnectionStatus = useAutoConnectWallet();
  const wallets = useWallets();
  const accounts = useAccounts();
  // const currentAccount = useCurrentAccount();
  console.log(accounts);

  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  // const [digest, setDigest] = useState('');
  const getBalance = async () => {
    const client = new SuiClient({ url: getFullnodeUrl('devnet') });
    const balance = await client.getBalance({
      owner:
        '0x2f371d30a31e95367ccfe382e3bc5466818d34e1909f5af93adcd9aea29132aa',
    });
    return balance;
  };
  const sendTransaction = async () => {
    try {
      const tx = new Transaction();
      // Convert value to be transferred to smallest value.
      const [coin] = tx.splitCoins(tx.gas, [5]);
      tx.transferObjects(
        [coin],
        '0x7d42ef777fa6e46a7b19d54dc9353c898e7f1c65a3abab8b73f92fe5efe6d96d',
      );

      signAndExecuteTransaction(
        {
          transaction: tx,
          chain: 'sui:devnet', // Specify the correct chain if needed
        },
        {
          onSuccess: (result) => {
            console.log('Transaction executed successfully:', result);
            return result.digest;
          },
          onError: (error) => {
            console.error('Transaction failed:', error);
            return error;
          },
        },
      );
      return 123;
    } catch (error) {
      console.error('Transaction failed with error:', error);
      return error as string;
    }
  };
  const getKeypair = () => {
    const keypair = new Ed25519Keypair();
    const bytes = keypair.getPublicKey().toRawBytes();
    const publicKey = new Ed25519PublicKey(bytes);
    const address = publicKey.toSuiAddress();
    const privateKey = keypair.getSecretKey();
    console.log({
      publicKey,
      address,
      privateKey,
    });
  };
  return (
    <div>
      <ConnectButton />
      <div>Auto-connection status: {autoConnectionStatus}</div>
      <button onClick={getBalance}>Get balance</button>
      <button onClick={getKeypair}>Keypair</button>
      <button onClick={sendTransaction}>Sign and execute transaction</button>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.name}>
            <button
              onClick={() => {
                connect(
                  { wallet },
                  {
                    onSuccess: () => console.log('connected'),
                  },
                );
              }}
            >
              Connect to {wallet.name}
            </button>
          </li>
        ))}
      </ul>
      {connectionStatus === 'connected' ? (
        <div>
          <h2>Current wallet:</h2>
          <div>Name: {currentWallet.name}</div>
          <div>
            Accounts:
            <ul>
              {currentWallet.accounts.map((account) => (
                <li key={account.address}>- {account.address}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => disconnect()}>Disconnect</button>
      )}
      <div>
        <h2>Installed wallets</h2>
        {wallets.length === 0 && <div>No wallets installed</div>}
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.name}>{wallet.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
