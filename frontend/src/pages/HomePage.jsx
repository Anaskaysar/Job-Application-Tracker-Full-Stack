import { useNavigate } from "react-router-dom";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import LandingHero from "../components/LandingHero";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
const HomePage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleTryDemo = () => {
    navigate("/demo");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Premium Background System */}
      <div className="fixed inset-0 -z-10 bg-slate-50">
        {/* Mesh Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-100/40 rounded-full blur-[110px]"></div>
        
        {/* SVG Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px)`, 
            backgroundSize: '24px 24px' 
          }}>
        </div>
      </div>

      <Navbar />
      <LandingHero onSignIn={handleSignIn} onTryDemo={handleTryDemo} />
      <div id="features">
        <Features />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <CTA onSignIn={handleSignIn} onTryDemo={handleTryDemo} />
      <Footer />
    </div>
  );
};

export default HomePage;
