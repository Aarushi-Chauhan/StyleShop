import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
    const { wishlistItems, wishlistCount } = useWishlist();

    return (
        <>
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>

                    <p className="text-gray-500 mt-2">
                        {wishlistCount} saved products
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart
                            size={55}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-2xl font-semibold">
                            Your wishlist is empty
                        </h2>

                        <p className="text-gray-500 mt-3 mb-7">
                            Save your favourite products to find them here.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistItems.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
};

export default Wishlist;