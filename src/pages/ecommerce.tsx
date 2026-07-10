// src/pages/ecommerce.tsx
import React, { useState, useEffect } from 'react';
import { Loader2, ShieldCheck, CheckCircle2, Code, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

export const secondaryColor = '#1184b0';

const Ecommerce: React.FC = () => {
  const [accountName, setAccountName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [uboName, setUboName] = useState('');
  const [kybFile, setKybFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const siteContent = useContent('sitecontent');
  const ecommerce = siteContent.ecommerce;
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (applicationId) {
      intervalId = setInterval(async () => {
        try {
          const rawEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
          const API_ENDPOINT = rawEndpoint.replace(/\/api\/website\/?$/, '');
          const response = await fetch(`${API_ENDPOINT}/v1/applications/${applicationId}`);

          if (response.ok) {
            const data = await response.json();
            if (data.emailVerified) {
              clearInterval(intervalId);
              navigate(`/provision?application_id=${applicationId}`);
            }
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [applicationId, navigate]);

  const handleApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const rawEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
      const API_ENDPOINT = rawEndpoint.replace(/\/api\/website\/?$/, '');
      const formData = new FormData();
      formData.append('accountName', accountName);
      formData.append('businessAddressLine1', addressLine1);
      formData.append('businessAddressLine2', addressLine2);
      formData.append('businessCity', city);
      formData.append('businessStateProvince', stateProvince);
      formData.append('businessPostalCode', postalCode);
      formData.append('businessCountry', country);
      formData.append('phoneNumber', phoneNumber);
      formData.append('emailAddress', emailAddress);
      formData.append('uboName', uboName);
      if (kybFile) {
        formData.append('kybFile', kybFile);
      }

      const response = await fetch(`${API_ENDPOINT}/v1/applications`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || data.error || 'Submission failed');
      }

      if (data.success) {
        setApplicationId(data.applicationId);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

        {!applicationId ? (
          <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{ecommerce.getStartedTitle}</h2>
              </div>
              <form onSubmit={handleApplication} className="space-y-8">
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

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    {ecommerce.businessAddressLabel}
                  </label>

                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder={ecommerce.addressLine1Placeholder}
                    required
                  />

                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                    placeholder={ecommerce.addressLine2Placeholder}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.cityPlaceholder}
                      required
                    />

                    <input
                      type="text"
                      value={stateProvince}
                      onChange={(e) => setStateProvince(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.stateProvincePlaceholder}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.postalCodePlaceholder}
                      required
                    />

                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.countryPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      {ecommerce.phoneNumberLabel}
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.phoneNumberPlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                      {ecommerce.emailAddressLabel}
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.emailAddressPlaceholder}
                      required
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="uboName" className="block text-sm font-semibold text-gray-700 mb-2">
                      {ecommerce.uboNameLabel}
                    </label>
                    <input
                      type="text"
                      id="uboName"
                      value={uboName}
                      onChange={(e) => setUboName(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      placeholder={ecommerce.uboNamePlaceholder}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="kybFile" className="block text-sm font-semibold text-gray-700 mb-2">
                      {ecommerce.kybFileLabel}
                    </label>
                    <input
                      type="file"
                      id="kybFile"
                      accept=".pdf,application/pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setKybFile(e.target.files[0]);
                        }
                      }}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      {ecommerce.kybFileDescription}
                    </p>
                  </div>
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
                        {ecommerce.submittingButton}
                      </>
                    ) : (
                      ecommerce.submitButton
                    )}
                  </div>
                  {/* Subtle shine effect */}
                  {!isLoading && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 text-center border-b border-gray-100">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
                <Mail className="h-8 w-8 text-indigo-600 animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{ecommerce.checkEmailTitle}</h2>
              <p className="text-gray-500 text-lg max-w-lg mx-auto">
                {ecommerce.checkEmailDescription1}<strong>{emailAddress}</strong>{ecommerce.checkEmailDescription2}
              </p>
            </div>

            <div className="p-8 md:p-12 bg-gray-50 text-center">
              <div className="flex items-center justify-center text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin mr-3" />
                <span>{ecommerce.waitingForVerification}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ecommerce;
