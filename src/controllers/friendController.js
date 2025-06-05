// src/controllers/friendController.js
import { createClient } from '../utils/supabase/client';

const supabase = createClient();

const getCurrentUserId = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Error getting current user:', error);
    throw new Error('User not authenticated.');
  }
  return user.id;
};

const findUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('user_id, display_name, email, profile_pic_src')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error finding user by email:', error);
    throw error;
  }
  return data;
};

export const sendFriendRequest = async (recipientEmail) => {
  try {
    const requesterId = await getCurrentUserId();
    const recipient = await findUserByEmail(recipientEmail);

    if (!recipient) {
      return { success: false, message: 'User with that email not found.' };
    }
    if (recipient.user_id === requesterId) {
      return { success: false, message: 'You cannot send a friend request to yourself.' };
    }

    const { data: existingFriendship, error: existingError } = await supabase
      .from('friendships')
      .select('*')
      .or(
        `and(requester_id.eq.${requesterId},recipient_id.eq.${recipient.user_id}),and(requester_id.eq.${recipient.user_id},recipient_id.eq.${requesterId})`
      )
      .in('status', ['pending', 'accepted']);

    if (existingError) {
      console.error('Error checking existing friendship:', existingError);
      throw existingError;
    }
    if (existingFriendship && existingFriendship.length > 0) {
      if (existingFriendship[0].status === 'pending') {
        return {
          success: false,
          message: 'Friend request already pending or sent to this user.',
        };
      }
      if (existingFriendship[0].status === 'accepted') {
        return { success: false, message: 'You are already friends with this user.' };
      }
    }

    const { data, error } = await supabase
      .from('friendships')
      .insert([{ requester_id: requesterId, recipient_id: recipient.user_id, status: 'pending' }])
      .select();

    if (error) {
      console.error('Error sending friend request:', error);
      throw error;
    }
    return { success: true, message: 'Friend request sent!', request: data?.[0] ?? null };
  } catch (error) {
    console.error('Outer catch in sendFriendRequest:', error.message);
    return { success: false, message: error.message || 'Failed to send friend request.' };
  }
};

export const getOutgoingPendingRequests = async () => {
  try {
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        created_at,
        recipient:users!friendships_recipient_id_fkey (
          user_id,
          display_name,
          email,
          profile_pic_src
        )
      `)
      .eq('requester_id', userId)
      .eq('status', 'pending');

    if (error) throw error;

    return (
      data?.map((req) => {
        const r = req.recipient || {};
        return {
          user_id: r.user_id,
          display_name: r.display_name,
          email: r.email,
          profile_pic_src: r.profile_pic_src,
          requested_at: req.created_at,
        };
      }) ?? []
    );
  } catch (error) {
    console.error('Error fetching outgoing pending requests:', error);
    return [];
  }
};

export const getIncomingPendingRequests = async () => {
  try {
    const userId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        created_at,
        requester_id,
        requester:users!friendships_requester_id_fkey (
          user_id,
          display_name,
          email,
          profile_pic_src
        )
      `)
      .eq('recipient_id', userId)
      .eq('status', 'pending');

    if (error) throw error;

    return (
      data?.map((req) => {
        const r = req.requester || {};
        return {
          user_id: r.user_id,
          display_name: r.display_name,
          email: r.email,
          profile_pic_src: r.profile_pic_src,
          requested_at: req.created_at,
          original_requester_id: req.requester_id,
        };
      }) ?? []
    );
  } catch (error) {
    console.error('Error fetching incoming pending requests:', error);
    return [];
  }
};

export const acceptFriendRequest = async (requesterIdToAccept) => {
  try {
    const recipientId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('requester_id', requesterIdToAccept)
      .eq('recipient_id', recipientId)
      .eq('status', 'pending')
      .select();

    if (error) throw error;
    if (!data?.length) return { success: false, message: 'Request not found or already actioned.' };

    return { success: true, message: 'Friend request accepted.' };
  } catch (error) {
    console.error('Error accepting friend request:', error);
    return { success: false, message: error.message };
  }
};

export const declineFriendRequest = async (requesterIdToDecline) => {
  try {
    const recipientId = await getCurrentUserId();
    const { data, error } = await supabase
      .from('friendships')
      .update({ status: 'declined' })
      .eq('requester_id', requesterIdToDecline)
      .eq('recipient_id', recipientId)
      .eq('status', 'pending')
      .select();

    if (error) throw error;
    if (!data?.length) return { success: false, message: 'Request not found or already actioned.' };

    return { success: true, message: 'Friend request declined.' };
  } catch (error) {
    console.error('Error declining friend request:', error);
    return { success: false, message: error.message };
  }
};

export const getAcceptedFriends = async () => {
  try {
    const userId = await getCurrentUserId();
    const { data: friendships, error: friendshipsError } = await supabase
      .from('friendships')
      .select('requester_id, recipient_id')
      .eq('status', 'accepted')
      .or(`requester_id.eq.${userId},recipient_id.eq.${userId}`);

    if (friendshipsError) throw friendshipsError;

    const friendIds = friendships
      .map((f) => (f.requester_id === userId ? f.recipient_id : f.requester_id))
      .filter((id) => id !== userId);

    if (!friendIds.length) return [];

    const { data: friends, error: usersError } = await supabase
      .from('users')
      .select('user_id, display_name, email, profile_pic_src')
      .in('user_id', [...new Set(friendIds)]);

    if (usersError) throw usersError;

    return friends.map((f) => ({
      user_id: f.user_id,
      display_name: f.display_name,
      email: f.email,
      profile_pic_src: f.profile_pic_src,
    }));
  } catch (error) {
    console.error('Error fetching accepted friends:', error);
    return [];
  }
};
