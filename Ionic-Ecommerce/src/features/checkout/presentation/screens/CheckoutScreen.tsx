import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { BaseSelectFieldView } from '../../../../core/presentation/components/molecules/baseSelectField/BaseSelectFieldView';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { useHistory } from 'react-router-dom';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { useCheckout } from '../hooks/useCheckout';
import './CheckoutScreen.css';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function CheckoutScreen() {
  const history = useHistory();
  const { cartSummary, clearCart } = useCart();
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
      <IonHeader translucent>
        <IonToolbar>
          <BrandHomeLinkView />
          <AuthHeaderPanelView />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="checkout-shell">
          {cartSummary.items.length === 0 && !isSuccess ? (
            <section className="checkout-empty">
              <span className="checkout-eyebrow">Checkout</span>
              <h1>Tu carrito esta vacio</h1>
              <p>Agrega productos en la tienda antes de continuar con la compra.</p>
              <button
                type="button"
                className="checkout-button checkout-button--primary"
                onClick={goToStore}
              >
                Volver a la tienda
              </button>
            </section>
          ) : null}

          {cartSummary.items.length > 0 && !isSuccess ? (
            <div className="checkout-layout">
              <section className="checkout-panel">
                <span className="checkout-eyebrow">Despacho y pago</span>
                <h1>Completa tu pedido</h1>
                <p>
                  Finaliza tu compra con un checkout simple y deja listo tu proximo cafe.
                </p>

                <div className="checkout-form">
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

                  <div className="checkout-field">
                    {savedAddresses.length > 0 ? (
                      <div className="checkout-address-picker">
                        <BaseSelectFieldView
                          label="Direccion de despacho"
                          value={selectedAddressId}
                          onChange={selectAddress}
                          options={[
                            ...savedAddresses.map((address) => ({
                              value: address.id,
                              label: `${address.label} - ${address.fullAddress}`,
                            })),
                            {
                              value: customAddressOption,
                              label: 'Usar una direccion rapida',
                            },
                          ]}
                        />

                        {isUsingCustomAddress ? (
                          <BaseTextFieldView
                            label="Direccion rapida"
                            multiline
                            rows={4}
                            value={form.address}
                            onChange={(value) => updateField('address', value)}
                            placeholder="Calle, numero, comuna y referencias"
                          />
                        ) : null}
                      </div>
                    ) : (
                      <BaseTextFieldView
                        label="Direccion de despacho"
                        multiline
                        rows={4}
                        value={form.address}
                        onChange={(value) => updateField('address', value)}
                        placeholder="Calle, numero, comuna y referencias"
                      />
                    )}
                  </div>

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
                </div>

                {errorMessage ? <p className="checkout-error">{errorMessage}</p> : null}

                <div className="checkout-actions">
                  <button
                    type="button"
                    className="checkout-button checkout-button--secondary"
                    onClick={goToStore}
                  >
                    Seguir comprando
                  </button>
                  <button
                    type="button"
                    className={`checkout-button checkout-button--primary ${
                      !isSubmitting && !isFormComplete ? 'checkout-button--inactive' : ''
                    }`}
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormComplete}
                  >
                    {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
                  </button>
                </div>
              </section>

              <aside className="checkout-summary">
                <span className="checkout-eyebrow">Resumen</span>
                <h2>Tu compra</h2>
                <div className="checkout-summary__items">
                  {cartSummary.items.map((item) => (
                    <article key={item.product.id} className="checkout-summary__item">
                      <img src={item.product.imageUrl} alt={item.product.name} />
                      <div>
                        <strong>{item.product.name}</strong>
                        <span>
                          {item.quantity} x {formatCurrency(item.product.price)}
                        </span>
                      </div>
                      <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>
                <div className="checkout-summary__totals">
                  <span>{cartSummary.totalItems} productos</span>
                  <strong>{formatCurrency(cartSummary.subtotal)}</strong>
                </div>
              </aside>
            </div>
          ) : null}

          {isSuccess ? (
            <section className="checkout-success">
              <span className="checkout-eyebrow">Pedido confirmado</span>
              <h1>Compra realizada con exito</h1>
              <p>Te enviaremos la confirmacion y el detalle de despacho a tu correo.</p>
              <button
                type="button"
                className="checkout-button checkout-button--primary"
                onClick={goToStore}
              >
                Volver a la tienda
              </button>
            </section>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}
