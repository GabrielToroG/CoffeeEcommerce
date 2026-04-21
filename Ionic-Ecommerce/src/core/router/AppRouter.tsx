import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { AccountAddressesScreen } from '../../features/account/presentation/screens/AccountAddressesScreen';
import { AccountProfileScreen } from '../../features/account/presentation/screens/AccountProfileScreen';
import { AdminCatalogScreen } from '../../features/admin/presentation/screens/AdminCatalogScreen';
import { CheckoutScreen } from '../../features/checkout/presentation/screens/CheckoutScreen';
import { OrdersScreen } from '../../features/orders/presentation/screens/OrdersScreen';
import { StorefrontScreen } from '../../features/storefront/presentation/screens/StorefrontScreen';

export function AppRouter() {
  return (
    <IonRouterOutlet>
      <Route exact path="/store">
        <StorefrontScreen />
      </Route>
      <Route exact path="/checkout">
        <CheckoutScreen />
      </Route>
      <Route exact path="/orders">
        <OrdersScreen />
      </Route>
      <Route exact path="/admin/catalog">
        <AdminCatalogScreen />
      </Route>
      <Route exact path="/account/addresses">
        <AccountAddressesScreen />
      </Route>
      <Route exact path="/account/profile">
        <AccountProfileScreen />
      </Route>
      <Route exact path="/">
        <Redirect to="/store" />
      </Route>
    </IonRouterOutlet>
  );
}
