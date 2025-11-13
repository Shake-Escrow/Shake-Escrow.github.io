import React from 'react';
import tosContent from '../content/tos.json';

// Type definitions
interface Definition {
  term: string;
  definition: string;
}

interface Subsection {
  id: string;
  title: string;
  content?: string;
  list?: string[];
  definitions?: Definition[];
}

interface Contact {
  company: string;
  email: string;
  address: string;
}

interface Section {
  id: string;
  title: string;
  content?: string;
  subsections?: Subsection[];
  contact?: Contact;
}

const TermsOfService: React.FC = () => {
  console.log('TOS component mounted');  // Debug log
    return (
        <div className="min-h-screen bg-white py-16 px-6">
            <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-display font-black text-[#2d3440]">TEST: Terms of Service Loaded!</h1>
            <p className="text-lg text-[#2d3440]">If you see this, component + route = OK. JSON issue next.</p>
            <pre className="bg-gray-100 p-4 text-sm">{JSON.stringify(tosContent, null, 2) || 'JSON FAILED: undefined'}</pre>  // Debug JSON
            </div>
        </div>
    );
};

export default TermsOfService;