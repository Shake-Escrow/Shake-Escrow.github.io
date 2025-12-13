import React, { useEffect } from 'react';
import Section from '../components/common/section';
import tosContent from '../content/tos.json';
import { Link } from 'react-router-dom';

// Type definitions
interface Definition {
  term: string;
  definition: string;
}

interface Subsection {
  id: string;
  title: string;
  content?: string;
  list?: string[];
  definitions?: Definition[];
}

interface Contact {
  company: string;
  email: string;
  address: string;
}

interface TOSSection {
  id: string;
  title: string;
  content?: string;
  subsections?: Subsection[];
  contact?: Contact;
}

interface TOSData {
  title: string;
  company: string;
  lastUpdated: string;
  introduction: string;
  sections: TOSSection[];
  acknowledgment: string;
}

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="pt-20">
      <Section bgColor="bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-black text-secondary-dark mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <TOSContent />
          </div>
        </div>
      </Section>
    </div>
  );
};

// Component to render the Terms of Service content from JSON
const TOSContent: React.FC = () => {
  const data = tosContent as TOSData;
  const { company, lastUpdated, introduction, sections, acknowledgment } = data;
  
  return (
    <>
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-900">{company}</p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Last Updated:</strong> {lastUpdated}
        </p>
        <hr className="my-6 border-gray-300" />
      </div>
      
      {/* Introduction */}
      <div className="mb-10">
        <p className="text-base text-gray-700 leading-relaxed">
          {introduction}
        </p>
      </div>
      
      {/* Sections */}
      {sections.map((section: TOSSection) => (
        <div key={section.id} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-black text-secondary-dark mb-4">
            {section.title}
          </h2>
          
          {section.content && (
            <div 
              className="text-base text-gray-700 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
          
          {section.subsections && section.subsections.map((subsection: Subsection) => (
            <div key={subsection.id} className="mb-6 ml-4">
              <h3 className="text-xl font-display font-bold text-secondary-dark mb-3">
                {subsection.title}
              </h3>
              
              {subsection.content && (
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  {subsection.content}
                </p>
              )}
              
              {subsection.list && (
                <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-4">
                  {subsection.list.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
              
              {subsection.definitions && (
                <dl className="space-y-3 ml-4">
                  {subsection.definitions.map((def: Definition, idx: number) => (
                    <div key={idx} className="border-l-2 border-gray-300 pl-4">
                      <dt className="font-bold text-gray-900 mb-1">
                        <strong>{def.term}:</strong>
                      </dt>
                      <dd className="text-gray-700">
                        {def.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
          
          {section.contact && (
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-bold text-gray-900 mb-2">{section.contact.company}</p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href={`mailto:${section.contact.email}`} className="text-accent hover:underline">{section.contact.email}</a>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {section.contact.address}
              </p>
            </div>
          )}
        </div>
      ))}
      
      {/* Acknowledgment */}
      <div className="mt-12 p-6 bg-secondary-dark text-white rounded-lg">
        <p className="text-sm font-semibold leading-relaxed">
          {acknowledgment}
        </p>
      </div>

      <div className="mt-8 text-base text-gray-700">
        Looking for our End User License Agreement?{' '}
        <Link to="/end-user-license-agreement" className="text-accent hover:underline">
          Read it here.
        </Link>
      </div>
    </>
  );
};

export default TermsOfService;
