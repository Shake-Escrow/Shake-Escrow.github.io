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

const HOME_JSON_LD: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shake DeFi',
    url: 'https://shakedefi.com',
    logo: 'https://shakedefi.com/images/shake-logo_horizontal_color.png',
    email: 'matt@shakedefi.com',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Shake DeFi',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, Telegram',
    url: 'https://shakedefi.com',
    description:
      'Non-custodial platform for tradable NFT-backed debt notes on TON & Base and smart-contract escrow payments.',
  },
];

const Home: React.FC<HomeProps> = ({ platform, onPlatformChange }) => {
  return (
    <>
      <SEO
        title="Shake DeFi: Tradable NFT-Backed Debt Notes on TON & Base"
        description="Earn fixed monthly yield in TON, USDT, USDC & ETH with tradable NFT-backed debt notes on TON & Base, or borrow crypto against verified assets with no margin calls."
        canonical="/"
        jsonLd={HOME_JSON_LD}
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
