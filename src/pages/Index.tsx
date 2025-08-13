import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TrialBanner } from "@/components/TrialBanner";
import { FeatureSection } from "@/components/FeatureSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { SampleResumesSection } from "@/components/SampleResumesSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <TrialBanner />
        </div>
      </div>
      <div id="features">
        <FeatureSection />
      </div>
      <div id="templates">
        <TemplatesSection />
      </div>
      <div id="samples">
        <SampleResumesSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
