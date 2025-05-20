import { fetchPlayers } from '../models/leaderboardModel';

export const getLeaderboardData = async () => {
  try {
    const players = await fetchPlayers();
    return { players, error: null };
  } catch (err) {
    console.error('Error fetching leaderboard data:', err);
    return {
      players: [
        { name: 'Charlie', score: 420, avatar: '/avatar_1.png', status: 'online' },
        { name: 'Pim', score: 23, avatar: '/avatar_2.png', status: 'offline' },
        { name: 'Alan', score: 69, avatar: '/avatar_3.png', status: 'offline' },
        { name: 'Glep', score: 49382, avatar: '/avatar_4.png', status: 'offline' },
        { name: 'Mr. Boss', score: 1023, avatar: '/avatar_5.png', status: 'offline' },
      ],
      error: err.message,
    };
  }
};