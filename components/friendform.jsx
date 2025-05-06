'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AddFriendForm({ onFriendAdded }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // First get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to add friends');
      }

      // Find the user with the provided email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        throw new Error('User not found with that email');
      }

      // Check if friendship already exists
      const { data: existingFriendship, error: friendshipError } = await supabase
        .from('friends')
        .select('*')
        .or(`and(user1.eq.${user.id},user2.eq.${userData.id}),and(user1.eq.${userData.id},user2.eq.${user.id})`);

      if (friendshipError) throw friendshipError;
      if (existingFriendship && existingFriendship.length > 0) {
        throw new Error('You are already friends with this user');
      }

      // Create the friendship
      const { error: insertError } = await supabase
        .from('friends')
        .insert([
          { 
            user1: user.id, 
            user2: userData.id,
            status: 'pending'
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setEmail('');
      if (onFriendAdded) {
        onFriendAdded(); // Refresh friend list in parent component
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-black dark:text-white mb-4">Add New Friend</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Friend's Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
            required
            placeholder="Enter your friend's email"
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        
        {success && (
          <div className="text-green-500 text-sm">Friend request sent successfully!</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Add Friend'}
        </button>
      </form>
    </div>
  );
}