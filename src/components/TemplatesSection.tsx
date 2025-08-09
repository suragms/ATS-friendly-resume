import { Card, CardContent } from "@/components/ui/card";

const templates = [
  {
    id: 1,
    name: "Executive",
    category: "Leadership",
    description: "Perfect for C-level executives and senior management positions",
    color: "from-slate-600 to-slate-800"
  },
  {
    id: 2,
    name: "Creative",
    category: "Design",
    description: "Stand out in creative fields with this modern, visual template",
    color: "from-purple-600 to-purple-800"
  },
  {
    id: 3,
    name: "Technical",
    category: "Engineering",
    description: "Clean, structured layout ideal for developers and engineers",
    color: "from-blue-600 to-blue-800"
  },
  {
    id: 4,
    name: "Academic",
    category: "Education",
    description: "Traditional format perfect for academic and research positions",
    color: "from-green-600 to-green-800"
  },
  {
    id: 5,
    name: "Modern",
    category: "General",
    description: "Contemporary design suitable for most professional roles",
    color: "from-indigo-600 to-indigo-800"
  },
  {
    id: 6,
    name: "Minimalist",
    category: "General",
    description: "Clean, simple design that focuses on your content",
    color: "from-gray-600 to-gray-800"
  }
];

export const TemplatesSection = () => {
  return (
    <section id="templates" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional
            <span className="block text-primary">Resume Templates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed by career experts 
            and optimized for modern hiring processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="group shadow-card hover:shadow-elegant transition-spring hover:scale-105 cursor-pointer"
            >
              <CardContent className="p-6">
                {/* Template Preview */}
                <div className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-lg mb-4 relative overflow-hidden`}>
                  <div className="absolute inset-4 bg-white/90 rounded p-3">
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-1 bg-gray-200 rounded w-1/3"></div>
                      <div className="mt-3 space-y-1">
                        <div className="h-1 bg-gray-300 rounded w-full"></div>
                        <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-1 bg-gray-300 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/10 text-white text-xs px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Template Info */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                    {template.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Can't find the perfect template? Our AI can suggest the best template based on your industry and experience.
          </p>
        </div>
      </div>
    </section>
  );
};