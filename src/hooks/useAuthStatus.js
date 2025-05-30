// src/hooks/useAuthStatus.js
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getUserAndProfile, onAuthStateChange as controllerOnAuthStateChange } from '../controllers/authStatusController';

export const useAuthStatus = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAuthData = useCallback(async () => {
    try {
      const { user: authUser, userData: profileData } = await getUserAndProfile();
      setUser(authUser);
      setUserData(profileData);
    } catch (error) {
      console.error("Error fetching auth data in useAuthStatus:", error);
      setUser(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshAuthData();

    const subscription = controllerOnAuthStateChange((event, session) => {
      setLoading(true);
      refreshAuthData();
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [refreshAuthData]);

  return { user, userData, loading };
};