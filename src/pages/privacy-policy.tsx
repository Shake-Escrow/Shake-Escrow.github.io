import React from 'react';
import Section from '../components/common/section';
import privacyPolicyData from '../content/privacy.json';

const PrivacyPolicy: React.FC = () => {
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
  const { lastUpdated, effectiveDate, companyName, sections } = privacyPolicyData;
  
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
      
      {sections.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-secondary-dark mb-4">
            {index + 1}. {section.title}
          </h2>
          
          {section.subsections ? (
            // Render subsections if they exist
            section.subsections.map((subsection, subIndex) => (
              <div key={subIndex} className="mb-6">
                <h3 className="text-xl font-display font-bold text-secondary-dark mb-3">
                  {index + 1}.{subIndex + 1} {subsection.subtitle}
                </h3>
                <div 
                  className="text-base text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: subsection.content }}
                />
              </div>
            ))
          ) : (
            // Render main content if no subsections
            <div 
              className="text-base text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default PrivacyPolicy;