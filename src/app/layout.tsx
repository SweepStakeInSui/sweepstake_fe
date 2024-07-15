import '@styles/index.scss';
import '@styles/global.scss';
import './globals.css';

import type { Metadata } from 'next';

import MyLayout from '@/layouts';

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
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <MyLayout>{children}</MyLayout>
        </Providers>
      </body>
    </html>
  );
}
