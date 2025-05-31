import { createBrowserClient } from '@supabase/ssr';

let clientInstance; // Variable to hold the singleton instance

export function createClient() {
  // If an instance already exists, return it
  if (clientInstance) {
    return clientInstance;
  }

  // Otherwise, create a new instance, store it, and then return it
  clientInstance = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  return clientInstance;
}