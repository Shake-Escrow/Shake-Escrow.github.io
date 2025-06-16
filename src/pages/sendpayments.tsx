import React from 'react';
import Section from '../components/common/section';
import Button from '../components/common/button';
import siteContent from '../content/sitecontent.json';

const SendPayments: React.FC = () => {
  return (
    <div className="pt-24">
      <Section className="pb-0" bgColor="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-hero text-4xl md:text-5xl text-secondary-dark mb-6">
            {siteContent.sendPayments.hero.headline.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>{line}<br/></React.Fragment>
            ))}
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl mb-8 text-center mx-auto">
            {siteContent.sendPayments.hero.description}
          </p>
          <img
            src="/images/iStock-1913374153.jpg"
            alt="Send Payments Hero"
            className="w-full h-43 object-cover rounded-2xl mb-8 w-2/3 h-auto mx-auto"
          />
        </div>
      </Section>
      <div className="mt-6">
  <div className="max-w-5xl mx-auto flex flex-col gap-y-7 px-6 md:px-0">
    {/* First card: Transactions That Matter */}
    {(() => {
      const section = siteContent.sendPayments.sections[0];
      const imageSrc = '/images/01_transactions that matter.png';
      return (
        <div className="bg-[#e6e9ed] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-7">
          <div className="md:w-1/2 w-full">
            <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
          </div>
          <div className="md:w-1/2 w-full text-left">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>{section.description}</p>
          </div>
        </div>
      );
    })()}

    {/* Middle two cards: Level Up as a Sensible Spender & Freedom and Flexibility */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
      {[
        siteContent.sendPayments.sections[1],
        siteContent.sendPayments.sections[2],
      ].map((section, idx) => {
        let imageSrc = '';
        if (section.headline === 'Level Up as a Sensible Spender') imageSrc = '/images/02_level up as a sensible spender.png';
        if (section.headline === 'Freedom and Flexibility') imageSrc = '/images/03_freedom and flexibility.png';
        return (
          <div key={section.headline} className={`bg-[#e6e9ed] rounded-2xl py-8 px-6 md:px-12 md:py-12 flex flex-col items-start text-left h-full ${idx === 0 ? ' md:mb-0' : 'mt-8 md:mt-0'}`}>
            <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl " />
            <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>{section.description}</p>
          </div>
        );
      })}
    </div>

    {/* Add vertical gap between Freedom and Flexibility and Accountable Where it Counts */}
    <div className="mt-8 md:mt-0"></div>

    {/* Fourth card: Accountable Where it Counts */}
    {(() => {
      const section = siteContent.sendPayments.sections[3];
      const imageSrc = '/images/04_accountable where it counts.png';
      return (
        <div className="bg-[#e6e9ed] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-7">
          <div className="md:w-1/2 w-full">
            <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
          </div>
          <div className="md:w-1/2 w-full text-left">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>{section.description}</p>
          </div>
        </div>
      );
    })()}

    {/* Fifth card: Power Back to the People */}
    {(() => {
      const section = siteContent.sendPayments.sections[4];
      const imageSrc = '/images/05_power back to the people.png';
      return (
        <div className="bg-[#e6e9ed] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-7">
          <div className="md:w-1/2 w-full">
            <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
          </div>
          <div className="md:w-1/2 w-full text-left">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
            <p className="text-description mb-6 text-[#2d3440] opacity-90" style={{fontFamily: 'Lexend Deca, sans-serif'}}>{section.description}</p>
          </div>
        </div>
      );
    })()}
  </div>
</div>
      <div className="mt-24"></div>
      <Section bgColor="bg-secondary-dark" className="relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-cta-header text-3xl md:text-4xl mb-6 text-[#e6e9ed]">
            {siteContent.sendPayments.cta.header}
          </h2>
          <p className="font-body text-description text-xl mb-8 text-[#e6e9ed]">
            {siteContent.sendPayments.cta.subhead}
          </p>
          <Button size="lg" variant="primary" className="rounded-full">
            {siteContent.sendPayments.cta.button}
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default SendPayments;
