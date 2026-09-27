// src/hooks/usePageMeta.ts — Dynamic <title> + meta description (NEW)
//
// Usage:
//   usePageMeta('Shop | Xpola Nigeria', 'Industrial PPE and construction...')
//   usePageMeta(`${product.name} — ₦${product.price.toLocaleString()} | Xpola`)
//
// Automatically resets to default on unmount.

import { useEffect } from 'react';

const DEFAULT_TITLE       = 'Xpola Services — Nigeria & Canada';
const DEFAULT_DESCRIPTION = 'Xpola Services delivers industrial, commercial and logistics solutions across Nigeria and Canada.';

export function usePageMeta(title?: string, description?: string): void {
  useEffect(() => {
    // Set title
    const prev = document.title;
    document.title = title ? `${title} | Xpola Services` : DEFAULT_TITLE;

    // Set meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = description ?? DEFAULT_DESCRIPTION;

    // Set OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title ?? DEFAULT_TITLE;

    // Set OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description ?? DEFAULT_DESCRIPTION;

    return () => {
      document.title = prev;
      if (metaDesc) metaDesc.content = prevDesc;
    };
  }, [title, description]);
}

// ── Preset helpers ────────────────────────────────────────────────────────────
export const pageMeta = {
  home: (country: string) => ({
    title:       `${country === 'canada' ? 'Canada' : 'Nigeria'} Industrial & Commercial Solutions`,
    description: `Xpola Services provides industrial, logistics and commerce solutions across ${country === 'canada' ? 'Canada' : 'Nigeria'}. Browse our product catalogue and services.`,
  }),
  shop: (country: string) => ({
    title:       `Shop — ${country === 'canada' ? 'Canada' : 'Nigeria'} Industrial Supplies`,
    description: `Browse certified industrial, construction and commercial products for ${country === 'canada' ? 'Canadian' : 'Nigerian'} businesses.`,
  }),
  product: (name: string, price: number, currency: 'NGN' | 'CAD') => ({
    title:       name,
    description: `Buy ${name} at ${currency === 'NGN' ? '₦' : 'CA$'}${price.toLocaleString()}. Certified industrial and commercial supplies from Xpola Services.`,
  }),
  about:    { title: 'About Us',    description: 'Learn about Xpola Services and our mission across Nigeria and Canada.' },
  contact:  { title: 'Contact Us', description: 'Get in touch with Xpola Services for enquiries, partnerships and support.' },
  services: { title: 'Our Services', description: 'Explore Xpola\'s consulting, logistics, oil & gas, construction and more.' },
  account:  { title: 'My Account', description: 'Manage your Xpola orders, profile and saved addresses.' },
  login:    { title: 'Sign In',    description: 'Sign in or create your Xpola Services account.' },
  checkout: { title: 'Checkout',   description: 'Complete your Xpola order securely.' },
};
