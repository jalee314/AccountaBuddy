'use server';

import { createSupabaseServerClient } from '../utils/supabase/server';

export async function signInUser({ email, password }) {
  const supabase = await createSupabaseServerClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpUser({ email, password }) {
  const supabase = await createSupabaseServerClient();

  // Construct the redirect URL from the environment variable
  const redirectURL = `${process.env.NEXT_PUBLIC_SITE_URL}/account`;

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectURL, // Use the dynamic URL here
    },
  });
}