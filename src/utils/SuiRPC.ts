import type { CoinBalance } from '@mysten/sui.js/client';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui.js/faucet';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { MIST_PER_SUI } from '@mysten/sui.js/utils';
import type { IProvider } from '@web3auth/base';

export default class SuiRPC {
  private provider: IProvider;

  rpcUrl = getFullnodeUrl('testnet');

  suiClient = new SuiClient({ url: this.rpcUrl });

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async createBet(): Promise<any> {
    try {
      const keyPair = await this.getKeyPair();
      const tx = new TransactionBlock();
      const senderAddress = keyPair.toSuiAddress();
      console.log(senderAddress);

      tx.setSender(senderAddress);
      tx.moveCall({
        target:
          '0x621c091c3eb8b07b3df5833d27d1e77d0600ebcb92ea997234d622be1c56bf9e::bet_marketplace::create_bet',
        arguments: [
          tx.pure.string('Bitcoin 60000 USD'),
          tx.pure(1725012006, 'u64'),
          tx.pure(1727699406, 'u64'),
        ],
      });
      const { bytes, signature } = await tx.sign({
        client: this.suiClient,
        signer: keyPair,
      });
      console.log('Transaction signed:', { bytes, signature });

      const result = await this.suiClient.executeTransactionBlock({
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

      return result;
    } catch (error) {
      console.error('Error in createBet:', error);
      return error as string;
    }
  }

  async getChainId(): Promise<string> {
    try {
      // Get the connected Chain's ID
      const chainId = await this.suiClient.getChainIdentifier();
      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const keypair = await this.getKeyPair();
      return keypair.toSuiAddress();
    } catch (error) {
      return error;
    }
  }

  async requestSui(account: string): Promise<any> {
    try {
      const host = getFaucetHost('testnet');

      const response = await requestSuiFromFaucetV1({
        host,
        recipient: account,
      });

      console.log('Response from faucet:', response);
    } catch (error) {
      console.error('Error requesting SUI:', error);
    }
  }

  async getBalance(): Promise<any> {
    try {
      const keypair = await this.getKeyPair();
      const address = keypair.toSuiAddress();
      console.log('Address:', address);
      const suiBalance = await this.suiClient.getBalance({
        owner: keypair.toSuiAddress(),
      });
      return this.balance(suiBalance);
    } catch (error) {
      return error as string;
    }
  }

  // Convert MIST to Sui
  private balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };

  async sendTransaction(): Promise<any> {
    try {
      const keyPair = await this.getKeyPair();
      const tx = new TransactionBlock();
      // Convert value to be transferred to smallest value.
      const [coin] = tx.splitCoins(tx.gas, [
        tx.pure(0.2 * Number(MIST_PER_SUI)),
      ]);
      tx.transferObjects(
        [coin],
        tx.pure(
          '0x7d42ef777fa6e46a7b19d54dc9353c898e7f1c65a3abab8b73f92fe5efe6d96d',
        ),
      );
      const result = await this.suiClient.signAndExecuteTransactionBlock({
        signer: keyPair,
        transactionBlock: tx,
      });
      console.log(result);

      return result.digest;
    } catch (error) {
      return error as string;
    }
  }

  private async getKeyPair(): Promise<Ed25519Keypair> {
    const privateKey = await this.getPrivateKey();
    // Convert private key to Uint8Array
    const privateKeyUint8Array = new Uint8Array(
      privateKey.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16)),
    );

    return Ed25519Keypair.fromSecretKey(privateKeyUint8Array);
  }

  async getPrivateKey(): Promise<any> {
    try {
      return await this.provider.request({
        method: 'private_key',
      });
    } catch (error) {
      return error as string;
    }
  }
}
