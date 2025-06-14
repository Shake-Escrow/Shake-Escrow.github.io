import React from 'react';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import HowToUse from '../components/sections/HowToUse';
import BusinessCustomerCards from '../components/sections/BusinessCustomerCards';


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