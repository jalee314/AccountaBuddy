// components/AuthStatus.jsx
'use client';

import { useAuthStatus } from '../src/hooks/useAuthStatus';

export default function AuthStatus() {
  const { user, userData } = useAuthStatus();

  return (
    <div className="text-sm text-gray-700">
      {user ? `Welcome back, ${userData.name || userData.display_name || userData.email}!` : 'Not logged in'}
    </div>
  );
}