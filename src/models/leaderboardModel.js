'use client';
import { createClient } from "../utils/supabase/client";

const supabase = createClient();

export const fetchPlayers = async () => {
  const { data: friends, error } = await supabase.from('users').select('*');

  if (error) throw error;

  return friends.map(friend => ({
    name: friend.display_name || 'Anonymous',
    username: friend.username || 'NULL',
    status: friend.status || 'offline',
    avatar: friend.avatar_url || '/avatar_1.png',
    score: friend.score || 0, // ensure score exists for sorting
  }));
};