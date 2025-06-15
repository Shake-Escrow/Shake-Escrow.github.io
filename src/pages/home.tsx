import React from 'react';
import Hero from '../components/sections/hero';
import Features from '../components/sections/features';
import HowToUse from '../components/sections/howtouse';
import BusinessCustomerCards from '../components/sections/businesscustomercards';


const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <BusinessCustomerCards />
      <Features />
      <HowToUse />
    </>
  );
};

export default Home;