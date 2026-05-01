import { IonButton, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import './AccountScreens.css';

export function AccountProfileScreen() {
  const history = useHistory();
  const { session } = useAuth();
  const defaultAddress =
    session.user?.addresses.find((address) => address.isDefault)?.fullAddress ??
    session.user?.address ??
    'Sin direccion predeterminada';

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <BrandHomeLinkView />
          <AuthHeaderPanelView />
        </IonToolbar>
      </IonHeader>

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
