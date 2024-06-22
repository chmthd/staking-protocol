import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider, getSigner } from '../utils/ethers';
import StakingContract from '../contracts/staking.json';
import contractAddress from '../contracts/contract_address.json';
import { StakingContractType } from '../contracts/staking';

const provider = getProvider();

const stakingContract = new ethers.Contract(
  contractAddress.Staking,
  StakingContract.abi,
  provider
) as unknown as StakingContractType;

const StakingComponent = () => {
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');

  const stake = async () => {
    const signer = await getSigner();
    const contractWithSigner = stakingContract.connect(signer);
    const tx = await contractWithSigner.stake({ value: ethers.parseUnits(stakeAmount, 'ether') });
    await tx.wait();
    fetchBalance();
  };

  const withdraw = async () => {
    const signer = await getSigner();
    const contractWithSigner = stakingContract.connect(signer);
    const tx = await contractWithSigner.withdraw(ethers.parseUnits(stakeAmount, 'ether'));
    await tx.wait();
    fetchBalance();
  };

  const fetchBalance = async () => {
    const signer = await getSigner();
    const contractWithSigner = stakingContract.connect(signer);
    const balance = await contractWithSigner.getBalance();
    setBalance(ethers.formatUnits(balance, 'ether'));
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="staking-component">
      <h2>Staking Service</h2>
      <input
        type="text"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Amount to stake"
      />
      <button onClick={stake}>Stake</button>
      <button onClick={withdraw}>Withdraw</button>
      <p>Your Balance: {balance} ETH</p>
    </div>
  );
};

export default StakingComponent;
