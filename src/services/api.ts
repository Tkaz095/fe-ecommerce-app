/**
 * Axios base client — install first:
 *   npx expo install axios
 */
import axios from 'axios';

// Set your real API base URL here or via an environment config
const BASE_URL = 'https://api.your-store.com/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor: attach Bearer token ──────────────────────────────────
apiClient.interceptors.request.use((config) => {
  // Lazily import to avoid circular deps. Replace with your token source.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useUserStore } = require('../store/useUserStore');
  const token: string | null = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor: unwrap data & handle 401 ───────────────────────────
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — sign the user out (root navigator reacts via store)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useUserStore } = require('../store/useUserStore');
      useUserStore.getState().logout();
    }
    return Promise.reject(error.response?.data ?? error);
  }
);

export default apiClient;
