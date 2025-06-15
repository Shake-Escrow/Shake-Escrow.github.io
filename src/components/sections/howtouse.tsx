import React from 'react';
import Section from '../common/section';
import siteContent from '../../content/sitecontent.json';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#2d3440] rounded-full text-accent font-display text-cta-header text-xl">
        {number}
      </div>
      <div className="flex-1 text-center md:text-left max-w-4xl mx-auto md:mx-0">
        <div className="flex flex-col md:flex-row items-center mb-3 justify-center md:justify-start">
          <h3 className="font-body text-xl font-bold text-secondary-dark mr-2" style={{letterSpacing: '-0.02em', fontFamily: 'Lexend Deca, sans-serif'}}>{title}</h3>
        </div>
        <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>{description}</p>
      </div>
    </div>
  );
};

const HowToUse: React.FC = () => {
  const steps = siteContent.home.howToUse.steps.map((step, idx) => ({
  number: idx + 1,
  title: step.title,
  description: step.description
}));

  return (
    <Section id="how-to-use" bgColor="bg-[#e6e9ed]">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-secondary-dark mb-6">{siteContent.home.howToUse.headline}</h2>
        <p className="text-description mb-6 text-[#2d3440] opacity-90 max-w-2xl mx-auto" style={{fontFamily: 'Lexend Deca, sans-serif'}}>
          {siteContent.home.howToUse.subhead}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={step.number}
            title={step.title}
            description={step.description}

          />
        ))}
      </div>
    </Section>
  );
};

export default HowToUse;