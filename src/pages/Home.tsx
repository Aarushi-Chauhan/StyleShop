import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Categories />
                <FeaturedProducts />
            </main>
            <Footer />
        </>
    );
};

export default Home;