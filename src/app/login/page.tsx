"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  User,
  ShieldCheck,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both administrator username and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === "dsmps" && password === "dsmps123") {
        if (typeof window !== "undefined") {
          localStorage.setItem("dsmps_admin_auth", "true");
        }
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 800);
      } else {
        setError("Invalid administrator credentials. Please check your username and password.");
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Bar */}
      <div className="bg-[#0f1f4a] text-white py-3 px-4 border-b border-blue-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" /> Back to School Website
          </Link>
          <div className="text-[11px] text-amber-300 font-semibold flex items-center gap-1.5 flex-wrap">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Govt. Recog. No.: 212115120221118160113</span>
            <span>&bull;</span>
            <span>RTE Act, 2009</span>
            <span>&bull;</span>
            <span>UDISE+: 10100106805</span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-b from-[#0f1f4a] to-[#1a3a8f] p-8 text-white text-center relative">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-amber-400 mb-4 flex items-center justify-center">
              <img src="/logo.png" alt="DSMPS Crest" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              Dr. Shyam Memorial Public School
            </h1>
            <p className="text-xs text-amber-300 font-bold mt-1 tracking-wider uppercase">
              Administrator Login Portal
            </p>
            <p className="text-[11px] text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
              Authorized access for school management, principal desk, admissions verification &amp; faculty records.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {success ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Administrator Authenticated!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Redirecting to the Administrator Control Console...
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition"
                  >
                    Open Admin Dashboard Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Administrator ID / Username *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter administrator username"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f4a] focus:border-transparent font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter administrator password"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f4a] focus:border-transparent font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#0f1f4a] hover:bg-blue-950 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {loading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 text-amber-400" /> Sign In to Admin Console
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-bit Encrypted SSL Session</span>
                  </div>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="py-4 text-center text-xs text-slate-500 border-t border-slate-200">
        &copy; {new Date().getFullYear()} Dr. Shyam Memorial Public School (DSMPS) &bull; Haflaganj, Katihar (Bihar)
      </div>

    </div>
  );
}
