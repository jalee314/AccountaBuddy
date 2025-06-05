'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAcceptedFriends } from '../src/controllers/friendController';
import { createChecklist } from '../src/controllers/checklistController';

export default function CreateChecklistForm({ onChecklistCreated, onCancel }) {
  const [title, setTitle] = useState('');
  const [designatedFriendId, setDesignatedFriendId] = useState('');
  const [friends, setFriends] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchFriends = useCallback(async () => {
    setIsLoadingFriends(true);
    const friendsData = await getAcceptedFriends();
    setFriends(friendsData || []);
    setIsLoadingFriends(false);
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Checklist name is required.' });
      return;
    }
    if (!designatedFriendId) {
      setMessage({ type: 'error', text: 'Please select a friend.' });
      return;
    }
    setIsSubmitting(true);
    const result = await createChecklist(title, designatedFriendId);
    setIsSubmitting(false);
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setTitle('');
      setDesignatedFriendId('');
      if (onChecklistCreated) onChecklistCreated(result.checklist);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to create checklist.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-black">Create New Checklist</h3>
      <div>
        <label htmlFor="checklistTitle" className="block text-sm font-medium text-gray-700">Checklist Name</label>
        <input type="text" id="checklistTitle" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm text-black" disabled={isSubmitting}/>
      </div>
      <div>
        <label htmlFor="assignToFriend" className="block text-sm font-medium text-gray-700">Assign to Friend</label>
        {isLoadingFriends ? <p className="text-sm text-gray-500">Loading friends...</p> : friends.length === 0 ? <p className="text-sm text-gray-500">Add friends to assign checklists.</p> : (
          <select id="assignToFriend" value={designatedFriendId} onChange={(e) => setDesignatedFriendId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 sm:text-sm rounded-md text-black" disabled={isSubmitting}>
            <option value="" disabled>Select a friend</option>
            {friends.map((friend) => (<option key={friend.user_id} value={friend.user_id}>{friend.display_name || friend.email}</option>))}
          </select>
        )}
      </div>
      {message.text && (<p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>)}
      <div className="flex items-center justify-end space-x-3">
        {onCancel && (<button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>)}
        <button type="submit" disabled={isSubmitting || isLoadingFriends || friends.length === 0} className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm disabled:bg-gray-400">
          {isSubmitting ? 'Creating...' : 'Create Checklist'}
        </button>
      </div>
    </form>
  );
}
