import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import InteractiveDemo from "./components/Interactive";
import Navbar from "./components/Navbar";
import FeaturedArtisans from "./components/Featuredartisans";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
    <Navbar onRegisterClick={() => setShowRegister(true)}/>
      <Hero />
      <HowItWorks/>
      <InteractiveDemo/>
      <FeaturedArtisans
        showRegister={showRegister}
        onRegisterClose={() => setShowRegister(false)}
      />
      <Footer/>
    </>
  );
}

export default App;