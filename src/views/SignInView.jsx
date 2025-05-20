'use client';

import Image from 'next/image';
import { handleLogin } from '../controllers/authController';
import { useAuthStatus } from '../hooks/useAuthStatus'; 

export default function SignInView() {
  const { user, userData } = useAuthStatus();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="Accountabuddy Logo" width={64} height={64} className="mb-3 rounded-md" />
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          {user && <p className="text-sm text-gray-500">Welcome back, {userData.name}!</p>}
        </div>
        <form className="flex flex-col gap-4">
          <input type="email" name="email" placeholder="Email" className="form-input" />
          <input type="password" name="password" placeholder="Password" className="form-input" />
          <button formAction={handleLogin}>Log in</button>
          <a href="/signUp" className="text-sm mt-2 text-center underline">Don't have an account? Sign up</a>
          <h2>Forgot Password?</h2>
        </form>
      </div>
    </main>
  );
}