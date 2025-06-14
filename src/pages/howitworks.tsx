import React from 'react';
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import siteContent from '../content/siteContent.json';

const HowItWorks: React.FC = () => {
  return (
    <div className="pt-24">
      <Section className="pb-0" bgColor="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-hero text-4xl md:text-5xl text-secondary-dark mb-6">
            {siteContent.howItWorks.hero.headline}
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl mb-8 text-center mx-auto">
            Shake uses an escrow which is like a safe that keeps the customer’s money secure while a business delivers a product or service.
          </p>
          <img
            src="/images/20250613_1616_Green-Illuminated-Safe_remix_01jxnj9zmzfpfad5a34czw0640.jpg"
            alt="The Escrow Process"
            className="w-full max-w-2xl h-80 object-cover rounded-2xl shadow-lg mx-auto mb-8"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
        </div>
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>
            {siteContent.howItWorks.section1.headline}
          </h2>
          <p className="font-body text-lg text-secondary mb-8">
            {siteContent.howItWorks.section1.description}
          </p>
          <img
            src="/images/Safe-Payment-System-Diagram_V1.png"
            alt="Safe Payment System Diagram"
            className="mx-auto mb-8 rounded-xl"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </Section>

      {/* Trust & Control Section */}

      <CTASection />
    </div>
  );
};

export default HowItWorks;

function CTASection() {
  return (
    <Section bgColor="bg-secondary-dark" className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-cta-header text-3xl md:text-4xl mb-6 text-[#e6e9ed]">
          {siteContent.howItWorks.cta.header}
        </h2>
        <p className="font-body text-description text-xl mb-8 text-[#e6e9ed]">
          {siteContent.howItWorks.cta.subhead}
        </p>
        <Button size="lg" variant="primary" className="rounded-full">
          {siteContent.howItWorks.cta.button}
        </Button>
      </div>
    </Section>
  );
}