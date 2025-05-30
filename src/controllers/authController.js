'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signInUser, signUpUser } from '../models/authModel';

export async function handleLogin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error } = await signInUser({ email, password });
  if (error) redirect('/error');

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function handleSignup(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const { error: signUpError } = await signUpUser({ email, password });
  if (signUpError) redirect('/error');

  // Automatically sign in the user after sign up
  const { error: signInError } = await signInUser({ email, password });
  if (signInError) redirect('/error');

  revalidatePath('/', 'layout');
  redirect('/account');
}