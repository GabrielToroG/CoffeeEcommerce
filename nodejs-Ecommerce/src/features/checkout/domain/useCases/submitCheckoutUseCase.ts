import { HttpError } from "../../../../core/errors/HttpError";
import type { CheckoutFormModel } from "../entities/CheckoutFormModel";

export async function submitCheckoutUseCase(form: CheckoutFormModel) {
  if (
    !form.customerName.trim() ||
    !form.email.trim() ||
    !form.address.trim() ||
    !form.paymentMethod.trim()
  ) {
    throw new HttpError(400, "Completa los datos del checkout para continuar.");
  }
}
