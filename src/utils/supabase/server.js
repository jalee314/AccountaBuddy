import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: async () => await cookieStore.getAll(),
        setAll: async (newCookies) => {
          try {
            for (const { name, value, options } of newCookies) {
              await cookieStore.set(name, value, options)
            }
          } catch (error) {
            console.error('Failed to set cookies:', error)
          }
        }
      }
    }
  )
}