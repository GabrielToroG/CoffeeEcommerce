import { notifySessionExpired } from '../core/auth/authSessionEvents';
import { readAuthToken, writeAuthToken } from '../core/auth/authTokenStorage';

export function createAuthHeaders() {
  const authToken = readAuthToken();

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

export function handleUnauthorizedSession() {
  writeAuthToken(null);
  notifySessionExpired();
}
