"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Sparkles
} from "lucide-react";

export default function DeveloperLoginPage() {
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
      setError("Kripya apna Developer Username aur Password dalein.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const u = username.trim().toLowerCase();
      const p = password.trim();

      if ((u === "anand" && p === "anand123") || (u === "developer" && p === "dev123")) {
        if (typeof window !== "undefined") {
          localStorage.setItem("dsmps_dev_auth", "true");
        }
        setSuccess(true);
        setTimeout(() => {
          window.location.href = "/developer";
        }, 600);
      } else {
        setError("Invalid Developer Credentials. Please check your username and password.");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1128] to-slate-900 text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <div className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md py-3.5 px-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition"
          >
            <ArrowLeft className="h-4 w-4" /> DSMPS Public Website
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Console v2.5</span>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Accent Header */}
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 p-6 text-slate-950 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-16 w-16 rounded-2xl bg-slate-950/90 text-amber-400 flex items-center justify-center shadow-lg mb-3 border border-amber-400/40">
                <Code2 className="h-9 w-9 stroke-[2.2]" />
              </div>
              <h1 className="text-xl font-black uppercase tracking-wider text-slate-950">
                Developer Studio
              </h1>
              <p className="text-xs font-bold text-slate-900/90 tracking-wide mt-0.5">
                Lead Architect: <span className="underline decoration-slate-950 font-black">Anand Kr. Mandal</span>
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-950/20 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                <Cpu className="w-3 h-3" /> Zero-Code Live Component Editor
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <span>Secure Console Login</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yahan se aap website ke sabhi components, texts, photos, hero banners aur sections bina coding ke live customize kar sakte hain.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-300 text-xs animate-shake">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verification Successful! Launching Component Studio...</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Developer ID / Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter developer ID (e.g. anand)"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-950/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter developer password"
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-950/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Component Studio</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick credentials hint for developer */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Access Info:</span>
              </div>
              <p>Username: <code className="text-slate-200 font-mono">anand</code> &bull; Password: <code className="text-slate-200 font-mono">anand123</code></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          Dr. Shyam Memorial Public School &bull; Engineered by <span className="text-amber-400 font-medium">Anand Kr. Mandal</span>
        </p>
      </footer>
    </div>
  );
}
