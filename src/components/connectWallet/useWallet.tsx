import { useDisconnectWallet } from '@mysten/dapp-kit';
import type { IProvider } from '@web3auth/base';
import { WALLET_ADAPTERS, WEB3AUTH_NETWORK } from '@web3auth/base';
import { CommonPrivateKeyProvider } from '@web3auth/base-provider';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import configs from '@/configs';
import { LOCAL_STORE_WALLET } from '@/constants/wallet';
import { ConnectionType } from '@/enums/ConnectionType';
import { AuthService } from '@/services/authService';
import { login, logout } from '@/store/profileSlice';
import SuiRPC from '@/utils/SuiRPC';

const clientId =
  'BB_0JmJ47swnx-mQw-YL8HWv4_fVhKR3bt7GDIxy_qTKjl8eVkzAqCdLdMfw57EbhglY0zCnS75vy4ssnYZHIEA';
interface WalletContextProps {
  walletType: ConnectionType | null;
  web3auth: Web3Auth | null;
  provider: IProvider | null;
  loginWeb3Auth: () => Promise<void>;
  setWallet: (wallet: ConnectionType) => void;
  onDisconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const ConnectWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const [walletType, setWalletType] = useState<ConnectionType | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const { mutate: disconnect } = useDisconnectWallet();

  useEffect(() => {
    const init = async () => {
      try {
        const { chainConfig } = configs;

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

        // if (web3AuthInstance.connected) {
        //   setLoggedIn(true);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  const loginWeb3Auth = useCallback(async () => {
    if (!web3auth) {
      return;
    }
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);

      if (web3authProvider) {
        const rpc = new SuiRPC(web3authProvider);
        const address = await rpc.getAccounts();
        const nonce = await AuthService.getNonce(address);
        const signature = await rpc.signPersonalMessage(nonce);
        const { accessToken, refreshToken } = await AuthService.login(
          address,
          signature,
        );
        dispatch(login({ accessToken, refreshToken }));
        setWalletType(ConnectionType.Web3Auth);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [web3auth, dispatch]);

  useEffect(() => {
    if (walletType) localStorage.setItem(LOCAL_STORE_WALLET, walletType);
  }, [walletType]);
  const setWallet = useCallback((wallet: ConnectionType) => {
    setWalletType(wallet);
  }, []);
  const onDisconnect = useCallback(async () => {
    if (walletType === ConnectionType.Web3Auth) {
      if (!web3auth) {
        return;
      }
      await web3auth.logout();
    } else if (walletType === ConnectionType.SuiWallet) {
      disconnect();
    }
    dispatch(logout());
    setWalletType(null);
  }, [walletType, web3auth, disconnect, dispatch]);
  const contextValue = useMemo(
    () => ({
      walletType,
      web3auth,
      provider,
      loginWeb3Auth,
      setWallet,
      onDisconnect,
    }),
    [walletType, web3auth, provider, loginWeb3Auth, setWallet, onDisconnect],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a ConnectWalletProvider');
  }
  return context;
};
