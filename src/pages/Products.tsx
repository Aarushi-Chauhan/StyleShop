import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { products } from "../data/products";

const categories = ["All", "Men", "Women", "Accessories"];

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const querySearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(querySearch);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("default");

    // Sync search input if URL search param changes
    useEffect(() => {
        setSearch(querySearch);
    }, [querySearch]);

    // Filter products
    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === "low-to-high") {
                return a.price - b.price;
            }

            if (sortOrder === "high-to-low") {
                return b.price - a.price;
            }

            return 0;
        });

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Page Heading */}
                <div className="text-center mb-12">
                    <p className="text-sm uppercase tracking-[3px] text-gray-500">
                        Explore Our Collection
                    </p>

                    <h1 className="text-4xl font-semibold mt-3">
                        All Products
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Discover your perfect style.
                    </p>
                </div>

                {/* Search and Sort */}
                <div className="flex flex-col md:flex-row justify-between gap-5 mb-8">

                    <div className="relative w-full md:w-80">
                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearch(val);
                                if (val) {
                                    setSearchParams({ search: val });
                                } else {
                                    setSearchParams({});
                                }
                            }}
                            className="w-full border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-black"
                        />
                    </div>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-gray-300 px-4 py-2.5 outline-none"
                    >
                        <option value="default">Default Sorting</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>

                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 text-sm border transition ${selectedCategory === category
                                    ? "bg-black text-white border-black"
                                    : "border-gray-300 hover:border-black"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Count */}
                <p className="text-sm text-gray-500 mb-6">
                    Showing {filteredProducts.length} products
                </p>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold">
                            No products found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setSelectedCategory("All");
                                setSortOrder("default");
                            }}
                            className="mt-5 bg-black text-white px-6 py-3"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </main>

            <Footer />
        </>
    );
};

export default Products;