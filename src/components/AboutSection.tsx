import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Target, Zap, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Successful Job Seekers",
    description: "Professionals who landed their dream jobs"
  },
  {
    icon: Award,
    number: "95%",
    label: "ATS Pass Rate",
    description: "Optimized for applicant tracking systems"
  },
  {
    icon: Target,
    number: "3x",
    label: "More Interview Calls",
    description: "Compared to traditional resumes"
  },
  {
    icon: Zap,
    number: "10min",
    label: "Average Build Time",
    description: "From start to professional finish"
  }
];

const features = [
  "AI-powered content optimization",
  "ATS-friendly formatting",
  "Industry-specific templates",
  "Real-time collaboration",
  "Export to multiple formats",
  "24/7 expert support"
];

const teamMembers = [
  {
    name: "Career Strategists",
    role: "Former HR directors and recruiting managers",
    experience: "15+ years experience",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    name: "AI Engineers",
    role: "Machine learning experts",
    experience: "From leading tech companies",
    gradient: "from-green-500 to-blue-600"
  },
  {
    name: "Design Team",
    role: "Award-winning designers",
    experience: "Creating beautiful, functional templates",
    gradient: "from-purple-500 to-pink-600"
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Trusted by 50,000+ professionals
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            About
            <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 2024, ResumeAI was created by a team of career experts, 
            hiring managers, and AI engineers who understood the challenges of 
            modern job searching.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                We've helped thousands of professionals land their dream jobs
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg">
                  Our platform doesn't just build resumes – it builds careers. 
                  Every template is designed by career experts and tested with real 
                  hiring managers to ensure maximum impact.
                </p>
                <p className="text-lg">
                  Our AI analyzes millions of successful resumes to provide 
                  personalized suggestions that help you stand out in today's 
                  competitive job market.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3">Our Mission</h4>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to professional career tools and help every 
                job seeker present their best self to potential employers through 
                innovative AI-powered solutions.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-3">{stat.number}</div>
                  <div className="text-sm font-semibold text-foreground mb-2">{stat.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built by Career Experts
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team combines decades of experience in HR, AI, and design to create 
              the most effective resume building platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-2xl mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">{member.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  <p className="text-xs text-primary font-medium">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};