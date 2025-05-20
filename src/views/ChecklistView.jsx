'use client';

import { useChecklist } from '../src/hooks/useChecklist';

export default function ChecklistView() {
  const { checklists, addChecklist, removeChecklist, addTask, toggleTask, removeTask } = useChecklist();

  return (
    <div className="w-full max-w-xl">
      <button
        onClick={addChecklist}
        className="mb-6 bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800 transition"
      >
        + New Checklist
      </button>

      {checklists.map((c) => (
        <div key={c.id} className="bg-white rounded-2xl p-6 shadow-lg mb-6 transform hover:scale-105 transition">
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
                  <span className={`flex-1 text-left break-words ${t.completed ? 'line-through text-gray-400' : 'text-black'}`}>
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
  );
}
