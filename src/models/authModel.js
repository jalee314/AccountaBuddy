'use server';

import { createSupabaseServerClient } from '../utils/supabase/server';

export async function signInUser({ email, password }) {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpUser({ email, password }) {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.signUp({ email, password, options: {emailRedirectTo: 'http://localhost:3000/account'}  });
}