import { Link } from "react-router-dom";
import { Package, Heart, ShoppingBag, User } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useOrders } from "../context/OrderContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const MyAccount = () => {
    const { orders } = useOrders();
    const { wishlistCount } = useWishlist();
    const { cartCount } = useCart();

    const lastOrder = orders[0];

    return (
        <>
            <Navbar />

            <section className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex items-center gap-4 mb-10">
                    <User size={40} />

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Account
                        </h1>

                        <p className="text-gray-500">
                            Manage your StyleCart activity.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Link
                        to="/orders"
                        className="border p-6 hover:border-black transition"
                    >
                        <Package size={28} />

                        <h2 className="font-semibold mt-4">
                            My Orders
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            {orders.length} orders
                        </p>
                    </Link>

                    <Link
                        to="/wishlist"
                        className="border p-6 hover:border-black transition"
                    >
                        <Heart size={28} />

                        <h2 className="font-semibold mt-4">
                            My Wishlist
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            {wishlistCount} saved products
                        </p>
                    </Link>

                    <Link
                        to="/cart"
                        className="border p-6 hover:border-black transition"
                    >
                        <ShoppingBag size={28} />

                        <h2 className="font-semibold mt-4">
                            My Cart
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            {cartCount} items
                        </p>
                    </Link>
                </div>

                {lastOrder && (
                    <div className="border p-6 mt-10">
                        <h2 className="text-xl font-semibold">
                            Recent Order
                        </h2>

                        <p className="text-gray-500 text-sm mt-3">
                            {lastOrder.id}
                        </p>

                        <p className="font-semibold mt-2">
                            ₹{lastOrder.total.toLocaleString("en-IN")}
                        </p>

                        <Link
                            to={`/orders/${lastOrder.id}`}
                            className="inline-block underline text-sm mt-4"
                        >
                            View Order
                        </Link>
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
};

export default MyAccount;