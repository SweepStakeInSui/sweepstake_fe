'use client';

import '@mysten/dapp-kit/dist/index.css';

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import NextAdapterApp from 'next-query-params/app';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { QueryParamProvider } from 'use-query-params';

import { ConnectWalletProvider } from '@/components/connectWallet/useWallet';
import configs from '@/configs';
import { ThemeProvider } from '@/contexts/themeContext';
import store from '@/store';

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
});
interface ProvidersProps {
  children: React.ReactElement;
}
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
        notifyOnChangeProps: 'all',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
export default function Providers({ children }: Readonly<ProvidersProps>) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense>
        <QueryParamProvider adapter={NextAdapterApp}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <SuiClientProvider
                networks={networkConfig}
                defaultNetwork={configs.network}
              >
                <WalletProvider autoConnect storageKey="mysten-dapp-wallet">
                  <ConnectWalletProvider>{children}</ConnectWalletProvider>
                </WalletProvider>
              </SuiClientProvider>
              <ProgressBar
                height="2px"
                color="#EB201E"
                options={{ showSpinner: false }}
                shallowRouting
              />
              <ReactQueryDevtools />
            </Provider>
          </QueryClientProvider>
        </QueryParamProvider>
      </Suspense>
    </ThemeProvider>
  );
}
