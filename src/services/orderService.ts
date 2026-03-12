import apiClient from './api';
import { Order, CreateOrderPayload } from '../types/order.types';

export const orderService = {
  /** Place a new order */
  create: (payload: CreateOrderPayload): Promise<Order> =>
    apiClient.post('/orders', payload),

  /** Get all orders for the authenticated user */
  getAll: (): Promise<Order[]> =>
    apiClient.get('/orders'),

  /** Get a specific order by ID */
  getById: (id: string): Promise<Order> =>
    apiClient.get(`/orders/${id}`),

  /** Cancel an order */
  cancel: (id: string): Promise<Order> =>
    apiClient.patch(`/orders/${id}/cancel`),
};
