export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  brand?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  search?: string;
  page?: number;
  limit?: number;
}
