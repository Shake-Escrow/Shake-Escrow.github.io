import React from 'react';
import tosContent from '../content/tos.json';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-display font-black text-[#2d3440]">
              {tosContent.title}
            </h1>
            <p className="text-lg font-body text-[#2d3440]">{tosContent.company}</p>
            <p className="text-sm font-body text-[#2d3440] opacity-70">
              Last Updated: {tosContent.lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-base font-body text-[#2d3440] leading-relaxed">
              {tosContent.introduction}
            </p>
          </div>

          <hr className="border-secondary" />

          {/* Sections */}
          <div className="space-y-12">
            {tosContent.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                <h2 className="text-2xl font-display font-black text-[#2d3440]">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="text-base font-body text-[#2d3440] leading-relaxed">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-6 ml-4">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="space-y-3">
                        <h3 className="text-xl font-display font-black text-[#2d3440]">
                          {subsection.title}
                        </h3>
                        
                        {subsection.content && (
                          <p className="text-base font-body text-[#2d3440] leading-relaxed">
                            {subsection.content}
                          </p>
                        )}

                        {subsection.list && (
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            {subsection.list.map((item, idx) => (
                              <li key={idx} className="text-base font-body text-[#2d3440] leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {subsection.definitions && (
                          <div className="space-y-3">
                            {subsection.definitions.map((def, idx) => (
                              <div key={idx} className="ml-4">
                                <span className="font-semibold font-body text-[#2d3440]">
                                  "{def.term}"
                                </span>{' '}
                                <span className="font-body text-[#2d3440]">
                                  {def.definition}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.contact && (
                  <div className="ml-4 space-y-1">
                    <p className="font-semibold font-body text-[#2d3440]">
                      {section.contact.company}
                    </p>
                    <p className="font-body text-[#2d3440]">
                      Email: {section.contact.email}
                    </p>
                    <p className="font-body text-[#2d3440]">
                      Address: {section.contact.address}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <hr className="border-secondary" />

          {/* Acknowledgment */}
          <div className="bg-[#f5f5f5] p-6 rounded-lg">
            <p className="text-sm font-body text-[#2d3440] font-semibold text-center">
              {tosContent.acknowledgment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;