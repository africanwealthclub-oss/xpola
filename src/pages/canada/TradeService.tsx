// FILE PATH: src/pages/canada/TradeService.tsx
// Place this file at: src/pages/canada/TradeService.tsx

import { ArrowLeft, CheckCircle, ShoppingBag, Store, Package, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TradeCanada = () => {
  const services = [
    {
      icon: Store,
      title: "General Merchandise",
      description: "Wholesale distribution of quality products for retail and commercial customers."
    },
    {
      icon: Package,
      title: "Direct Selling",
      description: "Business-to-business and direct-to-consumer sales channels."
    },
    {
      icon: ShoppingBag,
      title: "Wholesale Supply",
      description: "Bulk supply services for retailers, businesses, and institutional buyers."
    },
    {
      icon: TrendingUp,
      title: "Trade Facilitation",
      description: "Import/export support and supplier network connections."
    }
  ];

  const categories = [
    "Office and business supplies",
    "Industrial equipment and tools",
    "Safety and protective equipment",
    "Technology and electronics",
    "Facilities and maintenance supplies",
    "Specialized commercial products"
  ];

  const benefits = [
    "Competitive wholesale pricing",
    "Established supplier relationships",
    "Quality assurance processes",
    "Flexible ordering and delivery",
    "Account management support",
    "Volume discount programs"
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
              <ShoppingBag className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                Retail & Wholesale Trade
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              General merchandise, direct selling, and wholesale supply. We connect Canadian businesses with quality products and reliable supply chains.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Our Trade Services
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
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="font-poppins text-foreground">{category}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-8">
                  Partnership Benefits
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
              Grow Your Business with Us
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Access quality wholesale products and reliable trade services.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TradeCanada;
