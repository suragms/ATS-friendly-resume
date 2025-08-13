import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, TrendingUp, Users, Award } from "lucide-react";

const sampleResumes = [
  {
    id: 1,
    name: "Software Engineer Resume",
    industry: "Technology",
    template: "Professional",
    successRate: "94%",
    avgSalary: "$120K",
    testimonials: 127,
    proof: {
      interviews: "87% got interviews",
      offers: "3.2 average offers",
      timeToHire: "2.1 weeks"
    },
    preview: {
      name: "Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      experience: "5+ years",
      skills: ["React", "Node.js", "Python", "AWS"]
    }
  },
  {
    id: 2,
    name: "Marketing Manager Resume",
    industry: "Marketing",
    template: "Creative",
    successRate: "91%",
    avgSalary: "$85K",
    testimonials: 89,
    proof: {
      interviews: "82% got interviews",
      offers: "2.8 average offers",
      timeToHire: "2.8 weeks"
    },
    preview: {
      name: "Michael Rodriguez",
      title: "Marketing Manager",
      company: "Nike",
      experience: "7+ years",
      skills: ["Digital Marketing", "SEO", "Analytics", "Brand Strategy"]
    }
  },
  {
    id: 3,
    name: "Data Scientist Resume",
    industry: "Data Science",
    template: "Modern",
    successRate: "96%",
    avgSalary: "$130K",
    testimonials: 156,
    proof: {
      interviews: "91% got interviews",
      offers: "3.5 average offers",
      timeToHire: "1.9 weeks"
    },
    preview: {
      name: "Emily Watson",
      title: "Senior Data Scientist",
      company: "Netflix",
      experience: "6+ years",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
    }
  },
  {
    id: 4,
    name: "UX Designer Resume",
    industry: "Design",
    template: "Creative",
    successRate: "89%",
    avgSalary: "$95K",
    testimonials: 73,
    proof: {
      interviews: "78% got interviews",
      offers: "2.6 average offers",
      timeToHire: "3.1 weeks"
    },
    preview: {
      name: "Alex Kim",
      title: "Senior UX Designer",
      company: "Apple",
      experience: "8+ years",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"]
    }
  }
];

const testimonials = [
  {
    id: 1,
    name: "Jennifer Park",
    role: "Software Engineer",
    company: "Microsoft",
    content: "Got 4 job offers in 3 weeks! The template helped me showcase my skills perfectly.",
    rating: 5,
    avatar: "JP"
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Product Manager",
    company: "Amazon",
    content: "From 0 interviews to 6 interviews in 2 months. This resume template was a game-changer.",
    rating: 5,
    avatar: "DT"
  },
  {
    id: 3,
    name: "Lisa Chen",
    role: "Data Analyst",
    company: "Meta",
    content: "Landed my dream job with a 40% salary increase. The ATS optimization really works!",
    rating: 5,
    avatar: "LC"
  }
];

export const SampleResumesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sample Resumes with
            <span className="block text-black dark:text-white">Proven Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See real resumes that helped professionals land jobs at top companies. 
            Each template comes with verified success metrics and testimonials.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-card">
            <div className="flex justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">92.5%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-card">
            <div className="flex justify-center mb-3">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">15,000+</div>
            <div className="text-sm text-muted-foreground">Jobs Landed</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-card">
            <div className="flex justify-center mb-3">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">$2.1M</div>
            <div className="text-sm text-muted-foreground">Avg. Salary Increase</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-card">
            <div className="flex justify-center mb-3">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-foreground">4.9/5</div>
            <div className="text-sm text-muted-foreground">User Rating</div>
          </div>
        </div>

        {/* Sample Resumes Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sampleResumes.map((resume) => (
            <Card 
              key={resume.id}
              className="group shadow-card hover:shadow-elegant transition-spring hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6">
                {/* Resume Preview */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 mb-4">
                  <div className="bg-white dark:bg-gray-900 rounded p-4 shadow-sm">
                    <div className="space-y-3">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {resume.preview.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {resume.preview.title} at {resume.preview.company}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resume.preview.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resume Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {resume.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {resume.template}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {resume.industry} • {resume.preview.experience} experience
                  </p>
                </div>

                {/* Success Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="text-lg font-bold text-green-600">{resume.successRate}</div>
                    <div className="text-xs text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="text-lg font-bold text-blue-600">{resume.avgSalary}</div>
                    <div className="text-xs text-muted-foreground">Avg Salary</div>
                  </div>
                  <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="text-lg font-bold text-purple-600">{resume.testimonials}</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                </div>

                                 {/* Proof Points */}
                 <div className="space-y-2">
                   {Object.entries(resume.proof).map(([key, value]) => (
                     <div key={key} className="flex items-center text-sm">
                       <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                       <span className="text-muted-foreground">{value}</span>
                     </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{testimonial.content}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to create your own success story? Start with one of our proven templates.
          </p>
          <Button size="lg" className="px-8">
            Create Your Resume
          </Button>
        </div>
      </div>
    </section>
  );
};
