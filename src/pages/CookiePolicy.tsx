// FILE PATH: src/pages/CookiePolicy.tsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="pt-[72px] h-1 bg-[#E02020]" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-montserrat font-black text-3xl text-gray-900 mb-2">Cookie Policy</h1>
          <p className="font-poppins text-sm text-gray-400">Last updated: April 2025</p>
        </div>

        <div className="font-poppins text-gray-700 space-y-8 text-sm leading-relaxed">

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">1. What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences, keep you logged in, and understand how you use the site. Xpola Services uses cookies and similar technologies (such as localStorage) to operate our platform effectively.</p>
          </section>

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">2. Types of Cookies We Use</h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-montserrat font-bold text-gray-900 text-sm mb-1">✅ Strictly Necessary Cookies</p>
                <p className="text-xs text-gray-500 mb-2">Always active — these cannot be disabled</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>xpola_token</strong> — Stores your authentication JWT token to keep you logged in</li>
                  <li><strong>xpola_cart</strong> — Saves your shopping cart contents between sessions</li>
                  <li><strong>xpola_country</strong> — Remembers your selected storefront (Nigeria or Canada)</li>
                  <li><strong>xpola_theme</strong> — Stores your light/dark mode preference</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-montserrat font-bold text-gray-900 text-sm mb-1">📊 Analytics Cookies</p>
                <p className="text-xs text-gray-500 mb-2">Help us understand how visitors use our platform</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Page view and navigation data collected anonymously</li>
                  <li>No personally identifiable information is shared with analytics providers</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-montserrat font-bold text-gray-900 text-sm mb-1">💳 Payment Cookies</p>
                <p className="text-xs text-gray-500 mb-2">Set by our payment processors during checkout</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong>Paystack</strong> — Sets session cookies during the Nigerian payment flow</li>
                  <li><strong>Moneris</strong> — Sets session cookies during the Canadian payment flow</li>
                  <li>These cookies are temporary and expire when you close your browser</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">3. How Long Do Cookies Last?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[400px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2 font-montserrat font-bold text-gray-700 text-xs uppercase">Cookie</th>
                    <th className="text-left px-4 py-2 font-montserrat font-bold text-gray-700 text-xs uppercase">Duration</th>
                    <th className="text-left px-4 py-2 font-montserrat font-bold text-gray-700 text-xs uppercase">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['xpola_token', '7 days', 'Authentication'],
                    ['xpola_cart', 'Persistent', 'Shopping cart'],
                    ['xpola_country', 'Persistent', 'Storefront selection'],
                    ['xpola_theme', 'Persistent', 'UI theme preference'],
                    ['Payment session', 'Session', 'Checkout security'],
                  ].map(([name, duration, purpose]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-xs text-gray-700">{name}</td>
                      <td className="px-4 py-2 text-gray-600">{duration}</td>
                      <td className="px-4 py-2 text-gray-600">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">4. Managing Your Cookie Preferences</h2>
            <p className="mb-3">You can control cookies in the following ways:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cookie banner:</strong> When you first visit our site, you can accept or decline non-essential cookies using our consent banner.</li>
              <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Note that blocking strictly necessary cookies will affect platform functionality (e.g. you will not stay logged in).</li>
              <li><strong>Third-party opt-outs:</strong> For payment provider cookies, consult Paystack's and Moneris's own privacy and cookie policies.</li>
            </ul>
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
              <p><strong>Note:</strong> Disabling strictly necessary cookies (such as <code className="font-mono text-xs bg-amber-100 px-1 rounded">xpola_token</code> and <code className="font-mono text-xs bg-amber-100 px-1 rounded">xpola_cart</code>) will prevent you from staying logged in or retaining your cart between sessions.</p>
            </div>
          </section>

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">5. Changes to This Policy</h2>
            <p>We may update this Cookie Policy from time to time to reflect changes in technology or regulation. Updated versions will be posted on this page with a revised date. We recommend checking this page periodically.</p>
          </section>

          <section>
            <h2 className="font-montserrat font-bold text-lg text-gray-900 mb-3">6. Contact</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>Xpola Services</strong></p>
              <p>Email: <a href="mailto:info@xpolaservices.com" className="text-[#E02020]">info@xpolaservices.com</a></p>
              <p>Website: <a href="https://xpolaservices.com" className="text-[#E02020]">xpolaservices.com</a></p>
            </div>
          </section>

          <div className="border-t border-gray-100 pt-6 flex flex-wrap gap-4 text-sm">
            <Link to="/privacy" className="text-[#E02020] hover:underline font-semibold">Privacy Policy</Link>
            <Link to="/terms" className="text-[#E02020] hover:underline font-semibold">Terms of Service</Link>
            <Link to="/contact" className="text-[#E02020] hover:underline font-semibold">Contact Us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
