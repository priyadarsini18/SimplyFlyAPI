import HeroSection from "../../components/home/HeroSection";
import SearchSection from "../../components/home/SearchSection";
import StatsSection from "../../components/home/StatsSection";
import DestinationsSection from "../../components/home/DestinationsSection";
import Footer from "../../components/home/Footer";
function Home() {
    return (
        <>
            <HeroSection />
            <SearchSection />
            <StatsSection />
            <DestinationsSection />
            <Footer />
        </>
    );
}

export default Home;