import type { Product } from "./product.types";

export interface CartItem {
    product: Product;
    quantity: number;
    size: string;
}

export interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    subtotal: number;
    addToCart: (product: Product, size: string, quantity: number) => void;
    removeFromCart: (productId: number, size: string) => void;
    updateQuantity: (
        productId: number,
        size: string,
        quantity: number
    ) => void;
    clearCart: () => void;
}