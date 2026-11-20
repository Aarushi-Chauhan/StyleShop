const categories = [
    {
        id: 1,
        name: "Women",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    },
    {
        id: 2,
        name: "Men",
        image:
            "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700",
    },
    {
        id: 3,
        name: "Accessories",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOherEbBEww6KyJeiCJ_9ibYvR_ZGCWB251aCVxmw3Q&s=10",
    },
];

const Categories = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
                <p className="text-sm uppercase tracking-[3px] text-gray-500">
                    Explore Style
                </p>

                <h2 className="text-3xl md:text-4xl font-semibold mt-3">
                    Shop By Category
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="group relative overflow-hidden">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-[380px] object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/20 flex items-end p-8">
                            <div>
                                <h3 className="text-white text-2xl font-semibold">
                                    {category.name}
                                </h3>

                                <a
                                    href="/products"
                                    className="text-white text-sm underline underline-offset-4 mt-2 inline-block"
                                >
                                    Explore Now
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;