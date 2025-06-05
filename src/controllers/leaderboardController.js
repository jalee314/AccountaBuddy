import { createClient } from '../utils/supabase/client'; // Adjust path if necessary

const supabase = createClient();

export const getGlobalLeaderboardData = async (limit = 20) => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select(`
        score,
        user:users (
          user_id,
          display_name,
          profile_pic_src
        )
      `)
      .not('user', 'is', null) // Ensure we only get entries with a valid joined user
      .order('score', { ascending: false })
      .limit(limit);

    console.log()

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching global leaderboard data:', error.message);
    return [];
  }
};

export const getFriendsLeaderboardData = async (currentUserId, limit = 20) => {
  if (!currentUserId) return [];

  try {
    // 1. Get friend IDs + current user ID
    const { data: friendships, error: fsError } = await supabase
      .from('friendships')
      .select('requester_id, recipient_id')
      .eq('status', 'accepted')
      .or(`requester_id.eq.${currentUserId},recipient_id.eq.${currentUserId}`);

    if (fsError) throw fsError;

    let relevantUserIds = [currentUserId];
    if (friendships) {
      friendships.forEach(f => {
        if (f.requester_id === currentUserId) {
          relevantUserIds.push(f.recipient_id);
        } else {
          relevantUserIds.push(f.requester_id);
        }
      });
    }
    relevantUserIds = [...new Set(relevantUserIds)]; // Deduplicate

    if (relevantUserIds.length === 0) return [];

    // 2. Fetch leaderboard data for these user IDs
    const { data, error } = await supabase
      .from('leaderboard')
      .select(`
        score,
        user:users (
          user_id,
          display_name,
          profile_pic_src
        )
      `)
      .in('user_id', relevantUserIds)
      .not('user', 'is', null) // Ensure valid joined user
      .order('score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching friends leaderboard data:', error.message);
    return [];
  }
};