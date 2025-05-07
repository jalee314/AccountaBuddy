'use client';

import Leaderboard from '../../components/Leaderboard';
import Navbar from '../../components/Navbar';

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4 py-8">
        <h2 className="text-4xl font-semibold text-black mb-6">
          Strive to be the most <span className="font-bold text-green-600">accountable</span> buddy out of them all!
        </h2>
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 transform hover:scale-105 transition mb-12">
          <Leaderboard />
        </div>
      </main>
    </>
  );
}
