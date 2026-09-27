// FILE PATH: src/components/common/StatsSection.tsx
// Place this file at: src/components/common/StatsSection.tsx

import { useEffect, useRef, useState } from "react";
import { useCountry } from "@/contexts/CountryContext";

const StatsSection = () => {
  const { currentData } = useCountry();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(currentData.stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(
        currentData.stats.map((stat) =>
          stat.isNumeric ? Math.floor(stat.value * easeOut) : 0
        )
      );

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(currentData.stats.map((stat) => stat.value));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, currentData]);

  const formatNumber = (index: number) => {
    const stat = currentData.stats[index];
    if (!stat.isNumeric) return stat.number;
    
    // Handle special cases
    if (stat.number.includes('+')) {
      return `${counts[index]}+`;
    }
    return counts[index].toString();
  };

  return (
    <section ref={sectionRef} className="py-20 bg-stats-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {currentData.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center"
            >
              <div className="h-16 mb-3 flex items-center justify-center">
                <span className="text-gradient-red font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl">
                  {formatNumber(index)}
                </span>
              </div>
              <span className="font-poppins font-medium text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {stat.label}
              </span>
              <span className="font-poppins text-sm text-muted-foreground/70">
                {stat.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
