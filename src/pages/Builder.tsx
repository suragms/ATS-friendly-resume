import { Navigation } from "@/components/Navigation";
import { ResumeBuilder } from "@/components/ResumeBuilder";
import { Footer } from "@/components/Footer";

const Builder = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ResumeBuilder />
      </div>
      <Footer />
    </div>
  );
};

export default Builder;