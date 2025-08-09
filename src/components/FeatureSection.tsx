import { Card, CardContent } from "@/components/ui/card";
import { Brain, FileText, Download, Eye, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Assistant",
    description: "Get intelligent suggestions for content, formatting, and keywords to make your resume stand out."
  },
  {
    icon: FileText,
    title: "Professional Templates",
    description: "Choose from dozens of modern, ATS-friendly templates designed by career experts."
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your resume update in real-time as you make changes with our instant preview feature."
  },
  {
    icon: Download,
    title: "Multiple Export Options",
    description: "Download your resume as PDF, Word document, or share it directly with a custom link."
  },
  {
    icon: Shield,
    title: "ATS Optimized",
    description: "Our templates are designed to pass through Applicant Tracking Systems successfully."
  },
  {
    icon: Zap,
    title: "Quick Builder",
    description: "Create a complete resume in under 10 minutes with our streamlined building process."
  }
];

export const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="block text-primary"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with proven resume strategies
            to help you create the perfect career document.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card shadow-card hover:shadow-elegant transition-spring hover:scale-105 border-border/50"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};