export interface DatabaseConnection {
    id?: number;
    name: string;
    url: string;
    port: number;
    username: string;
    password: string;
    databaseType: string;
    createdBy?: string | null;
    createdDate?: string | null;
    modifiedBy?: string | null;
    modifiedDate?: string | null;
    deleted?: boolean;
    databaseUrlCompletedUrl?: string;
}
  