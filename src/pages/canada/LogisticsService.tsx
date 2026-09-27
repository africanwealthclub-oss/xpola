// FILE PATH: src/pages/canada/LogisticsService.tsx
// Place this file at: src/pages/canada/LogisticsService.tsx

import { ArrowLeft, CheckCircle, Truck, Package, MapPin, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LogisticsCanada = () => {
  const services = [
    {
      icon: Package,
      title: "Warehousing Services",
      description: "Secure storage facilities with inventory management across Canadian locations."
    },
    {
      icon: Truck,
      title: "Transportation & Delivery",
      description: "Reliable ground transportation and delivery services across provinces."
    },
    {
      icon: MapPin,
      title: "Supply Chain Coordination",
      description: "End-to-end supply chain management from suppliers to final destination."
    },
    {
      icon: Shield,
      title: "Quality & Compliance",
      description: "Ensuring all shipments meet Canadian transportation and safety regulations."
    }
  ];

  const capabilities = [
    "Cross-border logistics (US-Canada)",
    "Temperature-controlled transport",
    "Real-time shipment tracking",
    "Customs brokerage services",
    "Distribution center management",
    "Returns and reverse logistics"
  ];

  const coverage = [
    "Ontario and Greater Toronto Area",
    "Quebec and Montreal region",
    "British Columbia and Vancouver",
    "Alberta (Calgary and Edmonton)",
    "Atlantic provinces",
    "Prairie provinces"
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
              <Truck className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Logistics & Distribution
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Warehousing, delivery, and supply chain coordination services. We provide comprehensive logistics solutions for businesses operating across Canada.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Logistics Solutions
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
                  Service Capabilities
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
                  Coverage Areas
                </h2>
                <div className="space-y-4">
                  {coverage.map((area, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{area}</p>
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
              Streamline Your Supply Chain
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Partner with us for reliable, efficient logistics across Canada.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LogisticsCanada;
