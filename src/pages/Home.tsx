import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Heart, Zap, FileText, MessageSquare, Target, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import heroIllustration from "@/assets/hero-illustration.jpg";
import safeGuidanceIcon from "@/assets/safe-guidance-icon.jpg";
import reduceAnxietyIcon from "@/assets/reduce-anxiety-icon.jpg";
import healthcareSupportIcon from "@/assets/healthcare-support-icon.jpg";
import doctorSummaryIcon from "@/assets/doctor-summary-icon.jpg";

const Home = () => {
  const features = [
    {
      icon: safeGuidanceIcon,
      title: "Safe Guidance (Not Diagnosis)",
      description: "Provides preliminary guidance without attempting medical diagnosis. Always directs you to appropriate professional care."
    },
    {
      icon: reduceAnxietyIcon,
      title: "Reduce Anxiety",
      description: "Calm, empathetic communication that helps reduce health anxiety while providing clear next steps."
    },
    {
      icon: healthcareSupportIcon,
      title: "Efficient Healthcare Support",
      description: "Streamlines your healthcare journey by suggesting the right care pathway from the start."
    },
    {
      icon: doctorSummaryIcon,
      title: "Doctor-Ready Summary",
      description: "Generates organized summaries of your symptoms and concerns to share with healthcare providers."
    }
  ];

  const steps = [
    {
      icon: MessageSquare,
      title: "Share Symptoms",
      description: "Tell Cura about your symptoms through text or voice input in a conversational manner."
    },
    {
      icon: Target,
      title: "Get Care Pathway",
      description: "Receive personalized recommendations for next steps: self-care, pharmacist, doctor, or emergency care."
    },
    {
      icon: FileText,
      title: "Doctor-Ready Summary",
      description: "Get an organized summary to bring to your healthcare provider with all relevant details."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-hero">
                Cura Health Assistant: Smart, Safe, and Empathetic Preliminary Health Guidance
              </h1>
              <p className="text-subtitle">
                Your first step for understanding symptoms and finding the right care pathway — without replacing professional advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assistant">
                  <Button className="btn-hero group">
                    Try the Prototype
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button className="btn-secondary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <img 
                src={heroIllustration} 
                alt="Health AI Assistant Illustration" 
                className="w-full h-auto rounded-2xl shadow-card animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Cura Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Cura Health Assistant?
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Designed with safety, empathy, and efficiency at its core to support your healthcare journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-feature animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-xl overflow-hidden shadow-soft">
                    <img 
                      src={feature.icon} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Cura Works
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Simple, intuitive steps to get the health guidance you need.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="flex flex-col md:flex-row items-center gap-8 mb-12 last:mb-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-glow">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-4xl mx-auto">
              <p className="text-destructive font-medium">
            <strong>Important Disclaimer:</strong> Cura Health Assistant is a prototype and does not provide medical diagnoses. 
                Always seek professional care when in doubt. This tool is designed to supplement, not replace, professional medical advice.
              </p>
            </div>
            
            <div className="flex justify-center space-x-8 text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            </div>
            
            <p className="text-muted-foreground">
              © 2024 Cura Health Assistant. Built with ❤️ for better healthcare accessibility.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;