'use client';

import { createClient } from '../utils/supabase/client';

export const fetchUserProfile = async (userId) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('display_name, real_name, email, profile_pic_src')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};