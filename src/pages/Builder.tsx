import { Navigation } from "@/components/Navigation";
import { ResumeBuilder } from "@/components/ResumeBuilder";

const Builder = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <ResumeBuilder />
      </div>
    </div>
  );
};

export default Builder;