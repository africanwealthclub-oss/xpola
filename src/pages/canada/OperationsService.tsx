// FILE PATH: src/pages/canada/OperationsService.tsx
// Place this file at: src/pages/canada/OperationsService.tsx

import { ArrowLeft, CheckCircle, Package, Settings, Users, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OperationsCanada = () => {
  const services = [
    {
      icon: Package,
      title: "Facilities Management",
      description: "Comprehensive facility operations, maintenance coordination, and property management services."
    },
    {
      icon: Settings,
      title: "Coordinating Services",
      description: "Project coordination, vendor management, and operational support for business activities."
    },
    {
      icon: Users,
      title: "Business Support",
      description: "Administrative assistance, office management, and operational efficiency consulting."
    },
    {
      icon: FileText,
      title: "Documentation Support",
      description: "Process documentation, compliance tracking, and operational record management."
    }
  ];

  const capabilities = [
    "Multi-site facility coordination",
    "Vendor and contractor management",
    "Compliance documentation expertise",
    "Budget and cost control",
    "Quality assurance processes",
    "Emergency response planning"
  ];

  const industries = [
    "Corporate office facilities",
    "Retail and commercial properties",
    "Industrial and manufacturing sites",
    "Healthcare and institutional buildings",
    "Government and public facilities",
    "Educational institutions"
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
              <Package className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Business & Operational Support
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Facilities management, coordinating, and business support services. We help Canadian organizations optimize operations, reduce costs, and maintain efficient business environments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Support Services
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
                  Industries We Serve
                </h2>
                <div className="space-y-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{industry}</p>
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
              Optimize Your Operations
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Let us handle your operational needs so you can focus on core business.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Request Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OperationsCanada;
