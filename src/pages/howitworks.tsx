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
            Shake uses an escrow which is like a safe that keeps the customer's money secure while a business delivers a product or service.
          </p>
          
          {/* Image and Process Steps Side by Side */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mb-8 max-w-5xl mx-auto">
            <div className="flex-shrink-0 lg:w-[65%]">
              <img
                src="/images/escrow-process-illustration.jpg"
                alt="The Escrow Process - Customer and merchant transaction with secure escrow safe"
                className="w-full h-auto object-cover rounded-2xl shadow-lg mx-auto"
                style={{ maxHeight: '630px', objectPosition: 'center -78px' }}
              />
            </div>
            
            <div className="lg:w-[35%] text-left flex flex-col justify-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary-dark mb-6">
                The Escrow Process
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</span>
                  <p className="font-body text-lg text-secondary">After making a transaction, your money is placed into an escrow for a set amount of time, which is like a neutral safe, rather than going directly to the merchant.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</span>
                  <p className="font-body text-lg text-secondary">During this waiting period, if you don't receive what you purchased, you can discuss it with the merchant directly or request a refund.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</span>
                  <p className="font-body text-lg text-secondary">If you don't request a refund during the waiting period, the merchant can withdraw the money.</p>
                </div>
              </div>
            </div>
          </div>
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