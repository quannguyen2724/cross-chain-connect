'use client';

import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useDisconnect, useSignMessage } from 'wagmi';
import { mainnet, bsc } from 'wagmi/chains';
import { useState, useEffect } from 'react';

export function WalletConnect() {
  const [ethWallet, setEthWallet] = useState<{ address: string; chainId: number } | null>(null);
  const [bscWallet, setBscWallet] = useState<{ address: string; chainId: number } | null>(null);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  // Update wallet states when connection or chain changes
  useEffect(() => {
    const handleWalletConnection = async () => {
      if (isConnected && address) {
        try {
          // Request signature
          const message = `Sign this message to connect your wallet to Cross Chain Connect. Chain ID: ${chainId}`;
          const signature = await signMessageAsync({ message });

          if (chainId === mainnet.id) {
            setEthWallet({ address, chainId });
          } else if (chainId === bsc.id) {
            setBscWallet({ address, chainId });
          }
        } catch (error) {
          console.error('Failed to sign message:', error);
          disconnect();
        }
      }
    };

    handleWalletConnection();
  }, [isConnected, address, chainId, signMessageAsync, disconnect]);

  const handleDisconnect = (type: 'eth' | 'bsc') => {
    if (type === 'eth') {
      setEthWallet(null);
    } else {
      setBscWallet(null);
    }
    disconnect();
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ethereum Wallet</h3>
          {!ethWallet ? (
            <div className="flex items-center gap-2">
              <ConnectButton 
                chainStatus="icon"
                showBalance={false}
                label="Connect ETH Wallet"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Address: {ethWallet.address.slice(0, 6)}...{ethWallet.address.slice(-4)}
              </p>
              <button
                onClick={() => handleDisconnect('eth')}
                className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">BSC Wallet</h3>
          {!bscWallet ? (
            <div className="flex items-center gap-2">
              <ConnectButton 
                chainStatus="icon"
                showBalance={false}
                label="Connect BSC Wallet"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Address: {bscWallet.address.slice(0, 6)}...{bscWallet.address.slice(-4)}
              </p>
              <button
                onClick={() => handleDisconnect('bsc')}
                className="w-full px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 