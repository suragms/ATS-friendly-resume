import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Brain, Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      
      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-12 shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white tracking-wide">
              AI-Powered Professional Resume Builder
            </span>
          </div>

          {/* Professional Headline */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Create Your
              <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Professional Resume
              </span>
              in Minutes
            </h1>
          </div>

          {/* Paid Service Banner */}
          <div className="mb-8">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Paid%20Resume%20Service%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20your%20paid%20resume%20service.%20Please%20provide%20more%20details%20about%20pricing%20and%20features"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg border-2 border-amber-400/30 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                <span className="text-2xl font-bold">$</span>
                <span className="font-semibold text-lg">Paid Resume or CV Available Now!</span>
                <span className="text-sm opacity-90">Click for more information</span>
              </div>
            </a>
          </div>

          {/* Professional Subheading */}
          <div className="mb-16">
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
              Build ATS-optimized resumes that get you noticed. Our intelligent platform 
              helps you create compelling, professional resumes that stand out in today's competitive job market.
            </p>
          </div>

          {/* Professional Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button 
              size="lg" 
              onClick={() => navigate("/builder")}
              className="bg-gradient-to-r from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 text-black shadow-xl text-lg px-10 py-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Start Building Now
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              asChild
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white shadow-xl text-lg px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Paid%20Resume%20Service%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20your%20paid%20resume%20service.%20Please%20provide%20more%20details%20about%20pricing%20and%20features"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="mr-3 w-5 h-5" />
                Contact for Paid Services
              </a>
            </Button>
          </div>

          {/* Professional Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg">AI-Powered Content</h3>
              <p className="text-white/80 text-sm text-center">Intelligent suggestions to enhance your resume content</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg">Professional Templates</h3>
              <p className="text-white/80 text-sm text-center">Industry-standard designs that impress recruiters</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg">ATS Optimized</h3>
              <p className="text-white/80 text-sm text-center">Pass through applicant tracking systems with ease</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm font-medium">
              Trusted by professionals worldwide • 99% ATS compatibility • Industry-leading templates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};