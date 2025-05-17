'use client';

import { WalletConnect } from './components/WalletConnect';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Cross-Chain Wallet Connection</h1>
      <WalletConnect />
    </div>
  );
}
