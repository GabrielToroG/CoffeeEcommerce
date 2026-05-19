/**
 * API contract:
 * - URL params: none
 * - Query params: none
 * - Body: none
 *
 * Notes:
 * - No direct HTTP endpoint in this feature.
 * - Exposes derived local UI submission state for account flows.
 */
export type GetLocalAccountSubmissionStateUseCaseProtocol = () => {
  isSubmitting: boolean;
  errorMessage: string | null;
};
