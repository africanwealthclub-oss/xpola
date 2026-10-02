import { Link } from 'react-router-dom';

export default function CanadaComingSoon() {
  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E02020] shadow-[0_0_50px_rgba(224,32,32,0.35)]">
          <span className="text-3xl" aria-hidden="true">🇨🇦</span>
        </div>
        <p className="mb-4 font-poppins text-xs font-bold uppercase tracking-[0.35em] text-[#E02020]">
          Canada Market
        </p>
        <h1 className="font-montserrat text-4xl font-black leading-tight sm:text-6xl">
          Coming Soon
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-poppins text-base leading-8 text-white/65 sm:text-lg">
          We are preparing the Xpola Services Canada marketplace and payment experience.
          The Canadian market will be available as soon as our payment processor is ready.
        </p>
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left">
          <p className="font-montserrat text-sm font-bold text-white">What is happening next?</p>
          <p className="mt-2 font-poppins text-sm leading-6 text-white/55">
            Our team is completing payment processing and checkout testing so the Canada launch is secure and reliable.
          </p>
        </div>
        <Link
          to="/nigeria"
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-[#E02020] px-7 py-3.5 font-montserrat text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#c01a1a]"
        >
          Continue to Nigeria Market →
        </Link>
      </div>
    </main>
  );
}
