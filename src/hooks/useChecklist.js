'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import {
  addTaskToChecklist,
  toggleTaskInChecklist,
  removeTaskFromChecklist,
  //addChecklistToState,
  //removeChecklistFromState
} from '../controllers/checklistController';

const supabase = createClient();

export const useChecklist = () => {
  const [checklists, setChecklists] = useState([]);
  const [userId, setUserId] = useState(null);

  // Move fetchTasks OUTSIDE useEffect
  const fetchTasks = async (uid) => {
    if (!uid) return;
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', uid);

    if (error) {
      console.error('Failed to fetch tasks:', error);
    } else {
      const tasks = (data || []).map(t => ({
        id: t.task_id ?? t.id,
        title: t.title,
        description: t.description,
        due_date: t.due_date,
        completed: !!t.completed,
        created_at: t.created_at,
        completed_at: t.completed_at,
      }));
      setChecklists([{ id: 1, tasks }]);
    }
  };

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchTasks(user.id);
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        const uid = session?.user?.id;
        setUserId(uid);
        if (uid) fetchTasks(uid);
      }
    }
    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUid = session?.user?.id;
      setUserId(newUid);
      if (newUid) fetchTasks(newUid);
      else setChecklists([]);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    checklists,
    addChecklist: () => addChecklistToState(checklists, setChecklists),
    removeChecklist: (id) => removeChecklistFromState(checklists, setChecklists, id),
    addTask: (cid) => {
    if (!userId) {
        alert('User not loaded yet!');
        return;
      }
      addTaskToChecklist(checklists, setChecklists, cid, userId);
    },
    toggleTask: async (cid, tid) => toggleTaskInChecklist(checklists, setChecklists, cid, tid),
    removeTask: async (cid, tid) => await removeTaskFromChecklist(checklists, setChecklists, cid, tid),
    userId,
  };
};