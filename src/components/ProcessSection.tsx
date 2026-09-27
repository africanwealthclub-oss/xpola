// FILE PATH: src/components/common/ProcessSection.tsx
// Place this file at: src/components/common/ProcessSection.tsx

import { MessageSquare, FileSearch, Wrench, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We discuss your needs, challenges, and goals in a free consultation",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Assessment & Proposal",
    description: "Our team analyzes your requirements and delivers a customized proposal",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Planning & Strategy",
    description: "We develop a detailed roadmap with timelines, milestones, and deliverables",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Implementation",
    description: "Our experts execute the plan with regular updates and quality checks",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Delivery & Support",
    description: "Project completion with ongoing support and performance monitoring",
    icon: CheckCircle,
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-divider mb-16" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            How We Work
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven process ensures successful project delivery every time
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          {/* Desktop View - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-20 left-0 right-0 h-0.5 bg-border" />

              <div className="grid grid-cols-5 gap-4">
                {steps.map((step, index) => (
                  <ProcessStepHorizontal key={index} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - Vertical */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <ProcessStepVertical key={index} step={step} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-poppins text-base text-muted-foreground mb-6">
            Ready to start your project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-montserrat font-bold text-sm rounded-xl border-2 border-primary transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

interface ProcessStepProps {
  step: {
    number: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  index?: number;
}

const ProcessStepHorizontal = ({ step, index = 0 }: ProcessStepProps) => {
  const Icon = step.icon;

  return (
    <div className="relative">
      {/* Icon Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative z-10 w-20 h-20 bg-card border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <div className="inline-block px-4 py-1 bg-primary/10 border border-primary/20 rounded-full mb-3">
          <span className="font-montserrat font-bold text-sm text-primary">
            Step {step.number}
          </span>
        </div>
        <h3 className="font-montserrat font-bold text-base text-foreground mb-2">
          {step.title}
        </h3>
        <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};

const ProcessStepVertical = ({ step }: ProcessStepProps) => {
  const Icon = step.icon;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-xl">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-2">
            <span className="font-montserrat font-bold text-xs text-primary">
              Step {step.number}
            </span>
          </div>
          <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">
            {step.title}
          </h3>
          <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
