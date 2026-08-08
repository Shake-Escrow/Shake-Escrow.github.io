import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

const SITE_URL = 'https://shakedefi.com';

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes('Shake Defi') ? title : `${title} | Shake Defi`;
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);

    // 3. Update Canonical Tag
    const canonicalUrl = canonical
      ? canonical.startsWith('http')
        ? canonical
        : `${SITE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`
      : SITE_URL;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph Meta Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  }, [title, description, canonical]);

  return null;
};

export default SEO;
