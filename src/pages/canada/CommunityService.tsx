// FILE PATH: src/pages/canada/CommunityService.tsx
// Place this file at: src/pages/canada/CommunityService.tsx

import { ArrowLeft, CheckCircle, Users, Heart, Home, Smile } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CommunityCanada = () => {
  const services = [
    {
      icon: Users,
      title: "Individual Services",
      description: "Personal assistance and support services tailored to individual needs."
    },
    {
      icon: Home,
      title: "Family Support",
      description: "Family-oriented services and household assistance programs."
    },
    {
      icon: Heart,
      title: "Community Programs",
      description: "Community engagement and social service coordination."
    },
    {
      icon: Smile,
      title: "Personal Care",
      description: "Personal care and lifestyle support services."
    }
  ];

  const offerings = [
    "Personal assistance services",
    "Family support programs",
    "Community outreach coordination",
    "Social service facilitation",
    "Household service coordination",
    "Lifestyle support services"
  ];

  const benefits = [
    "Compassionate, professional service",
    "Flexible scheduling options",
    "Culturally sensitive approach",
    "Privacy and confidentiality",
    "Reliable and consistent support",
    "Community-focused values"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-background-secondary to-background">
        <div className="container mx-auto px-4">
          <a href="/#sectors" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-poppins text-sm">Back to Services</span>
          </a>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Community & Personal Services
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Individual, family, and community-focused service solutions. We provide compassionate support services that enhance quality of life for individuals and families across Canada.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Community Services
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

      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  What We Offer
                </h2>
                <div className="space-y-4">
                  {offerings.map((offering, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{offering}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Our Commitment
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-6">
              Supporting Communities, Serving Individuals
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Discover how our community services can support you and your family.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityCanada;
