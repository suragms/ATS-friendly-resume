import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { TemplatesSection } from "@/components/TemplatesSection";
import { PricingSection } from "@/components/PricingSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <div id="features">
        <FeatureSection />
      </div>
      <div id="templates">
        <TemplatesSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
