'use client';

import { createClient } from '../utils/supabase/client';
import { fetchUserProfile } from '../models/userModel';

const supabase = createClient();

export const getUserAndProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, userData: null };

  const profile = await fetchUserProfile(user.id);

  const userData = {
    name: profile?.real_name || '',
    display_name: profile?.display_name || '',
    email: profile?.email || user.email,
  };

  return { user, userData };
};

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  }).data.subscription;
};