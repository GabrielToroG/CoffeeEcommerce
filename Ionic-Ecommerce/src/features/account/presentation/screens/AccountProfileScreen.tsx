import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { deriveSelectedDeliveryAddressLabelUseCase } from '../../../auth/domain/useCases/deriveSelectedDeliveryAddressLabelUseCase';
import { useCart } from '../../../cart/presentation/hooks/useCart';
import { DesktopTopHeaderView } from '../../../../core/presentation/components/organisms/desktopTopHeader/DesktopTopHeaderView';
import { MobileTopHeaderView } from '../../../../core/presentation/components/organisms/mobileTopHeader/MobileTopHeaderView';
import { useAccountModule } from '../../composition/AccountModule';
import './AccountScreens.css';

export function AccountProfileScreen() {
  const history = useHistory();
  const { resolvePresentation } = useAccountModule();
  const { useAccountSession } = resolvePresentation();
  const { session, defaultAddress } = useAccountSession();
  const { cartSummary } = useCart();

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
        <div className="account-shell">
          {!session.isAuthenticated || !session.user ? (
            <section className="account-empty">
              <span className="account-eyebrow">Cuenta</span>
              <h1>Inicia sesion para ver tu perfil</h1>
              <p>Tus datos personales apareceran aqui cuando tengas una cuenta activa.</p>
              <IonButton
                type="button"
                className="account-button account-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </IonButton>
            </section>
          ) : (
            <section className="account-panel">
              <span className="account-eyebrow">Perfil</span>
              <h1>Datos personales</h1>
              <p>Consulta la informacion principal asociada a tu cuenta.</p>

              <div className="account-list">
                <article className="account-card">
                  <strong>Nombre</strong>
                  <span>{session.user.fullName}</span>
                </article>
                <article className="account-card">
                  <strong>Correo</strong>
                  <span>{session.user.email}</span>
                </article>
                <article className="account-card">
                  <strong>Direccion predeterminada</strong>
                  <span>{defaultAddress}</span>
                </article>
              </div>
            </section>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
