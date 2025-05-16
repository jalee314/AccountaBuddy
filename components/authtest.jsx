'use client'
import { createClient } from '../utils/supabase/client';
import { useEffect, useState } from 'react'

export default function AuthStatus() {
  const supabase = createClient()
  const [userData, setUserData] = useState({
    name: '',
    display_name: '',
    email: ''
  })
  const [user, setUser] = useState(null); // Initialize as null

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Get auth user
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        
        if (user) {
          // 2. Fetch profile data
          const { data, error } = await supabase
            .from('users')
            .select('display_name, real_name, email')
            .eq('user_id', user.id)
            .single()

          if (error) throw error
          
          // 3. Update state INSIDE the async function
          setUserData({
            name: data?.real_name || '',
            display_name: data?.display_name || '',
            email: data?.email || user.email
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }

    checkAuth()

    // Auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      // Optionally refresh user data on auth change ?()
      if (session?.user) checkAuth() 
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <div>
      {user ? `Welcome Back ${userData.name}!` : "Not logged in"}
    </div>
  )
}