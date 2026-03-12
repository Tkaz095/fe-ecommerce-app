import { Product } from './product.types';

// ─── Root ──────────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

// ─── Auth Stack ────────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// ─── Shop Stack ────────────────────────────────────────────────────────────────
export type ShopStackParamList = {
  Home: undefined;
  ProductDetail: { product: Product };
  Search: { query?: string };
  Category: { categoryId: string; categoryName: string };
};

// ─── Cart Stack ────────────────────────────────────────────────────────────────
export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  OrderSummary: { orderId: string };
  Payment: { amount: number };
};

// ─── Profile Stack ─────────────────────────────────────────────────────────────
export type ProfileStackParamList = {
  Profile: undefined;
  OrderHistory: undefined;
  Settings: undefined;
};

// ─── Bottom Tab ────────────────────────────────────────────────────────────────
export type AppTabParamList = {
  ShopTab: undefined;
  CartTab: undefined;
  ProfileTab: undefined;
};
