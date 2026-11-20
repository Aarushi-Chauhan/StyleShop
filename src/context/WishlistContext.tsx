import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Product } from "../types/product.types";
import type { WishlistContextType } from "../types/wishlist.types";

const WishlistContext = createContext<
    WishlistContextType | undefined
>(undefined);

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider = ({
    children,
}: WishlistProviderProps) => {
    const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
        const savedWishlist = localStorage.getItem("stylecart-wishlist");

        return savedWishlist
            ? (JSON.parse(savedWishlist) as Product[])
            : [];
    });

    // Save wishlist whenever it changes
    useEffect(() => {
        localStorage.setItem(
            "stylecart-wishlist",
            JSON.stringify(wishlistItems)
        );
    }, [wishlistItems]);

    // Add product
    const addToWishlist = (product: Product) => {
        setWishlistItems((prev) => {
            const alreadyExists = prev.some(
                (item) => item.id === product.id
            );

            if (alreadyExists) return prev;

            return [...prev, product];
        });
    };

    // Remove product
    const removeFromWishlist = (productId: number) => {
        setWishlistItems((prev) =>
            prev.filter((item) => item.id !== productId)
        );
    };

    // Check whether product is in wishlist
    const isInWishlist = (productId: number) => {
        return wishlistItems.some((item) => item.id === productId);
    };

    // Add or remove product
    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook
export const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        );
    }

    return context;
};