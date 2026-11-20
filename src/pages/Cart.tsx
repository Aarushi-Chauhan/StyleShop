import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";

const Cart = () => {
    const {
        cartItems,
        cartCount,
        subtotal,
        removeFromCart,
        updateQuantity,
    } = useCart();

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Heading */}
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[3px] text-gray-500">
                        Your Selection
                    </p>

                    <h1 className="text-4xl font-semibold mt-3">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {cartCount} items in your cart
                    </p>
                </div>

                {cartItems.length === 0 ? (

                    /* Empty Cart */
                    <div className="text-center py-20">
                        <ShoppingBag
                            size={55}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="text-2xl font-semibold mt-6">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block mt-7 bg-black text-white px-8 py-4 hover:bg-gray-800"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">

                            {cartItems.map((item) => (
                                <div
                                    key={`${item.product.id}-${item.size}`}
                                    className="flex flex-col sm:flex-row gap-5 border-b border-gray-200 pb-6"
                                >

                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full sm:w-36 h-44 object-cover bg-gray-100"
                                    />

                                    <div className="flex-1">

                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <p className="text-xs uppercase text-gray-500">
                                                    {item.product.category}
                                                </p>

                                                <h3 className="font-semibold mt-2">
                                                    {item.product.name}
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-2">
                                                    Size: {item.size}
                                                </p>
                                            </div>

                                            <p className="font-semibold">
                                                ₹{item.product.price.toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex items-center justify-between mt-6">

                                            <div className="flex items-center border border-gray-300">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.size,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-100"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={15} />
                                                </button>

                                                <span className="w-10 text-center text-sm">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            item.size,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-100"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={15} />
                                                </button>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.product.id,
                                                        item.size
                                                    )
                                                }
                                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                                Remove
                                            </button>

                                        </div>

                                        <p className="text-sm font-medium mt-5">
                                            Total: ₹{(
                                                item.product.price * item.quantity
                                            ).toLocaleString("en-IN")}
                                        </p>

                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 p-6 h-fit">

                            <h2 className="text-xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-gray-500">
                                    Items ({cartCount})
                                </span>

                                <span>
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span className="text-green-600">
                                    Free
                                </span>
                            </div>

                            <div className="border-t border-gray-200 my-5" />

                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>

                                <span>
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full bg-black text-white text-center py-4 mt-6 hover:bg-gray-800 transition"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                to="/products"
                                className="block text-center text-sm mt-5 underline underline-offset-4"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    </div>
                )}

            </main>

            <Footer />
        </>
    );
};

export default Cart;