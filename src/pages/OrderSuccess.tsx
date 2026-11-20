import { Link, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import type { Order } from "../types/order.types";

const OrderSuccess = () => {
    const location = useLocation();

    const order = location.state?.order as Order | undefined;

    if (!order) {
        return (
            <>
                <Navbar />

                <div className="text-center py-24">
                    <h1 className="text-2xl font-bold">
                        No order found
                    </h1>

                    <Link
                        to="/products"
                        className="inline-block mt-6 bg-black text-white px-8 py-3"
                    >
                        Continue Shopping
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="max-w-2xl mx-auto px-6 py-20 text-center">
                <CheckCircle
                    size={65}
                    className="mx-auto text-green-600 mb-6"
                />

                <h1 className="text-3xl font-bold">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-500 mt-4">
                    Thank you for shopping with StyleCart.
                </p>

                <div className="border p-6 mt-10 text-left space-y-4">
                    <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-semibold">{order.id}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment</span>
                        <span>{order.paymentMethod}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Items</span>
                        <span>
                            {order.items.reduce(
                                (total, item) => total + item.quantity,
                                0
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between font-bold border-t pt-4">
                        <span>Total Paid / Due</span>
                        <span>
                            ₹{order.total.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">
                            Delivery Address
                        </h3>

                        <p className="text-sm text-gray-600">
                            {order.shippingAddress.fullName}
                            <br />
                            {order.shippingAddress.address}
                            <br />
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} -{" "}
                            {order.shippingAddress.pincode}
                            <br />
                            {order.shippingAddress.phone}
                        </p>
                    </div>
                </div>

                <Link
                    to="/products"
                    className="inline-block bg-black text-white px-8 py-4 mt-8 hover:bg-gray-800"
                >
                    Continue Shopping
                </Link>
            </section>

            <Footer />
        </>
    );
};

export default OrderSuccess;