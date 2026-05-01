const authTokenStorageKey = 'brew-market-auth-token';

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
