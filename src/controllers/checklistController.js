import { v4 as uuidv4 } from 'uuid'; // If you need to generate UUIDs for user_id or similar
import { createNewTask, deleteTask } from '../models/checklistModel';

export const addTaskToChecklist = async (checklists, setChecklists, cid, user_id) => {
  const title = prompt('Enter the task title:');
  if (!title) return;

  const description = prompt('Enter a description (optional):') || 'EMPTY';
  const due_date = new Date().toISOString();

  try {
    // Call backend to create the task
    const newTask = await createNewTask({
      user_id,
      title,
      description,
      due_date,
    });

    // Use the returned task (with real id)
    const updated = checklists.map((c) =>
      c.id === cid ? { ...c, tasks: [...c.tasks, {
        id: newTask.task_id, // Use the id from Supabase
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.due_date,
        completed: newTask.completed,
        created_at: newTask.created_at,
        completed_at: newTask.completed_at,
      }] } : c
    );

    setChecklists(updated);
  } catch (error) {
    alert('Failed to create task: ' + (error.message || JSON.stringify(error)));
  }
};

export const toggleTaskInChecklist = (checklists, setChecklists, cid, tid) => {
  const updated = checklists.map((c) =>
    c.id === cid
      ? {
          ...c,
          tasks: c.tasks.map((t) =>
            t.id === tid
              ? {
                  ...t,
                  completed: !t.completed,
                  completed_at: !t.completed ? new Date().toISOString() : null,
                }
              : t
          ),
        }
      : c
  );

  setChecklists(updated);
};

export async function removeTaskFromChecklist(checklists, setChecklists, checklistId, taskId) {
  if (!taskId) {
    alert('Task ID is undefined. Cannot remove this task.');
    return;
  }
  try {
    await deleteTask(taskId);
    setChecklists(
      checklists.map(cl =>
        cl.id === checklistId
          ? { ...cl, tasks: cl.tasks.filter(task => task.id !== taskId) }
          : cl
      )
    );
  } catch (error) {
    console.error('Failed to delete task:', error);
    alert('Failed to delete task: ' + (error.message || JSON.stringify(error)));
  }
}