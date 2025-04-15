// app/friendlist/page.js
'use client';
import Navbar from '../../components/Navbar'; // adjust path if needed
import { useState } from 'react';

export default function friendlistPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false },
    { id: 3, text: 'Task 3', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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

        {/* Main Content */}
        <section className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4 text-center">Checklist</h2>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}