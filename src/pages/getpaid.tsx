import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/common/section';
import Button from '../components/common/button';
import siteContent from '../content/sitecontent.json';

const GetPaid: React.FC = () => {
  return (
    <div className="pt-24">
      <Section className="pb-0" bgColor="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-hero text-4xl md:text-5xl text-secondary-dark mb-6">
            {siteContent.getPaid.hero.headline}
          </h1>
          <p className="font-body text-lg md:text-xl text-secondary max-w-2xl mb-8 text-center mx-auto">
            {siteContent.getPaid.hero.description}
          </p>
          <img
            src="/images/iStock-854067898.jpg"
            alt="Get Paid Hero"
            className="w-full h-43 object-cover rounded-2xl mb-8 w-2/3 h-auto mx-auto"
          />
        </div>
      </Section>

      <div className="mt-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-y-7 px-6 md:px-0">
          {/* First card: Keep More of What You Earn */}
          {(() => {
            const section = siteContent.getPaid.sections[0];
            const imageSrc = '/images/01_keep more of what you earn.png';
            return (
              <div className="bg-[#e6e9ed] rounded-2xl p-8 md:p-12  flex flex-col md:flex-row items-center gap-7">
                <div className="md:w-1/2 w-full">
                  <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
                </div>
                <div className="md:w-1/2 w-full text-left">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
                  <p className="text-description mb-6 text-[#2d3440] opacity-90" >{section.description}</p>
                </div>
              </div>
            );
          })()}

          {/* Middle two cards: Adapts to You & Accept crypto from anyone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7">
            {[
              siteContent.getPaid.sections[1],
              siteContent.getPaid.sections[2],
            ].map((section, idx) => {
              let imageSrc = '';
              if (section.headline.replace(/\n/g, ' ') === 'Adapts to You') imageSrc = '/images/03_adapts to you.png';
              if (section.headline.replace(/\n/g, ' ') === 'Reduce Risk by Building Trust') imageSrc = '/images/02_reduce risk by building trust.png';
              if (section.headline.replace(/\n/g, ' ') === 'Accept crypto from anyone') imageSrc = '/images/02_accept crypto from anyone.png';
              return (
                <div key={section.headline} className={`bg-[#e6e9ed] rounded-2xl py-8 px-6 md:px-12 md:py-12 flex flex-col items-start text-left h-full ${idx === 0 ? ' md:mb-0' : 'mt-8 md:mt-0'}`}>
                  <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl " />
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
                  <p className="text-description mb-6 text-[#2d3440] opacity-90" >{section.description}</p>
                </div>
              );
            })}
          </div>

          {/* Fourth card: Convenience that Empowers */}
          {(() => {
            const section = siteContent.getPaid.sections[3];
            const imageSrc = '/images/04_convenience that empowers.png';
            return (
              <div className="mt-8 bg-[#e6e9ed] rounded-2xl p-8 md:p-12  flex flex-col md:flex-row items-center gap-7">
                <div className="md:w-1/2 w-full">
                  <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
                </div>
                <div className="md:w-1/2 w-full text-left">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
                  <p className="text-description mb-6 text-[#2d3440] opacity-90" >{section.description}</p>
                </div>
              </div>
            );
          })()}

          {/* Fifth card: More Options for What You Do */}
          {(() => {
            const section = siteContent.getPaid.sections[4];
            const imageSrc = '/images/05_more options for what you do.png';
            return (
              <div className="bg-[#e6e9ed] rounded-2xl p-8 md:p-12  flex flex-col md:flex-row items-center gap-7">
                <div className="md:w-1/2 w-full">
                  <img src={imageSrc} alt={section.headline} className="w-full h-43 object-cover rounded-2xl" />
                </div>
                <div className="md:w-1/2 w-full text-left">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-dark mb-4" style={{letterSpacing: '-0.03em'}}>{section.headline.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < section.headline.split('\n').length - 1 && <br />}</React.Fragment>))}</h3>
                  <p className="text-description mb-6 text-[#2d3440] opacity-90" >{section.description}</p>
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
            {siteContent.getPaid.cta.header}
          </h2>
          <p className="font-body text-description text-xl mb-8 text-[#e6e9ed]">
            {siteContent.getPaid.cta.subhead}
          </p>
          <Link 
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            <Button variant="primary" size="lg" className="text-primary">{siteContent.getPaid.cta.button}</Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default GetPaid;