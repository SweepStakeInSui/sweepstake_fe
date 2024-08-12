'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import NextAdapterApp from 'next-query-params/app';
import { Suspense } from 'react';
import { QueryParamProvider } from 'use-query-params';

import { ThemeProvider } from '@/contexts/themeContext';

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

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
export default function Providers({ children }: Readonly<ProvidersProps>) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
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
            {children}
            <ProgressBar
              height="2px"
              color="#EB201E"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </QueryParamProvider>
      </Suspense>
    </ThemeProvider>
  );
}
