import { apiConfig } from './apiConfig';

function buildUrl(path: string) {
  if (path.startsWith('http')) {
    return path;
  }

  return `${apiConfig.baseUrl}${path}`;
}

export const httpClient = {
  request(path: string, init?: RequestInit) {
    return fetch(buildUrl(path), init);
  },
};
