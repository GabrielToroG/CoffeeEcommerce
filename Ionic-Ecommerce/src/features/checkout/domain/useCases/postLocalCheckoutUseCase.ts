import type { CheckoutFormModel } from '../entities/CheckoutFormModel';
import type { CheckoutRepository } from '../repositories/checkoutRepository';
import type { PostLocalCheckoutUseCaseProtocol } from './protocols/postLocalCheckoutUseCaseProtocol';

export function createPostLocalCheckoutUseCase(
  repository: CheckoutRepository,
): PostLocalCheckoutUseCaseProtocol {
  return async function postLocalCheckoutUseCase(form: CheckoutFormModel): Promise<void> {
    if (!form.customerName.trim()) {
      throw new Error('Ingresa tu nombre para continuar.');
    }

    if (!form.email.trim()) {
      throw new Error('Ingresa tu correo para recibir la confirmacion.');
    }

    if (!form.address.trim()) {
      throw new Error('Ingresa la direccion de despacho.');
    }

    if (!form.paymentMethod.trim()) {
      throw new Error('Selecciona un metodo de pago.');
    }

    await repository.submitOrder(form);
  };
}
