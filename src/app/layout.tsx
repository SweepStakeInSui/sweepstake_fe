import '@styles/index.scss';
import '@styles/global.scss';
import './globals.css';
import 'react-circular-progressbar/dist/styles.css';

import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';

import ProgressBar from '@/components/ProgressBar';
import { PlusJakartaFont } from '@/constants/fonts';
import MyLayout from '@/layouts';
import { cn } from '@/lib/utils';

import Providers from './providers';
import QueryProviders from './queryProvider';

export const metadata: Metadata = {
  title: "Sweepstake | The World's Largest Prediction Market",
  description: 'Bet on your beliefs',
};

interface IRootLayout {
  children: React.ReactElement;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-8G2LLQCTYN" />
      <ProgressBar />
      <body
        className={cn(
          'min-h-screen antialiased bg-bg-primary ',
          PlusJakartaFont.className,
        )}
      >
        <QueryProviders>
          <Providers>
            <MyLayout>{children}</MyLayout>
          </Providers>
        </QueryProviders>
      </body>
    </html>
  );
}
