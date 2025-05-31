import { createClient } from '../utils/supabase/client';

const supabase = createClient();

const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error('User not authenticated for checklist operation:', error);
    return null;
  }
  return user;
};

export const createChecklist = async (title, designatedFriendId) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, message: 'User not authenticated.' };
  if (!title || title.trim() === '') return { success: false, message: 'Checklist title cannot be empty.' };
  if (!designatedFriendId) return { success: false, message: 'A friend must be designated for the checklist.' };
  if (designatedFriendId === currentUser.id) return { success: false, message: 'You cannot designate yourself for accountability.' };

  try {
    const { data, error } = await supabase
      .from('checklists')
      .insert([{
        user_id: currentUser.id, // Creator
        title,
        designated_friend_id: designatedFriendId, // Friend who verifies tasks
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, message: 'Checklist created!', checklist: data };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to create checklist.' };
  }
};

export const getChecklistsCreatedByMe = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  try {
    const { data, error } = await supabase
      .from('checklists')
      .select(`
        checklist_id,
        user_id,
        title,
        created_at,
        designated_friend_id,
        designated_friend:designated_friend_id ( 
          user_id,
          display_name,
          email
        )
      `)
      .eq('user_id', currentUser.id);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching checklists created by me:', error);
    return [];
  }
};

export const getChecklistsAssignedToMe = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return [];

  try {
    const { data, error } = await supabase
      .from('checklists')
      .select(`
        checklist_id,
        user_id,
        title,
        created_at,
        designated_friend_id,
        owner:user_id (
          user_id,
          display_name,
          email,
          profile_pic_src
        )
      `)
      .eq('designated_friend_id', currentUser.id);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching checklists assigned to me:', error);
    return [];
  }
};

export const getTasksForChecklist = async (checklistId) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('checklist_id', checklistId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching tasks for checklist ${checklistId}:`, error);
    return [];
  }
};

export const createTask = async (checklistId, taskDetails) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, message: 'User not authenticated.' };

  const { data: checklist, error: checklistError } = await supabase
    .from('checklists')
    .select('user_id')
    .eq('checklist_id', checklistId)
    .single();

  if (checklistError || !checklist) return { success: false, message: 'Checklist not found.' };
  if (checklist.user_id !== currentUser.id) return { success: false, message: 'Not authorized to add tasks to this checklist.' };

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        checklist_id: checklistId,
        title: taskDetails.title,
        description: taskDetails.description,
        points: taskDetails.points || 0,
        user_id: checklist.user_id, // Task is "owned" by the checklist creator
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, message: 'Task added!', task: data };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, message: error.message || 'Failed to add task.' };
  }
};

export const markTaskAsComplete = async (taskId) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { success: false, message: 'User not authenticated.' };

  try {
    const { data: task, error: taskError } = await supabase
      .from('tasks')
      .select(`
        task_id, 
        completed, 
        points, 
        checklist:checklists (
          user_id, 
          designated_friend_id
        )
      `)
      .eq('task_id', taskId)
      .single();

    if (taskError || !task || !task.checklist) return { success: false, message: 'Task or associated checklist not found.' };
    if (task.checklist.designated_friend_id !== currentUser.id) return { success: false, message: 'Only the designated friend can mark tasks as complete.' };
    if (task.completed) return { success: false, message: 'Task is already marked as complete.' };

    const { error: updateError } = await supabase
      .from('tasks')
      .update({ completed: true, completed_at: new Date().toISOString() })
      .eq('task_id', taskId);

    if (updateError) throw updateError;

    const checklistOwnerId = task.checklist.user_id;
    const taskPoints = task.points || 0;

    if (taskPoints > 0 && checklistOwnerId) {
      const { error: leaderboardError } = await supabase.rpc('upsert_score', {
        p_user_id: checklistOwnerId,
        p_score_increment: taskPoints
      });
      if (leaderboardError) {
        console.error("Error updating leaderboard via RPC:", leaderboardError);
      }
    }
    return { success: true, message: 'Task marked as complete!' };
  } catch (error) {
    console.error('Error marking task as complete:', error);
    return { success: false, message: error.message || 'Failed to mark task as complete.' };
  }
};
