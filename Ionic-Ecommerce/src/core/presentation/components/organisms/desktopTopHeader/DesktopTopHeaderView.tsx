import type { ReactNode } from 'react';
import { useRef } from 'react';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from '@ionic/react';
import { bagHandleOutline, locationOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeToggleButtonView } from '../../atoms/themeToggle/ThemeToggleButtonView';
import './DesktopTopHeaderView.css';

type DesktopTopHeaderViewProps = {
  deliveryAddressLabel: string;
  cartItemsCount: number;
  onCartClick: () => void;
  accountActions: ReactNode;
};

export function DesktopTopHeaderView({
  deliveryAddressLabel,
  cartItemsCount,
  onCartClick,
  accountActions,
}: DesktopTopHeaderViewProps) {
  const history = useHistory();
  const location = useLocation();
  const lastCheckoutNavigationRef = useRef(0);
  const isCheckoutRoute = location.pathname === '/checkout';

  const handleCartClick = () => {
    const now = Date.now();

    if (isCheckoutRoute || now - lastCheckoutNavigationRef.current < 500) {
      return;
    }

    lastCheckoutNavigationRef.current = now;
    onCartClick();
  };

  return (
    <IonHeader translucent className="desktop-app-header">
      <IonToolbar>
        <div className="desktop-top-header__content">
          {/* HTML nativo: IonTitle altera el layout de este flex header. */}
          <div className="desktop-top-header__brand">
            <IonButton
              type="button"
              fill="clear"
              className="desktop-top-header__brand-button"
              onClick={() => history.push('/store')}
              aria-label="Ir al inicio de la tienda"
            >
              Brew Market
            </IonButton>
          </div>

          <IonButton
            type="button"
            fill="clear"
            className="desktop-top-header__location"
            onClick={() => history.push('/account/addresses')}
            aria-label="Administrar dirección de despacho"
          >
            <IonIcon icon={locationOutline} aria-hidden="true" />
            <span>{deliveryAddressLabel}</span>
          </IonButton>

          <ThemeToggleButtonView className="desktop-top-header__theme-toggle" />

          <IonButton
            type="button"
            fill="clear"
            className="desktop-top-header__cart"
            onClick={handleCartClick}
            aria-label={`Ir al carrito con ${cartItemsCount} productos`}
            aria-current={isCheckoutRoute ? 'page' : undefined}
          >
            <IonIcon icon={bagHandleOutline} aria-hidden="true" />
            <span>Carrito</span>
            {cartItemsCount > 0 ? (
              <IonBadge className="desktop-top-header__cart-badge">
                {cartItemsCount}
              </IonBadge>
            ) : null}
          </IonButton>

          <IonButtons className="desktop-top-header__account">
            {accountActions}
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}
