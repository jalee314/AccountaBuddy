'use client';

import { useFriendForm } from '../src/hooks/useFriendForm';

export default function AddFriendForm({ onFriendAdded }) {
  const { email, setEmail, loading, error, success, handleSubmit } = useFriendForm(onFriendAdded);

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

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">Friend request sent successfully!</div>}

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