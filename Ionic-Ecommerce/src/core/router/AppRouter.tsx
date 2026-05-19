import { Redirect, Route } from 'react-router-dom';
import { IonButton, IonContent, IonPage, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { useAuth } from '../../features/auth/presentation/hooks/useAuth';
import { AccountAddressesScreen } from '../../features/account/presentation/screens/AccountAddressesScreen';
import { AccountHomeScreen } from '../../features/account/presentation/screens/AccountHomeScreen';
import { AccountProfileScreen } from '../../features/account/presentation/screens/AccountProfileScreen';
import { AdminCatalogScreen } from '../../features/admin/presentation/screens/AdminCatalogScreen';
import { CheckoutScreen } from '../../features/checkout/presentation/screens/CheckoutScreen';
import { OrdersScreen } from '../../features/orders/presentation/screens/OrdersScreen';
import { StorefrontProductDetailScreen } from '../../features/storefront/presentation/screens/StorefrontProductDetailScreen';
import { StorefrontScreen } from '../../features/storefront/presentation/screens/StorefrontScreen';

function RouteLoadingFallback() {
  return (
    <div className="app-route-loading" role="status">
      <IonSpinner name="crescent" />
      <p>Cargando...</p>
    </div>
  );
}

function AdminCatalogRoute() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingFallback />;
  }

  if (!session.isAuthenticated || session.user?.role !== 'admin') {
    return <Redirect to="/store" />;
  }

  return <AdminCatalogScreen />;
}

function NotFoundRoute() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="app-route-not-found">
          <span className="app-route-not-found__eyebrow">404</span>
          <h1>Esta página no existe</h1>
          <p>La ruta que intentaste abrir no está disponible o ya no forma parte de la tienda.</p>
          <IonButton
            type="button"
            className="app-route-not-found__action"
            routerLink="/store"
            routerDirection="root"
          >
            Volver a la tienda
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export function AppRouter() {
  return (
    <IonRouterOutlet id="main-content">
      <Route exact path="/">
        <Redirect to="/store" />
      </Route>
      <Route exact path="/store">
        <StorefrontScreen />
      </Route>
      <Route exact path="/store/products/:productId">
        <StorefrontProductDetailScreen />
      </Route>
      <Route exact path="/checkout">
        <CheckoutScreen />
      </Route>
      <Route exact path="/orders">
        <OrdersScreen />
      </Route>
      <Route exact path="/admin/catalog">
        <AdminCatalogRoute />
      </Route>
      <Route exact path="/account/addresses">
        <AccountAddressesScreen />
      </Route>
      <Route exact path="/account">
        <AccountHomeScreen />
      </Route>
      <Route exact path="/account/profile">
        <AccountProfileScreen />
      </Route>
      <Route>
        <NotFoundRoute />
      </Route>
    </IonRouterOutlet>
  );
}
