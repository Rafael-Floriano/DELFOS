export interface Permission {
  id: number;
  name: string;
  description: string;
  type: PermissionType;
}

export enum PermissionType {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  ADMIN = 'ADMIN'
}

export interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: number;
  username: string;
  permissionGroups: PermissionGroup[];
  allPermissions: Permission[];
} 