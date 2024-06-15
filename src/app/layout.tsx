import '@styles/index.scss';
import '@styles/global.scss';

import { contentFont } from '@constants/fonts';
import type { Metadata } from 'next';

import MyLayout from '@/layouts';
import { cn } from '@/lib/utils';

import Providers from './providers';

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
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          contentFont.className,
        )}
      >
        <Providers>
          <MyLayout>{children}</MyLayout>
        </Providers>
      </body>
    </html>
  );
}
