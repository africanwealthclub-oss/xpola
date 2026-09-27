// FILE PATH: src/components/common/FAQSection.tsx
// Place this file at: src/components/common/FAQSection.tsx

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";

const faqs = [
  {
    question: "What services does Xpola offer?",
    answer: "Xpola provides comprehensive solutions across multiple sectors including consulting, oil & gas, construction, mining, commerce, e-commerce, and logistics. We tailor our services to meet the specific needs of each client and market.",
  },
  {
    question: "Which countries do you operate in?",
    answer: "We currently operate in Nigeria and Canada, with plans to expand to additional markets. Each location has dedicated teams and services tailored to local business environments and regulations.",
  },
  {
    question: "How do I get started with a project?",
    answer: "Getting started is easy! Contact us through our website, phone, or email. We'll schedule a free initial consultation to discuss your needs, after which we'll provide a customized proposal outlining our approach, timeline, and investment.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in energy, construction, mining, trade, logistics, and digital commerce. Our multi-disciplinary team brings expertise across these sectors to deliver integrated solutions.",
  },
  {
    question: "Do you offer consulting for small businesses?",
    answer: "Absolutely! We work with businesses of all sizes, from startups to large enterprises. Our consulting services are scalable and can be customized to fit your budget and growth stage.",
  },
  {
    question: "What makes Xpola different from competitors?",
    answer: "Our unique value proposition includes local market expertise combined with international standards, integrated multi-sector solutions, proven track record of successful projects, and commitment to sustainable practices and community development.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. Simple consulting engagements may take 4-8 weeks, while large infrastructure projects can span several months to years. We provide detailed timelines during the proposal phase.",
  },
  {
    question: "What are your payment terms?",
    answer: "Payment terms are flexible and project-dependent. Typically, we work with milestone-based payments or retainer arrangements. We discuss and agree on terms during contract negotiations to ensure they work for both parties.",
  },
];

const FAQSection = () => {
  const { currentData } = useCountry();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-background-secondary">
      <div className="section-divider mb-16" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-poppins text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="font-poppins text-base text-muted-foreground mb-6">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-montserrat font-bold text-sm rounded-xl border-2 border-primary transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left transition-colors"
      >
        <h3 className="font-montserrat font-bold text-base md:text-lg text-foreground pr-8">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
