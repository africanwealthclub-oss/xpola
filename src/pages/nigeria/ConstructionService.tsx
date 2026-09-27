// FILE PATH: src/pages/nigeria/ConstructionService.tsx
// Place this file at: src/pages/nigeria/ConstructionService.tsx

import { ArrowLeft, CheckCircle, Building, Hammer, Truck, ClipboardCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ConstructionNigeria = () => {
  const services = [
    {
      icon: Building,
      title: "Construction Materials Supply",
      description: "Quality building materials including cement, steel, aggregates, and finishing products."
    },
    {
      icon: Hammer,
      title: "Project Support Services",
      description: "On-site coordination, equipment rental, and skilled labor provision for construction projects."
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      description: "Reliable transportation and timely delivery of materials to construction sites nationwide."
    },
    {
      icon: ClipboardCheck,
      title: "Quality Assurance",
      description: "Material testing, verification, and quality control to ensure construction standards compliance."
    }
  ];

  const materials = [
    "Cement and concrete products",
    "Structural steel and reinforcement",
    "Aggregates and sand",
    "Roofing materials",
    "Finishing materials (tiles, paints, fixtures)",
    "Electrical and plumbing supplies"
  ];

  const projects = [
    "Residential buildings and estates",
    "Commercial complexes and offices",
    "Industrial facilities and warehouses",
    "Infrastructure projects (roads, bridges)",
    "Institutional buildings (schools, hospitals)",
    "Renovation and refurbishment"
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
              <Building className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Construction & Real Estate
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Project support, quality materials supply, and comprehensive property development services nationwide. We provide everything needed for successful construction projects across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Construction Services
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
                  Materials We Supply
                </h2>
                <div className="space-y-4">
                  {materials.map((material, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{material}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Project Types
                </h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{project}</p>
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
              Build Your Vision with Quality Materials
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Partner with us for reliable construction materials and project support services.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get a Quote Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConstructionNigeria;
