import { Card } from "@/components/ui/card";
import { Heart, Users, Target, Shield } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "AI/ML Engineer",
      description: "Passionate about healthcare AI and natural language processing"
    },
    {
      name: "Sarah Rodriguez",
      role: "Healthcare UX Designer",
      description: "Focused on creating empathetic and accessible health experiences"
    },
    {
      name: "Dr. Michael Park",
      role: "Medical Advisor",
      description: "Family physician ensuring medical acCuracy and safety"
    },
    {
      name: "Jordan Kim",
      role: "Full-Stack Developer",
      description: "Building scalable and secure healthcare technology solutions"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "We prioritize user safety by never attempting diagnosis and always directing users to appropriate professional care."
    },
    {
      icon: Heart,
      title: "Empathetic Care",
      description: "Our AI is designed to communicate with warmth and understanding, reducing anxiety during health concerns."
    },
    {
      icon: Target,
      title: "Efficient Guidance",
      description: "We help users navigate healthcare more efficiently by suggesting the right care pathway from the start."
    },
    {
      icon: Users,
      title: "Accessible to All",
      description: "Healthcare guidance should be accessible to everyone, regardless of location or economic status."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-hero mb-6">
            About Cura Health Assistant
          </h1>
          <p className="text-subtitle max-w-3xl mx-auto mb-8">
            We're building the future of preliminary health guidance — safe, empathetic, and accessible technology 
            that bridges the gap between health concerns and appropriate care.
          </p>
        </section>

        {/* Problem & Solution */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="card-feature animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Problem</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When people experience health symptoms, they often face a difficult choice: ignore concerning symptoms 
                or rush to emergency care for non-urgent issues.
              </p>
              <p>
                This leads to delayed care for serious conditions, overwhelmed emergency departments, and increased 
                anxiety for patients unsure about their next steps.
              </p>
            </div>
          </Card>

          <Card className="card-feature animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Solution</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Cura Health Assistant provides preliminary health guidance through empathetic AI conversation, 
                helping users understand appropriate next steps without attempting diagnosis.
              </p>
              <p>
                We generate doctor-ready summaries that save time for both patients and healthcare providers, 
                making the healthcare system more efficient for everyone.
              </p>
            </div>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-subtitle">
              The principles that guide everything we build
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="card-feature animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                    <value.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-subtitle">
              Passionate individuals working to improve healthcare accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={member.name} className="card-feature animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center space-y-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-hero flex items-center justify-center shadow-soft">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology & Safety */}
        <section className="grid md:grid-cols-2 gap-12">
          <Card className="card-gradient animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-4">Technology Approach</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our AI is trained specifically for preliminary health guidance, using natural language processing 
                to understand symptoms and provide empathetic responses.
              </p>
              <p>
                We use structured conversation flows to gather relevant information while maintaining clear boundaries 
                about what we can and cannot provide.
              </p>
              <p>
                All data is processed securely, and we never store personal health information beyond the current session.
              </p>
            </div>
          </Card>

          <Card className="card-gradient animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Safety & Ethics</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We work closely with medical professionals to ensure our guidance algorithms are safe and appropriate 
                for preliminary health assessment.
              </p>
              <p>
                Our system is designed with multiple safeguards to recognize emergency situations and immediately 
                direct users to appropriate urgent care.
              </p>
              <p>
                We maintain transparency about our limitations and always emphasize the importance of professional 
                medical consultation.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;