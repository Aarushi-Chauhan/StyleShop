import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative bg-[#eae6df] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 items-center gap-10">

                {/* Left Content */}
                <div className="space-y-6">
                    <p className="uppercase tracking-[4px] text-sm text-gray-600">
                        New Collection 2026
                    </p>

                    <h1 className="text-5xl md:text-7xl font-semibold leading-tight text-gray-900">
                        Elevate Your
                        <br />
                        Everyday Style
                    </h1>

                    <p className="text-gray-600 max-w-md leading-7">
                        Discover timeless fashion pieces designed
                        to make every moment stylish.
                    </p>

                    <a
                        href="/products"
                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-800 transition"
                    >
                        Shop Collection
                        <ArrowRight size={18} />
                    </a>
                </div>

                {/* Right Image */}
                <div className="h-[350px] md:h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000"
                        alt="Fashion collection"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;