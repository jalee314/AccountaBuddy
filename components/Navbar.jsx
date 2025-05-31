// components/Navbar.jsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../src/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const getInitialUser = async () => {
      try {
        const { data: { user: fetchedUser }, error } = await supabase.auth.getUser();
        if (error) {
          setUser(null);
        } else {
          setUser(fetchedUser || null);
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    getInitialUser();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <nav className="w-full px-6 py-4 flex justify-between items-center shadow-sm bg-white" style={{ height: '72px' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center shadow-sm bg-white">
      <div className="flex items-center space-x-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Accountabuddy logo"
            width={40}
            height={40}
            className="rounded-md"
            priority
          />
        </Link>
        <span className="text-xl font-bold text-black">Accountabuddy</span>
      </div>

      <div className="flex items-center space-x-6 text-sm text-black font-medium">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/leaderboard" className="hover:underline">Leaderboard</Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <img
                src="/avatar_1.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link
                href="/account"
                className="py-2 text-blue-600 hover:underline"
              >
                My Account
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="px-4 py-2 text-red-600 hover:underline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/signIn"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}