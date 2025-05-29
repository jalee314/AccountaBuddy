import { v4 as uuidv4 } from 'uuid'; // If you need to generate UUIDs for user_id or similar
import { createNewTask, deleteTask, updateTaskStatus } from '../models/checklistModel';

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

export const toggleTaskInChecklist = async (checklists, setChecklists, cid, tid) => {
  let taskToUpdate;
  let currentChecklist;

  // Find the task to determine its current completed status
  for (const c of checklists) {
    if (c.id === cid) {
      currentChecklist = c;
      for (const t of c.tasks) {
        if (t.id === tid) {
          taskToUpdate = t;
          break;
        }
      }
    }
    if (taskToUpdate) break;
  }

  if (!taskToUpdate) {
    console.error("Task not found for toggling.");
    alert("Task not found. Cannot update status.");
    return;
  }

  const newCompletedStatus = !taskToUpdate.completed;
  const newCompletedAt = newCompletedStatus ? new Date().toISOString() : null;

  try {
    // 1. Update the task in the database
    await updateTaskStatus(tid, newCompletedStatus, newCompletedAt);

    // 2. If database update is successful, update the local state
    const updated = checklists.map((c) =>
      c.id === cid
        ? {
            ...c,
            tasks: c.tasks.map((t) =>
              t.id === tid
                ? {
                    ...t,
                    completed: newCompletedStatus,
                    completed_at: newCompletedAt,
                  }
                : t
            ),
          }
        : c
    );
    setChecklists(updated);

  } catch (error) {
    console.error('Failed to update task status in DB:', error);
    alert('Failed to update task status: ' + (error.message || JSON.stringify(error)));
    // The local state is not changed if the DB update fails
  }
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