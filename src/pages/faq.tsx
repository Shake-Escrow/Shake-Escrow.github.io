import React, { useState } from 'react';
import Section from '../components/common/section';
import Button from '../components/common/button';
import siteContent from '../content/sitecontent.json';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-secondary last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left"
        onClick={toggleOpen}
      >
        <span className="font-body text-xl font-bold text-secondary-dark" style={{letterSpacing: '-0.02em'}}>{question}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-accent" />
        ) : (
          <ChevronDown size={20} className="text-secondary" />
        )}
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-none opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        {answer.split('\n\n').map((para, idx) => (
  <p className="text-base text-secondary-dark font-normal tracking-normal leading-normal" key={idx} style={{marginBottom: '1em'}}>
    {para.split('\n').map((line, i) => {
      const trimmed = line.trim();
      const isIndented = /^([1-9]\)|\s{4,})/.test(trimmed);
      return (
        <React.Fragment key={i}>
          {isIndented ? <span style={{paddingLeft: '2em', display: 'block'}}>{trimmed}</span> : line}
          {i < para.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    })}
  </p>
))}
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqItems = siteContent.faq.questions;
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const filteredFAQs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pt-24">
      <Section className="pb-0" bgColor="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-hero text-4xl md:text-5xl text-secondary-dark mb-6">{siteContent.faq.headline}</h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl mb-8 text-center mx-auto">{siteContent.faq.subhead}</p>
          

          
          <div className="relative max-w-xl mx-auto mb-12">
            <input
              type="text"
              placeholder={siteContent.faq.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Search size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary" />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-primary-light rounded-xl shadow-sm p-8 font-body">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="font-display text-2xl font-bold text-secondary-dark mb-2">{siteContent.faq.noResults.title} "{searchTerm}"</h3>
              <p className="font-body text-secondary">{siteContent.faq.noResults.subtitle}</p>
            </div>
          )}
        </div>
      </Section>
      
      <Section bgColor="bg-secondary-dark" className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-cta-header text-3xl md:text-4xl mb-6 text-[#e6e9ed]">
            {siteContent.faq.cta.header.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>{line}{idx < siteContent.faq.cta.header.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </h2>
          <p className="font-body text-description text-xl mb-8 text-[#e6e9ed]">
            {siteContent.faq.cta.subhead}
          </p>
          <a href="mailto:matt.anderson@alumni.stanford.edu" style={{ textDecoration: 'none' }}>
            <Button size="lg" variant="primary" className="rounded-full">
              {siteContent.faq.cta.button}
            </Button>
          </a>
        </div>
      </Section>
    </div>
  );
};

export default FAQ;