import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Send } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import Button from '../components/common/button';
import Section from '../components/common/section';
import SEO from '../components/common/seo';
import { useContent } from '../hooks/useContent';

const Marketplace: React.FC = () => {
  const siteContent = useContent('sitecontent');
  const content = siteContent.marketplace;

  return (
    <div className="pt-24">
      <SEO
        title="Shake Marketplace | Discover and Share P2P Listings"
        description="Share a Shake listing with the Marketplace Telegram channel and discover goods and services from the community."
        canonical="/marketplace"
      />
      <Section bgColor="bg-white" className="pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl text-secondary-dark leading-tight">{content.hero.headline}</h1>
          <p className="mt-6 mx-auto max-w-3xl font-body text-lg md:text-xl text-secondary">{content.hero.description}</p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer">
              <Button size="lg"><span className="inline-flex items-center gap-2"><FaTelegramPlane aria-hidden="true" />{content.exploreLabel}</span></Button>
            </a>
            <a href="https://app.shakedefi.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">{content.createListingLabel}</Button>
            </a>
          </div>
        </div>
      </Section>

      <Section bgColor="bg-primary-light" className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {content.benefits.map((benefit: { title: string; description: string }, index: number) => {
            const Icon = index === 0 ? Send : MapPin;
            return (
              <article key={benefit.title} className="rounded-3xl bg-white p-8 md:p-10 shadow-sm">
                <Icon size={30} className="text-accent" aria-hidden="true" />
                <h2 className="mt-5 font-display text-3xl text-secondary-dark">{benefit.title}</h2>
                <p className="mt-4 font-body text-lg text-secondary">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section bgColor="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-secondary-dark">{content.stepsHeading}</h2>
            <p className="mt-4 font-body text-lg text-secondary">{content.stepsDescription}</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {content.steps.map((step: { title: string; description: string }, index: number) => (
              <li key={step.title} className="rounded-3xl border border-gray-200 p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-xl text-secondary-dark">{index + 1}</span>
                <h3 className="mt-5 font-display text-2xl text-secondary-dark">{step.title}</h3>
                <p className="mt-3 font-body text-secondary">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section bgColor="bg-secondary-dark">
        <div className="max-w-3xl mx-auto text-center">
          <CheckCircle2 className="mx-auto text-accent" size={34} aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl md:text-4xl text-white">{content.trust.title}</h2>
          <p className="mt-5 font-body text-lg text-gray-200">{content.trust.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer"><Button size="lg">{content.exploreLabel}</Button></a>
            <Link to="/how-it-works"><Button variant="outline" size="lg" className="border-white text-white hover:text-secondary-dark">{content.howItWorksLabel}</Button></Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Marketplace;
