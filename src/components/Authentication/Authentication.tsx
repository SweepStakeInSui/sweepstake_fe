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

import Flex from '../common/Flex';
import { Button } from '../ui/button';
import LoggedIn from './LoggedIn';

const clientId =
  'BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ'; // get from https://dashboard.web3auth.io

function Authentication() {
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
          chainId: 'fd2adfa8',
          rpcTarget: 'https://fullnode.devnet.sui.io:443',
          displayName: 'Sui Devnet',
          blockExplorerUrl: 'https://suiexplorer.com/?network=devnet',
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
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
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

  const logout = async () => {
    if (!web3auth) {
      uiConsole('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const chainId = await rpc.getChainId();
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
    uiConsole(balance);
  };
  const getFaucet = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const txHash = await rpc.requestSui(account);
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

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole('provider not initialized yet');
      return;
    }
    const rpc = new SuiRPC(provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  const loggedInView = <LoggedIn />;

  const unloggedInView = (
    <Flex>
      <Button variant="ghost" onClick={login} className="card">
        Log In
      </Button>
      <Button>Sign up</Button>
    </Flex>
  );

  return <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>;
}

export default Authentication;
