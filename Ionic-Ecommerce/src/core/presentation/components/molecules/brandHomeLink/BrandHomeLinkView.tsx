import { IonButton, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';

export function BrandHomeLinkView() {
  const history = useHistory();

  return (
    <IonButton fill="clear" onClick={() => history.push('/store')}>
      <IonTitle>Brew Market</IonTitle>
    </IonButton>
  );
}
