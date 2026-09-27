// FILE PATH: src/pages/nigeria/OilGasService.tsx
// Place this file at: src/pages/nigeria/OilGasService.tsx

import { ArrowLeft, CheckCircle, Fuel, Package, Truck, Settings, Shield, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OilGasNigeria = () => {
  const services = [
    {
      icon: Package,
      title: "Procurement Services",
      description: "Comprehensive sourcing and procurement of equipment, materials, and supplies for oil & gas operations."
    },
    {
      icon: Truck,
      title: "Logistics Coordination",
      description: "Efficient transportation and supply chain management for oilfield equipment and materials across Nigeria."
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Expert technical assistance and operational support for energy sector projects and installations."
    },
    {
      icon: Shield,
      title: "Compliance Management",
      description: "Ensuring adherence to Nigerian petroleum industry regulations and international safety standards."
    }
  ];

  const capabilities = [
    "DPR-compliant operations and documentation",
    "Experience with major oil & gas operators",
    "Nationwide logistics network",
    "24/7 emergency support capability",
    "Quality assurance and verification",
    "Customs clearance and import coordination"
  ];

  const sectors = [
    "Upstream exploration and production",
    "Midstream processing and storage",
    "Downstream distribution and retail",
    "Oilfield services and support",
    "Pipeline infrastructure",
    "Marine and offshore operations"
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
            <div className="flex items-center gap-3 mb-6">
              <Fuel className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Oil & Gas Support Services
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Comprehensive procurement, logistics coordination, and technical support for Nigeria's energy sector operations. We provide reliable, compliant, and efficient services to oil & gas operators across the country.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Oil & Gas Services
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

      {/* Capabilities Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Capabilities */}
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

              {/* Sectors Served */}
              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Sectors We Serve
                </h2>
                <div className="space-y-4">
                  {sectors.map((sector, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{sector}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-6">
              Partner with Energy Sector Experts
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Let's discuss how our oil & gas support services can enhance your operations.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OilGasNigeria;
