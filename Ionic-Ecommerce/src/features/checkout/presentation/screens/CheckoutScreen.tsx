import {
  IonButton,
  IonContent,
  IonPage,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { deriveSelectedDeliveryAddressLabelUseCase } from '../../../auth/domain/useCases/deriveSelectedDeliveryAddressLabelUseCase';
import { BaseSelectFieldView } from '../../../../core/presentation/components/molecules/baseSelectField/BaseSelectFieldView';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import { DesktopTopHeaderView } from '../../../../core/presentation/components/organisms/desktopTopHeader/DesktopTopHeaderView';
import { MobileTopHeaderView } from '../../../../core/presentation/components/organisms/mobileTopHeader/MobileTopHeaderView';
import { useHistory } from 'react-router-dom';
import { CartSummaryView } from '../../../cart/presentation/components/CartSummaryView';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { useCheckout } from '../../composition/CheckoutModule';
import './CheckoutScreen.css';

type CheckoutStep = 'customer' | 'delivery' | 'payment' | 'review';

const checkoutSteps: Array<{ id: CheckoutStep; label: string }> = [
  { id: 'customer', label: 'Datos' },
  { id: 'delivery', label: 'Dirección' },
  { id: 'payment', label: 'Pago' },
  { id: 'review', label: 'Revisión' },
];

export function CheckoutScreen() {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const activePanelRef = useRef<HTMLElement | null>(null);
  const shouldFocusStepRef = useRef(false);
  const {
    cartSummary,
    clearCart,
    increaseProductQuantity,
    removeProductFromCart,
  } = useCart();
  const { session, registerOrder } = useAuth();
  const {
    form,
    savedAddresses,
    selectedAddressId,
    isUsingCustomAddress,
    isFormComplete,
    isSubmitting,
    errorMessage,
    isSuccess,
    updateField,
    selectAddress,
    submitOrder,
    customAddressOption,
  } = useCheckout(clearCart, session.user);

  const goToStore = () => {
    history.push('/store');
  };

  const currentStepIndex = checkoutSteps.findIndex((step) => step.id === currentStep);
  const isCustomerStepComplete =
    form.customerName.trim().length > 0 && form.email.trim().length > 0;
  const isDeliveryStepComplete = form.address.trim().length > 0;
  const isPaymentStepComplete = form.paymentMethod.trim().length > 0;
  const completedStepsById: Record<CheckoutStep, boolean> = {
    customer: isCustomerStepComplete,
    delivery: isDeliveryStepComplete,
    payment: isPaymentStepComplete,
    review: isFormComplete,
  };
  const canContinueFromCurrentStep =
    currentStep === 'customer'
      ? isCustomerStepComplete
      : currentStep === 'delivery'
        ? isDeliveryStepComplete
        : currentStep === 'payment'
          ? isPaymentStepComplete
          : isFormComplete;

  const canOpenStep = (stepIndex: number) =>
    checkoutSteps
      .slice(0, stepIndex)
      .every((step) => completedStepsById[step.id]);

  const resolveNextSummaryStep = (): CheckoutStep => {
    if (!completedStepsById.customer) {
      return 'customer';
    }

    if (!completedStepsById.delivery) {
      return 'delivery';
    }

    if (!completedStepsById.payment) {
      return 'payment';
    }

    return 'review';
  };

  useEffect(() => {
    if (!shouldFocusStepRef.current) {
      return;
    }

    shouldFocusStepRef.current = false;
    const activePanel = activePanelRef.current;

    if (!activePanel) {
      return;
    }

    const focusableField = activePanel.querySelector<HTMLElement>(
      'input, textarea, select, ion-input, ion-textarea, ion-select, button',
    );

    focusableField?.focus();
  }, [currentStep]);

  const goToNextStep = () => {
    const nextStep = checkoutSteps[currentStepIndex + 1];

    if (!nextStep || !canContinueFromCurrentStep) {
      return;
    }

    shouldFocusStepRef.current = true;
    setCurrentStep(nextStep.id);
  };

  const goToPreviousStep = () => {
    const previousStep = checkoutSteps[currentStepIndex - 1];

    if (!previousStep) {
      return;
    }

    shouldFocusStepRef.current = true;
    setCurrentStep(previousStep.id);
  };

  const handleSubmit = async () => {
    const didSubmit = await submitOrder();

    if (didSubmit && session.user) {
      await registerOrder({
        total: cartSummary.subtotal,
        itemsCount: cartSummary.totalItems,
        paymentMethod: form.paymentMethod,
        deliveryAddress: form.address,
        items: cartSummary.items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          unitPrice: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        })),
      });
    }
  };

  return (
    <IonPage>
      <DesktopTopHeaderView
        deliveryAddressLabel={deriveSelectedDeliveryAddressLabelUseCase(session.user)}
        cartItemsCount={cartSummary.totalItems}
        onCartClick={() => history.push('/checkout')}
        accountActions={<AuthHeaderPanelView />}
      />
      <MobileTopHeaderView
        cartItemsCount={cartSummary.totalItems}
        onCartClick={() => history.push('/checkout')}
      />

      <IonContent fullscreen>
        <div className="checkout-shell">
          {cartSummary.items.length === 0 && !isSuccess ? (
            <section className="checkout-empty">
              <span className="checkout-eyebrow">Checkout</span>
              <h1>Tu carrito está vacío</h1>
              <p>Agrega productos en la tienda antes de continuar con la compra.</p>
              <IonButton
                type="button"
                className="checkout-button checkout-button--primary"
                onClick={goToStore}
              >
                Volver a la tienda
              </IonButton>
            </section>
          ) : null}

          {cartSummary.items.length > 0 && !isSuccess ? (
            <div className="checkout-layout">
              <section className="checkout-panel">
                <span className="checkout-eyebrow">Despacho y pago</span>
                <h1>Completa tu pedido</h1>
                <p>
                  Finaliza tu compra con un checkout simple y deja listo tu próximo café.
                </p>

                <div className="checkout-steps" aria-label="Pasos del checkout">
                  {checkoutSteps.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      className={`checkout-step ${
                        step.id === currentStep ? 'checkout-step--active' : ''
                      } ${index < currentStepIndex ? 'checkout-step--complete' : ''}`}
                      onClick={() => {
                        if (canOpenStep(index)) {
                          shouldFocusStepRef.current = true;
                          setCurrentStep(step.id);
                        }
                      }}
                      disabled={!canOpenStep(index)}
                      aria-current={step.id === currentStep ? 'step' : undefined}
                    >
                      <span>{index + 1}</span>
                      {step.label}
                    </button>
                  ))}
                </div>

                <div className="checkout-form">
                  <section
                    ref={currentStep === 'customer' ? activePanelRef : null}
                    className={`checkout-step-panel ${
                      currentStep === 'customer' ? 'checkout-step-panel--active' : ''
                    }`}
                    aria-label="Datos del comprador"
                    aria-describedby={errorMessage ? 'checkout-error' : undefined}
                    aria-hidden={currentStep !== 'customer'}
                  >
                    <BaseTextFieldView
                      label="Nombre completo"
                      value={form.customerName}
                      onChange={(value) => updateField('customerName', value)}
                      placeholder="Tu nombre"
                    />

                    <BaseTextFieldView
                      label="Correo electronico"
                      type="email"
                      value={form.email}
                      onChange={(value) => updateField('email', value)}
                      placeholder="nombre@correo.com"
                    />
                  </section>

                  <section
                    ref={currentStep === 'delivery' ? activePanelRef : null}
                    className={`checkout-step-panel ${
                      currentStep === 'delivery' ? 'checkout-step-panel--active' : ''
                    }`}
                    aria-label="Dirección de despacho"
                    aria-describedby={errorMessage ? 'checkout-error' : undefined}
                    aria-hidden={currentStep !== 'delivery'}
                  >
                    <div className="checkout-field">
                      {savedAddresses.length > 0 ? (
                        <div className="checkout-address-picker">
                          <BaseSelectFieldView
                            label="Dirección de despacho"
                            value={selectedAddressId}
                            onChange={selectAddress}
                            options={[
                              ...savedAddresses.map((address) => ({
                                value: address.id,
                                label: `${address.label} - ${address.fullAddress}`,
                              })),
                              {
                                value: customAddressOption,
                                label: 'Usar una dirección rápida',
                              },
                            ]}
                          />

                          {isUsingCustomAddress ? (
                            <BaseTextFieldView
                              label="Dirección rápida"
                              multiline
                              rows={4}
                              value={form.address}
                              onChange={(value) => updateField('address', value)}
                              placeholder="Calle, número, comuna y referencias"
                            />
                          ) : null}
                        </div>
                      ) : (
                        <BaseTextFieldView
                          label="Dirección de despacho"
                          multiline
                          rows={4}
                          value={form.address}
                          onChange={(value) => updateField('address', value)}
                          placeholder="Calle, número, comuna y referencias"
                        />
                      )}
                    </div>
                  </section>

                  <section
                    ref={currentStep === 'payment' ? activePanelRef : null}
                    className={`checkout-step-panel ${
                      currentStep === 'payment' ? 'checkout-step-panel--active' : ''
                    }`}
                    aria-label="Metodo de pago"
                    aria-describedby={errorMessage ? 'checkout-error' : undefined}
                    aria-hidden={currentStep !== 'payment'}
                  >
                    <BaseSelectFieldView
                      label="Metodo de pago"
                      value={form.paymentMethod}
                      onChange={(value) => updateField('paymentMethod', value)}
                      options={[
                        { value: 'tarjeta', label: 'Tarjeta de credito' },
                        { value: 'debito', label: 'Tarjeta de debito' },
                        { value: 'transferencia', label: 'Transferencia bancaria' },
                      ]}
                    />
                  </section>

                  <section
                    ref={currentStep === 'review' ? activePanelRef : null}
                    className={`checkout-step-panel ${
                      currentStep === 'review' ? 'checkout-step-panel--active' : ''
                    }`}
                    aria-label="Revisión del pedido"
                    aria-describedby={errorMessage ? 'checkout-error' : undefined}
                    tabIndex={-1}
                    aria-hidden={currentStep !== 'review'}
                  >
                    <div className="checkout-review">
                      <div>
                        <span>Comprador</span>
                        <strong>{form.customerName || 'Pendiente'}</strong>
                        <small>{form.email || 'Correo pendiente'}</small>
                      </div>
                      <div>
                        <span>Despacho</span>
                        <strong>{form.address || 'Dirección pendiente'}</strong>
                      </div>
                      <div>
                        <span>Pago</span>
                        <strong>{form.paymentMethod}</strong>
                      </div>
                    </div>
                  </section>
                </div>

                {errorMessage ? (
                  <p id="checkout-error" className="checkout-error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <div className="checkout-actions">
                  <IonButton
                    type="button"
                    className="checkout-button checkout-button--secondary"
                    onClick={currentStepIndex === 0 ? goToStore : goToPreviousStep}
                  >
                    {currentStepIndex === 0 ? 'Seguir comprando' : 'Atrás'}
                  </IonButton>
                  {currentStep === 'review' ? (
                    <IonButton
                      type="button"
                      className={`checkout-button checkout-button--primary ${
                        !isSubmitting && !isFormComplete ? 'checkout-button--inactive' : ''
                      }`}
                      onClick={handleSubmit}
                      disabled={isSubmitting || !isFormComplete}
                    >
                      {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
                    </IonButton>
                  ) : (
                    <IonButton
                      type="button"
                      className={`checkout-button checkout-button--primary ${
                        !canContinueFromCurrentStep ? 'checkout-button--inactive' : ''
                      }`}
                      onClick={goToNextStep}
                      disabled={!canContinueFromCurrentStep}
                    >
                      Continuar
                    </IonButton>
                  )}
                </div>
              </section>

              <CartSummaryView
                cartSummary={cartSummary}
                onAddProduct={increaseProductQuantity}
                onRemoveProduct={removeProductFromCart}
                onCheckout={() => {
                  const nextStep = resolveNextSummaryStep();

                  if (nextStep === currentStep) {
                    return;
                  }

                  shouldFocusStepRef.current = true;
                  setCurrentStep(nextStep);
                }}
                showCheckoutAction={false}
              />
            </div>
          ) : null}

          {isSuccess ? (
            <section className="checkout-success">
              <span className="checkout-eyebrow">Pedido confirmado</span>
              <h1>Compra realizada con éxito</h1>
              <p>Te enviaremos la confirmación y el detalle de despacho a tu correo.</p>
              <IonButton
                type="button"
                className="checkout-button checkout-button--primary"
                onClick={goToStore}
              >
                Volver a la tienda
              </IonButton>
            </section>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}
