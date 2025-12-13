import React, { useEffect } from 'react';
import Section from '../components/common/section';
import eulaData from '../content/eula.json';

interface EulaSubsection {
  subtitle: string;
  content: string;
}

interface EulaSection {
  title: string;
  subsections?: EulaSubsection[];
  content?: string;
}

interface EulaData {
  title: string;
  companyName: string;
  lastUpdated: string;
  introduction: string;
  sections: EulaSection[];
  acknowledgment?: string;
}

const EndUserLicenseAgreement: React.FC = () => {
  const { title } = eulaData as EulaData;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pt-20">
      <Section bgColor="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-black text-secondary-dark mb-8">
            {title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <EulaContent />
          </div>
        </div>
      </Section>
    </div>
  );
};

const EulaContent: React.FC = () => {
  const data = eulaData as EulaData;
  const { companyName, lastUpdated, introduction, sections, acknowledgment } = data;

  return (
    <>
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900">{companyName}</p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>
        <hr className="my-6 border-gray-300" />
      </div>

      <div
        className="text-base text-gray-700 leading-relaxed mb-10"
        dangerouslySetInnerHTML={{ __html: introduction }}
      />

      {sections.map((section: EulaSection, index: number) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-secondary-dark mb-4">
            {index + 1}. {section.title}
          </h2>

          {section.subsections ? (
            section.subsections.map((subsection: EulaSubsection, subIndex: number) => (
              <div key={`${section.title}-${subsection.subtitle}`} className="mb-6">
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
            section.content && (
              <div
                className="text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )
          )}
        </div>
      ))}

      {acknowledgment && (
        <div className="mt-12 p-6 bg-secondary-dark text-white rounded-lg">
          <p className="text-sm font-semibold leading-relaxed">{acknowledgment}</p>
        </div>
      )}
    </>
  );
};

export default EndUserLicenseAgreement;
