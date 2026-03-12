import apiClient from './api';
import { User, Address, AuthCredentials, RegisterPayload } from '../types/user.types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const userService = {
  /** Sign in with email + password */
  login: (credentials: AuthCredentials): Promise<AuthResponse> =>
    apiClient.post('/auth/login', credentials),

  /** Create a new account */
  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    apiClient.post('/auth/register', payload),

  /** Invalidate token on the server */
  logout: (): Promise<void> =>
    apiClient.post('/auth/logout'),

  /** Get current user profile */
  getProfile: (): Promise<User> =>
    apiClient.get('/users/me'),

  /** Update name, phone, avatar, etc. */
  updateProfile: (data: Partial<Pick<User, 'name' | 'phone' | 'avatar'>>): Promise<User> =>
    apiClient.patch('/users/me', data),

  /** Add a delivery address */
  addAddress: (address: Omit<Address, 'id'>): Promise<Address> =>
    apiClient.post('/users/me/addresses', address),

  /** Update an existing delivery address */
  updateAddress: (id: string, address: Partial<Address>): Promise<Address> =>
    apiClient.patch(`/users/me/addresses/${id}`, address),

  /** Remove a delivery address */
  deleteAddress: (id: string): Promise<void> =>
    apiClient.delete(`/users/me/addresses/${id}`),
};
