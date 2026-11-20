import { useState, useRef, useEffect } from "react";
import {
    Search,
    ShoppingBag,
    Heart,
    Menu,
    X,
    UserRound,
} from "lucide-react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (searchOpen) {
            searchInputRef.current?.focus();
        }
    }, [searchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 md:px-6 py-5 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-widest"
                    onClick={closeMenu}
                >
                    STYLECART
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black transition"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black transition"
                        }
                    >
                        Shop
                    </NavLink>
                    {/* <NavLink
                        to="/products?filter=new"
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black transition"
                        }
                    >
                        New Arrivals
                    </NavLink> */}
                    <NavLink
                        to="/account"
                        className={({ isActive }) =>
                            isActive
                                ? "text-black border-b-2 border-black pb-1"
                                : "text-gray-500 hover:text-black transition"
                        }
                    >
                        My Account
                    </NavLink>
                </div>

                <div className="flex items-center gap-4 md:gap-5">
                    {searchOpen ? (
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center border border-gray-300 rounded px-2.5 py-1"
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="text-sm outline-none w-36 sm:w-52"
                            />
                            <button type="submit" aria-label="Submit search" className="text-gray-500 hover:text-black">
                                <Search size={18} />
                            </button>
                            <button
                                type="button"
                                aria-label="Close search"
                                onClick={() => setSearchOpen(false)}
                                className="text-gray-400 hover:text-black ml-1.5"
                            >
                                <X size={16} />
                            </button>
                        </form>
                    ) : (
                        <button
                            type="button"
                            aria-label="Open search"
                            onClick={() => setSearchOpen(true)}
                            className="hover:text-gray-600 transition"
                        >
                            <Search size={20} />
                        </button>
                    )}

                    <Link
                        to="/wishlist"
                        className="relative"
                        aria-label="Wishlist"
                    >
                        <Heart size={20} />

                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/cart"
                        className="relative"
                        aria-label="Shopping cart"
                    >
                        <ShoppingBag size={21} />

                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        to="/account"
                        className="hidden sm:block"
                        aria-label="My Account"
                    >
                        <UserRound size={20} />
                    </Link>

                    <button
                        type="button"
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-100 px-6 py-5 flex flex-col gap-4 text-sm font-medium">
                    <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-300 rounded px-3 py-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-sm outline-none w-full"
                        />
                        <button type="submit" aria-label="Submit search" className="text-gray-500 hover:text-black">
                            <Search size={18} />
                        </button>
                    </form>
                    <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
                        }
                    >
                        Shop
                    </NavLink>
                    {/* <NavLink
                        to="/products?filter=new"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
                        }
                    >
                        New Arrivals
                    </NavLink> */}
                    <NavLink
                        to="/account"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-gray-500 hover:text-black"
                        }
                    >
                        My Account
                    </NavLink>
                </div>
            )}
        </nav>
    );
};

export default Navbar;