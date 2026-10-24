// src/pages/nft.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  X,
  Copy,
  Check,
  ExternalLink,
  Gem,
  Store,
  Eye,
  Coins,
  ChevronDown,
  ChevronUp,
  FileText,
  Fingerprint,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { FaApple, FaGooglePlay, FaTelegramPlane } from 'react-icons/fa';
import { GoBrowser } from 'react-icons/go';
import Section from '../components/common/section';
import Button from '../components/common/button';
import SEO from '../components/common/seo';
import { useLocale } from '../context/LocaleContext';
import { useContent } from '../hooks/useContent';
import enSite from '../content/en/sitecontent.json';

const FARCASTER_APP_URL = 'https://farcaster.xyz/miniapps/4LNSH2r_Bkx7/shake-defi';

interface PlatformOption {
  id: string;
  name: string;
  badge?: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

const Nft: React.FC = () => {
  const { locale } = useLocale();
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const [activeAssetTab, setActiveAssetTab] = useState<'physical' | 'digital'>('physical');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const siteContent = useContent('sitecontent');
  const content = siteContent.nft || enSite.nft;
  const securePaymentsContent = siteContent.securePayments || enSite.securePayments;

  const webAppUrl = `https://app.shakedefi.com/?lang=${encodeURIComponent(locale)}`;

  const platforms: PlatformOption[] = [
    {
      id: 'telegram',
      name: securePaymentsContent.platformModal?.platforms?.telegram?.name || 'Telegram Mini App',
      badge: securePaymentsContent.platformModal?.platforms?.telegram?.badge || 'Most Popular',
      description: securePaymentsContent.platformModal?.platforms?.telegram?.description || 'Instant launch directly inside Telegram without any app downloads',
      url: 'https://t.me/ShakeDefiBot/app',
      icon: FaTelegramPlane,
      highlight: true,
    },
    {
      id: 'browser',
      name: securePaymentsContent.platformModal?.platforms?.browser?.name || 'Web Browser App',
      badge: securePaymentsContent.platformModal?.platforms?.browser?.badge || 'Instant Access',
      description: securePaymentsContent.platformModal?.platforms?.browser?.description || 'Use the web app on any mobile or desktop browser with your connected wallet',
      url: webAppUrl,
      icon: GoBrowser,
    },
    {
      id: 'ios',
      name: securePaymentsContent.platformModal?.platforms?.ios?.name || 'Apple iOS',
      description: securePaymentsContent.platformModal?.platforms?.ios?.description || 'Native mobile app for iPhone and iPad on the App Store',
      url: 'https://apps.apple.com/us/app/shake-defi/id6756281576',
      icon: FaApple,
    },
    {
      id: 'android',
      name: securePaymentsContent.platformModal?.platforms?.android?.name || 'Google Android',
      description: securePaymentsContent.platformModal?.platforms?.android?.description || 'Native mobile app for Android devices via Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.shakedefi.app',
      icon: FaGooglePlay,
    },
    {
      id: 'farcaster',
      name: securePaymentsContent.platformModal?.platforms?.farcaster?.name || 'Farcaster Mini App',
      description: securePaymentsContent.platformModal?.platforms?.farcaster?.description || 'Interact seamlessly within the decentralized social feed',
      url: FARCASTER_APP_URL,
      icon: () => (
        <img
          src="/images/farcaster-logo.svg"
          alt="Farcaster"
          className="w-5 h-5 object-contain"
        />
      ),
    },
  ];

  const handleOpenModal = () => setIsPlatformModalOpen(true);
  const handleCloseModal = () => setIsPlatformModalOpen(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Find NFT-specific questions from FAQ
  const nftFaqItems = (siteContent.faq?.questions || enSite.faq.questions).filter((q: { question: string }) =>
    q.question.toLowerCase().includes('nft') ||
    q.question.toLowerCase().includes('asset reference') ||
    q.question.toLowerCase().includes('digital image')
  );

  return (
    <div className="pt-20 md:pt-24 bg-white text-secondary-dark font-body overflow-x-hidden">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonical="/nft"
      />

      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-16 md:pb-24 bg-gradient-to-b from-[#f8fafc] via-white to-white">
        {/* Subtle ambient lighting glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          {/* Trust Chip / Network Badges */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark border border-accent/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{content.hero.chip}</span>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary-dark tracking-tight leading-[1.12] whitespace-pre-line">
              {content.hero.headline}
            </h1>

            <h2 className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-secondary-dark font-semibold">
              {content.hero.subheadline}
            </h2>

            <p className="mt-5 font-body text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              {content.hero.description}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex items-center justify-center">
              <Button
                size="lg"
                variant="primary"
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform active:scale-95"
              >
                {content.hero.primaryCta}
              </Button>
            </div>

            {/* Multi-platform badge line */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-secondary">
              <span className="opacity-75">{content.hero.availableOn}</span>
              <button
                type="button"
                onClick={handleOpenModal}
                className="underline hover:text-secondary-dark font-medium cursor-pointer"
              >
                {content.hero.platforms}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* INTERACTIVE ASSET INSPECTOR PREVIEW CARD                   */}
          {/* ========================================================= */}
          <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-secondary-dark text-xs font-bold uppercase tracking-wider mb-2">
                <Gem className="w-3.5 h-3.5 text-secondary-dark" />
                <span>{content.interactivePreview.badge}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-secondary-dark">
                {content.interactivePreview.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-secondary max-w-xl mx-auto">
                {content.interactivePreview.description}
              </p>
            </div>

            {/* Asset Inspector Container */}
            <div className="rounded-3xl bg-secondary-dark text-white p-5 sm:p-8 shadow-xl border border-gray-700/80 relative overflow-hidden">
              {/* Card Ambient Glow */}
              <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

              {/* Tabs Switcher */}
              <div className="flex rounded-2xl bg-black/40 p-1.5 mb-6 max-w-md mx-auto border border-gray-700/50">
                <button
                  type="button"
                  onClick={() => setActiveAssetTab('physical')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                    activeAssetTab === 'physical'
                      ? 'bg-accent text-secondary-dark shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {content.interactivePreview.tabs.physical}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAssetTab('digital')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-display font-bold transition-all ${
                    activeAssetTab === 'digital'
                      ? 'bg-accent text-secondary-dark shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {content.interactivePreview.tabs.digital}
                </button>
              </div>

              {/* Card Header Info */}
              {activeAssetTab === 'physical' ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-700/80 pb-5 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{content.interactivePreview.physical.badge}</span>
                      </div>
                      <h4 className="font-display text-lg sm:text-2xl font-bold text-white mt-1.5">
                        {content.interactivePreview.physical.assetName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 px-3 py-1 rounded-xl text-right border border-white/10">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                          Network
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-accent">
                          {content.interactivePreview.physical.network}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3-Word Asset Reference Pill */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-5">
                    <div className="text-[11px] uppercase font-bold tracking-wider text-gray-400">
                      Permanent 3-Word Asset Reference
                    </div>
                    <div className="font-display text-base sm:text-lg font-black text-accent mt-0.5 tracking-wide">
                      {content.interactivePreview.physical.refCode}
                    </div>
                  </div>

                  {/* Dual Column: Public vs Private Commitments */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Public on Blockchain */}
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-emerald-400 font-display text-xs sm:text-sm font-bold mb-3">
                        <Eye className="w-4 h-4" />
                        <span>{content.interactivePreview.physical.publicDataLabel}</span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                        {content.interactivePreview.physical.publicDataItems.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-700/60 text-[11px] text-gray-400 flex items-center justify-between">
                        <span>Doc Hash:</span>
                        <code className="text-gray-300 bg-black/40 px-2 py-0.5 rounded text-[10px]">
                          {content.interactivePreview.physical.docHash}
                        </code>
                      </div>
                    </div>

                    {/* Right: Private & Scoped Evidence */}
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-sky-400 font-display text-xs sm:text-sm font-bold mb-3">
                        <Lock className="w-4 h-4" />
                        <span>{content.interactivePreview.physical.privateDataLabel}</span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                        {content.interactivePreview.physical.privateDataItems.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-sky-400 mt-0.5">🔒</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-700/60 text-[11px] text-gray-400 flex items-center justify-between">
                        <span>Evidence Hash:</span>
                        <code className="text-gray-300 bg-black/40 px-2 py-0.5 rounded text-[10px]">
                          {content.interactivePreview.physical.evidenceHash}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Legal Terms Link */}
                  <div className="mt-5 pt-4 border-t border-gray-700/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <span>Governed by Shake NFT Ownership Terms v1</span>
                    <a
                      href="/legal/nft-ownership/shake-nft-ownership-v1/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                    >
                      <span>Read Legal Terms</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Digital Image Asset Tab */
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-700/80 pb-5 mb-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-semibold border border-sky-500/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{content.interactivePreview.digital.badge}</span>
                      </div>
                      <h4 className="font-display text-lg sm:text-2xl font-bold text-white mt-1.5">
                        {content.interactivePreview.digital.assetName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 px-3 py-1 rounded-xl text-right border border-white/10">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                          Network
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-accent">
                          {content.interactivePreview.digital.network}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3-Word Asset Reference Pill */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-5">
                    <div className="text-[11px] uppercase font-bold tracking-wider text-gray-400">
                      Permanent 3-Word Asset Reference
                    </div>
                    <div className="font-display text-base sm:text-lg font-black text-accent mt-0.5 tracking-wide">
                      {content.interactivePreview.digital.refCode}
                    </div>
                  </div>

                  {/* Dual Column: Public Rights vs Protected License */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Public Rights */}
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-emerald-400 font-display text-xs sm:text-sm font-bold mb-3">
                        <Eye className="w-4 h-4" />
                        <span>{content.interactivePreview.digital.publicDataLabel}</span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                        {content.interactivePreview.digital.publicDataItems.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-700/60 text-[11px] text-gray-400 flex items-center justify-between">
                        <span>License Hash:</span>
                        <code className="text-gray-300 bg-black/40 px-2 py-0.5 rounded text-[10px]">
                          {content.interactivePreview.digital.docHash}
                        </code>
                      </div>
                    </div>

                    {/* Right: Protected License Terms */}
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                      <div className="flex items-center gap-2 text-sky-400 font-display text-xs sm:text-sm font-bold mb-3">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{content.interactivePreview.digital.privateDataLabel}</span>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm text-gray-300">
                        {content.interactivePreview.digital.privateDataItems.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-sky-400 mt-0.5">🛡️</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-700/60 text-[11px] text-gray-400 flex items-center justify-between">
                        <span>Registry Hash:</span>
                        <code className="text-gray-300 bg-black/40 px-2 py-0.5 rounded text-[10px]">
                          {content.interactivePreview.digital.evidenceHash}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Digital Terms Link */}
                  <div className="mt-5 pt-4 border-t border-gray-700/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                    <span>Governed by Shake NFT Digital Image Terms v1</span>
                    <a
                      href="/legal/nft-ownership/shake-nft-digital-image-v1/en/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                    >
                      <span>Read License Terms</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION: TWO WAYS TO MINT (ASSET CLASSES)                 */}
      {/* ========================================================= */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.assetTypes.tag}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.assetTypes.headline}
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary max-w-2xl mx-auto">
              {content.assetTypes.subheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Physical Asset NFTs */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs hover:border-accent hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-dark text-accent flex items-center justify-center font-bold shadow-xs">
                    <Gem className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {content.assetTypes.physical.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-secondary-dark">
                  {content.assetTypes.physical.title}
                </h3>
                <p className="mt-3 font-body text-base text-secondary leading-relaxed">
                  {content.assetTypes.physical.description}
                </p>

                <div className="mt-6 space-y-3 font-body text-sm text-secondary">
                  {content.assetTypes.physical.points.map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/80 flex items-center justify-between gap-2">
                <a
                  href="/legal/nft-ownership/shake-nft-ownership-v1/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary-dark underline underline-offset-2 transition-colors"
                >
                  <span>Physical Ownership Terms</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary-dark hover:text-emerald-700 underline underline-offset-2"
                >
                  <span>Mint physical asset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Digital Image NFTs */}
            <div className="bg-[#f8fafc] rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs hover:border-accent hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-dark text-accent flex items-center justify-center font-bold shadow-xs">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-sky-100 text-sky-800">
                    {content.assetTypes.digital.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-secondary-dark">
                  {content.assetTypes.digital.title}
                </h3>
                <p className="mt-3 font-body text-base text-secondary leading-relaxed">
                  {content.assetTypes.digital.description}
                </p>

                <div className="mt-6 space-y-3 font-body text-sm text-secondary">
                  {content.assetTypes.digital.points.map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/80 flex items-center justify-between gap-2">
                <a
                  href="/legal/nft-ownership/shake-nft-digital-image-v1/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary-dark underline underline-offset-2 transition-colors"
                >
                  <span>Commercial License Terms</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-secondary-dark hover:text-sky-700 underline underline-offset-2"
                >
                  <span>Mint digital art</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* SECTION: MINTING PROCESS (4 STEPS)                        */}
      {/* ========================================================= */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.mintingProcess.tag}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.mintingProcess.headline}
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary max-w-2xl mx-auto">
              {content.mintingProcess.subheadline}
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {content.mintingProcess.steps.map((stepItem: { step: string; title: string; description: string }) => (
              <div
                key={stepItem.step}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-dark text-accent flex items-center justify-center font-display font-bold text-base shrink-0 shadow-xs">
                    {stepItem.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                      {stepItem.title}
                    </h3>
                    <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                      {stepItem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* SECTION: TWO WAYS TO TRADE (DIRECT VS ESCROW)             */}
      {/* ========================================================= */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.tradingOptions.tag}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.tradingOptions.headline}
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary max-w-2xl mx-auto">
              {content.tradingOptions.subheadline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Direct Sale Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#e6e9ed]/80 via-white to-[#e6e9ed]/50 p-6 sm:p-8 border-2 border-accent/70 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200/70 mb-5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary-dark bg-accent/30 px-3 py-1 rounded-full">
                    <Coins className="w-3.5 h-3.5" />
                    <span>{content.tradingOptions.directSale.badge}</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent text-secondary-dark">
                    {content.tradingOptions.directSale.fee}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-secondary-dark">
                  {content.tradingOptions.directSale.title}
                </h3>
                <p className="mt-2 font-body text-sm sm:text-base text-secondary leading-relaxed">
                  {content.tradingOptions.directSale.description}
                </p>

                <div className="mt-6 space-y-3 font-body text-sm text-secondary">
                  {content.tradingOptions.directSale.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/80">
                <div className="text-xs text-secondary font-medium italic mb-4">
                  {content.tradingOptions.directSale.bestFor}
                </div>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full py-3 px-4 rounded-xl bg-accent text-secondary-dark font-display text-sm font-bold hover:bg-accent/90 transition-colors shadow-xs"
                >
                  Start a Direct NFT Sale
                </button>
              </div>
            </div>

            {/* Escrow for Non-NFT Goods / Clarification Card */}
            <div className="rounded-3xl bg-[#f8fafc] p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200/70 mb-5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary-dark bg-gray-200/70 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary-dark" />
                    <span>{content.tradingOptions.escrowSale.badge}</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-secondary-dark">
                    {content.tradingOptions.escrowSale.fee}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-secondary-dark">
                  {content.tradingOptions.escrowSale.title}
                </h3>
                <p className="mt-2 font-body text-sm sm:text-base text-secondary leading-relaxed">
                  {content.tradingOptions.escrowSale.description}
                </p>

                <div className="mt-6 space-y-3 font-body text-sm text-secondary">
                  {content.tradingOptions.escrowSale.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/80">
                <div className="text-xs text-secondary font-medium italic mb-4">
                  {content.tradingOptions.escrowSale.bestFor}
                </div>
                <Link
                  to="/secure-payments"
                  className="block w-full py-3 px-4 rounded-xl bg-white border border-gray-300 text-secondary-dark text-center font-display text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  Explore Escrow for Goods & Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* SECTION: P2P MARKETPLACE INTEGRATION                      */}
      {/* ========================================================= */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-gray-200/90 shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-3 border border-sky-100">
                  <FaTelegramPlane className="w-3.5 h-3.5" />
                  <span>{content.marketplaceIntegration.tag}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-secondary-dark">
                  {content.marketplaceIntegration.headline}
                </h3>
              </div>

              <a
                href="https://t.me/Shake_Marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button size="md" variant="primary" className="rounded-full flex items-center gap-2">
                  <FaTelegramPlane />
                  <span>{content.marketplaceIntegration.cta}</span>
                </Button>
              </a>
            </div>

            <p className="mt-6 font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.marketplaceIntegration.description}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-200/70 text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                <Store className="w-4 h-4 text-secondary-dark shrink-0 mt-0.5" />
                <span>{content.marketplaceIntegration.bullet1}</span>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-200/70 text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{content.marketplaceIntegration.bullet2}</span>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4 border border-gray-200/70 text-xs sm:text-sm text-secondary flex items-start gap-2.5">
                <Share2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{content.marketplaceIntegration.bullet3}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* SECTION: SECURITY & ARCHITECTURE                          */}
      {/* ========================================================= */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.security.tag}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.security.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {content.security.cards.map((card: { title: string; description: string }, idx: number) => {
              const icons = [Fingerprint, Copy, FileText, Lock];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={card.title}
                  className="bg-[#f8fafc] rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-secondary-dark">
                    {card.title}
                  </h3>
                  <p className="mt-2 font-body text-xs sm:text-sm text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* SECTION: NFT FAQ ACCORDION                                */}
      {/* ========================================================= */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.faq.tag}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.faq.headline}
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary">
              {content.faq.subheadline}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-3 font-body">
            {nftFaqItems.map((item: { question: string; answer: string }, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="border-b border-gray-200/80 last:border-b-0 pb-3">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between py-3 text-left font-display text-base sm:text-lg font-bold text-secondary-dark hover:text-emerald-700 transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-accent shrink-0 ml-3" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-secondary shrink-0 ml-3" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="pt-1 pb-3 font-body text-sm sm:text-base text-secondary leading-relaxed space-y-2 animate-in fade-in duration-200">
                      {item.answer.split('\n\n').map((para: string, pIdx: number) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-6 text-center border-t border-gray-100">
              <Link
                to="/faq?q=NFT"
                className="inline-flex items-center gap-2 text-sm font-bold text-secondary-dark hover:text-emerald-700 underline underline-offset-4"
              >
                <span>{content.faq.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* FINAL CTA BANNER                                          */}
      {/* ========================================================= */}
      <Section bgColor="bg-secondary-dark" className="py-14 md:py-24 text-white relative overflow-hidden">
        {/* Glows */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            {content.finalCta.headline}
          </h2>
          <p className="mt-5 font-body text-base sm:text-xl text-[#e6e9ed]/90 max-w-2xl mx-auto leading-relaxed">
            {content.finalCta.description}
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={handleOpenModal}
              className="px-10 py-4 text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              {content.finalCta.cta}
            </Button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#e6e9ed]/70">
            {content.finalCta.subtext}
          </p>
        </div>
      </Section>

      {/* ========================================================= */}
      {/* PLATFORM CHOOSER MODAL                                    */}
      {/* ========================================================= */}
      {isPlatformModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-secondary hover:text-secondary-dark hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/30 text-secondary-dark text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{securePaymentsContent.platformModal?.tag || 'Select Your Platform'}</span>
              </div>
              <h3 id="modal-headline" className="font-display text-2xl font-bold text-secondary-dark">
                {securePaymentsContent.platformModal?.headline || 'Get Started With Shake'}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-secondary font-body">
                {securePaymentsContent.platformModal?.subtitle || "Choose how you'd like to open or install Shake:"}
              </p>
            </div>

            {/* Platform List */}
            <div className="mt-6 space-y-2.5">
              {platforms.map((p) => {
                const IconComponent = p.icon;
                return (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCloseModal}
                    className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      p.highlight
                        ? 'bg-[#e6e9ed]/70 border-accent/60 hover:border-accent hover:bg-accent/15 shadow-xs'
                        : 'bg-white border-gray-200 hover:border-secondary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        p.highlight ? 'bg-secondary-dark text-white' : 'bg-gray-100 text-secondary-dark'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm sm:text-base font-bold text-secondary-dark">
                            {p.name}
                          </span>
                          {p.badge && (
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent text-secondary-dark">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-secondary mt-0.5 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-secondary shrink-0 ml-2" />
                  </a>
                );
              })}
            </div>

            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-xs text-secondary hover:text-secondary-dark font-medium"
              >
                {securePaymentsContent.platformModal?.cancel || 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nft;
