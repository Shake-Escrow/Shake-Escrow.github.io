import React from 'react';
import SEO from '../components/common/seo';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import HowToUse from '../components/sections/howtouse';
import BusinessCustomerCards from '../components/sections/businesscustomercards';

type Platform = 'ios' | 'android' | 'telegram' | 'farcaster';

interface HomeProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const Home: React.FC<HomeProps> = ({ platform, onPlatformChange }) => {
  return (
    <>
      <SEO
        title="Shake Defi: Smart Contract Escrow"
        description="Secure decentralized escrow payments for global transactions, peer-to-peer deals, and e-commerce with automated smart contracts."
        canonical="/"
      />
      <Hero platform={platform} onPlatformChange={onPlatformChange} />
      <BusinessCustomerCards />
      <Features />
      <HowToUse />
    </>
  );
};

export default Home;
