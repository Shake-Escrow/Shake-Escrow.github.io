import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../common/section';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';

const BusinessCustomerCards: React.FC = () => {
  return (
    <Section bgColor="bg-white">
      <div className="flex flex-col gap-4 container mx-auto px-6">
        {/* Business Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] relative min-h-[220px] px-8 sm:px-12 py-8">
  <div
    className="md:absolute md:left-12 md:top-8 text-eyebrow tracking-widest uppercase z-10 mb-3 md:mb-0"
    style={{ fontFamily: 'Lexend Exa, sans-serif', fontWeight: 500, letterSpacing: '0.08em', color: '#2d3440', position: 'static' }}
  >
    {siteContent.home.businessCustomerCards.business.label}
  </div>
  <div className="flex flex-col justify-center h-full min-h-[44px] md:min-h-[180px]">
    <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.business.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
    <p className="text-description mb-6 text-[#2d3440] opacity-90 font-body">
      {siteContent.home.businessCustomerCards.business.description}
    </p>
    <Link to="/get-paid">
      <Button size="md" variant="secondary" className="self-start rounded-full py-3 px-8 text-lg mb-4">
        {siteContent.home.businessCustomerCards.business.button}
      </Button>
    </Link>
  </div>
</div>
          {/* Right: Image */}
          <div className="h-full w-full">
            <img 
              src="/images/iStock-1266980652.jpg" 
              alt="Business Bitcoin Solutions" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Customer Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] relative min-h-[220px] px-8 sm:px-12 py-8">
  <div
    className="md:absolute md:left-12 md:top-8 text-eyebrow tracking-widest uppercase z-10 mb-3 md:mb-0"
    style={{ fontFamily: 'Lexend Exa, sans-serif', fontWeight: 500, letterSpacing: '0.08em', color: '#2d3440', position: 'static' }}
  >
    {siteContent.home.businessCustomerCards.customer.label}
  </div>
  <div className="flex flex-col justify-center h-full min-h-[44px] md:min-h-[180px]">
    <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.customer.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
    <p className="text-description mb-6 text-[#2d3440] opacity-90 font-body">
      {siteContent.home.businessCustomerCards.customer.description}
    </p>
    <Link to="/send-payments">
      <Button size="md" variant="secondary" className="self-start rounded-full py-3 px-8 text-lg mb-4">
        {siteContent.home.businessCustomerCards.customer.button}
      </Button>
    </Link>
  </div>
</div>
          {/* Right: Image */}
          <div className="h-full w-full">
            <img 
              src="/images/iStock-1360028311.jpg" 
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
