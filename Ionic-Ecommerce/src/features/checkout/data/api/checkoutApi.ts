import { environment } from '../../../../core/config/environment';
import { createAuthHeaders, handleUnauthorizedSession } from '../../../../core/auth/authSession';
import type { CheckoutFormModel } from '../../domain/entities/CheckoutFormModel';

export const checkoutApi = {
  async submitOrder(form: CheckoutFormModel): Promise<void> {
    const response = await fetch(`${environment.apiBaseUrl}/checkout`, {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorizedSession();
        throw new Error('Tu sesion expiro. Inicia sesion nuevamente.');
      }

      const error = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(error?.message ?? 'No fue posible completar tu compra.');
    }
  },
};
