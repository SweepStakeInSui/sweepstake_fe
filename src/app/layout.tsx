import '@styles/index.scss';
import '@styles/global.scss';
import './globals.css';
import 'react-circular-progressbar/dist/styles.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { PlusJakartaFont } from '@/constants/fonts';
import MyLayout from '@/layouts';
import { cn } from '@/lib/utils';

import Providers from './providers';

export const metadata: Metadata = {
  title: "Sweepstakes | The World's Largest Prediction Market",
  description: 'Bet on your beliefs',
};

interface IRootLayout {
  children: React.ReactElement;
}

export default function RootLayout({ children }: Readonly<IRootLayout>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-8G2LLQCTYN" />
      <body
        className={cn(
          'min-h-screen antialiased bg-bg-primary ',
          PlusJakartaFont.className,
        )}
      >
        <Providers>
          <MyLayout>{children}</MyLayout>
        </Providers>
      </body>
      <Toaster richColors />
    </html>
  );
}
