import type { Web3Auth } from '@web3auth/modal';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ConnectionType } from '@/enums/ConnectionType';

interface WalletContextProps {
  walletType: ConnectionType | null;
  web3Auth: Web3Auth | null;
  setProvider: (web3Auth: Web3Auth | null, type: ConnectionType) => void;
  clearConnection: () => void;
}

const LOCAL_STORE_ACCOUNT = 'walletType';
const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const ConnectWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletType, setWalletType] = useState<ConnectionType | null>(null);
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);

  const setProvider = (authInstance: Web3Auth | null, type: ConnectionType) => {
    setWeb3Auth(authInstance);
    setWalletType(type);
    localStorage.setItem(LOCAL_STORE_ACCOUNT, type);
  };

  const clearConnection = () => {
    setWeb3Auth(null);
    setWalletType(null);
    localStorage.removeItem(LOCAL_STORE_ACCOUNT);
  };

  useEffect(() => {
    const storedWalletType = localStorage.getItem(
      LOCAL_STORE_ACCOUNT,
    ) as ConnectionType;
    if (
      Object.values(ConnectionType).includes(storedWalletType as ConnectionType)
    ) {
      setWalletType(storedWalletType as ConnectionType);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      walletType,
      web3Auth,
      setProvider,
      clearConnection,
    }),
    [walletType, web3Auth],
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
