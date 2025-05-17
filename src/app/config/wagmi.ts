import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Cross Chain Connect',
  projectId: 'b90b663591c825943fdf1ebb5a8a8cf5',
  chains: [mainnet, bsc],
  ssr: true,
}); 