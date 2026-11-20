import type { Product } from "./product.types";

export interface WishlistContextType {
    wishlistItems: Product[];
    wishlistCount: number;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
    toggleWishlist: (product: Product) => void;
}