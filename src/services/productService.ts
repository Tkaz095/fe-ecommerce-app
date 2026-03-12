import apiClient from './api';
import { Product, ProductFilter, Category } from '../types/product.types';

export const productService = {
  /** Fetch paginated / filtered product list */
  getAll: (filters?: ProductFilter): Promise<Product[]> =>
    apiClient.get('/products', { params: filters }),

  /** Fetch a single product by ID */
  getById: (id: string): Promise<Product> =>
    apiClient.get(`/products/${id}`),

  /** Fetch all categories */
  getCategories: (): Promise<Category[]> =>
    apiClient.get('/categories'),

  /** Fetch featured / promoted products for the Home banner */
  getFeatured: (): Promise<Product[]> =>
    apiClient.get('/products/featured'),

  /** Full-text product search */
  search: (query: string): Promise<Product[]> =>
    apiClient.get('/products/search', { params: { q: query } }),
};
