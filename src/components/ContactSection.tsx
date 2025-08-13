import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const buildGmailUrl = () => {
    const baseUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com";
    
    // Build subject line
    let subject = "Resume Builder Inquiry";
    if (formData.subject) {
      subject = formData.subject;
    }
    
    // Build body with form data
    let body = "Hi, I am interested in your resume builder service. Please provide more details about features and support.";
    
    if (formData.name || formData.email || formData.message) {
      body = "";
      if (formData.name) {
        body += `Name: ${formData.name}\n`;
      }
      if (formData.email) {
        body += `Email: ${formData.email}\n`;
      }
      if (formData.message) {
        body += `\nMessage:\n${formData.message}`;
      }
    }
    
    // Encode the subject and body for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    return `${baseUrl}&su=${encodedSubject}&body=${encodedBody}`;
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Paid Services Notice */}
          <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-700">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Paid Resume & CV Services
              </CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-300">
                Get professional resume writing services, custom CV creation, and expert career guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-800 dark:text-amber-200">Professional Resume Writing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-800 dark:text-amber-200">Custom CV Creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-800 dark:text-amber-200">Career Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span className="text-amber-800 dark:text-amber-200">Interview Preparation</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0" 
                    size="lg"
                  >
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Paid%20Resume%20Service%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20your%20paid%20resume%20service.%20Please%20provide%20more%20details%20about%20pricing%20and%20features"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Inquire About Paid Services
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Your inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>

                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white" 
                  size="lg"
                >
                  <a 
                    href={buildGmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}; 