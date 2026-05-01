import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import './MobileMenuView.css';

const navigationItems = [
  { label: 'Tienda', path: '/store' },
  { label: 'Checkout', path: '/checkout' },
  { label: 'Mis compras', path: '/orders' },
  { label: 'Direcciones', path: '/account/addresses' },
  { label: 'Mi cuenta', path: '/account' },
];

export function MobileMenuView() {
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
          <strong>Navegacion</strong>
        </div>
        <IonList className="mobile-menu__list" lines="none">
          {navigationItems.map((item) => (
            <IonMenuToggle key={item.path} autoHide>
              <IonItem
                button
                routerLink={item.path}
                routerDirection="root"
                className="mobile-menu__item"
              >
                <IonLabel>{item.label}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
