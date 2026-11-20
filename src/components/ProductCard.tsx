import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import type { Product } from "../types/product.types";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </Link>

                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-white text-black text-xs px-3 py-1">
                        NEW
                    </span>
                )}

                <button
                    type="button"
                    onClick={() => {
                        toggleWishlist(product);

                        toast.success(
                            isWishlisted
                                ? "Removed from wishlist"
                                : "Added to wishlist"
                        );
                    }}
                    aria-label={
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:scale-110 transition"
                >
                    <Heart
                        size={19}
                        className={
                            isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700"
                        }
                    />
                </button>
            </div>

            <div className="pt-4">
                <p className="text-xs uppercase tracking-widest text-gray-500">
                    {product.category}
                </p>

                <Link to={`/products/${product.id}`}>
                    <h3 className="font-medium mt-2 hover:text-gray-500 transition">
                        {product.name}
                    </h3>
                </Link>

                <p className="font-semibold mt-2">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;