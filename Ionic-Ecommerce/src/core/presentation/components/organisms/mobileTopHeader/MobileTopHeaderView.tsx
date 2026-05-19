import {
  IonBadge,
  IonButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonToolbar,
} from '@ionic/react';
import { bagHandleOutline, menuOutline } from 'ionicons/icons';
import { useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeToggleButtonView } from '../../atoms/themeToggle/ThemeToggleButtonView';
import './MobileTopHeaderView.css';

type MobileTopHeaderViewProps = {
  cartItemsCount: number;
  onCartClick: () => void;
};

export function MobileTopHeaderView({
  cartItemsCount,
  onCartClick,
}: MobileTopHeaderViewProps) {
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
    <IonHeader translucent className="mobile-top-header">
      <IonToolbar>
        <div className="mobile-top-header__content">
          <IonMenuButton
            className="mobile-top-header__menu"
            menu="mobile-navigation"
            aria-label="Abrir navegacion"
          >
            <IonIcon icon={menuOutline} aria-hidden="true" />
          </IonMenuButton>

          <IonButton
            type="button"
            fill="clear"
            className="mobile-top-header__brand"
            onClick={() => history.push('/store')}
            aria-label="Ir al inicio de la tienda"
          >
            Brew Market
          </IonButton>

          <ThemeToggleButtonView className="mobile-top-header__theme-toggle" />

          <IonButton
            type="button"
            fill="clear"
            className="mobile-top-header__cart"
            onClick={handleCartClick}
            aria-label={`Ir al carrito con ${cartItemsCount} productos`}
            aria-current={isCheckoutRoute ? 'page' : undefined}
          >
            <IonIcon icon={bagHandleOutline} aria-hidden="true" />
            {cartItemsCount > 0 ? (
              <IonBadge className="mobile-top-header__cart-badge">
                {cartItemsCount}
              </IonBadge>
            ) : null}
          </IonButton>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}
