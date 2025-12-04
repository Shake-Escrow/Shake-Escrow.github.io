import React, { useState } from 'react';
import Button from '../components/common/button';
import Section from '../components/common/section';

const DeleteAccount: React.FC = () => {
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
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
        }, 3000);
      } else {
        console.error('Error:', data.error);
        alert('There was an error processing your request. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was an error processing your request. Please try again.');
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
            Delete Account
          </h1>
          
          <p className="font-body text-lg text-secondary">
            Enter your account email address to delete your account
          </p>
          
          <div className="space-y-4 max-w-md mx-auto mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent font-body text-base"
              disabled={isSubmitted}
            />
            
            <Button 
              size="lg"
              fullWidth
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitted || isLoading}
            >
              {isSubmitted ? 'Request Submitted' : isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default DeleteAccount;