import React, { useState } from 'react';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';


const Hero: React.FC = () => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const qrImage = platform === 'android' ? '/images/qr-android.png' : '/images/qr-ios.png';
  const betaLink = platform === 'android'
    ? 'https://play.google.com/store/apps/details?id=com.shakedefi.app'
    : 'https://testflight.apple.com/join/QZNF6n42';

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
            
            {/* Beta Signup Form */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              <h3 className="font-display text-xl md:text-2xl text-secondary-dark">
                Join the beta
              </h3>
              
              <div className="flex items-center space-x-10">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value="android"
                    checked={platform === 'android'}
                    onChange={() => setPlatform('android')}
                    className="w-5 h-5 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                  />
                  <span className="font-body text-base text-secondary-dark">Android</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value="ios"
                    checked={platform === 'ios'}
                    onChange={() => setPlatform('ios')}
                    className="w-5 h-5 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                  />
                  <span className="font-body text-base text-secondary-dark">Apple iOS</span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                onClick={() => { window.location.href = betaLink; }}
              >
                Beta available now
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent to-primary-light opacity-30 rounded-full blur-lg animate-pulse-slow"></div>
              <img 
                src={qrImage}
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
