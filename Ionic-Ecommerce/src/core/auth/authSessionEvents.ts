export const authSessionExpiredEventName = 'auth:session-expired';

export function notifySessionExpired() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(authSessionExpiredEventName));
}
