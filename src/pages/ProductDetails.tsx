import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

type ProductSize = "S" | "M" | "L" | "XL";

const sizes: ProductSize[] = ["S", "M", "L", "XL"];

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    // Find product using URL ID
    const product = products.find(
        (item) => item.id === Number(id)
    );

    const [selectedSize, setSelectedSize] =
        useState<ProductSize>("M");

    const [quantity, setQuantity] = useState<number>(1);

    // Product not found
    if (!product) {
        return (
            <>
                <Navbar />

                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-semibold">
                        Product Not Found
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Sorry, this product does not exist.
                    </p>

                    <Link
                        to="/products"
                        className="mt-6 bg-black text-white px-6 py-3"
                    >
                        Back to Products
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Back Navigation */}
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-10"
                >
                    <ArrowLeft size={18} />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Product Image */}
                    <div className="bg-gray-100">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[450px] md:h-[600px] object-cover"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        <p className="text-sm uppercase tracking-[3px] text-gray-500">
                            {product.category}
                        </p>

                        <h1 className="text-3xl md:text-4xl font-semibold mt-4">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-semibold mt-5">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <div className="border-t border-gray-200 my-7" />

                        <p className="text-gray-600 leading-7">
                            {product.description ||
                                "Discover timeless fashion and everyday comfort with this stylish collection."}
                        </p>

                        {/* Size Selection */}
                        <div className="mt-8">
                            <h3 className="font-medium mb-4">
                                Select Size: {selectedSize}
                            </h3>

                            <div className="flex gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 border text-sm transition ${selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 hover:border-black"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className="mt-8">
                            <h3 className="font-medium mb-4">
                                Quantity
                            </h3>

                            <div className="flex items-center border border-gray-300 w-fit">

                                <button
                                    type="button"
                                    onClick={decreaseQuantity}
                                    className="p-3 hover:bg-gray-100"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="w-12 text-center">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={increaseQuantity}
                                    className="p-3 hover:bg-gray-100"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={16} />
                                </button>

                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            type="button"
                            onClick={() => {
                                addToCart(product, selectedSize, quantity);

                                toast.success("Product added to cart!");
                            }}
                            className="mt-8 bg-black text-white py-4 flex items-center justify-center gap-3 hover:bg-gray-800 transition w-full"
                        >
                            <ShoppingBag size={19} />
                            Add to Cart
                        </button>

                        <p className="text-sm text-gray-500 mt-5">
                            Free shipping on eligible orders.
                        </p>

                    </div>
                </div>

            </main>

            <Footer />
        </>
    );
};

export default ProductDetails;