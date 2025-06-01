import httpClient from "./client/DelfosClient";
import { DatabaseConnection } from "./types/DatabaseConnection";
import { DatabaseConnectionLabel } from "./types/DatabaseConnectionLabel";

const BASE_URL = '/api/database-connections';

export const createConnection = async (connection: DatabaseConnection): Promise<DatabaseConnection> => {
  const response = await httpClient.post(BASE_URL, connection);
  return response.data;
};

export const getAllConnections = async (): Promise<DatabaseConnection[]> => {
  const response = await httpClient.get(BASE_URL);
  return response.data;
};

export const getAllConnectionLabels = async (): Promise<DatabaseConnectionLabel[]> => {
  const response = await httpClient.get(`${BASE_URL}/all`);
  return response.data;
};

export const getConnectionById = async (id: string): Promise<DatabaseConnection> => {
  try {
    console.log('Buscando conexão com ID:', id);
    const response = await httpClient.get(`${BASE_URL}/${id}`);
    console.log('Resposta da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes da conexão:', error);
    throw error;
  }
};

export const updateConnection = async (id: number, connection: DatabaseConnection): Promise<DatabaseConnection> => {
  const response = await httpClient.put(`${BASE_URL}/${id}`, connection);
  return response.data;
};

export const deleteConnection = async (id: number): Promise<void> => {
  await httpClient.delete(`${BASE_URL}/${id}`);
};
