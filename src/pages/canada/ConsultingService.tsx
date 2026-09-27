// FILE PATH: src/pages/canada/ConsultingService.tsx
// Place this file at: src/pages/canada/ConsultingService.tsx

import { ArrowLeft, CheckCircle, Lightbulb, FileText, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ConsultingCanada = () => {
  const services = [
    {
      icon: Lightbulb,
      title: "Management Consulting",
      description: "Strategic guidance for organizational effectiveness, change management, and business transformation."
    },
    {
      icon: FileText,
      title: "Administrative Consulting",
      description: "Process optimization, policy development, and administrative systems improvement."
    },
    {
      icon: Users,
      title: "Organizational Development",
      description: "Team building, leadership development, and organizational culture enhancement."
    },
    {
      icon: TrendingUp,
      title: "Business Planning",
      description: "Comprehensive business plans, market analysis, and growth strategy development."
    }
  ];

  const benefits = [
    "Canada-wide service delivery",
    "Experience with public and private sectors",
    "Compliance with federal and provincial regulations",
    "Proven methodologies and frameworks",
    "Collaborative approach with stakeholders",
    "Measurable outcomes and ROI focus"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background-secondary to-background">
        <div className="container mx-auto px-4">
          <a href="/#sectors" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-poppins text-sm">Back to Services</span>
          </a>
          
          <div className="max-w-4xl">
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Consulting & Advisory Services
            </h1>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Management, administrative, and organizational consulting tailored for Canadian enterprises. We help organizations improve performance, navigate change, and achieve strategic objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Consulting Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="p-8 bg-background-secondary border border-border rounded-2xl hover:border-primary transition-all duration-300">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-poppins text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
              Why Partner With Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <p className="font-poppins text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-6">
              Ready to Enhance Your Organization?
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Let's discuss how our consulting services can support your strategic initiatives.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConsultingCanada;
