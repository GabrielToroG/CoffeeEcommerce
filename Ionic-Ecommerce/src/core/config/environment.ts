const defaultApiBaseUrl = "http://localhost:3000/api";

export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl,
};
