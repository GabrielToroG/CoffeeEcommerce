import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { deriveSelectedDeliveryAddressLabelUseCase } from '../../../auth/domain/useCases/deriveSelectedDeliveryAddressLabelUseCase';
import { DesktopTopHeaderView } from '../../../../core/presentation/components/organisms/desktopTopHeader/DesktopTopHeaderView';
import { MobileTopHeaderView } from '../../../../core/presentation/components/organisms/mobileTopHeader/MobileTopHeaderView';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { useOrders } from '../../composition/useOrders';
import './OrdersScreen.css';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function OrdersScreen() {
  const history = useHistory();
  const { session } = useAuth();
  const { cartSummary } = useCart();
  const { orders } = useOrders(session.user);
  const { isAuthenticated, user } = session;

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
        <div className="orders-shell">
          {!isAuthenticated ? (
            <section className="orders-empty">
              <span className="orders-eyebrow">Pedidos</span>
              <h1>Inicia sesión para ver tus compras</h1>
              <p>Tu historial de pedidos aparecera aqui cuando tengas una cuenta activa.</p>
              <IonButton
                type="button"
                className="orders-button orders-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </IonButton>
            </section>
          ) : null}

          {isAuthenticated && user ? (
            <div className="orders-layout">
              <section className="orders-main">
                <span className="orders-eyebrow">Historial</span>
                <h1>Pedidos de {user.fullName}</h1>
                <p>Consulta el detalle de tus compras, productos, totales y datos de despacho.</p>

                {orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <article key={order.id} className="orders-card">
                        <div className="orders-card__header">
                          <div>
                            <span className="orders-card__label">Pedido</span>
                            <h2>{order.id}</h2>
                          </div>
                          <div className="orders-card__meta">
                            <strong>{order.status}</strong>
                            <span>{new Date(order.createdAt).toLocaleDateString('es-CL')}</span>
                          </div>
                        </div>

                        <div className="orders-card__info">
                          <div>
                            <span>Dirección</span>
                            <strong>{order.deliveryAddress}</strong>
                          </div>
                          <div>
                            <span>Pago</span>
                            <strong>{order.paymentMethod}</strong>
                          </div>
                          <div>
                            <span>Total</span>
                            <strong>{formatCurrency(order.total)}</strong>
                          </div>
                        </div>

                        <div className="orders-card__items">
                          {order.items.map((item) => (
                            <article key={`${order.id}-${item.productId}`} className="orders-item">
                              <img src={item.imageUrl} alt={item.productName} />
                              <div>
                                <strong>{item.productName}</strong>
                                <span>
                                  {item.quantity} x {formatCurrency(item.unitPrice)}
                                </span>
                              </div>
                              <strong>{formatCurrency(item.quantity * item.unitPrice)}</strong>
                            </article>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <section className="orders-empty orders-empty--inline">
                    <h2>Aun no tienes pedidos</h2>
                    <p>Cuando completes tu primera compra, su detalle aparecera aqui.</p>
                  </section>
                )}
              </section>

              <aside className="orders-sidebar">
                <span className="orders-eyebrow">Resumen</span>
                <h2>Tu cuenta</h2>
                <div className="orders-sidebar__stats">
                  <div>
                    <span>Pedidos</span>
                    <strong>{orders.length}</strong>
                  </div>
                  <div>
                    <span>Direcciones</span>
                    <strong>{user.addresses.length}</strong>
                  </div>
                </div>
                <IonButton
                  type="button"
                  className="orders-button orders-button--secondary"
                  onClick={() => history.push('/store')}
                >
                  Seguir comprando
                </IonButton>
              </aside>
            </div>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
}
