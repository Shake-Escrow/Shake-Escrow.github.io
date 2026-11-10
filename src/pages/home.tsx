import React from 'react';
import SEO from '../components/common/seo';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import HowToUse from '../components/sections/howtouse';
import BusinessCustomerCards from '../components/sections/businesscustomercards';
import MarketplaceSpotlight from '../components/sections/marketplace-spotlight';

type Platform = 'ios' | 'android' | 'telegram' | 'farcaster' | 'browser';

interface HomeProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const Home: React.FC<HomeProps> = ({ platform, onPlatformChange }) => {
  return (
    <>
      <SEO
        title="Shake DeFi: Tradable Debt Notes & Collateralized NFT Lending"
        description="Borrow crypto against verified assets you keep in hand, backed by a tradable on-chain debt note that pays whoever holds it — no banks, no middlemen, no margin calls."
        canonical="/"
      />
      <Hero platform={platform} onPlatformChange={onPlatformChange} />
      <BusinessCustomerCards />
      <MarketplaceSpotlight />
      <Features />
      <HowToUse />
    </>
  );
};

export default Home;
