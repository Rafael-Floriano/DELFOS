import httpClient from './client/DelfosClient';
import { Permission, PermissionGroup, User } from '../types/UserManagement';

interface CreateUserDTO {
  username: string;
  password: string;
  permissionGroupIds: number[];
}

// Permissions
export const getPermissions = async (): Promise<Permission[]> => {
  const response = await httpClient.get('/api/permissions');
  return response.data;
};

export const getPermissionById = async (id: number): Promise<Permission> => {
  const response = await httpClient.get(`/api/permissions/${id}`);
  return response.data;
};

export const createPermission = async (permission: Omit<Permission, 'id'>): Promise<Permission> => {
  const response = await httpClient.post('/api/permissions', permission);
  return response.data;
};

export const updatePermission = async (id: number, permission: Partial<Permission>): Promise<Permission> => {
  const response = await httpClient.put(`/api/permissions/${id}`, permission);
  return response.data;
};

export const deletePermission = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/permissions/${id}`);
};

// Permission Groups
export const getPermissionGroups = async (): Promise<PermissionGroup[]> => {
  const response = await httpClient.get('/api/permission-groups');
  return response.data;
};

export const getPermissionGroupById = async (id: number): Promise<PermissionGroup> => {
  const response = await httpClient.get(`/api/permission-groups/${id}`);
  return response.data;
};

export const createPermissionGroup = async (group: Omit<PermissionGroup, 'id'>): Promise<PermissionGroup> => {
  const response = await httpClient.post('/api/permission-groups', group);
  return response.data;
};

export const updatePermissionGroup = async (id: number, group: Partial<PermissionGroup>): Promise<PermissionGroup> => {
  const response = await httpClient.put(`/api/permission-groups/${id}`, group);
  return response.data;
};

export const deletePermissionGroup = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/permission-groups/${id}`);
};

// Users
export const getUsers = async (): Promise<User[]> => {
  const response = await httpClient.get('/api/users');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await httpClient.get(`/api/users/${id}`);
  return response.data;
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await httpClient.get(`/api/users/username/${username}`);
  return response.data;
};

export const createUser = async (user: CreateUserDTO): Promise<User> => {
  const response = await httpClient.post('/api/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await httpClient.put(`/api/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await httpClient.delete(`/api/users/${id}`);
}; 