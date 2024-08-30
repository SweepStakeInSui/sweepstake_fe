/* eslint-disable */
'use client';

import type { IProvider } from '@web3auth/base';
import {
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { CommonPrivateKeyProvider } from '@web3auth/base-provider';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { useEffect, useState } from 'react';

import SuiRPC from '@/utils/SuiRPC';

import Typography from '../common/Typography';
import { Button } from '../ui/button';
import LoggedIn from './LoggedIn';

const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io

function Web3AuthConnect() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(false);
  const [account, setAccount] = useState<string>('');
  function uiConsole(...args: any[]): void {
    const el = document.querySelector('#console>p');
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }
  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.OTHER,
          chainId: '4c78adac',
          rpcTarget: 'https://fullnode.testnet.sui.io:443',
          displayName: 'Sui Testnet',
          blockExplorerUrl: 'https://suiexplorer.com/?network=testnet',
          ticker: 'SUI',
          tickerName: 'Sui',
          logo: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=029',
        };

        const privateKeyProvider = new CommonPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3AuthInstance = new Web3Auth({
          clientId,
          privateKeyProvider,
          web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
        });

        setWeb3auth(web3AuthInstance);

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            uxMode: 'popup',
            whiteLabel: {
              appName: 'Sweepstack',
              appUrl: 'https://web3auth.io',
              logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
              logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
              defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl, tr
              mode: 'dark', // whether to enable dark mode. defaultValue: auto
              theme: {
                primary: '#00D1B2',
              },
              useLogoLoader: true,
            },
          },
        });

        web3AuthInstance.configureAdapter(openloginAdapter);

        await web3AuthInstance.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: 'openlogin',
              loginMethods: {
                google: {
                  name: 'google login',
                  logoDark:
                    'url to your custom logo which will shown in dark mode',
                },
                facebook: {
                  // it will hide the facebook option from the Web3Auth modal.
                  name: 'facebook login',
                  //   showOnModal: false,
                },
              },
              // setting it to false will hide all social login methods from modal.
              showOnModal: true,
            },
          },
        });

        setProvider(web3AuthInstance.provider);

        if (web3AuthInstance.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3authProvider) {
        const rpc = new SuiRPC(web3authProvider);
        const address = await rpc.getAccounts();
        setAccount(address);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  const privateKey = async () => {
    if (!provider) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const idToken = await provider.request({
      method: 'private_key',
    });
  };
  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };
  // const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  // function sendMessage() {
  //   const txb = new TransactionBlock();

  //   const coin = txb.splitCoins(txb.gas, [10]);
  //   txb.transferObjects([coin], 'Ox...');

  //   signAndExecuteTransaction({
  //     transaction: new Transaction(),
  //   });
  // }
  const logout = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };
  console.log(provider);

  const getChainId = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }

    const rpc = new SuiRPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);

    uiConsole(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);

    uiConsole(balance);
  };
  const getFaucet = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const txHash = await rpc.requestSui(account);
    console.log(txHash);

    uiConsole(`TxHash: ${txHash}`);
  };
  const sendTransaction = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }

    const rpc = new SuiRPC(provider);
    const transactionHash = await rpc.sendTransaction();

    uiConsole(`TxHash: ${transactionHash}`);
  };
  const createBet = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }

    const rpc = new SuiRPC(provider);
    const transactionHash = await rpc.createBet();
    console.log(transactionHash);

    uiConsole(`TxHash: ${transactionHash}`);
  };
  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  const loggedInView = (
    <div>
      <LoggedIn />
      <p onClick={logout}>Logout</p>
      <p onClick={sendTransaction}>Send Transaction</p>
      <p onClick={getFaucet}>getFaucet</p>
      <p onClick={getBalance}>get Balance</p>
      <p onClick={getChainId}>getChainId</p>
      <p onClick={createBet}>createBet</p>

      <p onClick={getPrivateKey}>getPrivateKey</p>
    </div>
  );

  const unloggedInView = (
    <Button className="w-full" variant="secondary" size="lg" onClick={login}>
      <Typography.Text className="text-text-inverse" weight="semibold">
        Connect With Social Wallet
      </Typography.Text>
    </Button>
  );

  return (
    <div className="grid">
      {loggedIn
        ? // <Button
          //   className="w-full"
          //   variant="secondary"
          //   size="lg"
          //   onClick={login}
          // >
          //   <Typography.Text className="text-text-inverse" weight="semibold">
          //     Connect With Social Wallet
          //   </Typography.Text>
          // </Button>
          loggedInView
        : unloggedInView}
    </div>
  );
}

export default Web3AuthConnect;
