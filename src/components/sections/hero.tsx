import React from 'react';
import { Bitcoin } from 'lucide-react';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';


const Hero: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            
            <h1 className="font-display text-hero text-4xl md:text-5xl lg:text-6xl text-secondary-dark leading-tight">
              {siteContent.home.hero.headline.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>{line}<br/></React.Fragment>
              ))}
            </h1>
            
            <p className="font-body text-lg md:text-xl text-secondary max-w-2xl">
              {siteContent.home.hero.subhead}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg">
                {siteContent.home.hero.button}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent to-primary-light opacity-30 rounded-full blur-lg animate-pulse-slow"></div>
              <img 
                src="/images/qr-temp.png"
                alt="Shake QR Code"
                width={280}
                height={280}
                className="animate-float shadow-[0_8px_40px_0_#c1e534] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Hero;