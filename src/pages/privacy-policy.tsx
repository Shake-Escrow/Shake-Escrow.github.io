import React, { useEffect } from 'react';
import Section from '../components/common/section';
import privacyPolicyData from '../content/privacy.json';
import { Link } from 'react-router-dom';

// Type definitions for the privacy policy data structure
interface Subsection {
  subtitle: string;
  content: string;
}

interface PolicySection {
  title: string;
  content?: string;
  subsections?: Subsection[];
}

interface PrivacyPolicyData {
  lastUpdated: string;
  effectiveDate: string;
  companyName: string;
  sections: PolicySection[];
}

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pt-20">
      <Section bgColor="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-black text-secondary-dark mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <PrivacyPolicyContent />
          </div>
        </div>
      </Section>
    </div>
  );
};

// Component to render the privacy policy content from JSON
const PrivacyPolicyContent: React.FC = () => {
  const data = privacyPolicyData as PrivacyPolicyData;
  const { lastUpdated, effectiveDate, companyName, sections } = data;
  
  return (
    <>
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900">{companyName}</p>
        <p className="text-sm text-gray-600">
          <strong>Effective Date:</strong> {effectiveDate}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>
        <hr className="my-6 border-gray-300" />
      </div>
      
      {sections.map((section: PolicySection, index: number) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-secondary-dark mb-4">
            {section.title}
          </h2>
          
          {section.subsections ? (
            // Render subsections if they exist
            section.subsections.map((subsection: Subsection, subIndex: number) => (
              <div key={subIndex} className="mb-6">
                <h3 className="text-xl font-display font-bold text-secondary-dark mb-3">
                  {subsection.subtitle}
                </h3>
                <div 
                  className="text-base text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: subsection.content }}
                />
              </div>
            ))
          ) : (
            // Render main content if no subsections
            section.content && (
              <div 
                className="text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )
          )}
        </div>
      ))}

      <div className="mt-12 text-base text-gray-700">
        Looking for our End User License Agreement?{' '}
        <Link to="/end-user-license-agreement" className="text-accent hover:underline">
          Read it here.
        </Link>
      </div>
    </>
  );
};

export default PrivacyPolicy;