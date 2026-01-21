import React, { useState } from 'react';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';
import { FaGoogle, FaGooglePlay, FaApple } from "react-icons/fa";


const Hero: React.FC = () => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('android');
  const qrImage = platform === 'android' ? '/images/qr-android.png' : '/images/qr-ios.png';
  const appStoreLink = platform === 'android'
    ? 'https://play.google.com/store/apps/details?id=com.shakedefi.app'
    : 'https://apps.apple.com/us/app/shake-defi/id6756281576';
  const ctaLabel = 'Free Download';

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
            
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              <h3 className="font-display text-xl md:text-2xl text-secondary-dark">
                Available Now
              </h3>
              
              <div className="flex items-center space-x-16">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value="android"
                    checked={platform === 'android'}
                    onChange={() => setPlatform('android')}
                    className="w-5 h-5 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                  />
                    <FaGoogle className="text-secondary-dark text-base translate-x-[1px]" aria-hidden="true" />
                  <span className="font-body text-base text-secondary-dark">Android</span>
                </label>
                
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value="ios"
                    checked={platform === 'ios'}
                    onChange={() => setPlatform('ios')}
                    className="w-5 h-5 text-accent border-gray-300 focus:ring-accent cursor-pointer"
                  />
                    <FaApple className="text-secondary-dark text-2xl -translate-y-[2px]" aria-hidden="true" />
                  <span className="font-body text-base text-secondary-dark">iOS</span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                onClick={() => { window.location.href = appStoreLink; }}
              >
                <span className="inline-flex items-center gap-2">
                  {ctaLabel}
                  {platform === 'android' && (
                    <FaGooglePlay className="text-2xl" aria-hidden="true" />
                  )}
                </span>
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
