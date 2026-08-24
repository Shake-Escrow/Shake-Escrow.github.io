import React from 'react';
import { Link } from 'react-router-dom';
import { FaTelegramPlane } from 'react-icons/fa';
import { MapPin, Store } from 'lucide-react';
import Button from '../common/button';
import Section from '../common/section';
import { useContent } from '../../hooks/useContent';

const MarketplaceSpotlight: React.FC = () => {
  const siteContent = useContent('sitecontent');
  const content = siteContent.home.marketplace;

  return (
    <Section bgColor="bg-white" className="pt-4 md:pt-8">
      <div className="max-w-5xl mx-auto rounded-3xl bg-secondary-dark px-7 py-10 md:px-12 md:py-14 text-white overflow-hidden relative">
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />
        <div className="relative grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-body text-sm font-semibold text-accent">
              <Store size={18} aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h2 className="mt-5 font-display text-3xl md:text-4xl leading-tight">{content.headline}</h2>
            <p className="mt-5 max-w-2xl font-body text-lg text-gray-200">{content.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/marketplace">
                <Button size="lg">{content.learnMoreLabel}</Button>
              </Link>
              <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-white text-white hover:text-secondary-dark">
                  <span className="inline-flex items-center gap-2"><FaTelegramPlane aria-hidden="true" />{content.exploreLabel}</span>
                </Button>
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-secondary-dark shadow-xl">
            <MapPin className="text-accent" size={28} aria-hidden="true" />
            <p className="mt-4 font-display text-2xl">{content.sellerBenefitTitle}</p>
            <p className="mt-2 font-body text-secondary">{content.sellerBenefit}</p>
            <div className="my-5 border-t border-gray-200" />
            <p className="font-display text-2xl">{content.buyerBenefitTitle}</p>
            <p className="mt-2 font-body text-secondary">{content.buyerBenefit}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MarketplaceSpotlight;
