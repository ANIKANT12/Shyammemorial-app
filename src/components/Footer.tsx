import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, Heart, Code } from "lucide-react";

export default function InstitutionalFooter() {
  return (
    <footer className="border-t-3 border-amber-500 bg-[#0a1128] text-slate-300 py-10 px-4 font-sans mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs border-b border-slate-800 pb-8">
          {/* Brand & Crest */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white border border-amber-400 shadow-sm shrink-0 flex items-center justify-center overflow-hidden p-1">
                <img src="/logo.png" alt="DSMPS Crest" className="h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight uppercase leading-tight">
                  Dr. Shyam Memorial Public School
                </h3>
                <p className="text-[11px] text-amber-400 font-medium">
                  Motto: &ldquo;Enlightening Lives&rdquo; &bull; Est. Haflaganj, Katihar
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Recognized by <strong>District Education Office, Katihar, Education Department, Government of Bihar</strong> under the <strong>Right to Education (RTE) Act, 2009</strong>. Imparting holistic education and CBSE pattern instruction from Nursery to Class 10th.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                Recog. No.: 212115120221118160113
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-slate-700 font-mono">
                UDISE+: 10100106805
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                Govt. of Bihar &bull; RTE Recognized
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-violet-300 border border-slate-700">
                Session 2026&ndash;27
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Administrative Access
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="#admissions" className="text-amber-300 font-semibold hover:text-amber-200 transition-colors">
                  &bull; Online Admission 2026–27
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors font-medium">
                  &bull; Administrator Login
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-white transition-colors">
                  &bull; Campus Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="#academics" className="hover:text-white transition-colors">
                  &bull; Curriculum &amp; Academics
                </Link>
              </li>
            </ul>
          </div>

          {/* Statutory Address & Help */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-amber-400">
              Campus &amp; Regulatory
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Haflaganj, Block Katihar, Bihar &ndash; 854103</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:7016560240" className="hover:text-white font-mono">
                  +91 70165 60240
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>principal@dsmps.edu.in</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Headmaster: <span className="text-slate-300 font-medium">Smt. Mamta Verma</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Dr. Shyam Memorial Public School (DSMPS). All rights reserved.
          </p>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <p className="flex items-center justify-center gap-1.5 text-slate-400">
              <span>Developer Name &ndash;</span>
              <span className="text-amber-400 font-semibold">Anand Kr. Mandal</span>
            </p>
            <Link
              href="/developer/login"
              className="inline-flex items-center gap-1 text-[11px] text-amber-400/90 hover:text-amber-300 font-medium underline underline-offset-2 transition"
            >
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>Developer Login &bull; Component Studio &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
