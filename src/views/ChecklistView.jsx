'use client';

import { useChecklist } from '../hooks/useChecklist';

export default function ChecklistView() {
  const { checklists, addChecklist, removeChecklist, addTask, toggleTask, removeTask, userId } = useChecklist();

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
            {c.tasks.map((t, idx) => (
              <li key={t.id ?? idx} className="flex flex-col items-start border-b border-gray-200 pb-2 last:border-b-0">
                <div className="flex items-center justify-between w-full">
                  <label className="flex items-center gap-3 flex-grow cursor-pointer">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(c.id, t.id)}
                      className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className={`flex-1 text-left break-words ${t.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                      {t.title}
                    </span>
                  </label>
                  <button
                    onClick={() => {
                      if (t.id === undefined) {
                        alert('Task ID is undefined. Cannot remove this task.');
                        return;
                      }
                      removeTask(c.id, t.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center transition text-sm ml-2 flex-shrink-0"
                    aria-label="Remove task"
                  >
                    -
                  </button>
                </div>
                {t.description && t.description !== 'EMPTY' && (
                  <p className="ml-8 mt-1 text-sm text-gray-600 break-words w-full text-left pr-2">
                    {t.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => addTask(c.id)}
            className="mt-4 bg-blue-800 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition"
            disabled={!userId}
          >
            {!userId ? 'Loading...' : '+ Add Task'}
          </button>
        </div>
      ))}
    </div>
  );
}