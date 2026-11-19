import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';
import Section from '../common/section';
import Button from '../common/button';
import { useContent } from '../../hooks/useContent';

const BusinessCustomerCards: React.FC = () => {
  const siteContent = useContent('sitecontent');
  return (
    <Section bgColor="bg-white">
      <div className="flex flex-col gap-4 container mx-auto px-6">
        {/* Business Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] relative min-h-[220px] px-8 sm:px-12 py-8">
  <div
    className="md:absolute md:left-12 md:top-8 text-eyebrow tracking-widest uppercase z-10 mb-3 md:mb-0 font-bold text-[#2d3440]"
  >
    {siteContent.home.businessCustomerCards.business.label}
  </div>
  <div className="flex flex-col justify-center h-full min-h-[44px] md:min-h-[180px] md:pt-12">
    <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.business.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
    <p className="text-description mb-6 text-[#2d3440] opacity-90 font-body">
      {siteContent.home.businessCustomerCards.business.description}
    </p>
    <Link to="/nft">
      <Button size="md" variant="secondary" className="self-start rounded-full py-3 px-8 text-lg mb-4">
        {siteContent.home.businessCustomerCards.business.button}
      </Button>
    </Link>
  </div>
</div>
          {/* Right: Image */}
          <div className="h-full w-full bg-white flex items-center justify-center">
            <img
              src="/images/borrower-verified-assets.jpg"
              alt="Borrow against verified NFT collateral"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        {/* Platform Availability Note */}
        <div className="w-full rounded-2xl border border-gray-200 bg-[#f7f9fb] px-6 py-4 flex items-center justify-center gap-2.5 text-center font-body text-sm sm:text-base font-medium text-[#2d3440]">
          <Smartphone size={18} className="shrink-0 text-[#2d3440]" aria-hidden="true" />
          <span>{siteContent.home.businessCustomerCards.availabilityNote}</span>
        </div>
        {/* Customer Card */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden">
          {/* Left: Text */}
          <div className="bg-[#e6e9ed] relative min-h-[220px] px-8 sm:px-12 py-8">
  <div
    className="md:absolute md:left-12 md:top-8 text-eyebrow tracking-widest uppercase z-10 mb-3 md:mb-0 font-bold text-[#2d3440]"
  >
    {siteContent.home.businessCustomerCards.customer.label}
  </div>
  <div className="flex flex-col justify-center h-full min-h-[44px] md:min-h-[180px] md:pt-12">
    <h3 className="font-display text-cta-header text-3xl md:text-4xl mb-4 text-[#2d3440]">{siteContent.home.businessCustomerCards.customer.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}<br/></React.Fragment>))}</h3>
    <p className="text-description text-[#2d3440] opacity-90 font-body">
      {siteContent.home.businessCustomerCards.customer.description}
    </p>
  </div>
</div>
          {/* Right: Image */}
          <div className="h-full w-full bg-white flex items-center justify-center">
            <img
              src="/images/lender-tradable-debt-note.jpg"
              alt="Tradable on-chain debt note backed by collateral"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BusinessCustomerCards;
