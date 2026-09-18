// src/pages/secure-payments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Car,
  ShoppingBag,
  Briefcase,
  Layers,
  ArrowRight,
  ExternalLink,
  X,
  Scale,
  DollarSign,
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

  const webAppUrl = `https://app.shakedefi.com/?lang=${encodeURIComponent(locale)}`;

  const platforms: PlatformOption[] = [
    {
      id: 'telegram',
      name: 'Telegram Mini App',
      badge: 'Most Popular',
      description: 'Instant launch directly inside Telegram without any app downloads',
      url: 'https://t.me/ShakeDefiBot/app',
      icon: FaTelegramPlane,
      highlight: true,
    },
    {
      id: 'browser',
      name: 'Web Browser App',
      badge: 'Instant Access',
      description: 'Use the web app on any mobile or desktop browser with your connected wallet',
      url: webAppUrl,
      icon: GoBrowser,
    },
    {
      id: 'ios',
      name: 'Apple iOS',
      description: 'Native mobile app for iPhone and iPad on the App Store',
      url: 'https://apps.apple.com/us/app/shake-defi/id6756281576',
      icon: FaApple,
    },
    {
      id: 'android',
      name: 'Google Android',
      description: 'Native mobile app for Android devices via Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.shakedefi.app',
      icon: FaGooglePlay,
    },
    {
      id: 'farcaster',
      name: 'Farcaster Mini App',
      description: 'Interact seamlessly within the decentralized social feed',
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
        title="Secure Payments With Smart-Contract Escrow"
        description="Buy and sell with payment terms both sides agree to. Non-custodial smart-contract escrow on Base for commercial trade, wholesale commodities, vehicles, services, and direct transactions."
        canonical="/secure-payments"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-gradient-to-b from-[#f8fafc] via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Top trust chip */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-4 py-1.5 font-body text-xs sm:text-sm font-semibold text-secondary-dark border border-accent/40 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Smart-Contract Escrow on Base</span>
            </div>
          </div>

          {/* Hero text */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary-dark tracking-tight leading-[1.15]">
              Secure Payments With Smart-Contract Escrow
            </h1>

            <h2 className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-secondary-dark font-semibold">
              Buy and sell with payment terms both sides agree to.
            </h2>

            <p className="mt-5 font-body text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto">
              Shake DeFi provides non-custodial payment escrow for commercial and direct transactions. Agree on the transaction, lock the payment in a smart contract on Base, and release the funds according to the agreed escrow terms.
            </p>

            {/* Primary Hero CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                variant="primary"
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform active:scale-95"
              >
                Get Started
              </Button>
            </div>

            {/* Quick multi-platform badges below button */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-secondary">
              <span className="opacity-75">Available on:</span>
              <button
                type="button"
                onClick={handleOpenModal}
                className="underline hover:text-secondary-dark font-medium cursor-pointer"
              >
                Telegram • Browser • iOS • Android • Farcaster
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
                      Active Smart Contract
                    </div>
                    <div className="font-display text-sm sm:text-base font-bold text-secondary-dark">
                      Shake Escrow Safe
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Funds Locked on Base
                </span>
              </div>

              {/* Agreement summary lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">Agreement Terms</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">Mutual Signed Terms</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">Both sides approved ✓</div>
                </div>
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">Escrow Protection</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">Non-Custodial</div>
                  <div className="text-[11px] text-secondary font-medium mt-1">Base Smart Contract</div>
                </div>
                <div className="bg-white/85 rounded-xl p-3 border border-gray-200/60">
                  <div className="text-[11px] text-secondary font-medium">Standard Fee</div>
                  <div className="font-semibold text-secondary-dark text-sm mt-0.5">0.1% Service Fee</div>
                  <div className="text-[11px] text-secondary font-medium mt-1">No monthly subscriptions</div>
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
            Payment Escrow for Real-World Transactions
          </h2>

          <p className="mt-5 font-display text-base sm:text-lg md:text-xl font-semibold text-secondary-dark">
            Buying a vehicle, sourcing bulk commodities, purchasing equipment, hiring a contractor, or selling goods?
          </p>

          <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed max-w-2xl mx-auto">
            Shake gives buyers and sellers a structured way to transact without sending payment directly to the other party.
          </p>

          <div className="mt-8 rounded-2xl bg-[#e6e9ed] p-6 sm:p-8 text-left border border-gray-200/80 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent text-secondary-dark flex items-center justify-center shrink-0 font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-body text-base sm:text-lg text-secondary-dark leading-relaxed font-medium">
                  You choose the escrow duration, agree to the transaction terms, and fund the smart contract. The payment remains locked while the transaction is completed.
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
                Clear transaction terms & escrow deposit
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
                Signed agreement with item photos & terms
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
              <span>Step-by-Step Flow</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-secondary-dark font-bold">
              How It Works
            </h2>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 sm:space-y-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    Agree on the transaction
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    The buyer and seller agree on the item or service, price, escrow duration, and other transaction terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    Fund the escrow
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    The buyer sends the agreed payment to the Shake smart contract.
                  </p>
                  <p className="mt-3 font-body text-base text-secondary leading-relaxed">
                    Shake supports <strong className="text-secondary-dark font-semibold">USDC and USDT</strong>, as well as other supported cryptocurrencies including ETH and TON. Additional assets may be available through supported currency-swapping features.
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
                      + Swapping Features
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    Complete the transaction
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    The seller delivers the goods or services while the payment remains locked according to the agreed escrow terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    Release the payment
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    When the applicable escrow period and release conditions are satisfied, the payment is released to the seller according to the smart contract rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-200/80 shadow-xs hover:border-accent transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary-dark text-white flex items-center justify-center font-display font-bold text-base shrink-0">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark">
                    Dispute when necessary
                  </h3>
                  <p className="mt-2 font-body text-base sm:text-lg text-secondary leading-relaxed">
                    If the transaction does not go as agreed, the buyer can request a refund during the applicable dispute period. Shake's human review process evaluates the available transaction evidence and processes the outcome according to the escrow rules.
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
                  Non-Custodial by Design
                </h2>
                <div className="mt-3 inline-block rounded-full bg-accent/30 px-3 py-0.5 text-xs font-bold text-secondary-dark">
                  Base Network Smart Contract
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              <p className="font-semibold text-secondary-dark">
                Shake does not take custody of escrowed customer funds.
              </p>
              <p>
                Your payment is held by a smart contract on the Base network rather than in a Shake-controlled account. The smart contract defines the conditions under which funds can be released or returned.
              </p>
              <p>
                You use your connected wallet to authorize transactions.
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
              Use the Cryptocurrency You Already Have
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-xs">
            <p className="font-body text-base sm:text-lg text-secondary leading-relaxed">
              Shake supports <strong className="text-secondary-dark font-semibold">USDC and USDT</strong>, along with ETH, TON, and other supported cryptocurrencies.
            </p>

            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              The seller can specify the cryptocurrency they want to receive. Where supported, buyers can use integrated currency-swapping functionality to convert another supported cryptocurrency into the required payment currency.
            </p>

            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              Shake is designed around cryptocurrency payments, but you do not need investment expertise to understand the basic transaction process: agree on terms, fund the escrow, complete the transaction, and release the payment according to those terms.
            </p>

            {/* Currency Pill showcase */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
              <div className="font-medium text-xs sm:text-sm text-secondary">
                Directly Supported:
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
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Currency Swapping
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
                Optional Fiat Conversion
              </h2>
              <div className="flex items-center gap-2 bg-[#f8fafc] px-3.5 py-1.5 rounded-xl border border-gray-200/80">
                <span className="text-xs text-secondary font-medium">Powered by</span>
                <img
                  src="/images/coinbase-logo.png"
                  alt="Coinbase"
                  className="h-5 w-auto object-contain"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              <p>
                On supported mobile platforms and in eligible locations, <strong className="text-secondary-dark font-semibold">Coinbase provides optional fiat onramp and offramp services</strong>.
              </p>
              <p>
                You can use Coinbase to purchase supported cryptocurrency using available payment methods or convert cryptocurrency back to fiat.
              </p>
              <p className="text-sm text-secondary opacity-90 pt-2">
                Shake does not hold your fiat money or operate the Coinbase conversion service. Coinbase availability, supported assets, payment methods, and fees vary by country.
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
              Transparent Fees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Main Stat Card */}
            <div className="md:col-span-1 rounded-2xl bg-secondary-dark text-white p-6 flex flex-col justify-center items-center text-center shadow-sm">
              <div className="text-xs uppercase font-semibold text-accent tracking-wider">
                Standard Escrow Fee
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-accent my-2">
                0.1%
              </div>
              <div className="text-xs text-gray-300">
                0.1%–1.0% depending on release option
              </div>
            </div>

            {/* Detail Card */}
            <div className="md:col-span-2 rounded-2xl bg-white p-6 sm:p-7 border border-gray-200/80 flex flex-col justify-center space-y-3 font-body text-base text-secondary">
              <p>
                Shake charges <strong className="text-secondary-dark font-semibold">0.1%–1.0%</strong> for escrow transactions depending on the release option selected.
              </p>
              <p>
                The standard service fee is <strong className="text-secondary-dark font-semibold">0.1%</strong>. Additional fees may apply when a merchant chooses an early withdrawal option.
              </p>
              <p className="text-sm">
                Blockchain network fees may also apply. Third-party services such as cryptocurrency conversion and swapping may have their own fees.
              </p>
              <div className="pt-2 border-t border-gray-100 text-sm font-semibold text-secondary-dark">
                ✓ There are no recurring subscription fees for basic Shake use.
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
              Identity and Transaction Records
            </h2>
          </div>

          <div className="rounded-3xl bg-[#e6e9ed] p-6 sm:p-10 border border-gray-200/80">
            <p className="font-body text-base sm:text-lg text-secondary-dark font-medium leading-relaxed">
              Shake uses identity verification to establish accountability between transaction participants.
            </p>
            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              Each transaction can include a signed agreement, transaction details, supporting documentation, and on-chain payment records.
            </p>
            <p className="mt-4 font-body text-base sm:text-lg text-secondary leading-relaxed">
              For disputed transactions, a human reviewer evaluates the available evidence.
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  Accountability
                </div>
                <div className="text-xs text-secondary mt-1">Identity-verified participants</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  Signed Records
                </div>
                <div className="text-xs text-secondary mt-1">On-chain transaction proof</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-2xs">
                <div className="flex items-center gap-2 font-display text-sm font-bold text-secondary-dark">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Human Review
                </div>
                <div className="text-xs text-secondary mt-1">Evidence-based dispute evaluation</div>
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
              Built for Real-World Commerce
            </h2>
            <p className="mt-3 font-body text-base sm:text-lg text-secondary">
              Shake can be used for transactions involving:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Vehicles */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                Vehicles
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                Buy and sell vehicles with agreed payment terms.
              </p>
            </div>

            {/* Commodities & Wholesale */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                Commodities & Wholesale
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                Secure high-value orders, raw materials, wholesale goods, and commercial bulk supply.
              </p>
            </div>

            {/* Marketplace Goods */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                Marketplace Goods
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                Add escrow to purchases originating from online marketplaces and direct commerce.
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                Services
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                Use payment escrow when hiring contractors, freelancers, or other service providers.
              </p>
            </div>

            {/* Other Transactions */}
            <div className="sm:col-span-2 lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-accent hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-accent/30 text-secondary-dark flex items-center justify-center mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-secondary-dark">
                Other Transactions
              </h3>
              <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                Create an escrow transaction whenever both parties want payment held according to agreed terms.
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
                  Payment Service, Not an Investment Product
                </h2>
                <p className="mt-2 font-body text-base text-secondary-dark leading-relaxed">
                  Shake DeFi is a payment and escrow service. It is not an investment platform and does not offer investment products or investment advice.
                </p>
                <p className="mt-2 font-body text-base text-secondary leading-relaxed">
                  Cryptocurrency is used as the payment method for transactions.
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
            Your Payment. Your Terms. Your Escrow.
          </h2>
          <p className="mt-5 font-body text-base sm:text-xl text-[#e6e9ed]/90 max-w-2xl mx-auto leading-relaxed">
            Create a Shake transaction and give both sides a clear payment process backed by smart-contract escrow.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={handleOpenModal}
              className="px-10 py-4 text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#e6e9ed]/70">
            Choose from Telegram, Web Browser, iOS, Android, or Farcaster
          </p>
        </div>
      </Section>

      {/* Section: Important Information & Legal Disclaimer */}
      <section className="bg-[#f8fafc] py-12 md:py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h3 className="font-display text-lg sm:text-xl font-bold text-secondary-dark mb-4">
            Important Information
          </h3>

          <div className="space-y-3 font-body text-xs sm:text-sm text-secondary leading-relaxed">
            <p>
              Shake DeFi, Inc. is a corporation organized under the laws of the State of Wisconsin.
            </p>
            <p>
              Shake services and third-party integrations are subject to geographic and other availability restrictions. Coinbase and other third-party services are not available in all countries.
            </p>
            <p>
              Cryptocurrency transactions may have tax and other legal consequences. Users are responsible for understanding and complying with applicable laws and tax requirements.
            </p>
            <p>
              Shake is intended for users age 18 and older.
            </p>
          </div>

          {/* Legal Links */}
          <div className="mt-6 pt-6 border-t border-gray-200/80 flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-secondary-dark font-body">
            <Link
              to="/terms-of-service"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:contact@shakedefi.com"
              className="hover:text-accent underline underline-offset-4 transition-colors"
            >
              Contact Shake DeFi
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
                Select Your Platform
              </div>
              <h3 id="modal-headline" className="font-display text-2xl font-bold text-secondary-dark">
                Get Started With Shake
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-secondary font-body">
                Choose how you'd like to open or install Shake:
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurePayments;
