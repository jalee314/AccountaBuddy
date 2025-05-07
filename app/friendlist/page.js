'use client'

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function FriendlistPage() {
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

  const addChecklist = () => {
    const newChecklist = { id: checklists.length + 1, tasks: [] };
    setChecklists((prev) => [...prev, newChecklist]);
  };

  const removeChecklist = (id) => {
    console.log(`Cleaning up resources for checklist ${id}`);
    setChecklists((prev) => prev.filter((c) => c.id !== id));
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

  return (
    <>
      <div className="border-b border-black">
      <Navbar />
<<<<<<< HEAD
      </div>
      <main className="min-h-screen bg-gradient-to-b from-orange-100 via-green-100 to-green-200 bg-[var(--background)] text-[var(--foreground)] flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col items-start">
          <ul className="space-y-4 w-full">
            <li>
              <a
                href="http://localhost:3000"
                className="block text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 py-2 rounded-md transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 py-2 rounded-md transition"
              >
                Add Friends
              </a>
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
          {/*divider*/}
        

          <hr className="my-4 w-full border-neutral-200 dark:border-neutral-800" />
          <hr/>
          {/* Friends Title */}
            <h2 className="text-lg font-bold text-black dark:text-white mt-4 text-center self-center">Friends</h2>

            <button
                onClick={() => window.location.href = '/friendlist/'}
                className="mt-2 w-full bg-white dark:bg-neutral-900 text-black dark:text-white py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
                John
            </button>
            <button
                onClick={() => window.location.href = '/friendlist/'}
                className="mt-2 w-full bg-white dark:bg-neutral-900 text-black dark:text-white py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
                Jane
            </button>
            <button
                onClick={() => window.location.href = '/friendlist/'}
                className="mt-2 w-full bg-white dark:bg-neutral-900 text-black dark:text-white py-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
                Mike
            </button>
        </aside>

        <section className="flex-1 p-6 flex flex-col items-center">
          <div className="flex justify-end w-full mb-4">
            <button
              onClick={addChecklist}
              className="bg-white text-black font-bold py-2 px-4 rounded-md border border-black transition hover:bg-gray-100"
            >
              Add Checklist
            </button>
          </div>

          {checklists.map((checklist) => (
            <div
              key={checklist.id}
              className="w-full max-w-md bg-black dark:bg-neutral-900 border border-gray-500 p-6 rounded-lg shadow-md mb-6"
            >
=======
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 via-green-100 to-green-200 text-center px-4 py-8">
        {/* Header Buttons */}
        <div className="flex gap-4 mb-8">
          <Link href="#" className="bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800 transition">
            Add Friend
n        </Link>
        </div>
        {/* Checklist Controls */}
        <div className="w-full max-w-lg">
          <button
            onClick={addChecklist}
            className="mb-6 bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800 transition"
          >
            + New Checklist
          </button>

          {checklists.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-6 shadow-lg mb-6 transform hover:scale-105 transition">
>>>>>>> 0d09da8 (Create button and clearn front end.)
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-black">Checklist {c.id}</h2>
                <button
                  onClick={() => removeChecklist(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-1 transition"
                >
                  Remove
                </button>
              </div>
              <ul className="space-y-3">
                {c.tasks.map((t) => (
                  <li key={t.id} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 w-full">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTask(c.id, t.id)}
                        className="h-5 w-5"
                      />
                      <span
                        className={`flex-1 text-left break-words ${
                          t.completed ? 'line-through text-gray-400' : 'text-black'
                        }`}
                      >
                        {t.text}
                      </span>
                    </label>
                    <button
                      onClick={() => removeTask(c.id, t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 transition"
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addTask(c.id)}
                className="mt-4 bg-blue-800 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition"
              >
                + Add Task
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
