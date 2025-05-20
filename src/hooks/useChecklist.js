'use client';

import { useState } from 'react';
import {
  addChecklistToState,
  removeChecklistFromState,
  addTaskToChecklist,
  toggleTaskInChecklist,
  removeTaskFromChecklist,
} from '../controllers/checklistController';

export const useChecklist = () => {
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: false },
      ],
    },
  ]);

  return {
    checklists,
    addChecklist: () => addChecklistToState(checklists, setChecklists),
    removeChecklist: (id) => removeChecklistFromState(checklists, setChecklists, id),
    addTask: (cid) => addTaskToChecklist(checklists, setChecklists, cid),
    toggleTask: (cid, tid) => toggleTaskInChecklist(checklists, setChecklists, cid, tid),
    removeTask: (cid, tid) => removeTaskFromChecklist(checklists, setChecklists, cid, tid),
  };
};
