import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '@/lib/api';

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    if (!token) { setStatus('error'); setMessage('Invalid link.'); return; }

    apiFetch(`/auth.php?action=verify_email&token=${token}`)
      .then(() => { setStatus('success'); setTimeout(() => navigate('/account'), 3000); })
      .catch((e: any) => { setStatus('error'); setMessage(e.message || 'Verification failed.'); });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        {status === 'loading' && <p className="text-gray-500">Verifying your email…</p>}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="font-montserrat font-bold text-2xl text-gray-900 mb-2">Email Verified!</h1>
            <p className="text-gray-500 text-sm">Redirecting you to your account…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-montserrat font-bold text-2xl text-gray-900 mb-2">Verification Failed</h1>
            <p className="text-gray-500 text-sm mb-4">{message}</p>
            <button onClick={() => navigate('/login')} className="bg-[#E02020] text-white font-bold px-6 py-3 rounded-xl text-sm">
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}