import { create } from 'zustand';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        if (existingItem) {
            set({ items: items.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
    },
    removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== productId) });
    },
    updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
            set({ items: items.filter(item => item.id !== productId) });
        } else {
            set({ items: items.map(item => item.id === productId ? { ...item, quantity } : item) });
        }
    },
    clearCart: () => set({ items: [] }),
    totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}));
