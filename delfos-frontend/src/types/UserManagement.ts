export interface Permission {
  id: number;
  name: string;
  description: string;
  type: string;
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