import React, { useState } from 'react';
import { Bitcoin } from 'lucide-react';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';


const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || (!isAndroid && !isIOS)) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('https://shake-hub-eeg4gtecepcfepcm.canadacentral-01.azurewebsites.net/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          is_ios: isIOS,
          is_android: isAndroid
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
          setIsAndroid(false);
          setIsIOS(false);
        }, 3000);
      } else {
        console.error('Error:', data.error);
        alert('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && (isAndroid || isIOS);

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
                Sign up for the beta
              </h3>
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter App Store Account email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body text-base"
                disabled={isSubmitted}
              />
              
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAndroid}
                    onChange={(e) => setIsAndroid(e.target.checked)}
                    className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent cursor-pointer"
                    disabled={isSubmitted}
                  />
                  <span className="font-body text-base text-secondary-dark">Android</span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isIOS}
                    onChange={(e) => setIsIOS(e.target.checked)}
                    className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent cursor-pointer"
                    disabled={isSubmitted}
                  />
                  <span className="font-body text-base text-secondary-dark">iOS</span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                onClick={isFormValid ? handleSubmit : () => window.scrollTo({ top: 0, behavior: 'smooth' })}
                disabled={isSubmitted || isLoading}
              >
                {isSubmitted ? 'Success!' : isFormValid ? 'Submit' : siteContent.home.hero.button}
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