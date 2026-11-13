import { useEffect } from 'react';

const DEFAULT_TITLE = 'CONFLUENCE 2026 | Seth GS Medical College & KEM Hospital, Mumbai';
const DEFAULT_DESC = 'Official website of CONFLUENCE 2026, the premier international undergraduate medical conference organized by Seth GS Medical College & KEM Hospital, Mumbai. Explore scientific events, workshops, CME, and registration details.';
const DEFAULT_KEYWORDS = 'Confluence GSMC, Confluence GSMC Mumbai, GSMC Events, College Events Mumbai, Student Events Mumbai, Technical Events Mumbai, Cultural Events Mumbai, College Fest Mumbai, Student Community Events, GSMC College Events, Seth GS Medical College, KEM Hospital Mumbai';
const BASE_URL = 'https://confluencegsmc.in';
const DEFAULT_OG_IMAGE = 'https://confluencegsmc.in/confluence_full.png';

/**
 * Lightweight, zero-dependency Head & SEO manager.
 * Updates document.title, canonical URL, meta tags, OpenGraph, Twitter cards, and Schema.org JSON-LD.
 */
export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData,
}) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title.includes('CONFLUENCE') ? title : `${title} | CONFLUENCE 2026`;

    // 2. Helper to set or create meta tags
    const setMeta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 3. Helper to set or create link tags (e.g. canonical)
    const setLink = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // Standard Meta
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // Canonical Link
    const fullCanonical = canonicalUrl || `${BASE_URL}${window.location.pathname}`;
    setLink('canonical', fullCanonical);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'CONFLUENCE 2026');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // Structured Data (Schema.org JSON-LD)
    let scriptTag = document.getElementById('seo-structured-data');
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'seo-structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, noIndex, structuredData]);

  return null;
}
