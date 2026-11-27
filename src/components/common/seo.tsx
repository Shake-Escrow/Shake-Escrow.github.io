import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://shakedefi.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/lender-tradable-debt-note.jpg`;
const JSON_LD_SELECTOR = 'script[type="application/ld+json"][data-seo-jsonld="true"]';

export const SEO: React.FC<SEOProps> = ({ title, description, canonical, image, jsonLd }) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = /shake\s+defi/i.test(title) ? title : `${title} | Shake DeFi`;
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

    // Resolve social image URL
    const resolvedImage = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`
      : DEFAULT_IMAGE;

    // 4. Update Open Graph Meta Tags
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Shake DeFi');
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', resolvedImage);

    // 5. Update Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedImage);

    // 6. Manage JSON-LD Structured Data
    const existingJsonLd = document.querySelector(JSON_LD_SELECTOR) as HTMLScriptElement | null;
    if (jsonLd) {
      const scriptEl = existingJsonLd ?? document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-seo-jsonld', 'true');
      scriptEl.textContent = JSON.stringify(jsonLd);
      if (!existingJsonLd) {
        document.head.appendChild(scriptEl);
      }
    } else if (existingJsonLd) {
      existingJsonLd.remove();
    }

    return () => {
      const staleJsonLd = document.querySelector(JSON_LD_SELECTOR);
      if (staleJsonLd) {
        staleJsonLd.remove();
      }
    };
  }, [title, description, canonical, image, jsonLd]);

  return null;
};

export default SEO;
