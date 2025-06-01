export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionGroup {
  id: string;
  name: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  groups: string[];
  permissions: string[];
} 