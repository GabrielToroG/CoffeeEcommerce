import {
  createAuthHeaders,
  handleUnauthorizedSession,
} from '../../../../network/httpAuth';
import {
  readAuthToken,
  writeAuthToken,
} from '../../../../core/auth/authTokenStorage';
import { httpClient } from '../../../../network/httpClient';
import type { AuthUserDTO } from '../entities/AuthUserDTO';
import type {
  AddAuthAddressPayloadDTO,
  AuthDataSourceProtocol,
  LoginAuthPayloadDTO,
  RegisterAuthOrderPayloadDTO,
  RegisterAuthPayloadDTO,
} from './authDataSourceProtocol';

type AuthResponseDTO = {
  token: string;
  user: AuthUserDTO;
};

async function parseErrorMessage(response: Response, fallbackMessage: string) {
  const error = (await response.json().catch(() => null)) as { message?: string } | null;
  return error?.message ?? fallbackMessage;
}

async function parseAuthResponse(response: Response, fallbackMessage: string) {
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, fallbackMessage));
  }

  const data = (await response.json()) as AuthResponseDTO;
  writeAuthToken(data.token);
  return data.user;
}

export const localAuthDataSource: AuthDataSourceProtocol = {
  async getCurrentUser(): Promise<AuthUserDTO | null> {
    const authToken = readAuthToken();

    if (!authToken) {
      return null;
    }

    const response = await httpClient.request('/auth/me', {
      headers: createAuthHeaders(),
    });

    if (response.status === 401) {
      handleUnauthorizedSession();
      return null;
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'No fue posible cargar tu sesion.'));
    }

    return response.json() as Promise<AuthUserDTO | null>;
  },

  async login(payload: LoginAuthPayloadDTO): Promise<AuthUserDTO> {
    const response = await httpClient.request('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return parseAuthResponse(response, 'No encontramos una cuenta con esos datos.');
  },

  async register(payload: RegisterAuthPayloadDTO): Promise<AuthUserDTO> {
    const response = await httpClient.request('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return parseAuthResponse(response, 'No fue posible crear la cuenta.');
  },

  async addAddress(payload: AddAuthAddressPayloadDTO): Promise<AuthUserDTO | null> {
    const response = await httpClient.request('/auth/addresses', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      handleUnauthorizedSession();
      return null;
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'No fue posible guardar la direccion.'));
    }

    return response.json() as Promise<AuthUserDTO>;
  },

  async setDefaultAddress(addressId: string): Promise<AuthUserDTO | null> {
    const response = await httpClient.request(`/auth/addresses/${addressId}/default`, {
      method: 'PATCH',
      headers: createAuthHeaders(),
    });

    if (response.status === 401) {
      handleUnauthorizedSession();
      return null;
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'No fue posible marcar la direccion como predeterminada.'));
    }

    return response.json() as Promise<AuthUserDTO>;
  },

  async registerOrder(payload: RegisterAuthOrderPayloadDTO): Promise<AuthUserDTO | null> {
    const response = await httpClient.request('/auth/orders', {
      method: 'POST',
      headers: createAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      handleUnauthorizedSession();
      return null;
    }

    if (!response.ok) {
      throw new Error(await parseErrorMessage(response, 'No fue posible guardar el pedido.'));
    }

    return response.json() as Promise<AuthUserDTO>;
  },

  async logout(): Promise<void> {
    const response = await httpClient.request('/auth/logout', {
      method: 'POST',
      headers: createAuthHeaders(),
    });

    writeAuthToken(null);

    if (response.status !== 204 && response.status !== 401) {
      throw new Error(await parseErrorMessage(response, 'No fue posible cerrar sesion.'));
    }
  },
};
