export interface DatabaseConnection {
    id?: number;
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    deleted?: boolean;
}
  