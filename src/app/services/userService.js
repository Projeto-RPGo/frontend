// src/services/userService.js
import { createUser, getUserById, getUsers } from '../api/users';

export const fetchUsers = async () => {
  return await getUsers();
};

export const fetchUserById = async (id) => {
  return await getUserById(id);
};

export const addUser = async (userData) => {
  return await createUser(userData);
};
