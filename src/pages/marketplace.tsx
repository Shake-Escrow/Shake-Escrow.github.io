import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Send, Store, ShieldCheck, ShoppingBag, Layers, ArrowRight } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import Button from '../components/common/button';
import Section from '../components/common/section';
import SEO from '../components/common/seo';
import { useContent } from '../hooks/useContent';

const Marketplace: React.FC = () => {
  const siteContent = useContent('sitecontent');
  const content = siteContent.marketplace;

  const previewFeatureIcons = [ShoppingBag, ShieldCheck, Layers];

  return (
    <div className="pt-24">
      <SEO
        title="Shake Marketplace | Discover and Share P2P Listings"
        description="Share a Shake listing with the Marketplace Telegram channel and discover goods and services from the community."
        canonical="/marketplace"
      />

      {/* Hero Section */}
      <Section bgColor="bg-white" className="pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-sm font-semibold text-secondary-dark mb-6">
            <Store size={16} className="text-secondary-dark" aria-hidden="true" />
            <span>{content.hero.badge || 'Community Marketplace'}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-secondary-dark leading-tight tracking-tight">
            {content.hero.headline}
          </h1>
          <p className="mt-6 mx-auto max-w-3xl font-body text-lg md:text-xl text-secondary leading-relaxed">
            {content.hero.description}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                <span className="inline-flex items-center gap-2">
                  <FaTelegramPlane aria-hidden="true" />
                  {content.exploreLabel}
                </span>
              </Button>
            </a>
            <a href="https://app.shakedefi.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {content.createListingLabel}
              </Button>
            </a>
          </div>
        </div>
      </Section>

      {/* Telegram Channel Live Showcase Section */}
      <Section bgColor="bg-white" className="pt-0 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#e6e9ed]/70 via-[#e6e9ed]/40 to-[#e6e9ed]/80 p-6 sm:p-10 lg:p-12 border border-gray-200/80 shadow-sm overflow-hidden">
            {/* Ambient decorative glow */}
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Feature Narrative & Highlights */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-3.5 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark shadow-xs border border-gray-200/70 mb-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span>{content.preview?.badge || 'Live Telegram Channel'}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark leading-snug">
                  {content.preview?.headline || 'See how listings look to buyers'}
                </h2>

                <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
                  {content.preview?.description ||
                    'When you opt in, Shake formats your photo, description, price, and location into a clear listing card posted directly to the Telegram community channel.'}
                </p>

                {/* Highlights List */}
                <div className="mt-8 space-y-4 sm:space-y-5">
                  {(content.preview?.features || []).map((feature: { title: string; description: string }, idx: number) => {
                    const FeatureIcon = previewFeatureIcons[idx % previewFeatureIcons.length] || ShoppingBag;
                    return (
                      <div
                        key={feature.title}
                        className="flex items-start gap-4 rounded-2xl bg-white/90 p-4 sm:p-5 shadow-xs border border-gray-200/60 backdrop-blur-xs transition-transform hover:translate-x-1 duration-200"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-secondary-dark">
                          <FeatureIcon size={22} className="text-secondary-dark" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-display text-base sm:text-lg text-secondary-dark font-bold">
                            {feature.title}
                          </h3>
                          <p className="mt-1 font-body text-sm sm:text-base text-secondary leading-normal">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Link to Telegram */}
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                  <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto shadow-sm hover:shadow-md">
                      <span className="inline-flex items-center gap-2">
                        <FaTelegramPlane size={18} aria-hidden="true" />
                        <span>{content.exploreLabel}</span>
                      </span>
                    </Button>
                  </a>
                  <a
                    href="https://t.me/Shake_Marketplace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-secondary-dark hover:underline underline-offset-4"
                  >
                    <span>t.me/Shake_Marketplace</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column: Telegram Phone Mockup with Screenshot */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-full max-w-[300px] sm:max-w-[330px] md:max-w-[350px] mx-auto">
                  {/* Floating badge */}
                  <div className="absolute -top-3.5 right-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-secondary-dark px-3.5 py-1.5 font-body text-xs font-semibold text-white shadow-xl ring-1 ring-white/20">
                    <ShieldCheck size={14} className="text-accent" aria-hidden="true" />
                    <span>Telegram Verified Listing</span>
                  </div>

                  {/* Modern Smartphone Mockup Frame */}
                  <div className="relative rounded-[2.75rem] bg-secondary-dark p-3 sm:p-3.5 shadow-2xl ring-1 ring-black/20">
                    {/* Top Speaker / Dynamic Island */}
                    <div className="flex justify-center items-center pb-2 pt-0.5">
                      <div className="h-3.5 w-20 rounded-full bg-black/80 flex items-center justify-end px-2" aria-hidden="true">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-900/60" />
                      </div>
                    </div>

                    {/* Phone Screen Container */}
                    <div className="overflow-hidden rounded-[2rem] bg-[#8fc398] ring-1 ring-black/10 shadow-inner">
                      <img
                        src="/images/telegram-marketplace-preview.jpg"
                        alt={
                          content.preview?.imageAlt ||
                          'Shake P2P Marketplace Telegram channel screenshot showing listing card with Citizen watch and Buy with Escrow button'
                        }
                        className="w-full h-auto object-cover block select-none"
                        loading="eager"
                        decoding="async"
                      />
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="pt-2 pb-0.5 flex justify-center">
                      <div className="h-1 w-24 rounded-full bg-white/30" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section bgColor="bg-primary-light" className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
          {content.benefits.map((benefit: { title: string; description: string }, index: number) => {
            const Icon = index === 0 ? Send : MapPin;
            return (
              <article key={benefit.title} className="rounded-3xl bg-white p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
                  <Icon size={26} className="text-secondary-dark" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-2xl md:text-3xl text-secondary-dark">{benefit.title}</h2>
                <p className="mt-4 font-body text-base md:text-lg text-secondary leading-relaxed">{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* How it Works / Steps Section */}
      <Section bgColor="bg-white" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-secondary-dark">{content.stepsHeading}</h2>
            <p className="mt-4 font-body text-lg text-secondary">{content.stepsDescription}</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {content.steps.map((step: { title: string; description: string }, index: number) => (
              <li key={step.title} className="rounded-3xl border border-gray-200/90 bg-white p-7 shadow-xs">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-secondary-dark">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-xl sm:text-2xl text-secondary-dark">{step.title}</h3>
                <p className="mt-3 font-body text-secondary leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Trust & CTA Section */}
      <Section bgColor="bg-secondary-dark" className="py-16 md:py-20 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 mb-4">
            <CheckCircle2 className="text-accent" size={32} aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white">{content.trust.title}</h2>
          <p className="mt-5 font-body text-lg text-gray-200 leading-relaxed">{content.trust.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto">
                <span className="inline-flex items-center gap-2">
                  <FaTelegramPlane aria-hidden="true" />
                  {content.exploreLabel}
                </span>
              </Button>
            </a>
            <Link to="/how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:text-secondary-dark hover:bg-white">
                {content.howItWorksLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Marketplace;

