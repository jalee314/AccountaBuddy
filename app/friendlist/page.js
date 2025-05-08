'use client'
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function FriendlistPage() {

  // Checklists state

  const [checklists, setChecklists] = useState([
    {
      id: 1,
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: false },
        { id: 3, text: 'Task 3', completed: false },
      ],
    },
  ]);

  // Friends state
  const [friends, setFriends] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClientComponentClient();

  const addChecklist = () => {
    const newChecklist = { id: checklists.length + 1, tasks: [] };
    setChecklists((prev) => [...prev, newChecklist]);
  };

  const removeChecklist = (checklistId) => {
    console.log(`Cleaning up resources for checklist ${checklistId}`);
    setChecklists((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== checklistId)
    );

  };

  const addTask = (cid) => {
    const name = prompt('Enter the task name:');
    if (!name) return;
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid
          ? { ...c, tasks: [...c.tasks, { id: c.tasks.length + 1, text: name, completed: false }] }
          : c
      )
    );
  };

  const toggleTask = (cid, tid) => {
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              tasks: c.tasks.map((t) => (t.id === tid ? { ...t, completed: !t.completed } : t)),
            }
          : c
      )
    );
  };

  const removeTask = (cid, tid) => {
    setChecklists((prev) =>
      prev.map((c) =>
        c.id === cid ? { ...c, tasks: c.tasks.filter((t) => t.id !== tid) } : c
      )
    );
  };


  // Friend functions
  const handleAddFriend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to add friends');

      // Find user by email
      const { data: friendUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', friendEmail)
        .single();

      if (userError || !friendUser) throw new Error('User not found');

      // Check if friendship exists
      const { data: existingFriendship } = await supabase
        .from('friends')
        .select('*')
        .or(`and(user1.eq.${user.id},user2.eq.${friendUser.id}),and(user1.eq.${friendUser.id},user2.eq.${user.id})`);

      if (existingFriendship && existingFriendship.length > 0) {
        throw new Error('You are already friends with this user');
      }

      // Add friend
      const { error: insertError } = await supabase
        .from('friends')
        .insert([{ 
          user1: user.id, 
          user2: friendUser.id,
          status: 'pending' 
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFriendEmail('');
      setShowAddFriend(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col items-start">
          <ul className="space-y-4 w-full">
            <li>
              <a
                href="#"
                className="block text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 py-2 rounded-md transition"
              >
                Home
              </a>
            </li>
            <li>
              <button
                onClick={() => setShowAddFriend(!showAddFriend)}
                className="w-full block text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 py-2 rounded-md transition"
              >
                Add Friends
              </button>
            </li>
            <li>
              <a
                href="#"
                className="block text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 py-2 rounded-md transition"
              >
                Settings
              </a>
            </li>
          </ul>

          <hr className="my-4 w-full border-neutral-200 dark:border-neutral-800" />
          
          <h2 className="text-lg font-bold text-black dark:text-white mt-4 text-center self-center">Friends</h2>

          {friends.map(friend => (
            <button
              key={friend.id}
              onClick={() => window.location.href = `/friendlist/${friend.id}`}
              className="mt-2 w-full bg-white dark:bg-neutral-900 text-black dark:text-white py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {friend.name}
            </button>
          ))}
        </aside>

        <section className="flex-1 p-6 flex flex-col items-center">
          {showAddFriend ? (
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">Add New Friend</h2>
              <form onSubmit={handleAddFriend} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Friend's Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white"
                    required
                    placeholder="Enter your friend's email"
                  />
                </div>
                
                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">Friend request sent!</div>}

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddFriend(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Sending...' : 'Add Friend'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="flex justify-end w-full mb-4">
                <button
                  onClick={addChecklist}
                  className="bg-white text-black font-bold py-2 px-4 rounded-md transition hover:bg-gray-100"
                >
                  Add Checklist
                </button>
              </div>

              {checklists.map((checklist) => (
                <div
                  key={checklist.id}
                  className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg shadow-md mb-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => addTask(checklist.id)}
                      title="Add Checklist Item"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                      +
                    </button>

                    <h2 className="text-lg font-bold text-black dark:text-white flex-1 text-center">
                      Checklist {checklist.id}
                    </h2>
                    <button
                      onClick={() => removeChecklist(checklist.id)}
                      title="remove checklist"
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
                    >
                      Remove
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {checklist.tasks.map((task) => (
                      <li key={task.id} className="flex items-center justify-between">
                        <div className="flex items-center w-full overflow-hidden">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(checklist.id, task.id)}
                            className="mr-2"
                          />
                          <span
                            className={`${
                              task.completed
                                ? 'line-through text-gray-500 dark:text-gray-400'
                                : ''
                            } break-words whitespace-normal overflow-hidden text-ellipsis`}
                            style={{ maxWidth: 'calc(100% - 50px)' }}
                          >
                            {task.text}
                          </span>
                        </div>
                        <button
                          onClick={() => removeTask(checklist.id, task.id)}
                          title="Remove Checklist Item"
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
                        >
                          -
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
    </>
  );
}
