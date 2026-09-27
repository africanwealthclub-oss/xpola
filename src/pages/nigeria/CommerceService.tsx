// FILE PATH: src/pages/nigeria/CommerceService.tsx
// Place this file at: src/pages/nigeria/CommerceService.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Globe, Ship, FileText, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CommerceNigeria = () => {
  const services = [
    {
      icon: Globe,
      title: "International Trade",
      description: "Import/export facilitation, customs clearance, and international supplier connections."
    },
    {
      icon: Ship,
      title: "Wholesale Distribution",
      description: "Large-scale distribution of goods and products across Nigerian markets."
    },
    {
      icon: FileText,
      title: "Trade Documentation",
      description: "Complete documentation support for import/export and cross-border transactions."
    },
    {
      icon: TrendingUp,
      title: "Supply Chain Management",
      description: "End-to-end supply chain coordination for efficient product flow and delivery."
    }
  ];

  const products = [
    "Industrial equipment and machinery",
    "Consumer goods and electronics",
    "Medical and pharmaceutical supplies",
    "Office and business equipment",
    "Food and agricultural products",
    "Textile and fashion items"
  ];

  const benefits = [
    "Established international supplier network",
    "Customs and regulatory expertise",
    "Competitive pricing through volume",
    "Quality assurance and verification",
    "Flexible payment terms",
    "Nationwide distribution capability"
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
              <Globe className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                General Commerce & Trade
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              International trade facilitation, wholesale distribution, and cross-border supply chain management. We connect Nigerian businesses with global suppliers and manage the complete trade process.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Commerce Services
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
                  Product Categories
                </h2>
                <div className="space-y-4">
                  {products.map((product, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{product}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Why Trade With Us
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
              Expand Your Business Globally
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Let us handle your international trade and distribution needs.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Start Trading
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommerceNigeria;
