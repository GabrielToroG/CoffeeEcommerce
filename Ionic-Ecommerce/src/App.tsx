import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ThemeProvider } from './core/theme/ThemeProvider';
import { AuthProvider } from './features/auth/composition/AuthModule';
import { CartProvider } from './features/cart/composition/CartProvider';
import { AppRouter } from './core/router/AppRouter';
import { MobileMenuView } from './core/presentation/components/organisms/mobileMenu/MobileMenuView';
import { MobileAppNavigationView } from './core/presentation/components/organisms/mobileAppNavigation/MobileAppNavigationView';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */

/* Theme variables */
import './core/theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider>
      <IonReactRouter>
        <AuthProvider>
          <CartProvider>
            <MobileMenuView />
            <AppRouter />
            <MobileAppNavigationView />
          </CartProvider>
        </AuthProvider>
      </IonReactRouter>
    </ThemeProvider>
  </IonApp>
);

export default App;
