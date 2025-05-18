'use client';

import {
  getCurrentUser,
  findUserByEmail,
  checkExistingFriendship,
  insertFriendship,
} from '../models/friendModel';

export const sendFriendRequest = async (email) => {
  const currentUser = await getCurrentUser();
  const targetUser = await findUserByEmail(email);

  const existing = await checkExistingFriendship(currentUser.id, targetUser.id);
  if (existing?.length > 0) {
    throw new Error('You are already friends with this user');
  }

  await insertFriendship(currentUser.id, targetUser.id);
};