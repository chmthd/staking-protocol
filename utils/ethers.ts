import { ethers } from 'ethers';

let provider;
if (typeof window !== 'undefined' && (window as any).ethereum !== 'undefined') {
    provider = new ethers.BrowserProvider((window as any).ethereum);
} else {
    provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');
}

export const getProvider = () => provider;
export const getSigner = () => provider.getSigner();