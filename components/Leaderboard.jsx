'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await axios.get('/api/get-users');
        console.log('Fetched players:', response.data);

        if (response.data.success) {
          setPlayers(response.data.players);
        } else {
          console.error('Backend error:', response.data.error);
        }
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading leaderboard...</div>;
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
            <span className="text-black font-medium text-lg">{player.username}</span>
            <span className="text-xl font-bold text-gray-800">
              {player.score} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}