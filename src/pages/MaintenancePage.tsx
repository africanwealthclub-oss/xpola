// FILE PATH: src/pages/MaintenancePage.tsx
import { useMaintenance } from '@/contexts/MaintenanceContext';

const MaintenancePage = () => {
  const { message, estimatedBack } = useMaintenance();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-[#E02020]/10 rounded-full flex items-center justify-center border border-[#E02020]/20">
              <svg className="w-12 h-12 text-[#E02020] animate-spin" style={{ animationDuration: '4s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[#E02020]/30 animate-ping" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#E02020] rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-montserrat font-extrabold text-xl text-white">Xpola Services</span>
        </div>
        <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">Under Maintenance</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">{message}</p>
        {estimatedBack && (
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3 mb-6">
            <svg className="w-4 h-4 text-[#E02020]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 text-sm font-semibold">Expected back: <span className="text-white">{estimatedBack}</span></span>
          </div>
        )}
        <div className="border-t border-white/10 my-6" />
        <p className="text-gray-500 text-sm">
          For urgent inquiries:{' '}
          <a href="mailto:info@xpolaservices.com" className="text-[#E02020] hover:text-red-400 font-semibold transition-colors">info@xpolaservices.com</a>
        </p>
        <div className="flex items-center justify-center gap-2 mt-8">
          {[0, 200, 400].map(delay => (
            <div key={delay} className="w-2 h-2 bg-[#E02020] rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;

// ─────────────────────────────────────────────────────────────────────────────
// FILE PATH: src/components/ProtectedRoute.tsx  (inline export below)
// ─────────────────────────────────────────────────────────────────────────────
