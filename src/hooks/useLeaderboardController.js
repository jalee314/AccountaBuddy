'use client';

import { useState, useEffect } from 'react';
import { getLeaderboardData } from '../controllers/leaderboardController';

export const useLeaderboardController = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { players, error } = await getLeaderboardData();
      setPlayers(players);
      setError(error);
      setLoading(false);
    };
    load();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return { sortedPlayers, loading, error };
};