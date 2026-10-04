import Link from "next/link";
import { ArrowLeft, Home, Phone, ShieldCheck } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Banner */}
      <div className="bg-[#0f1f4a] border-b border-blue-900/60 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-4 h-4 text-amber-400" /> Back to DSMPS Homepage
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Govt. Recog. No.: 212115120221118160113</span>
          </div>
        </div>
      </div>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-amber-400 p-2 mx-auto shadow-2xl overflow-hidden">
            <img src="/logo.png" alt="DSMPS Logo" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-2">
            <span className="text-amber-400 text-xs sm:text-sm font-black uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
              Error 404 &bull; Page Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
              Page Dhundha Nahi Gaya
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Aap jis page ko dekhna chahte hain wo ya toh hata diya gaya hai ya uska URL galat hai. Kripya mukhya page par wapas jayein.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" /> Go to Homepage
            </Link>
            <a
              href="tel:07016560240"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-400" /> Helpline: 070165 60240
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Dr. Shyam Memorial Public School &bull; Haflaganj, Katihar (Bihar)
      </footer>
    </div>
  );
}
