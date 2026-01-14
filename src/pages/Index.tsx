import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofBar from "@/components/landing/SocialProofBar";
import FeatureGrid from "@/components/landing/FeatureGrid";
import RoadmapPreview from "@/components/landing/RoadmapPreview";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <FeatureGrid />
      <RoadmapPreview />
      <Footer />
    </div>
  );
};

export default Index;
