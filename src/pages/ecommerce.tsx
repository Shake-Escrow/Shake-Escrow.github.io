// src/pages/ecommerce.tsx
import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Copy, ShieldCheck, Key, Code, Wallet } from 'lucide-react';
import { useSignInWithEmail, useVerifyEmailOTP, useCurrentUser, useExportEvmAccount } from '@coinbase/cdp-hooks';

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

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [flowId, setFlowId] = useState<string | null>(null);
  const [showWalletAuth, setShowWalletAuth] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [exportedPrivateKey, setExportedPrivateKey] = useState<string | null>(null);
  const [isWalletAuthLoading, setIsWalletAuthLoading] = useState(false);

  const { signInWithEmail } = useSignInWithEmail();
  const { verifyEmailOTP } = useVerifyEmailOTP();
  const { currentUser } = useCurrentUser();
  const { exportEvmAccount } = useExportEvmAccount();

  const walletAddress = currentUser?.evmAccounts?.[0];

  useEffect(() => {
    if (walletAddress && showWalletAuth) {
      setMerchantWallet(walletAddress);
    }
  }, [walletAddress, showWalletAuth]);

  const handleUseCoinbaseWallet = () => {
    setShowWalletAuth(!showWalletAuth);
    if (!showWalletAuth && currentUser?.evmAccounts?.[0]) {
      setMerchantWallet(currentUser.evmAccounts[0]);
    }
  };

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsWalletAuthLoading(true);
    try {
      const { flowId: newFlowId } = await signInWithEmail({ email });
      setFlowId(newFlowId);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send OTP');
    } finally {
      setIsWalletAuthLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!flowId) return;
    setIsWalletAuthLoading(true);
    try {
      const { user } = await verifyEmailOTP({ flowId, otp });
      if (user.evmAccounts?.[0]) {
        setMerchantWallet(user.evmAccounts[0]);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Failed to verify OTP');
    } finally {
      setIsWalletAuthLoading(false);
    }
  };

  const handleExportKey = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser?.evmAccounts?.[0]) return;
    setAuthError(null);
    setIsWalletAuthLoading(true);
    try {
      const result = await exportEvmAccount({ evmAccount: currentUser.evmAccounts[0] });
      setExportedPrivateKey(result.privateKey);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to export private key');
    } finally {
      setIsWalletAuthLoading(false);
    }
  };

  const handleProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // In a real environment, this secret should not be in the frontend. 
      // For the scope of this project, it's passed directly or we assume a secure admin portal.
      const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.shake-defi.com';
      const response = await fetch(`${API_ENDPOINT}/admin/provision-full`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': 'YOUR_ADMIN_SECRET'
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Start Accepting Crypto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Provision your smart contract and receive your API keys in seconds. Seamlessly integrate Web3 payments into your application.
          </p>
        </div>

        {!result ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <form onSubmit={handleProvision} className="space-y-8">
                <div>
                  <label htmlFor="accountName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Company / Account Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder="e.g. Acme Corp"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="merchantWallet" className="block text-sm font-semibold text-gray-700 mb-2">
                    Merchant Wallet Address (Base Network)
                  </label>
                  <input
                    type="text"
                    id="merchantWallet"
                    value={merchantWallet}
                    onChange={(e) => setMerchantWallet(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 font-mono text-sm placeholder-gray-400"
                    placeholder="0x..."
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>This is the address where your settled funds will be deposited.</span>
                    <button
                      type="button"
                      onClick={handleUseCoinbaseWallet}
                      className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                    >
                      <Wallet className="w-4 h-4 mr-1" />
                      {showWalletAuth ? 'Hide Embedded Wallet' : 'Don’t have a wallet address on Base network? Use Coinbase Embedded Wallet'}
                    </button>
                  </p>

                  {showWalletAuth && (
                    <div className="mt-4 p-5 bg-indigo-50 border border-indigo-100 rounded-xl space-y-4">
                      {currentUser ? (
                        <div className="space-y-3">
                          <p className="text-sm font-medium text-indigo-900">
                            Authenticated as: {currentUser.userId}
                          </p>
                          <p className="text-sm text-indigo-700 break-all">
                            EOA Wallet Address: {currentUser.evmAccounts?.[0] || 'Loading...'}
                          </p>
                          <button
                            type="button"
                            onClick={handleExportKey}
                            disabled={isWalletAuthLoading}
                            className="px-4 py-2 bg-white border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
                          >
                            {isWalletAuthLoading ? 'Loading...' : 'Export Private Key'}
                          </button>
                          {exportedPrivateKey && (
                            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Your Private Key</p>
                              <p className="text-xs font-mono text-gray-800 break-all bg-gray-50 p-2 rounded">{exportedPrivateKey}</p>
                              <p className="text-xs text-red-500 mt-2 font-medium">⚠️ Store this securely. Do not share it with anyone.</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-sm font-medium text-indigo-900">
                            Connect with Coinbase Embedded Wallet to quickly get a Base network address.
                          </p>

                          {!flowId ? (
                            <div className="flex gap-2">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isWalletAuthLoading || !email}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                              >
                                {isWalletAuthLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send OTP'}
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isWalletAuthLoading || otp.length !== 6}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                              >
                                {isWalletAuthLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
                              </button>
                            </div>
                          )}

                          {authError && (
                            <p className="text-sm text-red-600 font-medium">{authError}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
                        Deploying Smart Contract...
                      </>
                    ) : (
                      'Provision Account'
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
                <span>Secure smart contract deployment on Base</span>
              </div>
              <div className="flex items-center">
                <Code className="w-5 h-5 mr-2 text-indigo-500" />
                <span>REST API Ready</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 text-center border-b border-gray-100">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Provisioned!</h2>
              <p className="text-gray-500 text-lg">
                Your smart contract is deployed and your API keys are ready.
              </p>
            </div>

            <div className="p-8 md:p-12 bg-gray-50">
              <div className="space-y-8">

                {/* Contract Address */}
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Smart Contract</h3>
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
                      <h3 className="text-lg font-bold">Test Keys</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Publishable Key</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.test.publishable}</span>
                        <button onClick={() => copyToClipboard(result.keys.test.publishable, 'test-pub')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'test-pub' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Secret Key</label>
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
                      <h3 className="text-lg font-bold">Live Keys</h3>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Publishable Key</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between shadow-sm">
                        <span className="font-mono text-sm text-gray-800 truncate mr-2">{result.keys.live.publishable}</span>
                        <button onClick={() => copyToClipboard(result.keys.live.publishable, 'live-pub')} className="text-gray-400 hover:text-indigo-600">
                          {copiedKey === 'live-pub' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Secret Key</label>
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
                  <strong>Important:</strong> Please save these secret keys now. For security reasons, we do not store the raw secret keys in our database and they cannot be recovered once you leave this page.
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setAccountName('');
                  setMerchantWallet('');
                }}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                Provision Another Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ecommerce;
