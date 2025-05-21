'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  addTaskToChecklist,
  toggleTaskInChecklist,
  removeTaskFromChecklist
  // removeChecklistFromState, // Only include if it exists
} from '../controllers/checklistController';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const useChecklist = () => {
  //using backend data
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        console.error('Failed to fetch tasks:', error);
      } else {
        setChecklists([{ id: 1, tasks: data }]); // Adjust structure as needed
      }
    };
    fetchTasks();
  }, []);

  //pre-set for testing
  /*
  const [checklists, setChecklists] = useState([
    {
      id: 1,
      tasks: [
        { id: 1, text: 'Task 1', completed: false },
        { id: 2, text: 'Task 2', completed: false },
      ],
    },
  ]);
  */
  return {
    checklists,
    addChecklist: () => addChecklistToState(checklists, setChecklists),
    removeChecklist: (id) => removeChecklistFromState(checklists, setChecklists, id),
    addTask: (cid) => addTaskToChecklist(checklists, setChecklists, cid),
    toggleTask: (cid, tid) => toggleTaskInChecklist(checklists, setChecklists, cid, tid),
    removeTask: (cid, tid) => removeTaskFromChecklist(checklists, setChecklists, cid, tid),
  };
};
