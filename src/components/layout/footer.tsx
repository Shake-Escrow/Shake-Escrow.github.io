import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Button from '../common/Button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#2d3440]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
          {/* First column: logo, tagline, disclaimer (left-aligned, col-span-2) */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-2">
            <img src="/images/Shake-Logo_Horizontal_Color.png" alt="Shake Logo" className="h-16 w-auto mb-2" />
            <div className="font-semibold text-lg font-body text-[#2d3440] mb-1 whitespace-nowrap text-clip overflow-hidden">Enabling crypto’s usability for everyday transactions</div>
            <div className="text-small font-body text-[#2d3440] opacity-70 mt-1">Shake Defi, Inc. is a corporation organized under the laws of the State of Wisconsin.</div>
          </div>
          {/* Second column: QR code, centered */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <img src="/images/qr-temp.png" alt="Shake QR Code" className="w-full max-w-xs h-auto aspect-square object-contain mx-auto" />
          </div>
          {/* Third column: Quick Links, button, contact, socials */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-3">
            <div>
              <div className="font-semibold text-base font-body mb-2">Quick Links</div>
              <ul className="space-y-1 mb-3">
                <li><a href="/" className="text-[#2d3440] hover:text-accent text-small font-body">Home</a></li>
                <li><a href="/how-it-works" className="text-[#2d3440] hover:text-accent text-small font-body">How it Works</a></li>
                <li><a href="/get-paid" className="text-[#2d3440] hover:text-accent text-small font-body">Get Paid</a></li>
                <li><a href="/send-payments" className="text-[#2d3440] hover:text-accent text-small font-body">Send Payments</a></li>
              </ul>
              <Button size="sm" variant="primary" className="w-full mb-4">Download Shake</Button>
            </div>
            <div>
              <div className="font-semibold text-base mb-2 mt-2">Contact Us</div>
              <div className="flex items-center space-x-2 mb-2">
                <svg width="16" height="16" fill="none" stroke="#c1e534" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5M22 6.5l-10 7L2 6.5"/></svg>
                <a href="mailto:matt.anderson@alumni.stanford.edu" className="text-[#2d3440] hover:text-accent text-small font-body">matt.anderson@alumni.stanford.edu</a>
              </div>
              <div className="flex space-x-3 mt-2">
                <a href="#" className="text-[#2d3440] hover:text-accent transition-colors font-body">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-[#2d3440] hover:text-accent transition-colors font-body">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-[#2d3440] hover:text-accent transition-colors font-body">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-[#2d3440] hover:text-accent transition-colors font-body">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-small font-body opacity-80">2025 Shake Defi, Inc.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;