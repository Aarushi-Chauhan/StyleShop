import { Link } from "react-router-dom";
import { Package } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useOrders } from "../context/OrderContext";

const Orders = () => {
    const { orders } = useOrders();

    return (
        <>
            <Navbar />

            <section className="max-w-5xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold">
                    My Orders
                </h1>

                <p className="text-gray-500 mt-2 mb-10">
                    View your order history.
                </p>

                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <Package
                            size={55}
                            className="mx-auto text-gray-300 mb-5"
                        />

                        <h2 className="text-2xl font-semibold">
                            No orders yet
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Your orders will appear here.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block bg-black text-white px-8 py-3 mt-7"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border p-6"
                            >
                                <div className="flex flex-wrap justify-between gap-4 border-b pb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <p className="font-semibold">
                                            {order.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order Date
                                        </p>

                                        <p>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="font-semibold">
                                            ₹{order.total.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-5">
                                    <p className="text-sm text-gray-600">
                                        {order.items.reduce(
                                            (total, item) => total + item.quantity,
                                            0
                                        )}{" "}
                                        items · {order.paymentMethod}
                                    </p>

                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="border border-black px-5 py-2 text-sm hover:bg-black hover:text-white transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
};

export default Orders;