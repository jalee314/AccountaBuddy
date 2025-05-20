'use client';

import Image from 'next/image';
import { useLeaderboardController } from '../src/hooks/useLeaderboardController';

export default function LeaderboardView() {
  const { sortedPlayers, loading, error } = useLeaderboardController();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Loading buddies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-4xl shadow-xl p-6 max-w-5xl w-full mx-auto mt-20 mb-10">
        <p className="text-red-500">Error: {error}</p>
        <p>Showing fallback data</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-4xl shadow-xl p-6 max-w-5xl w-full mx-auto mt-20 mb-10">
      <h1 className="text-2xl font-bold text-black mb-6 text-center">
        Current Leaderboard
      </h1>
      <ul className="space-y-2.5">
        {sortedPlayers.map((player, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl shadow-sm border ${
              index === 0
                ? 'bg-yellow-50 border-yellow-300 border-2'
                : index === 1
                ? 'bg-gray-50 border-zinc-400 border-2'
                : index === 2
                ? 'bg-orange-50 border-yellow-700 border-2'
                : 'bg-purple-50 border-green-200'
            }`}
          >
            <div className="flex items-center gap-4.5">
              <Image
                src={player.avatar}
                alt={`${player.name} avatar`}
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-black font-medium">{player.name}</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              {player.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}