import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Root } from '@/components/Root/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import { GlobalStateProvider } from '@/context/GlobalStateContext'; // Global state sağlayıcısını içe aktar

export const metadata: Metadata = {
  title: 'Maggoo',
  description: 'Maggoo Land is a community driven decentralized P2E gaming platform with upgradable NFT cult characters called Maggoo.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </head>
    <body>
    <GlobalStateProvider>
      <Root>
        {children}
      </Root>
      </GlobalStateProvider>
    </body>
    </html>
  );
}
