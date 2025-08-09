import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Brain, Mail, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      {/* Main Content Container */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          
          {/* Professional Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-12 shadow-lg">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white/90 tracking-wide">
              AI-Powered Professional Resume Builder
            </span>
          </div>

          {/* Professional Headline */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Create Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Professional Resume
              </span>
              in Minutes
            </h1>
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl text-lg px-10 py-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Start Building Now
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Professional%20Resume%20Service%20Inquiry&body=Hello%2C%20I%20am%20interested%20in%20your%20professional%20resume%20services.%20Please%20provide%20information%20about%20pricing%2C%20features%2C%20and%20turnaround%20times.%20Thank%20you."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 text-lg px-10 py-6 rounded-xl font-semibold transition-all duration-300"
              >
                <Mail className="mr-3 w-5 h-5" />
                Paid Resume Service
              </Button>
            </a>
          </div>

          {/* Professional Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">AI-Powered Content</h3>
              <p className="text-white/70 text-sm text-center">Intelligent suggestions to enhance your resume content</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">Professional Templates</h3>
              <p className="text-white/70 text-sm text-center">Industry-standard designs that impress recruiters</p>
            </div>
            <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white text-lg">ATS Optimized</h3>
              <p className="text-white/70 text-sm text-center">Pass through applicant tracking systems with ease</p>
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