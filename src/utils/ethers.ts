import { ethers } from 'ethers';

let provider;
if (typeof window !== 'undefined' && window.ethereum !== 'undefined') {
    provider = new ethers.BrowserProvider(window.ethereum);
} else {
    provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');
}

export const getProvider = () => provider;
export const getSigner = async () => (await provider.getSigner()).connect(provider);
