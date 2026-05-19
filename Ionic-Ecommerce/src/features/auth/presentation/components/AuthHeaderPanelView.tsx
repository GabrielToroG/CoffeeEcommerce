import { IonButton, IonButtons, IonModal, IonPopover } from '@ionic/react';
import { useEffect, useId, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import { useAuth } from '../hooks/useAuth';
import './AuthHeaderPanelView.css';

type AuthMode = 'login' | 'register';

type AuthFormState = {
  fullName: string;
  email: string;
  address: string;
  password: string;
};

const initialFormState: AuthFormState = {
  fullName: '',
  email: '',
  address: '',
  password: '',
};

export function AuthHeaderPanelView() {
  const history = useHistory();
  const { session, isLoading, isSubmitting, errorMessage, login, register } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [form, setForm] = useState<AuthFormState>(initialFormState);
  const titleId = useId();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
    };
  }, []);

  const openPanel = (nextMode: AuthMode) => {
    setMode(nextMode);
    setForm(initialFormState);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setForm(initialFormState);
  };

  const updateField = (field: keyof AuthFormState, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (mode === 'login') {
      const didLogin = await login({
        email: form.email,
        password: form.password,
      });

      if (didLogin) {
        closePanel();
      }

      return;
    }

    const didRegister = await register({
      fullName: form.fullName,
      email: form.email,
      address: form.address,
      password: form.password,
    });

    if (didRegister) {
      closePanel();
    }
  };

  const focusFirstField = () => {
    window.setTimeout(() => {
      document
        .querySelector<HTMLElement>('.auth-panel input, .auth-panel ion-input')
        ?.focus();
    }, 40);
  };

  const authPanel = (
    <div className="auth-panel" role="dialog" aria-labelledby={titleId}>
      <span className="auth-panel__eyebrow">
        {mode === 'login' ? 'Accede a tu cuenta' : 'Nueva cuenta'}
      </span>
      <h2 id={titleId}>{mode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}</h2>
      <p>
        {mode === 'login'
          ? 'Accede para guardar tu carrito y continuar tu compra.'
          : 'Registrate para guardar tus productos favoritos y compras.'}
      </p>

      <div className="auth-panel__form">
        {mode === 'register' ? (
          <>
            <BaseTextFieldView
              className="auth-panel__field"
              label="Nombre completo"
              value={form.fullName}
              onChange={(value) => updateField('fullName', value)}
              placeholder="Tu nombre"
            />

            <BaseTextFieldView
              className="auth-panel__field"
              label="Direccion"
              value={form.address}
              onChange={(value) => updateField('address', value)}
              placeholder="Calle, numero y comuna"
            />
          </>
        ) : null}

        <BaseTextFieldView
          className="auth-panel__field"
          label="Correo"
          type="email"
          value={form.email}
          onChange={(value) => updateField('email', value)}
          placeholder="nombre@correo.com"
        />

        <BaseTextFieldView
          className="auth-panel__field"
          label="Contrasena"
          type="password"
          value={form.password}
          onChange={(value) => updateField('password', value)}
          placeholder="Tu contrasena"
        />
      </div>

      {errorMessage ? (
        <p className="auth-panel__error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="auth-panel__actions">
        <IonButton type="button" className="auth-panel__secondary" onClick={closePanel}>
          Cancelar
        </IonButton>
        <IonButton
          type="button"
          className="auth-panel__primary"
          onClick={() => void handleSubmit()}
          disabled={isLoading || isSubmitting}
        >
          {isSubmitting
            ? 'Procesando...'
            : mode === 'login'
              ? 'Entrar'
              : 'Crear cuenta'}
        </IonButton>
      </div>

      <IonButton
        type="button"
        className="auth-panel__toggle"
        onClick={() => setMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))}
      >
        {mode === 'login'
          ? 'No tienes cuenta? Registrate'
          : 'Ya tienes cuenta? Inicia sesion'}
      </IonButton>
    </div>
  );

  return (
    <>
      <IonButtons slot="end" className="auth-header">
        {session.isAuthenticated && session.user ? (
          <IonButton
            type="button"
            className="auth-header__signed"
            onClick={() => history.push('/account')}
          >
            <div className="auth-header__identity">
              <span className="auth-header__eyebrow">Cuenta</span>
              <strong>{session.user.fullName}</strong>
            </div>
          </IonButton>
        ) : (
          <>
            <IonButton
              type="button"
              fill="clear"
              className="auth-header__login"
              onClick={() => openPanel('login')}
            >
              Iniciar sesion
            </IonButton>
            <IonButton
              type="button"
              className="auth-header__register"
              onClick={() => openPanel('register')}
            >
              Registrarse
            </IonButton>
          </>
        )}
      </IonButtons>

      {isMobileViewport ? (
        <IonModal
          isOpen={isOpen}
          onDidDismiss={closePanel}
          onDidPresent={focusFirstField}
          breakpoints={[0, 0.92]}
          initialBreakpoint={0.92}
          className="auth-modal"
        >
          {authPanel}
        </IonModal>
      ) : (
        <IonPopover
          isOpen={isOpen}
          onDidDismiss={closePanel}
          onDidPresent={focusFirstField}
          className="auth-popover"
        >
          {authPanel}
        </IonPopover>
      )}
    </>
  );
}
