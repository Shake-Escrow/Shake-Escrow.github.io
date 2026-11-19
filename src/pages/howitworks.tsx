import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Coins,
  Landmark,
  Lock,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { GoBrowser } from 'react-icons/go';
import Section from '../components/common/section';
import Button from '../components/common/button';
import SEO from '../components/common/seo';
import { useLocale } from '../context/LocaleContext';
import { useContent } from '../hooks/useContent';
import EscrowOptions from '../components/common/escrow-options';

type HowItWorksTab = 'debt-notes' | 'escrow';

const DEBT_NOTES_BOARD_URL_BASE = 'https://app.shakedefi.com/support/nftLoan?tab=board';
const TELEGRAM_MINI_APP_URL = 'https://t.me/ShakeDefiBot/app';

const HowItWorks: React.FC = () => {
  const { locale } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const siteContent = useContent('sitecontent');
  const content = siteContent.howItWorks;

  const activeTab: HowItWorksTab = searchParams.get('tab') === 'escrow' ? 'escrow' : 'debt-notes';

  const debtNotesTabRef = useRef<HTMLButtonElement>(null);
  const escrowTabRef = useRef<HTMLButtonElement>(null);
  const debtNotesPanelRef = useRef<HTMLDivElement>(null);
  const escrowPanelRef = useRef<HTMLDivElement>(null);

  const webAppBoardUrl = `${DEBT_NOTES_BOARD_URL_BASE}&lang=${encodeURIComponent(locale)}`;

  const selectTab = useCallback(
    (next: HowItWorksTab, options?: { scrollPageTop?: boolean }) => {
      setSearchParams(next === 'escrow' ? { tab: 'escrow' } : {}, { replace: true });
      const targetTabEl = next === 'debt-notes' ? debtNotesTabRef.current : escrowTabRef.current;
      targetTabEl?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      if (options?.scrollPageTop && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [setSearchParams],
  );

  // React 18 converts string `hidden="until-found"` into boolean `hidden=""`;
  // synchronize the exact attribute value so Chromium Find-in-Page can reveal hidden panels.
  useLayoutEffect(() => {
    const panels: Array<{ el: HTMLDivElement | null; active: boolean }> = [
      { el: debtNotesPanelRef.current, active: activeTab === 'debt-notes' },
      { el: escrowPanelRef.current, active: activeTab === 'escrow' },
    ];
    for (const { el, active } of panels) {
      if (!el) continue;
      if (active) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', 'until-found');
      }
    }
  }, [activeTab]);

  // Synchronize tab selection when browser Find-in-Page opens a hidden panel via `beforematch`.
  useEffect(() => {
    const dnPanel = debtNotesPanelRef.current;
    const escPanel = escrowPanelRef.current;
    const onDebtNotesMatch = () => selectTab('debt-notes');
    const onEscrowMatch = () => selectTab('escrow');

    dnPanel?.addEventListener('beforematch', onDebtNotesMatch);
    escPanel?.addEventListener('beforematch', onEscrowMatch);
    return () => {
      dnPanel?.removeEventListener('beforematch', onDebtNotesMatch);
      escPanel?.removeEventListener('beforematch', onEscrowMatch);
    };
  }, [selectTab]);

  // Manual activation (arrow keys move focus; Enter/Space on native button selects)
  // because tab switches update the URL query string and swap tall sections.
  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, current: HowItWorksTab) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      let target: HowItWorksTab = current;
      if (event.key === 'Home') {
        target = 'debt-notes';
      } else if (event.key === 'End') {
        target = 'escrow';
      } else {
        target = current === 'debt-notes' ? 'escrow' : 'debt-notes';
      }
      const ref = target === 'debt-notes' ? debtNotesTabRef.current : escrowTabRef.current;
      ref?.focus();
    }
  };

  const protectionIcons = [Lock, ShieldCheck, Coins];
  const roleImages = [
    '/images/borrower-verified-assets.jpg',
    '/images/lender-tradable-debt-note.jpg',
  ];
  const debtNotes = content.debtNotes;

  return (
    <div className="pt-20 md:pt-24 bg-white">
      <SEO
        title={content.seo?.title || 'How It Works | Tradable Debt Notes & Smart-Contract Escrow'}
        description={
          content.seo?.description ||
          'Learn how Shake DeFi works: borrow or fund verified Ownership NFTs with tradable Debt Notes on Web & Telegram, or protect P2P payments with smart-contract escrow.'
        }
        canonical="/how-it-works"
      />

      {/* Compact Portrait-First Header + Single-Row Accessible Tab Switcher */}
      <Section bgColor="bg-white" className="pt-6 pb-0 md:pt-10 md:pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary-dark leading-tight tracking-tight">
            {content.pageHeader?.title || 'How Shake Works'}
          </h1>
          <p className="mt-3 mx-auto max-w-2xl font-body text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
            {content.pageHeader?.subtitle ||
              'Two ways to use Shake DeFi: tradable NFT-backed Debt Notes and smart-contract payment escrow.'}
          </p>

          <div
            role="tablist"
            aria-label={content.pageHeader?.tablistLabel || 'Shake product guides'}
            className="page-tablist mt-6 flex flex-nowrap items-stretch justify-center overflow-x-auto border-b border-gray-200 max-w-xl mx-auto"
          >
            <button
              ref={debtNotesTabRef}
              id="tab-debt-notes"
              type="button"
              role="tab"
              aria-selected={activeTab === 'debt-notes'}
              tabIndex={activeTab === 'debt-notes' ? 0 : -1}
              onClick={() => selectTab('debt-notes')}
              onKeyDown={(e) => handleTabKeyDown(e, 'debt-notes')}
              className={`page-tab flex-1 shrink-0 min-h-[44px] px-3 sm:px-6 py-3 font-body text-sm sm:text-base font-semibold whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'debt-notes'
                  ? 'text-secondary-dark'
                  : 'text-secondary hover:text-secondary-dark'
              }`}
            >
              <Landmark size={16} aria-hidden="true" />
              <span>{content.tabs?.debtNotes || 'Tradable Debt Notes'}</span>
            </button>

            <button
              ref={escrowTabRef}
              id="tab-escrow"
              type="button"
              role="tab"
              aria-selected={activeTab === 'escrow'}
              tabIndex={activeTab === 'escrow' ? 0 : -1}
              onClick={() => selectTab('escrow')}
              onKeyDown={(e) => handleTabKeyDown(e, 'escrow')}
              className={`page-tab flex-1 shrink-0 min-h-[44px] px-3 sm:px-6 py-3 font-body text-sm sm:text-base font-semibold whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'escrow'
                  ? 'text-secondary-dark'
                  : 'text-secondary hover:text-secondary-dark'
              }`}
            >
              <ShieldCheck size={16} aria-hidden="true" />
              <span>{content.tabs?.escrow || 'Smart Escrow'}</span>
            </button>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* TAB 1 (DEFAULT): TRADABLE DEBT NOTES                      */}
      {/* ========================================================= */}
      <div
        ref={debtNotesPanelRef}
        id="panel-debt-notes"
        role="tabpanel"
        aria-labelledby="tab-debt-notes"
        {...(activeTab !== 'debt-notes' ? ({ hidden: 'until-found' } as Record<string, unknown>) : {})}
      >
        {/* Debt Notes Hero & Critical Callouts */}
        <Section bgColor="bg-white" className="pt-8 pb-10 md:pt-12 md:pb-14">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-5">
              <Landmark size={16} className="text-secondary-dark" aria-hidden="true" />
              <span>{debtNotes.hero.badge}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-secondary-dark leading-tight tracking-tight">
              {debtNotes.hero.headline}
            </h2>

            <p className="mt-5 mx-auto max-w-3xl font-body text-base sm:text-lg text-secondary leading-relaxed">
              {debtNotes.hero.description}
            </p>

            {/* Primary CTAs (stacked on mobile portrait) */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  {debtNotes.hero.browseMarketsCta}
                </Button>
              </Link>
              <a href={webAppBoardUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  <span className="inline-flex items-center justify-center gap-2">
                    <GoBrowser size={18} aria-hidden="true" />
                    <span>{debtNotes.hero.webAppCta}</span>
                  </span>
                </Button>
              </a>
              <a href={TELEGRAM_MINI_APP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  <span className="inline-flex items-center justify-center gap-2">
                    <FaTelegramPlane size={18} aria-hidden="true" />
                    <span>{debtNotes.hero.telegramAppCta}</span>
                  </span>
                </Button>
              </a>
            </div>
          </div>

          {/* Portrait-friendly stacked callouts: Debt Note != Item Sale & Web/Telegram Only */}
          <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <article className="rounded-3xl border-2 border-amber-300/80 bg-amber-50/70 p-6 sm:p-7 text-left shadow-xs">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-200/70 px-3 py-1 font-body text-xs font-semibold text-secondary-dark">
                <AlertTriangle size={14} className="text-amber-800" aria-hidden="true" />
                <span>{debtNotes.distinction.badge}</span>
              </div>
              <h3 className="mt-4 font-display text-lg sm:text-xl text-secondary-dark leading-snug">
                {debtNotes.distinction.title}
              </h3>
              <p className="mt-3 font-body text-sm sm:text-base text-secondary leading-relaxed">
                {debtNotes.distinction.body}
              </p>
              <button
                type="button"
                onClick={() => selectTab('escrow', { scrollPageTop: true })}
                className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-secondary-dark underline underline-offset-4 hover:opacity-80 min-h-[44px]"
              >
                <span>{debtNotes.distinction.switchToEscrowCta}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </article>

            <article className="rounded-3xl border border-gray-200 bg-primary-light/60 p-6 sm:p-7 text-left shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-secondary-dark border border-gray-200">
                  <Smartphone size={14} className="text-secondary-dark" aria-hidden="true" />
                  <span>{debtNotes.availability.badge}</span>
                </div>
                <h3 className="mt-4 font-display text-lg sm:text-xl text-secondary-dark leading-snug">
                  {debtNotes.availability.title}
                </h3>
                <p className="mt-3 font-body text-sm sm:text-base text-secondary leading-relaxed">
                  {debtNotes.availability.description}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs font-semibold font-body text-secondary-dark">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-gray-200">
                  <GoBrowser size={14} aria-hidden="true" />
                  <span>Web App</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-gray-200">
                  <FaTelegramPlane size={13} aria-hidden="true" />
                  <span>Telegram Mini App</span>
                </span>
              </div>
            </article>
          </div>
        </Section>

        {/* 4-Step Tradable Debt Note Walkthrough */}
        <Section bgColor="bg-primary-light" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark">
                {debtNotes.stepsHeading}
              </h2>
              <p className="mt-3 font-body text-base sm:text-lg text-secondary">
                {debtNotes.stepsDescription}
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {debtNotes.steps.map((step: { title: string; description: string }, index: number) => (
                <li
                  key={step.title}
                  className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs text-left"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-xl font-bold text-secondary-dark">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg sm:text-xl text-secondary-dark">{step.title}</h3>
                  <p className="mt-2.5 font-body text-sm sm:text-base text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* Visual Role Walkthrough: Borrowers vs. Lenders & Note Holders */}
        <Section bgColor="bg-white" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark">
                {debtNotes.rolesHeading}
              </h2>
              <p className="mt-3 font-body text-base sm:text-lg text-secondary">
                {debtNotes.rolesDescription}
              </p>
            </div>

            <div className="mt-10 space-y-6">
              {debtNotes.roles.map(
                (
                  role: {
                    label: string;
                    title: string;
                    description: string;
                    imageAlt: string;
                    ctaLabel: string;
                  },
                  idx: number,
                ) => (
                  <article
                    key={role.label}
                    className="grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-xs"
                  >
                    <div
                      className={`bg-primary-light/70 p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left ${
                        idx % 2 === 1 ? 'md:order-2' : ''
                      }`}
                    >
                      <span className="font-body text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary-dark">
                        {role.label}
                      </span>
                      <h3 className="mt-3 font-display text-2xl sm:text-3xl text-secondary-dark leading-tight">
                        {role.title}
                      </h3>
                      <p className="mt-4 font-body text-sm sm:text-base text-secondary leading-relaxed">
                        {role.description}
                      </p>
                      <div className="mt-6">
                        <Link to={idx === 0 ? '/nft' : '/marketplace'} className="inline-block w-full sm:w-auto">
                          <Button size="md" variant={idx === 0 ? 'outline' : 'primary'} fullWidth className="sm:w-auto min-h-[44px]">
                            {role.ctaLabel}
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div
                      className={`bg-white flex items-center justify-center p-4 sm:p-6 ${
                        idx % 2 === 1 ? 'md:order-1' : ''
                      }`}
                    >
                      <img
                        src={roleImages[idx] || roleImages[0]}
                        alt={role.imageAlt}
                        loading="lazy"
                        className="w-full h-auto max-h-[360px] object-contain rounded-2xl"
                      />
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </Section>

        {/* Built-In On-Chain Safeguards */}
        <Section bgColor="bg-primary-light" className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl text-secondary-dark text-center">
              {debtNotes.protectionsHeading}
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {debtNotes.protections.map((item: { title: string; description: string }, idx: number) => {
                const Icon = protectionIcons[idx] || ShieldCheck;
                return (
                  <article
                    key={item.title}
                    className="rounded-3xl bg-white p-6 sm:p-7 border border-gray-200/80 shadow-xs text-left"
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/25 text-secondary-dark mb-4">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-secondary-dark">{item.title}</h3>
                    <p className="mt-2.5 font-body text-sm sm:text-base text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </Section>

        {/* Debt Notes Dark Closing CTA */}
        <Section bgColor="bg-secondary-dark" className="py-14 md:py-20 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 mb-4">
              <Landmark className="text-accent" size={30} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white">
              {debtNotes.cta.header}
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg text-gray-200 leading-relaxed">
              {debtNotes.cta.subhead}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  {debtNotes.cta.browseMarketsButton}
                </Button>
              </Link>
              <a href={webAppBoardUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] border-white text-white hover:text-secondary-dark hover:bg-white"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <GoBrowser aria-hidden="true" />
                    <span>{debtNotes.cta.webAppButton}</span>
                  </span>
                </Button>
              </a>
              <a href={TELEGRAM_MINI_APP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] border-white text-white hover:text-secondary-dark hover:bg-white"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <FaTelegramPlane aria-hidden="true" />
                    <span>{debtNotes.cta.telegramButton}</span>
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* ========================================================= */}
      {/* TAB 2: SMART-CONTRACT ESCROW (100% PRESERVED CONTENT)     */}
      {/* ========================================================= */}
      <div
        ref={escrowPanelRef}
        id="panel-escrow"
        role="tabpanel"
        aria-labelledby="tab-escrow"
        {...(activeTab !== 'escrow' ? ({ hidden: 'until-found' } as Record<string, unknown>) : {})}
      >
        <Section className="pt-8 pb-12 md:pt-12" bgColor="bg-white">
          <div className="max-w-4xl mx-auto text-center">
            {/* Subtle platform availability & cross-link back to Tradable Debt Notes */}
            <div className="mb-8 rounded-2xl border border-gray-200 bg-primary-light/60 px-4 py-3 text-sm font-body text-secondary flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left">
              <span>{content.escrowTabNote.text}</span>
              <button
                type="button"
                onClick={() => selectTab('debt-notes', { scrollPageTop: true })}
                className="inline-flex items-center gap-1.5 font-semibold text-secondary-dark underline underline-offset-4 hover:opacity-80 shrink-0 min-h-[44px]"
              >
                <span>{content.escrowTabNote.switchToDebtNotesCta}</span>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>

            <h2 className="font-display text-hero text-3xl sm:text-4xl md:text-5xl text-secondary-dark mb-6">
              {content.hero.headline}
            </h2>
            <p className="font-body text-lg md:text-xl text-secondary max-w-2xl mb-4 text-center mx-auto">
              {content.escrowIntro}
            </p>
            <p className="font-body text-base text-secondary-light max-w-2xl mb-8 text-center mx-auto">
              {content.smartContractNote}
            </p>

            <EscrowOptions />

            {/* Existing timed escrow process */}
            <div className="flex flex-col lg:flex-row items-start gap-8 mb-8 max-w-5xl mx-auto">
              <div className="flex-shrink-0 lg:w-[65%]">
                <img
                  src="/images/splash_cartoon_cropped.png"
                  alt="The Escrow Process - Customer and merchant transaction with secure escrow safe"
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-2xl shadow-lg mx-auto"
                  style={{ maxHeight: '650px', objectPosition: 'center top' }}
                />
              </div>

              <div className="lg:w-[35%] text-left flex flex-col justify-center">
                <h2 className="font-display text-2xl md:text-3xl mb-6">
                  {content.process.header}
                </h2>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <p className="font-body text-lg text-secondary">{content.process.step1}</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <p className="font-body text-lg text-secondary">{content.process.step2}</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-secondary bg-transparent border-2 border-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <p className="font-body text-lg text-secondary">{content.process.step3}</p>
                  </li>
                </ol>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="max-w-4xl mx-auto mt-12 text-center">
              <p className="font-body text-lg md:text-xl text-secondary mb-8">
                {content.agreementNote}
              </p>

              {/* Screenshots */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
                <div className="flex-1 max-w-sm mx-auto md:mx-0">
                  <img
                    src="/images/bill-page.png"
                    alt="Contract approval screen showing AI generating agreement"
                    loading="lazy"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </div>
                <div className="flex-1 max-w-sm mx-auto md:mx-0">
                  <img
                    src="/images/signature.png"
                    alt="Example bike sale agreement with photos and terms"
                    loading="lazy"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                  <p className="font-body text-lg md:text-xl text-secondary mt-3">
                    {content.aiCaption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <CTASection />
      </div>
    </div>
  );
};

export default HowItWorks;

function CTASection() {
  const siteContent = useContent('sitecontent');
  return (
    <Section bgColor="bg-secondary-dark" className="relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-cta-header text-3xl md:text-4xl mb-6 text-[#e6e9ed]">
          {siteContent.howItWorks.cta.header}
        </h2>
        <p className="font-body text-description text-xl mb-8 text-[#e6e9ed]">
          {siteContent.howItWorks.cta.subhead}
        </p>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <Button size="lg" variant="primary" className="rounded-full">
            {siteContent.howItWorks.cta.button}
          </Button>
        </Link>
      </div>
    </Section>
  );
}
