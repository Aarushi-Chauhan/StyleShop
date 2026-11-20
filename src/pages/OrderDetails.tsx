import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useOrders } from "../context/OrderContext";

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { orders } = useOrders();

    const order = orders.find((item) => item.id === id);

    if (!order) {
        return (
            <>
                <Navbar />

                <div className="text-center py-24">
                    <h1 className="text-2xl font-bold">
                        Order not found
                    </h1>

                    <Link
                        to="/orders"
                        className="inline-block mt-6 underline"
                    >
                        Back to Orders
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="max-w-5xl mx-auto px-6 py-12">
                <Link
                    to="/orders"
                    className="text-sm text-gray-500 underline"
                >
                    ← Back to Orders
                </Link>

                <h1 className="text-3xl font-bold mt-6">
                    Order Details
                </h1>

                <div className="border p-6 mt-8">
                    <p className="text-gray-500 text-sm">Order ID</p>
                    <p className="font-semibold">{order.id}</p>

                    <p className="text-gray-500 text-sm mt-5">
                        Order Date
                    </p>

                    <p>
                        {new Date(order.createdAt).toLocaleString("en-IN")}
                    </p>
                </div>

                <h2 className="text-xl font-semibold mt-10 mb-5">
                    Ordered Products
                </h2>

                <div className="space-y-5">
                    {order.items.map((item) => (
                        <div
                            key={`${item.product.id}-${item.size}`}
                            className="flex gap-5 border-b pb-5"
                        >
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-24 h-28 object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">
                                    {item.product.name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    Size: {item.size}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="font-semibold mt-2">
                                    ₹{(
                                        item.product.price * item.quantity
                                    ).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border p-6 mt-10 space-y-4">
                    <h2 className="text-xl font-semibold">
                        Payment Summary
                    </h2>

                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                            {order.shipping === 0
                                ? "Free"
                                : `₹${order.shipping}`}
                        </span>
                    </div>

                    <div className="flex justify-between border-t pt-4 font-bold">
                        <span>Total</span>
                        <span>₹{order.total.toLocaleString("en-IN")}</span>
                    </div>

                    <p className="text-sm text-gray-500">
                        Payment method: {order.paymentMethod}
                    </p>
                </div>

                <div className="border p-6 mt-6">
                    <h2 className="font-semibold mb-3">
                        Delivery Address
                    </h2>

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
            </section>

            <Footer />
        </>
    );
};

export default OrderDetails;