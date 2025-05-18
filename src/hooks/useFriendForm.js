'use client';

import { useState } from 'react';
import { sendFriendRequest } from '../controllers/friendController';

export const useFriendForm = (onFriendAdded) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendFriendRequest(email);
      setSuccess(true);
      setEmail('');
      onFriendAdded?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    success,
    handleSubmit,
  };
};
