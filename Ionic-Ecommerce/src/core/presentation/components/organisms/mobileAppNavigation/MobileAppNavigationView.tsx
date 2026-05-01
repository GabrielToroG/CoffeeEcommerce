import { IonButton, IonFooter, IonIcon, IonToolbar } from '@ionic/react';
import {
  cafeOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { useLocation, useHistory } from 'react-router-dom';
import './MobileAppNavigationView.css';

const navigationItems = [
  { label: 'Inicio', path: '/store', icon: cafeOutline },
  { label: 'Mi cuenta', path: '/account', icon: personCircleOutline },
];

export function MobileAppNavigationView() {
  const history = useHistory();
  const location = useLocation();

  return (
    <IonFooter className="mobile-app-navigation">
      <IonToolbar>
        <nav className="mobile-app-navigation__items" aria-label="Navegacion principal">
          {navigationItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/store'
                ? location.pathname.startsWith('/store/')
                : location.pathname.startsWith(item.path));

            return (
              <IonButton
                key={item.path}
                type="button"
                fill="clear"
                className={`mobile-app-navigation__item ${
                  isActive ? 'mobile-app-navigation__item--active' : ''
                }`}
                onClick={() => history.push(item.path)}
                aria-current={isActive ? 'page' : undefined}
              >
                <IonIcon icon={item.icon} aria-hidden="true" />
                <span>{item.label}</span>
              </IonButton>
            );
          })}
        </nav>
      </IonToolbar>
    </IonFooter>
  );
}
