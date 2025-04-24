"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function friendlistPage() {
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
    const newChecklist = {
      id: checklists.length + 1,
      tasks: [],
    };
    setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
  };

  const removeChecklist = (checklistId) => {
    // Perform any necessary cleanup here
    console.log(`Cleaning up resources for checklist ${checklistId}`);
  
    // Remove the checklist from the state
    setChecklists((prevChecklists) =>
      prevChecklists.filter((checklist) => checklist.id !== checklistId)
    );
  };

  const addTask = (checklistId) => {
    const taskName = prompt('Enter the task name:');
    if (taskName) {
      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) =>
          checklist.id === checklistId
            ? {
                ...checklist,
                tasks: [
                  ...checklist.tasks,
                  {
                    id: checklist.tasks.length + 1,
                    text: taskName,
                    completed: false,
                  },
                ],
              }
            : checklist
        )
      );
    }
  };

  const toggleTask = (checklistId, taskId) => {
    setChecklists((prevChecklists) =>
      prevChecklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              tasks: checklist.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : checklist
      )
    );
  };

  const removeTask = (checklistId, taskId) => {
    setChecklists((prevChecklists) =>
      prevChecklists.map((checklist) =>
        checklist.id === checklistId
          ? {
              ...checklist,
              tasks: checklist.tasks.filter((task) => task.id !== taskId),
            }
          : checklist
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

        <section className="flex-1 p-6 flex flex-col items-center">
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
                  title="Add Checklist Item" // Tooltip text
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition"
                >
                  +
                </button>
                <h2 className="text-lg font-bold text-black dark:text-white flex-1 text-center">
                  Checklist {checklist.id}
                </h2>
                <button
                  onClick={() =>removeChecklist(checklist.id)}
                  title="remove checklist" // Tooltip text
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition"
                  >
                    Remove
                  </button>
              </div>
              <ul className="space-y-2">
                {checklist.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between"
                  >
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
                      title="Remove Checklist Item" // Tooltip text
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition"
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}