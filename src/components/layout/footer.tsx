import React from 'react';
import { Link } from 'react-router-dom';
import { X, Linkedin } from 'lucide-react';
import Button from '../common/button';
import siteContent from '../../content/sitecontent.json';

type Platform = 'ios' | 'android';

interface FooterProps {
  platform?: Platform;
}

const Footer: React.FC<FooterProps> = ({ platform = 'android' }) => {
  const qrImage = platform === 'android' ? '/images/qr-android.png' : '/images/qr-ios.png';

  return (
    <footer className="bg-white text-[#2d3440]">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 items-start">
          {/* First column: logo, tagline, disclaimer (left-aligned, col-span-2) */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-2">
            <img src="/images/shake-logo_horizontal_color.png" alt="Shake Logo" className="h-16 w-auto mb-2" />
            <div className="font-semibold text-lg font-body text-[#2d3440] mb-1 break-words text-left">{siteContent.footer.tagline}</div>
            <div className="text-sm font-body text-[#2d3440] opacity-70 mt-1 text-left">{siteContent.footer.disclaimer}</div>
          </div>
          {/* Second column: QR code, centered */}
          <div className="lg:col-span-1 flex justify-center items-center">
            <img src={qrImage} alt="Shake QR Code" className="w-full max-w-xs h-auto aspect-square object-contain mx-auto" />
          </div>
          {/* Third column: Quick Links, button, contact, socials */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-3">
            <div>
              <div className="font-semibold text-base font-body mb-2">{siteContent.footer.quickLinksLabel}</div>
              <ul className="space-y-1 mb-3">
                {siteContent.footer.quickLinks.map((link: {label: string, url: string}, idx: number) => (
                  <li key={idx}>
                    {link.url.endsWith('.pdf') ? (
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#2d3440] hover:text-accent text-sm font-body">{link.label}</a>
                    ) : (
                      <Link to={link.url} className="text-[#2d3440] hover:text-accent text-sm font-body">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Button size="sm" variant="primary" className="w-full mb-4">{siteContent.footer.button}</Button>
              </Link>
            </div>
            <div>
              <div className="font-semibold text-base mb-2 mt-2">{siteContent.footer.contactLabel}</div>
              <div className="flex items-center space-x-2 mb-2">
                <svg width="16" height="16" fill="none" stroke="#c1e534" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6.5V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.5M22 6.5l-10 7L2 6.5"/></svg>
                <a href={`mailto:${siteContent.footer.contactEmail}`} className="text-[#2d3440] hover:text-accent text-sm font-body">{siteContent.footer.contactEmail}</a>
              </div>
              <div className="flex space-x-3 mt-2">
                <a href="https://x.com/shakedefi" className="text-[#2d3440] hover:text-accent transition-colors font-body">
                  <X size={20} />
                </a>
                <a href="https://www.linkedin.com/in/matt-anderson-30463732/" className="text-[#2d3440] hover:text-accent transition-colors font-body" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://shakedefi.substack.com/p/the-activation-energy-of-money" className="text-[#FF6719] hover:text-accent transition-colors font-body" target="_blank" rel="noopener noreferrer">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" aria-label="Substack">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-body opacity-80">{siteContent.footer.copyright}</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0 pr-20 sm:pr-24">
            <Link
              to="/privacy-policy"
              className="text-sm font-body text-[#2d3440] hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-sm text-gray-400 select-none">|</span>
            <Link
              to="/end-user-license-agreement"
              className="text-sm font-body text-[#2d3440] hover:text-accent transition-colors"
            >
              End User License Agreement
            </Link>
            <span className="text-sm text-gray-400 select-none">|</span>
            <Link
              to="/terms-of-service"
              className="text-sm font-body text-[#2d3440] hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
