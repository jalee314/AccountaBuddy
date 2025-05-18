'use client';

import { createClient } from '../utils/supabase/client';

const supabase = createClient();

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('You must be logged in');
  return user;
};

export const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (error || !data) throw new Error('User not found with that email');
  return data;
};

export const checkExistingFriendship = async (id1, id2) => {
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .or(`and(user1.eq.${id1},user2.eq.${id2}),and(user1.eq.${id2},user2.eq.${id1})`);

  if (error) throw error;
  return data;
};

export const insertFriendship = async (user1, user2) => {
  const { error } = await supabase
    .from('friends')
    .insert([{ user1, user2, status: 'pending' }]);

  if (error) throw error;
};