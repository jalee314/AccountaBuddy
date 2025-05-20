'use client';

import { useEffect, useState } from 'react';
import { getUserAndProfile, onAuthStateChange } from '../controllers/authStatusController';

export const useAuthStatus = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const load = async () => {
    const { user, userData } = await getUserAndProfile();
    setUser(user);
    setUserData(userData);
  };

  useEffect(() => {
    load();

    const subscription = onAuthStateChange(() => {
      load();
    });

    return () => subscription?.unsubscribe();
  }, []);

  return { user, userData };
};