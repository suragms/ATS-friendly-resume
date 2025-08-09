import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your first resume",
    features: [
      "1 resume template",
      "Basic AI suggestions",
      "PDF download",
      "Standard support"
    ],
    popular: false,
    badge: null
  },
  {
    name: "Professional",
    price: "$9",
    period: "month",
    description: "Everything you need for a successful job search",
    features: [
      "15+ premium templates",
      "Advanced AI content generation",
      "Unlimited downloads",
      "Cover letter builder",
      "ATS optimization score",
      "Priority support"
    ],
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "Career",
    price: "$19",
    period: "month",
    description: "For serious professionals and career changers",
    features: [
      "All Professional features",
      "LinkedIn optimization",
      "Portfolio website builder",
      "Interview preparation AI",
      "Career coaching resources",
      "White-label downloads",
      "24/7 premium support"
    ],
    popular: false,
    badge: "Best Value"
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade when you're ready. All plans include our core AI-powered features 
            designed to help you land your dream job.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group transition-all duration-300 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-primary/50 shadow-xl shadow-primary/10 scale-105' 
                  : 'border-border/50 hover:border-primary/30'
              } bg-card/50 backdrop-blur-sm`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className={`px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground' 
                      : 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <CardContent className="p-8 lg:p-10">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl lg:text-6xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-lg text-muted-foreground ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">{plan.description}</p>
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full mb-8 h-12 text-base font-semibold transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl' 
                      : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : 'Start Free Trial'}
                </Button>

                {/* Features List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide mb-4">
                    What's Included
                  </h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Not sure which plan is right for you?
            </h3>
            <p className="text-muted-foreground mb-6">
              All plans include a 14-day free trial. No credit card required. 
              Upgrade or downgrade at any time.
            </p>
            <Button variant="outline" className="font-medium">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};