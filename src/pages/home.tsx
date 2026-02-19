import React from 'react';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import HowToUse from '../components/sections/howtouse';
import BusinessCustomerCards from '../components/sections/businesscustomercards';

type Platform = 'ios' | 'android';

interface HomeProps {
  platform: Platform;
  onPlatformChange: (platform: Platform) => void;
}

const Home: React.FC<HomeProps> = ({ platform, onPlatformChange }) => {
  return (
    <>
      <Hero platform={platform} onPlatformChange={onPlatformChange} />
      <BusinessCustomerCards />
      <Features />
      <HowToUse />
    </>
  );
};

export default Home;