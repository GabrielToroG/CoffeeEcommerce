import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import {
  locationOutline,
  personOutline,
  receiptOutline,
  settingsOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { useAuth } from '../../../auth/presentation/hooks/useAuth';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import './AccountScreens.css';

export function AccountHomeScreen() {
  const history = useHistory();
  const { session, isSubmitting, logout } = useAuth();

  if (!session.isAuthenticated || !session.user) {
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
            <section className="account-empty">
              <span className="account-eyebrow">Mi cuenta</span>
              <h1>Inicia sesion para ver tu cuenta</h1>
              <p>Desde aqui podras revisar compras, direcciones y datos personales.</p>
              <IonButton
                type="button"
                className="account-button account-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </IonButton>
            </section>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const accountOptions = [
    {
      label: 'Mis compras',
      description: 'Revisa pedidos, productos, totales y estados.',
      path: '/orders',
      icon: receiptOutline,
      count: session.user.orders.length,
    },
    {
      label: 'Mis direcciones',
      description: 'Administra tus direcciones de despacho guardadas.',
      path: '/account/addresses',
      icon: locationOutline,
      count: session.user.addresses.length,
    },
    {
      label: 'Datos personales',
      description: 'Consulta tu nombre, correo y datos principales.',
      path: '/account/profile',
      icon: personOutline,
    },
    ...(session.user.role === 'admin'
      ? [
          {
            label: 'Panel admin',
            description: 'Gestiona catalogo, productos, precios y colecciones.',
            path: '/admin/catalog',
            icon: settingsOutline,
          },
        ]
      : []),
  ];

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
          <section className="account-home">
            <div className="account-home__hero">
              <IonAvatar className="account-home__avatar" aria-hidden="true">
                <span>{session.user.fullName.slice(0, 1).toUpperCase()}</span>
              </IonAvatar>
              <div>
                <span className="account-eyebrow">Mi cuenta</span>
                <h1>{session.user.fullName}</h1>
                <p>{session.user.email}</p>
              </div>
            </div>

            <IonList className="account-home__options" lines="none" aria-label="Opciones de mi cuenta">
              {accountOptions.map((option) => (
                <IonItem
                  key={option.path}
                  button
                  detail
                  className="account-home__option"
                  onClick={() => history.push(option.path)}
                >
                  <IonIcon slot="start" icon={option.icon} aria-hidden="true" />
                  <IonLabel>
                    <h2>{option.label}</h2>
                    <p>{option.description}</p>
                  </IonLabel>
                  {'count' in option && typeof option.count === 'number' ? (
                    <IonBadge slot="end" className="account-home__option-badge">
                      {option.count}
                    </IonBadge>
                  ) : null}
                </IonItem>
              ))}
            </IonList>

            <div className="account-home__session">
              <IonButton
                type="button"
                className="account-button account-button--secondary"
                onClick={() => void logout()}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saliendo...' : 'Cerrar sesion'}
              </IonButton>
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}
