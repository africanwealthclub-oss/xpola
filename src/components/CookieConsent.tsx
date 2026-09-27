// FILE PATH: src/components/CookieConsent.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'xpola_cookie_consent';

type ConsentState = 'accepted' | 'declined' | null;

export default function CookieConsent() {
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so the page loads before banner appears
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (decision: ConsentState) => {
    localStorage.setItem(CONSENT_KEY, decision ?? 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] p-3 sm:p-4"
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Red top accent */}
        <div className="h-1 bg-[#E02020]" />

        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#E02020]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-montserrat font-bold text-gray-900 text-sm">We use cookies</p>
              <p className="font-poppins text-xs text-gray-500 mt-1 leading-relaxed">
                We use essential cookies to keep you logged in and save your cart. With your consent, we also use analytics cookies to improve your experience.
                {' '}<Link to="/cookies" className="text-[#E02020] hover:underline">Cookie Policy</Link>
                {' '}·{' '}
                <Link to="/privacy" className="text-[#E02020] hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>

          {/* Expandable details */}
          {expanded && (
            <div className="mb-4 bg-gray-50 rounded-xl p-4 space-y-3 text-xs font-poppins">
              <div>
                <p className="font-bold text-gray-800 mb-1">✅ Strictly Necessary (always on)</p>
                <p className="text-gray-500">Authentication, shopping cart, country selection, theme — the platform cannot function without these.</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">📊 Analytics (optional)</p>
                <p className="text-gray-500">Anonymous data about how you navigate our platform, used to improve your experience. No personal data shared.</p>
              </div>
              <div>
                <p className="font-bold text-gray-800 mb-1">💳 Payment (session only)</p>
                <p className="text-gray-500">Temporary cookies set by Paystack and Moneris during checkout. Expire when you close your browser.</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setExpanded(e => !e)}
            className="font-poppins text-xs text-gray-400 hover:text-gray-600 transition-colors mb-4 flex items-center gap-1"
          >
            <svg className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {expanded ? 'Hide details' : 'Show cookie details'}
          </button>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => save('accepted')}
              className="flex-1 bg-[#E02020] text-white font-montserrat font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-[#c01a1a] transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => save('declined')}
              className="flex-1 bg-gray-100 text-gray-700 font-montserrat font-bold py-2.5 px-4 rounded-xl text-sm hover:bg-gray-200 transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
