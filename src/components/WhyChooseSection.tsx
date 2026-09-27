// FILE PATH: src/components/common/WhyChooseSection.tsx
// Place this file at: src/components/common/WhyChooseSection.tsx

import { Building2, Fuel, Globe2, Layers, MapPin, Building, Shield } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";

const iconMap: Record<string, any> = {
  Building2,
  Fuel,
  Globe2,
  Layers,
  MapPin,
  Building,
  Shield,
};

const WhyChooseSection = () => {
  const { currentData } = useCountry();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 glow-red-small" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 glow-red-small" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {currentData.whyChoose.title}
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentData.whyChoose.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {currentData.whyChoose.features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
  };
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = iconMap[feature.icon];

  return (
    <div className="flex gap-6 p-8 md:p-10 bg-background-secondary border border-border rounded-2xl transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,0,0,0.2)]">
      {/* Icon Container */}
      <div className="icon-container flex-shrink-0">
        {Icon && <Icon className="w-7 h-7 text-primary" />}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-montserrat font-bold text-lg md:text-xl text-foreground mb-3">
          {feature.title}
        </h3>
        <p className="font-poppins text-[15px] text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default WhyChooseSection;
