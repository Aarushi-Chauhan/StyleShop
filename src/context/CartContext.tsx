import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

import type { Product } from "../types/product.types";
import type {
    CartItem,
    CartContextType,
} from "../types/cart.types";

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem("stylecart");

        return savedCart ? JSON.parse(savedCart) as CartItem[] : [];
    });

    // Save cart in LocalStorage
    useEffect(() => {
        localStorage.setItem("stylecart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add product to cart
    const addToCart = (
        product: Product,
        size: string,
        quantity: number
    ) => {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.product.id === product.id &&
                    item.size === size
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.product.id === product.id &&
                        item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { product, size, quantity }];
        });
    };

    // Remove product from cart
    const removeFromCart = (productId: number, size: string) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        item.size === size
                    )
            )
        );
    };

    // Update product quantity
    const updateQuantity = (
        productId: number,
        size: string,
        quantity: number
    ) => {
        if (quantity < 1) return;

        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId &&
                    item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate cart count
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                subtotal,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};