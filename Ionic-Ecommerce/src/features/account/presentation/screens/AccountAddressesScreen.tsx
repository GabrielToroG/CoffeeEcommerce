import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { BaseCheckboxFieldView } from '../../../../core/presentation/components/molecules/baseCheckboxField/BaseCheckboxFieldView';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import { AuthHeaderPanelView } from '../../../auth/presentation/components/AuthHeaderPanelView';
import { BrandHomeLinkView } from '../../../../core/presentation/components/molecules/brandHomeLink/BrandHomeLinkView';
import { useAccountAddresses } from '../hooks/useAccountAddresses';
import './AccountScreens.css';

export function AccountAddressesScreen() {
  const history = useHistory();
  const {
    session,
    label,
    fullAddress,
    setAsDefault,
    successMessage,
    isSubmitting,
    errorMessage,
    setLabel,
    setFullAddress,
    setSetAsDefault,
    submitAddress,
    markAsDefault,
  } = useAccountAddresses();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitAddress();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <BrandHomeLinkView />
          <AuthHeaderPanelView />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="account-shell">
          {!session.isAuthenticated || !session.user ? (
            <section className="account-empty">
              <span className="account-eyebrow">Cuenta</span>
              <h1>Inicia sesion para ver tus direcciones</h1>
              <p>Tus direcciones guardadas apareceran aqui cuando tengas una cuenta activa.</p>
              <button
                type="button"
                className="account-button account-button--primary"
                onClick={() => history.push('/store')}
              >
                Volver a la tienda
              </button>
            </section>
          ) : (
            <section className="account-panel">
              <span className="account-eyebrow">Direcciones</span>
              <h1>Mis direcciones</h1>
              <p>Guarda distintas opciones de despacho para usarlas en tus proximas compras.</p>

              <form className="account-address-form" onSubmit={handleSubmit}>
                <div className="account-field-group">
                  <BaseTextFieldView
                    className="account-field"
                    label="Nombre de la direccion"
                    value={label}
                    onChange={setLabel}
                    placeholder="Ej: Casa, Oficina, Regalo"
                  />

                  <BaseTextFieldView
                    className="account-field"
                    label="Direccion completa"
                    multiline
                    rows={3}
                    value={fullAddress}
                    onChange={setFullAddress}
                    placeholder="Calle, numero, comuna, ciudad y referencias"
                  />
                </div>

                <BaseCheckboxFieldView
                  label="Usar como direccion predeterminada"
                  helperText="Se utilizara por defecto en checkout, salvo que elijas otra."
                  checked={setAsDefault}
                  onChange={setSetAsDefault}
                  disabled={isSubmitting}
                />

                {errorMessage ? <p className="account-feedback account-feedback--error">{errorMessage}</p> : null}
                {successMessage ? (
                  <p className="account-feedback account-feedback--success">{successMessage}</p>
                ) : null}

                <button
                  type="submit"
                  className="account-button account-button--primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Agregar direccion'}
                </button>
              </form>

              <div className="account-list">
                {session.user.addresses.map((address) => (
                  <article key={address.id} className="account-card">
                    <div className="account-card__header">
                      <strong>{address.label}</strong>
                      {address.isDefault ? (
                        <span className="account-card__badge">Predeterminada</span>
                      ) : null}
                    </div>
                    <span>{address.fullAddress}</span>
                    {!address.isDefault ? (
                      <button
                        type="button"
                        className="account-button account-button--secondary"
                        onClick={() => void markAsDefault(address.id)}
                        disabled={isSubmitting}
                      >
                        Usar por defecto
                      </button>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
