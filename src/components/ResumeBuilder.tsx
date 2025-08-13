import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Sparkles, Download, Check, ChevronUp, ChevronDown, Loader2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  expiry?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface Award {
  id: string;
  name: string;
  issuer: string;
  year: string;
  description?: string;
}

interface Publication {
  id: string;
  title: string;
  journal?: string;
  year: string;
  link?: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    gmail: string;
    summary: string;
    title?: string;
    website?: string;
    instagram?: string;
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  projects: Project[];
  awards: Award[];
  publications: Publication[];
  keywords: string[];
}

interface SectionOrder {
  id: string;
  title: string;
  type: string;
  enabled: boolean;
}

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Creative Resume Template",
    category: "Design",
    description: "A resume template as creative as your imagination",
    color: "from-teal-600 to-blue-700"
  },
  {
    id: 2,
    name: "Professional Resume Template",
    category: "General",
    description: "Put your best foot forward with a professional resume template",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 3,
    name: "College Resume Template",
    category: "Education",
    description: "No experience? No problem!",
    color: "from-blue-400 to-blue-500"
  },
  {
    id: 4,
    name: "Executive Resume Template",
    category: "Leadership",
    description: "For senior professionals and executives",
    color: "from-purple-600 to-indigo-700"
  },
  {
    id: 5,
    name: "Minimalist Resume Template",
    category: "Design",
    description: "Clean, simple, and elegant design",
    color: "from-gray-500 to-gray-600"
  },
  {
    id: 6,
    name: "Tech Resume Template",
    category: "Technology",
    description: "Perfect for software developers and IT professionals",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: 7,
    name: "Creative Portfolio Template",
    category: "Design",
    description: "Showcase your creative work and skills",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: 8,
    name: "Academic Resume Template",
    category: "Education",
    description: "For researchers, professors, and academics",
    color: "from-orange-500 to-amber-600"
  },
  {
    id: 9,
    name: "Sales Resume Template",
    category: "Business",
    description: "Highlight your sales achievements and metrics",
    color: "from-red-500 to-pink-600"
  },
  {
    id: 10,
    name: "Healthcare Resume Template",
    category: "Healthcare",
    description: "Professional template for healthcare professionals",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: 11,
    name: "Finance Resume Template",
    category: "Finance",
    description: "For financial analysts, accountants, and bankers",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 12,
    name: "Marketing Resume Template",
    category: "Marketing",
    description: "Showcase your marketing campaigns and results",
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 13,
    name: "Legal Resume Template",
    category: "Legal",
    description: "Professional template for lawyers and legal professionals",
    color: "from-slate-600 to-gray-700"
  },
  {
    id: 14,
    name: "Engineering Resume Template",
    category: "Engineering",
    description: "Perfect for engineers and technical professionals",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: 15,
    name: "Consulting Resume Template",
    category: "Consulting",
    description: "For consultants and strategy professionals",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: 16,
    name: "Non-Profit Resume Template",
    category: "Non-Profit",
    description: "Highlight your community service and impact",
    color: "from-green-600 to-emerald-700"
  }
];

export const ResumeBuilder = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      gmail: "",
      summary: "",
      title: "",
      website: "",
      instagram: ""
    },
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    awards: [],
    publications: [],
    keywords: []
  });

  const [sectionOrder, setSectionOrder] = useState<SectionOrder[]>([
    { id: "summary", title: "Professional Summary", type: "summary", enabled: true },
    { id: "skills", title: "Core Competencies & Skills", type: "skills", enabled: true },
    { id: "experience", title: "Professional Experience", type: "experience", enabled: true },
    { id: "education", title: "Education", type: "education", enabled: true },
    { id: "certifications", title: "Certifications", type: "certifications", enabled: true },
    { id: "projects", title: "Projects", type: "projects", enabled: true },
    { id: "awards", title: "Awards & Achievements", type: "awards", enabled: true },
    { id: "publications", title: "Publications & Research", type: "publications", enabled: true },
    { id: "keywords", title: "Keywords", type: "keywords", enabled: true }
  ]);

  const previewRef = useRef<HTMLDivElement>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [showSuccessCelebration, setShowSuccessCelebration] = useState(false);

  // Validation function to check if all required data is filled
  const validateResumeData = () => {
    const errors: string[] = [];
    
    // Check personal information
    if (!resumeData.personalInfo.name.trim()) {
      errors.push("Full name is required");
    }
    if (!resumeData.personalInfo.email.trim()) {
      errors.push("Email is required");
    }
    if (!resumeData.personalInfo.phone.trim()) {
      errors.push("Phone number is required");
    }
    if (!resumeData.personalInfo.location.trim()) {
      errors.push("Location is required");
    }
    if (!resumeData.personalInfo.summary.trim()) {
      errors.push("Professional summary is required");
    }
    
    // Check if at least one experience is added and filled
    if (resumeData.experience.length === 0) {
      errors.push("At least one work experience is required");
    } else {
      resumeData.experience.forEach((exp, index) => {
        if (!exp.company.trim()) {
          errors.push(`Company name is required for experience ${index + 1}`);
        }
        if (!exp.position.trim()) {
          errors.push(`Job title is required for experience ${index + 1}`);
        }
        if (!exp.duration.trim()) {
          errors.push(`Duration is required for experience ${index + 1}`);
        }
        if (!exp.description.trim()) {
          errors.push(`Description is required for experience ${index + 1}`);
        }
      });
    }
    
    // Check if at least one education is added and filled
    if (resumeData.education.length === 0) {
      errors.push("At least one education entry is required");
    } else {
      resumeData.education.forEach((edu, index) => {
        if (!edu.institution.trim()) {
          errors.push(`Institution name is required for education ${index + 1}`);
        }
        if (!edu.degree.trim()) {
          errors.push(`Degree is required for education ${index + 1}`);
        }
        if (!edu.year.trim()) {
          errors.push(`Year is required for education ${index + 1}`);
        }
      });
    }
    
    // Check if skills are added
    if (resumeData.skills.length === 0) {
      errors.push("At least one skill is required");
    }
    
    return errors;
  };

  const isResumeComplete = () => {
    return validateResumeData().length === 0;
  };

  // Experience functions
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      duration: "",
      description: ""
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Education functions
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      year: ""
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skills functions
  const updateSkills = (skillsString: string) => {
    // Split by comma and clean up each skill
    const skillsArray = skillsString
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    setResumeData(prev => ({
      ...prev,
      skills: skillsArray
    }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Export function
  const exportResume = () => {
    const validationErrors = validateResumeData();
    
    if (validationErrors.length > 0) {
      toast({
        title: "Incomplete Resume",
        description: `Please complete the following fields: ${validationErrors.slice(0, 3).join(', ')}${validationErrors.length > 3 ? ' and more...' : ''}`,
        variant: "destructive"
      });
      return;
    }
    
    if (!previewRef.current) return;
    
    setIsExportingPDF(true);
    
    // Show initial processing toast
    toast({
      title: "Processing Resume",
      description: "Converting your resume to PDF format...",
    });
    
    // Simulate processing steps for better UX
    setTimeout(() => {
      toast({
        title: "Generating PDF",
        description: "Finalizing your professional resume...",
      });
    }, 1000);
    
    html2pdf()
      .from(previewRef.current)
      .set({
        margin: 0.5,
        filename: `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
      })
      .save()
      .then(() => {
        setIsExportingPDF(false);
        setShowSuccessCelebration(true);
        toast({
          title: "🎉 Resume Exported Successfully!",
          description: `Your professional resume "${resumeData.personalInfo.name || 'Resume'}" has been downloaded as PDF.`,
        });
        
        // Hide celebration after 5 seconds
        setTimeout(() => {
          setShowSuccessCelebration(false);
        }, 5000);
      })
      .catch((error) => {
        setIsExportingPDF(false);
        console.error('PDF Export Error:', error);
        toast({
          title: "Export Failed",
          description: "Failed to generate PDF. Please check your browser settings and try again.",
          variant: "destructive"
        });
      });
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Template
            </h1>
            <p className="text-xl text-muted-foreground">
              Select a professional template that matches your industry and style
            </p>
          </div>

          {/* Featured Templates */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Featured Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.slice(0, 3).map((template) => (
                <Card 
                  key={template.id}
                  className="group shadow-card hover:shadow-elegant transition-spring hover:scale-105 cursor-pointer border-2 border-primary/20"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-6">
                    <div className={`w-full h-32 bg-gradient-to-br ${template.color} rounded-lg mb-4 relative overflow-hidden`}>
                      <div className="absolute inset-3 bg-white/90 rounded p-2">
                        <div className="space-y-1">
                          <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {template.category}
                      </span>
                      <span className="text-xs text-muted-foreground">⭐ Featured</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {template.description}
                    </p>
                    <Button className="w-full" onClick={() => setSelectedTemplate(template)}>
                      Start Building Resume
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full max-w-md">
                <Input
                  placeholder="Search templates..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="All">All Categories</option>
                <option value="Design">Design</option>
                <option value="General">General</option>
                <option value="Education">Education</option>
                <option value="Leadership">Leadership</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
                <option value="Engineering">Engineering</option>
                <option value="Consulting">Consulting</option>
                <option value="Non-Profit">Non-Profit</option>
              </select>
            </div>
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {(() => {
                const filteredCount = templates.filter(template => 
                  (selectedCategory === "All" || template.category === selectedCategory) &&
                  (templateSearch === "" || 
                    template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
                    template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
                    template.category.toLowerCase().includes(templateSearch.toLowerCase()))
                ).length;
                return `${filteredCount} of ${templates.length} templates`;
              })()}
            </div>
          </div>

                    <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-foreground">All Templates</h2>
            <p className="text-muted-foreground">Browse our complete collection of professional resume templates</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(() => {
              const filteredTemplates = templates.filter(template => 
                (selectedCategory === "All" || template.category === selectedCategory) &&
                (templateSearch === "" || 
                  template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
                  template.description.toLowerCase().includes(templateSearch.toLowerCase()) ||
                  template.category.toLowerCase().includes(templateSearch.toLowerCase()))
              );
              
              if (filteredTemplates.length === 0) {
                return (
                  <div className="col-span-full text-center py-12">
                    <div className="text-muted-foreground text-lg mb-4">
                      No templates found matching your criteria
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setTemplateSearch("");
                        setSelectedCategory("All");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                );
              }
              
              return filteredTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className="group shadow-card hover:shadow-elegant transition-spring hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardContent className="p-6">
                    <div className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-lg mb-4 relative overflow-hidden`}>
                      <div className="absolute inset-4 bg-white/90 rounded p-3">
                        <div className="space-y-2">
                                                   <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                         <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                         <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                         <div className="h-1 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {template.description}
                    </p>
                    <Button className="w-full mt-4" onClick={() => setSelectedTemplate(template)}>
                      Start Building Resume
                    </Button>
                  </CardContent>
                </Card>
              ));
            })()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Resume Builder
          </h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedTemplate(null)}
            className="mt-4"
          >
            Change Template
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Builder Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, name: e.target.value }
                          }))}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value }
                          }))}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value }
                          }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => setResumeData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, location: e.target.value }
                          }))}
                          placeholder="New York, NY"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea 
                        id="summary"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, summary: e.target.value }
                        }))}
                        placeholder="A brief summary of your professional background and career objectives..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Work Experience
                      <Button onClick={addExperience} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-4 border border-border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Experience {resumeData.experience.indexOf(exp) + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                          <Input
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                          />
                        </div>
                        <Input
                          placeholder="Duration (e.g., Jan 2020 - Present)"
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        />
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No work experience added yet.</p>
                        <p className="text-sm">Click "Add Experience" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Education
                      <Button onClick={addEducation} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="p-4 border border-border rounded-lg space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Education {resumeData.education.indexOf(edu) + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Institution Name"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          />
                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          />
                        </div>
                        <Input
                          placeholder="Year (e.g., 2020)"
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                        />
                      </div>
                    ))}
                    {resumeData.education.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No education added yet.</p>
                        <p className="text-sm">Click "Add Education" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Core Competencies & Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Skills Input */}
                    <div className="space-y-2">
                      <Label htmlFor="skills-input">Add Skills</Label>
                      <div className="flex gap-2">
                        <Input
                          id="skills-input"
                          placeholder="Type a skill and press Enter or comma"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault();
                              const value = (e.target as HTMLInputElement).value.trim();
                              if (value) {
                                addSkill(value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const value = e.target.value.trim();
                            if (value) {
                              addSkill(value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const input = document.getElementById('skills-input') as HTMLInputElement;
                            const value = input.value.trim();
                            if (value) {
                              addSkill(value);
                              input.value = '';
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {/* Skills Display */}
                    {resumeData.skills.length > 0 && (
                      <div className="space-y-2">
                        <Label>Your Skills ({resumeData.skills.length})</Label>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Add Common Skills */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Quick Add Common Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'AWS', 'Docker', 'Project Management', 'Communication', 'Leadership', 'Problem Solving'].map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            disabled={resumeData.skills.includes(skill)}
                            className={`px-2 py-1 text-xs rounded border transition-colors ${
                              resumeData.skills.includes(skill)
                                ? 'bg-green-100 text-green-700 border-green-200 cursor-not-allowed'
                                : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Legacy Textarea for bulk input */}
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Bulk Add Skills (comma-separated)</Label>
                      <Textarea
                        placeholder="Enter multiple skills separated by commas (e.g., JavaScript, Python, Project Management)"
                        value={resumeData.skills.join(', ')}
                        onChange={(e) => updateSkills(e.target.value)}
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Validation Status */}
            {!isResumeComplete() ? (
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <span className="text-destructive text-xs font-bold">!</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-destructive mb-1">
                        Resume Incomplete
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Please complete all required fields before exporting your resume.
                      </p>
                      <div className="mt-2">
                        <details className="text-xs">
                          <summary className="cursor-pointer text-destructive hover:text-destructive/80">
                            View missing fields ({validateResumeData().length})
                          </summary>
                          <ul className="mt-2 space-y-1 text-muted-foreground">
                            {validateResumeData().slice(0, 5).map((error, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span className="w-1 h-1 bg-destructive rounded-full"></span>
                                <span>{error}</span>
                              </li>
                            ))}
                            {validateResumeData().length > 5 && (
                              <li className="text-xs text-muted-foreground">
                                ... and {validateResumeData().length - 5} more
                              </li>
                            )}
                          </ul>
                        </details>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-500/50 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-700 mb-1">
                        Resume Complete
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        All required fields are filled. You can now export your resume as PDF.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Button */}
            <Button 
              onClick={exportResume} 
              disabled={isExportingPDF || !isResumeComplete()}
              className={`w-full transition-all duration-300 ${
                !isResumeComplete() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isExportingPDF 
                    ? 'bg-blue-600 hover:bg-blue-700 animate-pulse' 
                    : 'hover:scale-105 hover:shadow-lg'
              }`}
            >
              {isExportingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span className="animate-pulse">Processing PDF...</span>
                </>
              ) : isResumeComplete() ? (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Complete Resume to Export
                </>
              )}
            </Button>

            {/* Processing Status */}
            {isExportingPDF && (
              <Card className="border-blue-500/50 bg-blue-500/5 animate-in slide-in-from-top-2">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-700 mb-1">
                        Generating Your Resume PDF
                      </h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span>Converting resume to PDF format...</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <span>Optimizing layout and formatting...</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          <span>Preparing download...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Success Celebration */}
            {showSuccessCelebration && (
              <Card className="border-green-500/50 bg-green-500/5 animate-in slide-in-from-top-2">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-green-700 mb-1">
                        🎉 Resume Successfully Exported!
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Your professional resume has been downloaded as PDF.
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        <span>✅</span>
                        <span>PDF generated successfully</span>
                        <span>•</span>
                        <span>📁 Saved to downloads</span>
                        <span>•</span>
                        <span>📄 Ready to share</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSuccessCelebration(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Live Preview
                  <span className="text-sm font-normal text-muted-foreground">
                    {selectedTemplate?.name} Template
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={previewRef} className="bg-background border-2 border-dashed border-border rounded-lg p-8 min-h-[600px]">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-foreground">
                        {resumeData.personalInfo.name || "Your Name"}
                      </h1>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        <div>{resumeData.personalInfo.email || "your.email@example.com"}</div>
                        <div>{resumeData.personalInfo.phone || "+1 (555) 123-4567"}</div>
                        <div>{resumeData.personalInfo.location || "Your Location"}</div>
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.personalInfo.summary && (
                      <div>
                        <h2 className="text-lg font-semibold text-foreground mb-2">Professional Summary</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {resumeData.personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-foreground mb-3">Core Competencies & Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-accent text-accent-foreground text-sm rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-foreground mb-3">Professional Experience</h2>
                        <div className="space-y-4">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id} className="space-y-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-foreground">{exp.position || "Job Title"}</h3>
                                <span className="text-sm text-muted-foreground">{exp.duration}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{exp.company || "Company Name"}</div>
                              {exp.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h2 className="text-lg font-semibold text-foreground mb-3">Education</h2>
                        <div className="space-y-2">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-foreground">{edu.degree || "Degree"}</div>
                                <div className="text-sm text-muted-foreground">{edu.institution || "Institution"}</div>
                              </div>
                              <span className="text-sm text-muted-foreground">{edu.year}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};