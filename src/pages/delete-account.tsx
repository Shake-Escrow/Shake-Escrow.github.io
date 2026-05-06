import React, { useState } from 'react';
import Button from '../components/common/button';
import Section from '../components/common/section';
import { useContent } from '../hooks/useContent';

const DeleteAccount: React.FC = () => {
  const siteContent = useContent('sitecontent');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT || '', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        alert(siteContent.deleteAccount.successAlert);
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 3000);
      } else {
        console.error('Error:', data.error);
        alert(siteContent.deleteAccount.errorAlert);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(siteContent.deleteAccount.errorAlert);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.trim() !== '';

  return (
    <Section bgColor="bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl text-secondary-dark">
            {siteContent.deleteAccount.heading}
          </h1>

          <p className="font-body text-lg text-secondary">
            {siteContent.deleteAccount.description}
          </p>

          <div className="space-y-4 max-w-md mx-auto mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={siteContent.deleteAccount.emailPlaceholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body text-base"
              disabled={isSubmitted}
            />
            
            <Button 
              size="lg"
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitted || isLoading}
            >
              {isSubmitted ? siteContent.deleteAccount.submittedButton : isLoading ? siteContent.deleteAccount.processingButton : siteContent.deleteAccount.submitButton}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DeleteAccount;