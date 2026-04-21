const authTokenStorageKey = 'brew-market-auth-token';
export const authSessionExpiredEventName = 'auth:session-expired';

export function readAuthToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(authTokenStorageKey);
}

export function writeAuthToken(token: string | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!token) {
    window.localStorage.removeItem(authTokenStorageKey);
    return;
  }

  window.localStorage.setItem(authTokenStorageKey, token);
}

export function createAuthHeaders() {
  const authToken = readAuthToken();

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

export function notifySessionExpired() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(authSessionExpiredEventName));
}

export function handleUnauthorizedSession() {
  writeAuthToken(null);
  notifySessionExpired();
}
