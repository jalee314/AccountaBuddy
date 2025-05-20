'use client';

import { createNewChecklist, createNewTask } from '../models/checklistModel';

export const addChecklistToState = (checklists, setChecklists) => {
  const newChecklist = createNewChecklist(checklists.length + 1);
  setChecklists([...checklists, newChecklist]);
};

export const removeChecklistFromState = (checklists, setChecklists, id) => {
  console.log(`Cleaning up resources for checklist ${id}`);
  setChecklists(checklists.filter((c) => c.id !== id));
};

export const addTaskToChecklist = (checklists, setChecklists, cid) => {
  const name = prompt('Enter the task name:');
  if (!name) return;

  const updated = checklists.map((c) =>
    c.id === cid ? { ...c, tasks: [...c.tasks, createNewTask(c.tasks, name)] } : c
  );

  setChecklists(updated);
};

export const toggleTaskInChecklist = (checklists, setChecklists, cid, tid) => {
  const updated = checklists.map((c) =>
    c.id === cid
      ? {
          ...c,
          tasks: c.tasks.map((t) =>
            t.id === tid ? { ...t, completed: !t.completed } : t
          ),
        }
      : c
  );

  setChecklists(updated);
};

export const removeTaskFromChecklist = (checklists, setChecklists, cid, tid) => {
  const updated = checklists.map((c) =>
    c.id === cid
      ? { ...c, tasks: c.tasks.filter((t) => t.id !== tid) }
      : c
  );

  setChecklists(updated);
};