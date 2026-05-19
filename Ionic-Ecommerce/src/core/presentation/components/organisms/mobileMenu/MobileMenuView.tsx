import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import './MobileMenuView.css';

const navigationItems = [
  { label: 'Tienda', path: '/store' },
  { label: 'Checkout', path: '/checkout' },
  { label: 'Mis compras', path: '/orders' },
  { label: 'Direcciones', path: '/account/addresses' },
  { label: 'Mi cuenta', path: '/account' },
];

function isNavigationItemActive(currentPathname: string, itemPath: string) {
  if (itemPath === '/account/addresses') {
    return currentPathname === itemPath;
  }

  if (itemPath === '/account') {
    return currentPathname === itemPath || currentPathname.startsWith('/account/');
  }

  if (itemPath === '/store') {
    return currentPathname === itemPath || currentPathname.startsWith('/store/');
  }

  return currentPathname === itemPath;
}

export function MobileMenuView() {
  const location = useLocation();

  return (
    <IonMenu
      contentId="main-content"
      menuId="mobile-navigation"
      type="overlay"
      className="mobile-menu"
    >
      <IonContent>
        <div className="mobile-menu__header">
          <span>Brew Market</span>
          <strong>Navegación</strong>
        </div>
        <IonList className="mobile-menu__list" lines="none">
          {navigationItems.map((item) => {
            const isActive = isNavigationItemActive(location.pathname, item.path);

            return (
              <IonMenuToggle key={item.path} autoHide>
                <IonItem
                  button
                  routerLink={item.path}
                  routerDirection="root"
                  className={`mobile-menu__item ${
                    isActive ? 'mobile-menu__item--active' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IonLabel>{item.label}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
