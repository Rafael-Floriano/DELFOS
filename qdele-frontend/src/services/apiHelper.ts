export function getAuthToken() {
  return localStorage.getItem('token');
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
} 