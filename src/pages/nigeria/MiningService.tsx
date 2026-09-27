// FILE PATH: src/pages/nigeria/MiningService.tsx
// Place this file at: src/pages/nigeria/MiningService.tsx

import { ArrowLeft, CheckCircle, Mountain, Hammer, Truck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MiningNigeria = () => {
  const services = [
    {
      icon: Hammer,
      title: "Equipment & Materials Supply",
      description: "Mining equipment, spare parts, and consumables for extractive operations across Nigeria."
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Transportation coordination for mining equipment, materials, and extracted resources."
    },
    {
      icon: Shield,
      title: "Safety Equipment",
      description: "Personal protective equipment (PPE) and safety systems for mining operations."
    },
    {
      icon: Mountain,
      title: "Operational Support",
      description: "Technical assistance and operational coordination for mining and quarrying activities."
    }
  ];

  const capabilities = [
    "Experience with solid minerals sector",
    "Nationwide supply network",
    "Mining safety compliance",
    "Equipment maintenance support",
    "Emergency response capability",
    "Regulatory documentation assistance"
  ];

  const sectors = [
    "Gold and precious metals mining",
    "Coal and solid minerals extraction",
    "Limestone and aggregate quarrying",
    "Construction sand mining",
    "Gemstone operations",
    "Mineral exploration support"
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
              <Mountain className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Mining & Quarrying Support
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Specialized support for extractive industries with reliable materials sourcing and operational logistics. We provide comprehensive services for mining and quarrying operations across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Mining Services
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
                  Our Capabilities
                </h2>
                <div className="space-y-4">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{capability}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Mining Sectors We Serve
                </h2>
                <div className="space-y-4">
                  {sectors.map((sector, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{sector}</p>
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
              Power Your Mining Operations
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Connect with us for reliable mining support services and equipment supply.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Request Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MiningNigeria;
