import { createContext, createElement, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { authSessionExpiredEventName } from '../../../../core/auth/authSessionEvents';
import type { AuthSessionModel } from '../../domain/entities/AuthSessionModel';
import { localAuthRepository } from '../../data/repositories/localAuthRepository';
import { getCurrentUserUseCase } from '../../domain/useCases/getCurrentUserUseCase';
import { addAddressUseCase } from '../../domain/useCases/addAddressUseCase';
import { loginUseCase } from '../../domain/useCases/loginUseCase';
import { logoutUseCase } from '../../domain/useCases/logoutUseCase';
import { registerOrderUseCase } from '../../domain/useCases/registerOrderUseCase';
import { registerUserUseCase } from '../../domain/useCases/registerUserUseCase';
import type {
  AddAddressParams,
  LoginParams,
  RegisterOrderParams,
  RegisterUserParams,
} from '../../domain/repositories/authRepository';

type AuthContextValue = {
  session: AuthSessionModel;
  isLoading: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  login: (params: LoginParams) => Promise<boolean>;
  register: (params: RegisterUserParams) => Promise<boolean>;
  addAddress: (params: AddAddressParams) => Promise<boolean>;
  setDefaultAddress: (addressId: string) => Promise<boolean>;
  registerOrder: (params: RegisterOrderParams) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSessionModel>({
    user: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUserUseCase(localAuthRepository);

        if (!isMounted) {
          return;
        }

        setSession({
          user,
          isAuthenticated: Boolean(user),
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'No fue posible recuperar tu sesion.',
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleSessionExpired = () => {
      setSession({
        user: null,
        isAuthenticated: false,
      });
      setErrorMessage('Tu sesion expiro. Inicia sesion nuevamente.');
    };

    window.addEventListener(authSessionExpiredEventName, handleSessionExpired);

    return () => {
      window.removeEventListener(authSessionExpiredEventName, handleSessionExpired);
    };
  }, []);

  const login = async (params: LoginParams) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const user = await loginUseCase(localAuthRepository, params);
      setSession({
        user,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible iniciar sesion.',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const register = async (params: RegisterUserParams) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const user = await registerUserUseCase(localAuthRepository, params);
      setSession({
        user,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible crear la cuenta.',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await logoutUseCase(localAuthRepository);
      setSession({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible cerrar sesion.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAddress = async (params: AddAddressParams) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const updatedUser = await addAddressUseCase(localAuthRepository, params);

      if (!updatedUser) {
        setErrorMessage('Completa un nombre y una direccion validos.');
        return false;
      }

      setSession({
        user: updatedUser,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible guardar la direccion.',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const updatedUser = await localAuthRepository.setDefaultAddress(addressId);

      if (!updatedUser) {
        setErrorMessage('No fue posible actualizar la direccion predeterminada.');
        return false;
      }

      setSession({
        user: updatedUser,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible actualizar la direccion predeterminada.',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerOrder = async (params: RegisterOrderParams) => {
    try {
      setErrorMessage(null);
      const updatedUser = await registerOrderUseCase(localAuthRepository, params);

      if (!updatedUser) {
        setErrorMessage('Tu sesion expiro. Inicia sesion nuevamente.');
        return;
      }

      setSession({
        user: updatedUser,
        isAuthenticated: true,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No fue posible registrar el pedido.',
      );
    }
  };

  const value: AuthContextValue = {
    session,
    isLoading,
    isSubmitting,
    errorMessage,
    login,
    register,
    addAddress,
    setDefaultAddress,
    registerOrder,
    logout,
  };

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}
