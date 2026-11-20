import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";

import type { ShippingAddress, PaymentMethod, Order } from "../types/order.types";

const Checkout = () => {
    const navigate = useNavigate();
    const { addOrder } = useOrders();
    const { cartItems, subtotal, clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("COD");

    const [formData, setFormData] = useState<ShippingAddress>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const shipping = subtotal >= 2000 ? 0 : 100;
    const total = subtotal + shipping;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handlePlaceOrder = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            return;
        }

        const order: Order = {
            id: `SC${Date.now()}`,
            items: [...cartItems],
            shippingAddress: { ...formData },
            paymentMethod,
            subtotal,
            shipping,
            total,
            createdAt: new Date().toISOString(),
        };

        // Save order in OrderContext
        addOrder(order);

        // Keep the last order for the confirmation page
        localStorage.setItem(
            "stylecart-last-order",
            JSON.stringify(order)
        );

        // Clear cart after successful order creation
        clearCart();

        navigate("/order-success", {
            state: { order },
        });
    };
    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />

                <div className="text-center py-24 px-6">
                    <h1 className="text-2xl font-bold">
                        Your cart is empty
                    </h1>

                    <Link
                        to="/products"
                        className="inline-block mt-6 bg-black text-white px-8 py-3"
                    >
                        Shop Now
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-10">
                    Checkout
                </h1>

                <form
                    onSubmit={handlePlaceOrder}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* Shipping details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="border p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Shipping Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {(
                                    [
                                        ["fullName", "Full Name"],
                                        ["email", "Email"],
                                        ["phone", "Phone Number"],
                                        ["address", "Full Address"],
                                        ["city", "City"],
                                        ["state", "State"],
                                        ["pincode", "PIN Code"],
                                    ] as const
                                ).map(([name, label]) => (
                                    <div key={name}>
                                        <label
                                            htmlFor={name}
                                            className="block text-sm mb-2"
                                        >
                                            {label}
                                        </label>

                                        <input
                                            id={name}
                                            name={name}
                                            type={
                                                name === "email"
                                                    ? "email"
                                                    : name === "phone" || name === "pincode"
                                                        ? "tel"
                                                        : "text"
                                            }
                                            value={formData[name]}
                                            onChange={handleChange}
                                            required
                                            maxLength={
                                                name === "phone" ? 10 :
                                                    name === "pincode" ? 6 : undefined
                                            }
                                            pattern={
                                                name === "phone" ? "[0-9]{10}" :
                                                    name === "pincode" ? "[0-9]{6}" : undefined
                                            }
                                            className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className="border p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                {(
                                    [
                                        ["COD", "Cash on Delivery"],
                                        ["UPI", "UPI"],
                                        ["CARD", "Credit / Debit Card"],
                                    ] as const
                                ).map(([value, label]) => (
                                    <label
                                        key={value}
                                        className="flex items-center gap-3 border p-4 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={value}
                                            checked={paymentMethod === value}
                                            onChange={() => setPaymentMethod(value)}
                                        />

                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>

                            <p className="text-sm text-gray-500 mt-4">
                                Demo payment selection only. No actual payment will be processed.
                            </p>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="border p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.product.id}-${item.size}`}
                                    className="flex justify-between gap-4 text-sm"
                                >
                                    <span>
                                        {item.product.name} × {item.quantity}
                                        <span className="block text-gray-500">
                                            Size: {item.size}
                                        </span>
                                    </span>

                                    <span className="whitespace-nowrap">
                                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-6 pt-5 space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>
                                    {shipping === 0
                                        ? "Free"
                                        : `₹${shipping}`}
                                </span>
                            </div>

                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{total.toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 mt-7 hover:bg-gray-800 transition"
                        >
                            Place Order
                        </button>

                        <Link
                            to="/cart"
                            className="block text-center text-sm text-gray-500 mt-4 underline"
                        >
                            Back to Cart
                        </Link>
                    </div>
                </form>
            </section>

            <Footer />
        </>
    );
};

export default Checkout;