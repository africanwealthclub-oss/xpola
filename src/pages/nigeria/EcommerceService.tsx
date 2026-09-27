// FILE PATH: src/pages/nigeria/EcommerceService.tsx
// Place this file at: src/pages/nigeria/EcommerceService.tsx

import { ArrowLeft, CheckCircle, ShoppingCart, Package, CreditCard, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EcommerceNigeria = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Online Marketplace",
      description: "Browse and purchase from our extensive catalog of industrial and consumer products."
    },
    {
      icon: Package,
      title: "Order Management",
      description: "Easy ordering process with real-time tracking and delivery updates."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options including cards, transfers, and payment on delivery."
    },
    {
      icon: Smartphone,
      title: "Mobile Shopping",
      description: "Shop conveniently from any device - desktop, tablet, or smartphone."
    }
  ];

  const categories = [
    "Industrial supplies and equipment",
    "Office furniture and stationery",
    "Building and construction materials",
    "Electronics and IT equipment",
    "Personal protective equipment (PPE)",
    "General merchandise and consumables"
  ];

  const benefits = [
    "Competitive pricing on all products",
    "Verified quality assurance",
    "Fast delivery nationwide",
    "Bulk order discounts",
    "Customer support available 24/7",
    "Easy returns and exchanges"
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
              <ShoppingCart className="w-12 h-12 text-primary" />
              <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground">
                E-Commerce Platform
              </h1>
            </div>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground leading-relaxed">
              Digital marketplace providing convenient access to industrial supplies, consumer goods, and business essentials. Shop online with confidence and get products delivered to your doorstep across Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
            Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-background-secondary border border-border rounded-2xl hover:border-primary transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-montserrat font-bold text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-poppins text-muted-foreground leading-relaxed">
                  {feature.description}
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
                  Shopping Benefits
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
              Shop Smart, Shop Online
            </h2>
            <p className="font-poppins text-lg text-muted-foreground mb-8">
              Experience convenient online shopping with quality products and reliable delivery.
            </p>
            <a
              href="/#contact"
              className="inline-block font-poppins font-semibold text-foreground bg-primary hover:bg-primary/80 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Visit Our Store
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EcommerceNigeria;
