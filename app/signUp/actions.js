'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '../../utils/supabase/server'

export async function signup(formData) {
    const supabase = await createSupabaseServerClient()
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    const { error } = await supabase.auth.signUp(data)
    if (error) {
      redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/account')
  }