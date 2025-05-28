import { createClient } from '../utils/supabase/client';
const supabase = createClient();

// Fetch all tasks for a user
export async function fetchTasksByUser(user_id) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data;
}
// Create a new task
export async function createNewTask({ user_id, title, description, due_date }) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        user_id,
        title,
        description,
        due_date,
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(taskId) {
  console.log('Deleting task with task_id:', taskId); // Add this line
  const { error } = await supabase.from('tasks').delete().eq('task_id', taskId);
  if (error) {
    console.error('Supabase delete error:', error); // Add this line
    throw error;
  }
}