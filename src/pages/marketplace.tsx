import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileJson,
  Landmark,
  MapPin,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
} from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';
import { GoBrowser } from 'react-icons/go';
import Button from '../components/common/button';
import Section from '../components/common/section';
import SEO from '../components/common/seo';
import { useLocale } from '../context/LocaleContext';
import { useContent } from '../hooks/useContent';

type MarketTab = 'debt-notes' | 'p2p';

const DEBT_NOTES_BOARD_URL_BASE = 'https://app.shakedefi.com/support/nftLoan?tab=board';
const TELEGRAM_MINI_APP_URL = 'https://t.me/ShakeDefiBot/app';
const UNIFIED_LOAN_BOARD_JSON_URL = 'https://api.shake-defi.com/api/nft/shake-loan-board-v1.json';

const Marketplace: React.FC = () => {
  const { locale } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const siteContent = useContent('sitecontent');
  const content = siteContent.marketplace;

  const activeTab: MarketTab = searchParams.get('tab') === 'p2p' ? 'p2p' : 'debt-notes';

  const debtNotesTabRef = useRef<HTMLButtonElement>(null);
  const p2pTabRef = useRef<HTMLButtonElement>(null);
  const debtNotesPanelRef = useRef<HTMLDivElement>(null);
  const p2pPanelRef = useRef<HTMLDivElement>(null);

  const webAppBoardUrl = `${DEBT_NOTES_BOARD_URL_BASE}&lang=${encodeURIComponent(locale)}`;
  const webAppRootUrl = `https://app.shakedefi.com/?lang=${encodeURIComponent(locale)}`;

  const selectTab = useCallback(
    (next: MarketTab, options?: { scrollPageTop?: boolean }) => {
      setSearchParams(next === 'p2p' ? { tab: 'p2p' } : {}, { replace: true });
      const targetTabEl = next === 'debt-notes' ? debtNotesTabRef.current : p2pTabRef.current;
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
      { el: p2pPanelRef.current, active: activeTab === 'p2p' },
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
    const p2pPanel = p2pPanelRef.current;
    const onDebtNotesMatch = () => selectTab('debt-notes');
    const onP2pMatch = () => selectTab('p2p');

    dnPanel?.addEventListener('beforematch', onDebtNotesMatch);
    p2pPanel?.addEventListener('beforematch', onP2pMatch);
    return () => {
      dnPanel?.removeEventListener('beforematch', onDebtNotesMatch);
      p2pPanel?.removeEventListener('beforematch', onP2pMatch);
    };
  }, [selectTab]);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, current: MarketTab) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      let target: MarketTab = current;
      if (event.key === 'Home') {
        target = 'debt-notes';
      } else if (event.key === 'End') {
        target = 'p2p';
      } else {
        target = current === 'debt-notes' ? 'p2p' : 'debt-notes';
      }
      const ref = target === 'debt-notes' ? debtNotesTabRef.current : p2pTabRef.current;
      ref?.focus();
    }
  };

  const previewFeatureIcons = [ShoppingBag, ShieldCheck, ClipboardCheck];
  const debtNotes = content.debtNotes;

  return (
    <div className="pt-20 md:pt-24 bg-white">
      <SEO
        title={content.seo?.title || 'Shake Markets | NFT Debt Note Markets & P2P Marketplace'}
        description={
          content.seo?.description ||
          'Explore Shake NFT Debt Note Markets (Web & Telegram Mini App) or direct P2P goods and services with smart-contract escrow.'
        }
        canonical="/marketplace"
      />

      {/* Compact Portrait-First Header + Single-Row Accessible Tab Switcher */}
      <Section bgColor="bg-white" className="pt-6 pb-0 md:pt-10 md:pb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary-dark leading-tight tracking-tight">
            {content.pageHeader?.title || 'Shake Markets'}
          </h1>
          <p className="mt-3 mx-auto max-w-2xl font-body text-sm sm:text-base md:text-lg text-secondary leading-relaxed">
            {content.pageHeader?.subtitle ||
              'Choose between NFT Debt Note Markets and direct P2P goods & services.'}
          </p>

          <div
            role="tablist"
            aria-label={content.pageHeader?.tablistLabel || 'Shake market categories'}
            className="marketplace-tablist mt-6 flex flex-nowrap items-stretch justify-center overflow-x-auto border-b border-gray-200 max-w-xl mx-auto"
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
              className={`marketplace-tab flex-1 shrink-0 min-h-[44px] px-4 sm:px-6 py-3 font-body text-sm sm:text-base font-semibold whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'debt-notes'
                  ? 'text-secondary-dark'
                  : 'text-secondary hover:text-secondary-dark'
              }`}
            >
              <Landmark size={16} aria-hidden="true" />
              <span>{content.tabs?.debtNotes || 'NFT Debt Notes'}</span>
            </button>

            <button
              ref={p2pTabRef}
              id="tab-p2p"
              type="button"
              role="tab"
              aria-selected={activeTab === 'p2p'}
              tabIndex={activeTab === 'p2p' ? 0 : -1}
              onClick={() => selectTab('p2p')}
              onKeyDown={(e) => handleTabKeyDown(e, 'p2p')}
              className={`marketplace-tab flex-1 shrink-0 min-h-[44px] px-4 sm:px-6 py-3 font-body text-sm sm:text-base font-semibold whitespace-nowrap inline-flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'p2p'
                  ? 'text-secondary-dark'
                  : 'text-secondary hover:text-secondary-dark'
              }`}
            >
              <Store size={16} aria-hidden="true" />
              <span>{content.tabs?.p2p || 'P2P Marketplace'}</span>
            </button>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* TAB 1 (DEFAULT): NFT DEBT NOTE MARKETS                    */}
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

            {/* Primary Web & Telegram CTAs (stacked on mobile portrait) */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href={webAppBoardUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto min-h-[48px]">
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
                onClick={() => selectTab('p2p', { scrollPageTop: true })}
                className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-secondary-dark underline underline-offset-4 hover:opacity-80 min-h-[44px]"
              >
                <span>{debtNotes.distinction.switchToP2pCta}</span>
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

        {/* Benefits: Note Buyers & Borrowers/Holders */}
        <Section bgColor="bg-primary-light" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {debtNotes.benefits.map(
              (benefit: { title: string; description: string; highlights: string[] }, idx: number) => (
                <article
                  key={benefit.title}
                  className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-secondary-dark">
                      {benefit.title}
                    </h2>
                    <p className="mt-3 font-body text-sm sm:text-base text-secondary leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2.5 border-t border-gray-100 pt-5">
                    {benefit.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 font-body text-sm text-secondary-dark">
                        <CheckCircle2
                          size={18}
                          className={idx === 0 ? 'text-emerald-600 shrink-0 mt-0.5' : 'text-secondary-dark shrink-0 mt-0.5'}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        </Section>

        {/* How NFT Debt Note Markets Work + Market Snapshot JSON */}
        <Section bgColor="bg-white" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark">
                {debtNotes.stepsHeading}
              </h2>
              <p className="mt-3 font-body text-base sm:text-lg text-secondary">
                {debtNotes.stepsDescription}
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {debtNotes.steps.map((step: { title: string; description: string }, index: number) => (
                <li key={step.title} className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xs">
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

            {/* Market Snapshot JSON Banner */}
            <div className="mt-10 rounded-3xl border border-gray-200 bg-primary-light/50 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-body text-xs font-semibold text-secondary-dark border border-gray-200">
                  <FileJson size={14} aria-hidden="true" />
                  <span>{debtNotes.openData.badge}</span>
                </div>
                <h3 className="mt-3 font-display text-lg sm:text-xl text-secondary-dark">
                  {debtNotes.openData.title}
                </h3>
                <p className="mt-2 font-body text-sm sm:text-base text-secondary leading-relaxed">
                  {debtNotes.openData.description}
                </p>
              </div>
              <a
                href={UNIFIED_LOAN_BOARD_JSON_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto shrink-0"
              >
                <Button variant="outline" size="md" fullWidth className="md:w-auto min-h-[44px]">
                  <span className="inline-flex items-center gap-2">
                    <FileJson size={16} aria-hidden="true" />
                    <span>{debtNotes.openData.downloadLabel}</span>
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </Section>

        {/* Debt Notes Dark Closing CTA */}
        <Section bgColor="bg-secondary-dark" className="py-14 md:py-20 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 mb-4">
              <ShieldCheck className="text-accent" size={30} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white">
              {debtNotes.trust.title}
            </h2>
            <p className="mt-4 font-body text-base sm:text-lg text-gray-200 leading-relaxed">
              {debtNotes.trust.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href={webAppBoardUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  <span className="inline-flex items-center gap-2">
                    <GoBrowser aria-hidden="true" />
                    <span>{debtNotes.hero.webAppCta}</span>
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
                  <span className="inline-flex items-center gap-2">
                    <FaTelegramPlane aria-hidden="true" />
                    <span>{debtNotes.hero.telegramAppCta}</span>
                  </span>
                </Button>
              </a>
              <Link to="/nft" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto min-h-[48px] border-white text-white hover:text-secondary-dark hover:bg-white"
                >
                  {debtNotes.trust.nftCtaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>

      {/* ========================================================= */}
      {/* TAB 2: P2P MARKETPLACE (GOODS & SERVICES)                 */}
      {/* ========================================================= */}
      <div
        ref={p2pPanelRef}
        id="panel-p2p"
        role="tabpanel"
        aria-labelledby="tab-p2p"
        {...(activeTab !== 'p2p' ? ({ hidden: 'until-found' } as Record<string, unknown>) : {})}
      >
        {/* P2P Hero Section */}
        <Section bgColor="bg-white" className="pt-8 pb-8 md:pt-12 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-5">
              <Store size={16} className="text-secondary-dark" aria-hidden="true" />
              <span>{content.hero.badge || 'Community Marketplace'}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-secondary-dark leading-tight tracking-tight">
              {content.hero.headline}
            </h2>
            <p className="mt-5 mx-auto max-w-3xl font-body text-base sm:text-lg md:text-xl text-secondary leading-relaxed">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
              <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  <span className="inline-flex items-center gap-2">
                    <FaTelegramPlane aria-hidden="true" />
                    {content.exploreLabel}
                  </span>
                </Button>
              </a>
              <a href={webAppRootUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth className="sm:w-auto min-h-[48px]">
                  {content.createListingLabel}
                </Button>
              </a>
            </div>

            {/* Subtle disambiguation note back to Debt Notes tab */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-primary-light/50 px-4 py-3 text-left sm:text-center max-w-2xl mx-auto">
              <p className="font-body text-xs sm:text-sm text-secondary">
                {content.p2pPlatformNote?.text}{' '}
                <button
                  type="button"
                  onClick={() => selectTab('debt-notes', { scrollPageTop: true })}
                  className="font-semibold text-secondary-dark underline underline-offset-4 hover:opacity-80"
                >
                  {content.p2pPlatformNote?.switchToDebtNotesCta || 'View NFT Debt Note Markets'}
                </button>
              </p>
            </div>
          </div>
        </Section>

        {/* Telegram Channel Live Showcase Section */}
        <Section bgColor="bg-white" className="pt-0 pb-14 md:pb-24">
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
                    <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" fullWidth className="sm:w-auto shadow-sm hover:shadow-md">
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
        <Section bgColor="bg-primary-light" className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
            {content.benefits.map((benefit: { title: string; description: string }, index: number) => {
              const Icon = index === 0 ? Send : MapPin;
              return (
                <article
                  key={benefit.title}
                  className="rounded-3xl bg-white p-7 sm:p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
                    <Icon size={26} className="text-secondary-dark" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl md:text-3xl text-secondary-dark">{benefit.title}</h2>
                  <p className="mt-4 font-body text-base md:text-lg text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Section>

        {/* How it Works / Steps Section */}
        <Section bgColor="bg-white" className="py-14 md:py-24">
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
        <Section bgColor="bg-secondary-dark" className="py-14 md:py-20 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 mb-4">
              <CheckCircle2 className="text-accent" size={32} aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white">{content.trust.title}</h2>
            <p className="mt-5 font-body text-lg text-gray-200 leading-relaxed">{content.trust.description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row">
              <a href="https://t.me/Shake_Marketplace" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" fullWidth className="sm:w-auto">
                  <span className="inline-flex items-center gap-2">
                    <FaTelegramPlane aria-hidden="true" />
                    {content.exploreLabel}
                  </span>
                </Button>
              </a>
              <Link to="/how-it-works?tab=escrow" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="sm:w-auto border-white text-white hover:text-secondary-dark hover:bg-white"
                >
                  {content.howItWorksLabel}
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Marketplace;
