// src/pages/ecommerce.tsx
import React, { useState } from 'react';
import { Loader2, CheckCircle2, Copy, ShieldCheck, Key, Code } from 'lucide-react';
import { generateMnemonic } from '@scure/bip39';
import { wordlist as wordlistEn } from '@scure/bip39/wordlists/english.js';
import { wordlist as wordlistEs } from '@scure/bip39/wordlists/spanish.js';
import { mnemonicToAccount } from 'viem/accounts';
import { useLocale } from '../context/LocaleContext';
import { useContent } from '../hooks/useContent';

export const secondaryColor = '#1184b0';

interface Keys {
  secret: string;
  publishable: string;
}

interface ProvisionResult {
  success: boolean;
  accountId: string;
  contractAddress: string;
  keys: {
    test: Keys;
    live: Keys;
  };
}

const Ecommerce: React.FC = () => {
  const [accountName, setAccountName] = useState('');
  const [merchantWallet, setMerchantWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProvisionResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);
  const { locale } = useLocale();
  const siteContent = useContent('sitecontent');
  const ecommerce = siteContent.ecommerce;

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const rawEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
      // Strip /api/website if present to get the platform root
      const API_ENDPOINT = rawEndpoint.replace(/\/api\/website\/?$/, '');
      const response = await fetch(`${API_ENDPOINT}/v1/provision-full`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountName,
          merchantWalletInput: merchantWallet,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || 'Provisioning failed');
      }

      if (data.success) {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = (window as any).ethereum;
      if (!provider) {
        throw new Error('No wallet detected. Please install a wallet extension.');
      }
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setMerchantWallet(accounts[0]);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const createWallet = () => {
    try {
      const activeWordlist = locale === 'es' ? wordlistEs : wordlistEn;
      const mnemonic = generateMnemonic(activeWordlist);
      const account = mnemonicToAccount(mnemonic);

      setGeneratedMnemonic(mnemonic);
      setMerchantWallet(account.address);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to generate wallet');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {ecommerce.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {ecommerce.subtitle}
          </p>
        </div>

        {/* Payment Flow Explainer Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{ecommerce.explainerTitle}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {ecommerce.explainerSubtitle1}
                <br /><span className="font-semibold text-indigo-600">{ecommerce.explainerSubtitleLinkText}</span>{ecommerce.explainerSubtitle2}
              </p>
            </div>

            <div className="flex justify-center bg-white rounded-2xl border border-gray-100 shadow-inner overflow-hidden mb-10 p-4">
              <object
                data="/assets/full_checkout_settlement_and_withdrawal_cs3.svg"
                type="image/svg+xml"
                className="w-full h-auto max-w-3xl"
                aria-label={ecommerce.diagramLabel}
              >
                {ecommerce.diagramLabel}
              </object>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">1</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{ecommerce.step1Title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{ecommerce.step1Text}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">2</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{ecommerce.step2Title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{ecommerce.step2Text}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg mb-4">3</div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{ecommerce.step3Title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{ecommerce.step3Text}</p>
              </div>
            </div>
          </div>
        </div>

        {!result ? (
          <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{ecommerce.getStartedTitle}</h2>
              </div>
              <form onSubmit={handleProvision} className="space-y-8">
                <div>
                  <label htmlFor="accountName" className="block text-sm font-semibold text-gray-700 mb-2">
                    {ecommerce.companyNameLabel}
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder={ecommerce.companyNamePlaceholder}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="merchantWallet" className="block text-sm font-semibold text-gray-700 mb-2">
                    {ecommerce.merchantWalletLabel}
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      id="merchantWallet"
                      value={merchantWallet}
                      onChange={(e) => setMerchantWallet(e.target.value)}
                      className="flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 font-mono text-sm placeholder-gray-400"
                      placeholder={ecommerce.merchantWalletPlaceholder}
                      required
                    />
                    <button
                      type="button"
                      onClick={connectWallet}
                      className="px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none flex-shrink-0"
                    >
                      {ecommerce.connectWallet}
                    </button>
                    <button
                      type="button"
                      onClick={createWallet}
                      className="px-6 py-4 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none flex-shrink-0"
                    >
                      {ecommerce.createWallet}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {ecommerce.merchantWalletDescription}
                  </p>
                </div>

                {generatedMnemonic && (
                  <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 space-y-3">
                    <div className="flex items-start">
                      <ShieldCheck className="w-6 h-6 mr-3 flex-shrink-0 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-bold text-yellow-900 text-lg">{ecommerce.saveRecoveryPhraseTitle}</h4>
                        <p className="text-sm mt-1 mb-3 text-yellow-800 leading-relaxed">
                          {ecommerce.saveRecoveryPhraseDescription1}
                          <strong>{ecommerce.saveRecoveryPhraseDescriptionOnly}</strong>
                          {ecommerce.saveRecoveryPhraseDescription2}
                          <strong>{ecommerce.saveRecoveryPhraseDescriptionWarning}</strong>
                          {ecommerce.saveRecoveryPhraseDescription3}
                        </p>
                        <div className="bg-white border border-yellow-300 p-4 rounded-lg font-mono text-base break-words relative shadow-sm pr-12">
                          {generatedMnemonic}
                          <button
                            type="button"
                            onClick={() => copyToClipboard(generatedMnemonic, 'mnemonic')}
                            className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-indigo-600 transition-colors"
                            title="Copy Mnemonic"
                          >
                            {copiedKey === 'mnemonic' ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start text-red-600">
                    <ShieldCheck className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{ backgroundColor: secondaryColor }}
                  className="w-full relative group overflow-hidden rounded-xl px-8 py-4 text-white font-bold text-lg shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90"
                >
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                        {ecommerce.deployingContract}
                      </>
                    ) : (
                      ecommerce.provisionAccount
                    )}
                  </div>
                  {/* Subtle shine effect */}
                  {!isLoading && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  )}
                </button>
              </form>
            </div>
            {/* Informational footer */}
            <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
              <div className="flex items-center mb-4 md:mb-0">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
                <span>
                  {ecommerce.secureDeployment.split('Base').map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <a
                          href="https://base.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-600 transition-colors underline decoration-dotted underline-offset-4"
                        >
                          Base
                        </a>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className="flex items-center">
                <Code className="w-5 h-5 mr-2 text-indigo-500" />
                <a
                  href="/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors underline decoration-dotted underline-offset-4"
                >
                  {ecommerce.restApiReady}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 text-center border-b border-gray-100">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{ecommerce.accountProvisioned}</h2>
              <p className="text-gray-500 text-lg">
                {ecommerce.provisionedSubtitle}
              </p>
            </div>

            <div className="p-8 md:p-12 bg-gray-50">
              <div className="space-y-8">

                {/* Contract Address */}
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{ecommerce.smartContract}</h3>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-sm">
                    <span className="font-mono text-gray-800 text-sm md:text-base break-all mr-4">{result.contractAddress}</span>
                    <button
                      onClick={() => copyToClipboard(result.contractAddress, 'contract')}
                      className="text-gray-400 hover:text-indigo-600 transition-colors"
                      title="Copy"
                    >
                      {copiedKey === 'contract' ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* API Keys */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Test Keys */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-indigo-600 mb-4">
                      <Key className="w-5 h-5" />
                      <h3 className="text-lg font-bold">{ecommerce.testKeys}</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{ecommerce.publishableKey}</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.test.publishable}</span>
                        <button onClick={() => copyToClipboard(result.keys.test.publishable, 'test-pub')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'test-pub' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{ecommerce.secretKey}</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.test.secret}</span>
                        <button onClick={() => copyToClipboard(result.keys.test.secret, 'test-sec')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'test-sec' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live Keys */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-green-600 mb-4">
                      <Key className="w-5 h-5" />
                      <h3 className="text-lg font-bold">{ecommerce.liveKeys}</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{ecommerce.publishableKey}</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.live.publishable}</span>
                        <button onClick={() => copyToClipboard(result.keys.live.publishable, 'live-pub')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'live-pub' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{ecommerce.secretKey}</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.live.secret}</span>
                        <button onClick={() => copyToClipboard(result.keys.live.secret, 'live-sec')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'live-sec' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm">
                  <strong>{ecommerce.saveKeysWarningLabel}</strong> {ecommerce.saveKeysWarningText}
                </div>

                <div className="mt-8 flex justify-center">
                  <a
                    href="/api-docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Code className="w-5 h-5 mr-2" />
                    {ecommerce.viewApiDocs}
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Ecommerce;
