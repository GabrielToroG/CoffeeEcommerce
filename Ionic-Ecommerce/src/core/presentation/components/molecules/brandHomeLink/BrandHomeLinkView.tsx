import { IonButton, IonButtons, IonMenuButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './BrandHomeLinkView.css';

export function BrandHomeLinkView() {
  const history = useHistory();

  return (
    <IonButtons slot="start">
      <IonMenuButton
        menu="mobile-navigation"
        className="brand-home-link__menu-button"
        aria-label="Abrir menu de navegacion"
      />
      <IonButton
        type="button"
        fill="clear"
        onClick={() => history.push('/store')}
        aria-label="Ir al inicio de la tienda"
      >
        Brew Market
      </IonButton>
    </IonButtons>
  );
}
