import Image from "next/image";
import StakingComponent from '../components/StakingComponent';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <header className="w-full mx-auto py-6 flex justify-between items-center bg-gray-100 rounded-lg px-4">
        <h1 className="text-3xl font-bold">aurora</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect wallet</button>
      </header>

      <section className="w-full max-w-5xl mx-auto my-8">
        <StakingComponent />
      </section>

      <footer className="w-full max-w-5xl mx-auto py-6 flex justify-center items-center bg-white rounded-lg px-4">
        <p className="text-sm text-gray-500">&copy; 2024 Staking Service. All rights reserved.</p>
      </footer>
    </main>
  );
}