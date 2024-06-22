"use client";

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
  const [error, setError] = useState<string>('');

  const stake = async () => {
    try {
      const signer = await getSigner();
      const contractWithSigner = stakingContract.connect(signer);
      const tx = await contractWithSigner.stake({ value: ethers.parseUnits(stakeAmount, 'ether') });
      await tx.wait();
      fetchBalance();
      setStakeAmount('');
    } catch (err) {
      setError('Staking failed. Ensure you have enough ETH and try again.');
    }
  };

  const withdraw = async () => {
    try {
      const signer = await getSigner();
      const contractWithSigner = stakingContract.connect(signer);
      const tx = await contractWithSigner.withdraw(ethers.parseUnits(stakeAmount, 'ether'));
      await tx.wait();
      fetchBalance();
      setStakeAmount('');
    } catch (err) {
      setError('Withdrawal failed. Ensure you have enough staked balance and try again.');
    }
  };

  const fetchBalance = async () => {
    try {
      const signer = await getSigner();
      const contractWithSigner = stakingContract.connect(signer);
      const balance = await contractWithSigner.getBalance();
      setBalance(ethers.formatUnits(balance, 'ether'));
    } catch (err) {
      setError('Failed to fetch balance.');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Stake Ether</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="ETH amount"
        className="w-full p-4 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={stake}
        className="w-full bg-blue-500 text-white p-4 rounded hover:bg-blue-600 mb-4"
      >
        Stake
      </button>
      <button
        onClick={withdraw}
        className="w-full bg-red-500 text-white p-4 rounded hover:bg-red-600 mb-4"
      >
        Withdraw
      </button>
      <p className="text-center text-lg mt-4">Your Balance: {balance} ETH</p>
    </div>
  );
};

export default StakingComponent;