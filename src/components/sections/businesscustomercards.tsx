import React from 'react';
import Section from '../common/Section';
import Button from '../common/Button';
import siteContent from '../../content/siteContent.json';

const BusinessCustomerCards: React.FC = () => {
  return (
    <Section bgColor="bg-white">
      <div className="flex flex-col gap-4 container mx-auto px-6">
        {/* Business Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] flex flex-col justify-center py-8 px-8 sm:px-12">
            <div className="text-eyebrow font-display text-[#2d3440] mb-2 tracking-widest uppercase">{siteContent.home.businessCustomerCards.business.label}</div>
            <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.business.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>
              {siteContent.home.businessCustomerCards.business.description}
            </p>
            <a href="/get-paid">
              <Button size="md" variant="secondary" className="self-start rounded-full py-3 px-8 text-lg mb-4">
                {siteContent.home.businessCustomerCards.business.button}
              </Button>
            </a>
            
          </div>
          {/* Right: Image */}
          <div className="h-full w-full">
            <img 
              src="/images/istockphoto-1266980652-1024x1024.jpg" 
              alt="Business Bitcoin Solutions" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Customer Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] flex flex-col justify-center py-8 px-8 sm:px-12">
            <div className="text-eyebrow font-display text-[#2d3440] mb-2 tracking-widest uppercase">{siteContent.home.businessCustomerCards.customer.label}</div>
            <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.customer.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>
              {siteContent.home.businessCustomerCards.customer.description}
            </p>
            <a href="/send-payments">
              <Button size="md" variant="secondary" className="self-start rounded-full py-3 px-8 text-lg mb-4">
                {siteContent.home.businessCustomerCards.customer.button}
              </Button>
            </a>
            
          </div>
          {/* Right: Image */}
          <div className="h-full w-full">
            <img 
              src="/images/istockphoto-1360028311-1024x1024.jpg" 
              alt="Customer Bitcoin Solutions" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BusinessCustomerCards;