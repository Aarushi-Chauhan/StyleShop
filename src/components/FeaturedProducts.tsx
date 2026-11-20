import { products } from "../data/products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            <div className="flex justify-between items-end mb-10">
                <div>
                    <p className="text-sm uppercase tracking-[3px] text-gray-500">
                        Our Selection
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                        Featured Products
                    </h2>
                </div>

                <a
                    href="/products"
                    className="hidden sm:inline-block text-sm border-b border-black pb-1"
                >
                    View All Products
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </section>
    );
};

export default FeaturedProducts;