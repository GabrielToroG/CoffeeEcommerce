import { IonButtons, IonButton, IonPopover } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BaseTextFieldView } from '../../../../core/presentation/components/molecules/baseTextField/BaseTextFieldView';
import { useAuth } from '../hooks/useAuth';
import './AuthHeaderPanelView.css';

type AuthMode = 'login' | 'register' | 'account';

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
  const { session, isLoading, isSubmitting, errorMessage, login, register, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [form, setForm] = useState<AuthFormState>(initialFormState);

  const openPanel = (nextMode: AuthMode) => {
    setMode(nextMode);
    if (nextMode !== 'account') {
      setForm(initialFormState);
    }
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

  return (
    <>
      <IonButtons slot="end" className="auth-header">
        {session.isAuthenticated && session.user ? (
          <button
            type="button"
            className="auth-header__signed"
            onClick={() => openPanel('account')}
          >
            <div className="auth-header__identity">
              <span className="auth-header__eyebrow">Cuenta</span>
              <strong>{session.user.fullName}</strong>
            </div>
          </button>
        ) : (
          <>
            <IonButton fill="clear" onClick={() => openPanel('login')}>
              Iniciar sesion
            </IonButton>
            <IonButton onClick={() => openPanel('register')}>Registrarse</IonButton>
          </>
        )}
      </IonButtons>

      <IonPopover isOpen={isOpen} onDidDismiss={closePanel} className="auth-popover">
        {mode === 'account' && session.user ? (
          <div className="auth-panel auth-panel--account">
            <span className="auth-panel__eyebrow">Mi cuenta</span>
            <h2>{session.user.fullName}</h2>
            <p>{session.user.email}</p>

            <nav className="auth-account__menu" aria-label="Secciones de mi cuenta">
              <button
                type="button"
                className="auth-account__menu-item"
                onClick={() => {
                  closePanel();
                  history.push('/orders');
                }}
              >
                <div>
                  <strong>Mis compras</strong>
                  <span>Revisa pedidos, productos, totales y estados.</span>
                </div>
                <span className="auth-account__menu-count">{session.user.orders.length}</span>
              </button>

              <button
                type="button"
                className="auth-account__menu-item"
                onClick={() => {
                  closePanel();
                  history.push('/account/addresses');
                }}
              >
                <div>
                  <strong>Mis direcciones</strong>
                  <span>Administra tus direcciones de despacho guardadas.</span>
                </div>
                <span className="auth-account__menu-count">{session.user.addresses.length}</span>
              </button>

              <button
                type="button"
                className="auth-account__menu-item"
                onClick={() => {
                  closePanel();
                  history.push('/account/profile');
                }}
              >
                <div>
                  <strong>Datos personales</strong>
                  <span>Consulta tu nombre, correo y datos principales.</span>
                </div>
              </button>

              {session.user.role === 'admin' ? (
                <button
                  type="button"
                  className="auth-account__menu-item"
                  onClick={() => {
                    closePanel();
                    history.push('/admin/catalog');
                  }}
                >
                  <div>
                    <strong>Panel admin</strong>
                    <span>Gestiona catalogo, productos, precios y colecciones.</span>
                  </div>
                </button>
              ) : null}
            </nav>

            <div className="auth-panel__actions">
              <button type="button" className="auth-panel__secondary" onClick={closePanel}>
                Cerrar
              </button>
              <button
                type="button"
                className="auth-panel__primary"
                onClick={() => {
                  void logout();
                  closePanel();
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saliendo...' : 'Cerrar sesion'}
              </button>
            </div>
          </div>
        ) : (
          <div className="auth-panel">
            <span className="auth-panel__eyebrow">{mode === 'login' ? 'Accede a tu cuenta' : 'Nueva cuenta'}</span>
            <h2>{mode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}</h2>
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

            {errorMessage ? <p className="auth-panel__error">{errorMessage}</p> : null}

            <div className="auth-panel__actions">
              <button type="button" className="auth-panel__secondary" onClick={closePanel}>
                Cancelar
              </button>
              <button
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
              </button>
            </div>

            <button
              type="button"
              className="auth-panel__toggle"
              onClick={() => setMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))}
            >
              {mode === 'login'
                ? 'No tienes cuenta? Registrate'
                : 'Ya tienes cuenta? Inicia sesion'}
            </button>
          </div>
        )}
      </IonPopover>
    </>
  );
}
