// src/pages/secure-payments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  AlertCircle,
  FileCheck2,
  Car,
  ShoppingBag,
  Briefcase,
  Layers,
  ArrowRight,
  X,
  Scale,
  ArrowLeftRight,
  UserCheck,
  Boxes,
  Sparkles
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

const SecurePayments: React.FC = () => {
  const { locale } = useLocale();
  const [isPlatformModalOpen, setIsPlatformModalOpen] = useState(false);
  const siteContent = useContent('sitecontent');
  const content = siteContent.securePayments || enSite.securePayments;

  const webAppUrl = `https://app.shakedefi.com/?lang=${encodeURIComponent(locale)}`;

  const platforms: PlatformOption[] = [
    {
      id: 'telegram',
      name: content.platformModal.platforms.telegram.name,
      badge: content.platformModal.platforms.telegram.badge,
      description: content.platformModal.platforms.telegram.description,
      url: 'https://t.me/ShakeDefiBot/app',
      icon: FaTelegramPlane,
      highlight: true,
    },
    {
      id: 'browser',
      name: content.platformModal.platforms.browser.name,
      badge: content.platformModal.platforms.browser.badge,
      description: content.platformModal.platforms.browser.description,
      url: webAppUrl,
      icon: GoBrowser,
    },
    {
      id: 'ios',
      name: content.platformModal.platforms.ios.name,
      description: content.platformModal.platforms.ios.description,
      url: 'https://apps.apple.com/us/app/shake-defi/id6756281576',
      icon: FaApple,
    },
    {
      id: 'android',
      name: content.platformModal.platforms.android.name,
      description: content.platformModal.platforms.android.description,
      url: 'https://play.google.com/store/apps/details?id=com.shakedefi.app',
      icon: FaGooglePlay,
    },
    {
      id: 'farcaster',
      name: content.platformModal.platforms.farcaster.name,
      description: content.platformModal.platforms.farcaster.description,
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

  const handleOpenModal = () => {
    setIsPlatformModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPlatformModalOpen(false);
  };

  return (
    <div className="pt-20 md:pt-24 bg-white text-secondary-dark font-body overflow-x-hidden">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonical="/secure-payments"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-gradient-to-b from-[#f8fafc] via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Top trust chip */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark border border-accent/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{content.hero.chip}</span>
            </div>
          </div>

          {/* Hero text */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary-dark tracking-tight leading-[1.15]">
              {content.hero.headline}
            </h1>

            <h2 className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-secondary-dark font-semibold">
              {content.hero.subheadline}
            </h2>

            <p className="mt-5 font-body text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              {content.hero.description}
            </p>

            {/* Primary Hero CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="primary"
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform active:scale-95"
              >
                {content.hero.cta}
              </Button>
            </div>

            {/* Quick multi-platform badges below button */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-secondary">
              <span className="opacity-75">{content.hero.availableOn}</span>
              <button
                type="button"
                onClick={handleOpenModal}
                className="underline hover:text-secondary-dark font-medium cursor-pointer"
              >
                {content.hero.availablePlatforms}
              </button>
            </div>
          </div>

          {/* Visual Trust Card: Live Escrow Agreement Preview */}
          <div className="mt-10 md:mt-14 max-w-2xl mx-auto">
            <div className="rounded-3xl bg-[#e6e9ed]/80 p-5 sm:p-7 border border-gray-200/90 shadow-sm relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-accent/20 blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-gray-300/70 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-secondary-dark">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold tracking-wider text-secondary">
                      {content.hero.preview.activeSmartContract}
                    </div>
                    <div className="font-display text-sm sm:text-base font-bold text-secondary-dark">
                      {content.hero.preview.escrowSafe}
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {content.hero.preview.fundsLocked}
                </span>
              </div>

              {/* Agreement summary lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">{content.hero.preview.agreementTermsTitle}</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">{content.hero.preview.agreementTermsValue}</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">{content.hero.preview.agreementTermsStatus}</div>
                </div>
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">{content.hero.preview.escrowProtectionTitle}</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">{content.hero.preview.escrowProtectionValue}</div>
                  <div className="text-[11px] text-secondary font-medium mt-1">{content.hero.preview.escrowProtectionStatus}</div>
                </div>
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">{content.hero.preview.standardFeeTitle}</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">{content.hero.preview.standardFeeValue}</div>
                  <div className="text-[11px] text-secondary font-medium mt-1">{content.hero.preview.standardFeeStatus}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Payment Escrow for Real-World Transactions */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold leading-snug">
            {content.overview.headline}
          </h2>

          <p className="mt-5 font-display text-base sm:text-lg md:text-xl font-semibold text-secondary-dark">
            {content.overview.subheadline}
          </p>

          <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            {content.overview.description}
          </p>

          <div className="mt-8 rounded-2xl bg-[#e6e9ed] p-6 sm:p-8 text-left border border-gray-200/80 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-secondary-dark flex items-center justify-center shrink-0 font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-body text-base sm:text-lg text-secondary-dark leading-relaxed font-medium">
                  {content.overview.callout}
                </p>
              </div>
            </div>
          </div>

          {/* Real-world transaction screenshot preview */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <div className="w-full sm:w-1/2 bg-white rounded-2xl p-2 shadow-md border border-gray-200/70">
              <img
                src="/images/bill-page.png"
                alt="Shake contract approval screen"
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs text-secondary font-medium text-center">
                {content.overview.billImageCaption}
              </div>
            </div>
            <div className="w-full sm:w-1/2 bg-white rounded-2xl p-2 shadow-md border border-gray-200/70">
              <img
                src="/images/signature.png"
                alt="Shake agreement and signed terms"
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
              <div className="p-3 text-xs text-secondary font-medium text-center">
                {content.overview.signatureImageCaption}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: How It Works */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3.5 py-1 font-body text-xs sm:text-sm font-semibold text-secondary-dark mb-3">
              <span>{content.howItWorks.tag}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-secondary-dark font-bold">
              {content.howItWorks.headline}
            </h2>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 sm:space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  {content.howItWorks.steps[0].step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    {content.howItWorks.steps[0].title}
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    {content.howItWorks.steps[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  {content.howItWorks.steps[1].step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    {content.howItWorks.steps[1].title}
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    {content.howItWorks.steps[1].description1}
                  </p>
                  <p className="mt-3 font-body text-base text-secondary leading-relaxed">
                    {content.howItWorks.steps[1].description2}
                  </p>
                  {/* Supported badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
                      USDC
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                      USDT
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                      ETH
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200">
                      TON
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-50 text-gray-700 text-xs font-medium border border-gray-200">
                      {content.howItWorks.steps[1].swappingBadge}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  {content.howItWorks.steps[2].step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    {content.howItWorks.steps[2].title}
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    {content.howItWorks.steps[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  {content.howItWorks.steps[3].step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    {content.howItWorks.steps[3].title}
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    {content.howItWorks.steps[3].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  {content.howItWorks.steps[4].step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    {content.howItWorks.steps[4].title}
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    {content.howItWorks.steps[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Non-Custodial by Design */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-[#e6e9ed]/90 via-[#e6e9ed]/50 to-white p-6 sm:p-10 border border-gray-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary-dark text-accent flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
                  {content.nonCustodial.title}
                </h2>
                <div className="mt-3 inline-block rounded-full bg-accent/30 px-3 py-0.5 text-xs font-bold text-secondary-dark">
                  {content.nonCustodial.badge}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              <p className="font-semibold text-secondary-dark">
                {content.nonCustodial.lead}
              </p>
              <p>
                {content.nonCustodial.body1}
              </p>
              <p>
                {content.nonCustodial.body2}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Use the Cryptocurrency You Already Have */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto text-left">
          <div className="text-center md:text-left mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.cryptocurrency.headline}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs">
            <p className="font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.cryptocurrency.body1}
            </p>

            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.cryptocurrency.body2}
            </p>

            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.cryptocurrency.body3}
            </p>

            {/* Currency Pill showcase */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <div className="font-medium text-xs sm:text-sm text-secondary">
                {content.cryptocurrency.directlySupportedLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#e6e9ed] text-secondary-dark text-xs sm:text-sm font-semibold">
                  USDC
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#e6e9ed] text-secondary-dark text-xs sm:text-sm font-semibold">
                  USDT
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#e6e9ed] text-secondary-dark text-xs sm:text-sm font-semibold">
                  ETH
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#e6e9ed] text-secondary-dark text-xs sm:text-sm font-semibold">
                  TON
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-accent/40 text-secondary-dark text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5" /> {content.cryptocurrency.swappingLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Optional Fiat Conversion */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-white p-6 sm:p-10 border border-gray-200/90 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
                {content.fiatConversion.headline}
              </h2>
              <div className="flex items-center gap-2 bg-[#f8fafc] px-3.5 py-1.5 rounded-xl border border-gray-200/80">
                <span className="text-xs text-secondary font-medium">{content.fiatConversion.poweredBy}</span>
                <img
                  src="/images/coinbase-logo.png"
                  alt="Coinbase"
                  className="h-5 w-auto object-contain"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              <p>
                {content.fiatConversion.body1}
              </p>
              <p>
                {content.fiatConversion.body2}
              </p>
              <p className="text-sm text-secondary opacity-90 pt-2">
                {content.fiatConversion.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Transparent Fees */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.fees.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Main Stat Card */}
            <div className="md:col-span-1 rounded-2xl bg-secondary-dark text-white p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <div className="text-xs uppercase font-semibold text-accent tracking-wider">
                {content.fees.standardFeeLabel}
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-accent my-2">
                {content.fees.standardFeeValue}
              </div>
              <div className="text-xs text-gray-300">
                {content.fees.standardFeeSub}
              </div>
            </div>

            {/* Detail Card */}
            <div className="md:col-span-2 rounded-2xl bg-white p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-center space-y-3 font-body text-base text-secondary">
              <p>
                {content.fees.body1}
              </p>
              <p>
                {content.fees.body2}
              </p>
              <p className="text-sm">
                {content.fees.body3}
              </p>
              <div className="pt-2 border-t border-gray-100 text-sm font-semibold text-secondary-dark">
                {content.fees.noSubscriptions}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Identity and Transaction Records */}
      <Section bgColor="bg-white" className="py-12 md:py-20 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.identityRecords.headline}
            </h2>
          </div>

          <div className="rounded-3xl bg-[#e6e9ed] p-6 sm:p-10 border border-gray-200/80">
            <p className="font-body text-base sm:text-lg text-secondary-dark font-medium leading-relaxed">
              {content.identityRecords.lead}
            </p>
            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.identityRecords.body1}
            </p>
            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              {content.identityRecords.body2}
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  {content.identityRecords.pillars.accountability.title}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {content.identityRecords.pillars.accountability.description}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  {content.identityRecords.pillars.signedRecords.title}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {content.identityRecords.pillars.signedRecords.description}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  {content.identityRecords.pillars.humanReview.title}
                </div>
                <div className="text-xs text-secondary mt-1">
                  {content.identityRecords.pillars.humanReview.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Built for Real-World Commerce */}
      <Section bgColor="bg-[#f8fafc]" className="py-12 md:py-20 border-t border-gray-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-secondary-dark font-bold">
              {content.useCases.headline}
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary">
              {content.useCases.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Vehicles */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                {content.useCases.items.vehicles.title}
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                {content.useCases.items.vehicles.description}
              </p>
            </div>

            {/* Commodities & Wholesale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                {content.useCases.items.commodities.title}
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                {content.useCases.items.commodities.description}
              </p>
            </div>

            {/* Marketplace Goods */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                {content.useCases.items.marketplace.title}
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                {content.useCases.items.marketplace.description}
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                {content.useCases.items.services.title}
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                {content.useCases.items.services.description}
              </p>
            </div>

            {/* Other Transactions */}
            <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                {content.useCases.items.other.title}
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                {content.useCases.items.other.description}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Payment Service, Not an Investment Product */}
      <Section bgColor="bg-white" className="py-10 md:py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 sm:p-8 text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                  {content.disclaimerBanner.headline}
                </h2>
                <p className="mt-2 font-body text-base text-secondary-dark leading-relaxed">
                  {content.disclaimerBanner.body1}
                </p>
                <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                  {content.disclaimerBanner.body2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section: Final CTA Banner */}
      <Section bgColor="bg-secondary-dark" className="py-14 md:py-24 text-white relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
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

      {/* Section: Important Information & Legal Disclaimer */}
      <section className="bg-[#f8fafc] py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark mb-4">
            {content.legal.headline}
          </h3>

          <div className="space-y-3 font-body text-xs sm:text-sm text-secondary leading-relaxed">
            {content.legal.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Legal Links */}
          <div className="mt-6 pt-6 border-t border-gray-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-secondary-dark font-body">
            <Link
              to="/terms-of-service"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              {content.legal.links.termsOfService}
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              {content.legal.links.privacyPolicy}
            </Link>
            <a
              href="mailto:contact@shakedefi.com"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              {content.legal.links.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Platform Chooser Modal */}
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
                {content.platformModal.tag}
              </div>
              <h3 id="modal-headline" className="font-display text-2xl font-bold text-secondary-dark">
                {content.platformModal.headline}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-secondary font-body">
                {content.platformModal.subtitle}
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
                {content.platformModal.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurePayments;
