import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import InteractiveDemo from "./components/Interactive";
import Navbar from "./components/Navbar";
import FeaturedArtisans from "./components/FeaturedArtisans";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Navbar/>
      <Hero />
      <HowItWorks/>
      <InteractiveDemo/>
      <FeaturedArtisans/>
      <Footer/>
    </>
  );
}

export default App;