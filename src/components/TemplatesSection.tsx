import { Card, CardContent } from "@/components/ui/card";

const templates = [
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
    name: "Two-Column Resume Template",
    category: "Modern",
    description: "Professional two-column layout with sidebar design",
    color: "from-blue-800 to-teal-700"
  }
];

export const TemplatesSection = () => {
  return (
    <section id="templates" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional
            <span className="block text-black dark:text-white">Resume Templates</span>
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
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-black dark:group-hover:text-white transition-smooth">
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