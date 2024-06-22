import { ethers } from 'ethers';

export interface StakingContractType extends ethers.Contract {
  stake: (options: { value: ethers.BigNumberish }) => Promise<ethers.ContractTransaction>;
  withdraw: (amount: ethers.BigNumberish) => Promise<ethers.ContractTransaction>;
  getBalance: () => Promise<ethers.BigNumber>;
}