"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Save,
  CheckCircle2,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  Eye,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Building,
  School,
  Award,
  Users,
  Megaphone,
  Calendar,
  Layers,
  Sparkles,
  HelpCircle,
  FileDown,
  FileUp,
  LogOut,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  Camera,
  Star
} from "lucide-react";
import {
  CmsSiteData,
  DEFAULT_CMS_DATA,
  getCmsData,
  saveCmsData,
  resetCmsDataToDefaults,
  HeroSlideItem,
  ActivityEventAlbum,
  NoticeItem,
  StaffMeetingItem,
  AcademicWingConfig,
  FacilityItemConfig,
  generateNextRefNo
} from "@/lib/cms-store";

export default function DeveloperComponentStudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cmsData, setCmsData] = useState<CmsSiteData>(DEFAULT_CMS_DATA);
  const [activeTab, setActiveTab] = useState<
    | "identity"
    | "hero"
    | "stats"
    | "leadership"
    | "activities"
    | "notices"
    | "ticker"
    | "meetings"
    | "academics"
    | "facilities"
    | "backup"
  >("identity");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [tickerInput, setTickerInput] = useState("");

  // Check developer authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("dsmps_dev_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        setCmsData(getCmsData());
      } else {
        setIsAuthenticated(false);
        window.location.href = "/developer/login";
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveAll = () => {
    saveCmsData(cmsData);
    showToast("✅ Sabhi component changes live website pe instantly publish ho gaye!");
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("dsmps_dev_auth");
      window.location.href = "/developer/login";
    }
  };

  // Helper for image upload to base64
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying Developer Authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border-2 border-white">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Developer Master Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-black">
              <Code2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  DSMPS Component Studio
                </h1>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-bold">
                  Zero-Code Live Editor
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Authorized Developer: <strong className="text-amber-400">Anand Kr. Mandal</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Live Site</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition cursor-pointer transform active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Publish Live</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold border border-red-800/40 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto border-t border-slate-800/80 scrollbar-none">
          <div className="flex gap-1 py-1.5 text-xs font-medium whitespace-nowrap">
            {[
              { id: "identity", label: "🏛️ School Identity", icon: School },
              { id: "hero", label: "🖼️ Hero Carousel", icon: ImageIcon },
              { id: "stats", label: "📊 Stats Counter", icon: Award },
              { id: "leadership", label: "🎖️ Leadership Desks", icon: ShieldCheck },
              { id: "activities", label: "📷 Day-to-Day Events", icon: Camera },
              { id: "ticker", label: "⚡ Top Live Marquee", icon: Sparkles },
              { id: "notices", label: "📢 Public Notices", icon: Megaphone },
              { id: "meetings", label: "👥 Staff Meetings", icon: Calendar },
              { id: "academics", label: "🎓 Academic Wings", icon: BookOpen },
              { id: "facilities", label: "🏫 Campus Facilities", icon: Building },
              { id: "backup", label: "💾 Backup & Reset", icon: RotateCcw }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: SCHOOL IDENTITY & BRAND HEADER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "identity" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <School className="w-5 h-5 text-amber-400" />
                <span>School Brand, Registration &amp; Accreditation Details</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Yahan ki details seedha top utility bar, main brand header aur footer me live change hongi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  School Name (Institutional Title)
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.name}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, name: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.tagline}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, tagline: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Govt. Recognition Authority &amp; RTE Details
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.recognitionText}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, recognitionText: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-400 mb-1.5">
                  Govt. Recognition No.
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.recognitionNo}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, recognitionNo: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  UDISE+ School Code
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.udiseNo}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, udiseNo: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Admission Helpline Phone
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.helplinePhone}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, helplinePhone: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.email}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, email: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Office Working Hours / Timings
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.officeTimings}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, officeTimings: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Campus Address / Location
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.location}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, location: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Top Header CTA Button Text
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.admissionCtaLabel}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, admissionCtaLabel: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Top Header CTA Sub-text
                </label>
                <input
                  type="text"
                  value={cmsData.schoolIdentity.admissionSubtext}
                  onChange={(e) =>
                    setCmsData({
                      ...cmsData,
                      schoolIdentity: { ...cmsData.schoolIdentity, admissionSubtext: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Identity Changes
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: HERO CAROUSEL SLIDES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "hero" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-400" />
                  <span>Main Hero Carousel Slides ({cmsData.heroSlides.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Website ke sabse top banner par chalne wale slides ko customize ya naye slides add karein.
                </p>
              </div>
              <button
                onClick={() => {
                  const newSlide: HeroSlideItem = {
                    id: `slide-custom-${Date.now()}`,
                    headline: "New Announcement or Event Headline",
                    subline: "Description of the campus event, academics, or celebrations.",
                    imageUrl: "/photos/IMG_20230815_112245.jpg",
                    ctaLabel: "Apply for Admission 2026–27",
                    ctaHref: "#admissions",
                    badgeText: "Campus Highlight • Session 2026–27",
                    orderIndex: cmsData.heroSlides.length + 1,
                    active: true
                  };
                  setCmsData({
                    ...cmsData,
                    heroSlides: [...cmsData.heroSlides, newSlide]
                  });
                  showToast("New Hero Slide added! Don't forget to click 'Save & Publish Live'.");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add New Hero Slide
              </button>
            </div>

            <div className="space-y-6">
              {cmsData.heroSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                      Slide #{idx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={slide.active}
                          onChange={(e) => {
                            const updated = [...cmsData.heroSlides];
                            updated[idx].active = e.target.checked;
                            setCmsData({ ...cmsData, heroSlides: updated });
                          }}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                        <span>Active</span>
                      </label>
                      <button
                        onClick={() => {
                          if (cmsData.heroSlides.length <= 1) {
                            alert("Kam se kam ek hero slide hona anivarya hai.");
                            return;
                          }
                          const updated = cmsData.heroSlides.filter((_, i) => i !== idx);
                          setCmsData({ ...cmsData, heroSlides: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1 transition"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Image Preview & Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-300">
                        Slide Image
                      </label>
                      <div className="h-36 rounded-xl border border-slate-800 overflow-hidden bg-slate-900 relative group">
                        <img
                          src={slide.imageUrl}
                          alt="Hero slide preview"
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-amber-400 font-bold cursor-pointer transition">
                          <Upload className="w-5 h-5 mb-1" />
                          <span>Change Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (base64) => {
                                const updated = [...cmsData.heroSlides];
                                updated[idx].imageUrl = base64;
                                setCmsData({ ...cmsData, heroSlides: updated });
                              })
                            }
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={slide.imageUrl}
                        placeholder="Image URL or path"
                        onChange={(e) => {
                          const updated = [...cmsData.heroSlides];
                          updated[idx].imageUrl = e.target.value;
                          setCmsData({ ...cmsData, heroSlides: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono"
                      />
                    </div>

                    {/* Texts */}
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Badge Label (Pill text)
                        </label>
                        <input
                          type="text"
                          value={slide.badgeText}
                          onChange={(e) => {
                            const updated = [...cmsData.heroSlides];
                            updated[idx].badgeText = e.target.value;
                            setCmsData({ ...cmsData, heroSlides: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Slide Main Headline
                        </label>
                        <input
                          type="text"
                          value={slide.headline}
                          onChange={(e) => {
                            const updated = [...cmsData.heroSlides];
                            updated[idx].headline = e.target.value;
                            setCmsData({ ...cmsData, heroSlides: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Subline / Description
                        </label>
                        <textarea
                          rows={2}
                          value={slide.subline}
                          onChange={(e) => {
                            const updated = [...cmsData.heroSlides];
                            updated[idx].subline = e.target.value;
                            setCmsData({ ...cmsData, heroSlides: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Button Label (CTA)
                          </label>
                          <input
                            type="text"
                            value={slide.ctaLabel}
                            onChange={(e) => {
                              const updated = [...cmsData.heroSlides];
                              updated[idx].ctaLabel = e.target.value;
                              setCmsData({ ...cmsData, heroSlides: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Button Link (Href)
                          </label>
                          <input
                            type="text"
                            value={slide.ctaHref}
                            onChange={(e) => {
                              const updated = [...cmsData.heroSlides];
                              updated[idx].ctaHref = e.target.value;
                              setCmsData({ ...cmsData, heroSlides: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Slides Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: STATS COUNTER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "stats" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Home Page Stats Counter Metrics</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hero slider ke theek niche aane wale 4 key counter numbers ko yahan se badle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat 1: Students */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase">Stat 1: Active Scholars</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Value (e.g. 212+)</label>
                  <input
                    type="text"
                    value={cmsData.stats.students.value}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          students: { ...cmsData.stats.students, value: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-300 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Label Text</label>
                  <input
                    type="text"
                    value={cmsData.stats.students.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          students: { ...cmsData.stats.students, label: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              {/* Stat 2: Faculty */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Stat 2: Faculty Members</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Value (e.g. 24+)</label>
                  <input
                    type="text"
                    value={cmsData.stats.faculty.value}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          faculty: { ...cmsData.stats.faculty, value: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-emerald-300 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Label Text</label>
                  <input
                    type="text"
                    value={cmsData.stats.faculty.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          faculty: { ...cmsData.stats.faculty, label: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              {/* Stat 3: Heritage */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase">Stat 3: Years Heritage</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Value (e.g. 10+)</label>
                  <input
                    type="text"
                    value={cmsData.stats.heritage.value}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          heritage: { ...cmsData.stats.heritage, value: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sky-300 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Label Text</label>
                  <input
                    type="text"
                    value={cmsData.stats.heritage.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          heritage: { ...cmsData.stats.heritage, label: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              {/* Stat 4: Curriculum */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-violet-400 uppercase">Stat 4: Standard Curriculum</span>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Value (e.g. 100%)</label>
                  <input
                    type="text"
                    value={cmsData.stats.curriculum.value}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          curriculum: { ...cmsData.stats.curriculum, value: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-violet-300 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Label Text</label>
                  <input
                    type="text"
                    value={cmsData.stats.curriculum.label}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        stats: {
                          ...cmsData.stats,
                          curriculum: { ...cmsData.stats.curriculum, label: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Stats Counter
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: LEADERSHIP DESKS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "leadership" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Leadership Desks: Chairman &amp; Principal Messages</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Col. Uday Shankar Verma (Chairman) aur Smt. Mamta Verma (Principal) ke quotes, messages aur photos customize karein.
              </p>
            </div>

            {/* Chairman Desk */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  Founder &amp; Chairman Desk (Col. Uday Shankar Verma)
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Army Veteran
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">Chairman Portrait Photo</label>
                  <div className="h-44 rounded-2xl border-2 border-amber-400/40 overflow-hidden bg-slate-900 relative group">
                    <img
                      src={cmsData.leadership.chairman.photoUrl || "/photos/chairman-col-uday-shankar-verma.jpg"}
                      alt="Chairman"
                      className="w-full h-full object-cover object-top"
                    />
                    <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-amber-400 font-bold cursor-pointer transition">
                      <Upload className="w-5 h-5 mb-1" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (base64) => {
                            setCmsData({
                              ...cmsData,
                              leadership: {
                                ...cmsData.leadership,
                                chairman: { ...cmsData.leadership.chairman, photoUrl: base64 }
                              }
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={cmsData.leadership.chairman.photoUrl}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        leadership: {
                          ...cmsData.leadership,
                          chairman: { ...cmsData.leadership.chairman, photoUrl: e.target.value }
                        }
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    placeholder="Photo URL"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={cmsData.leadership.chairman.name}
                        onChange={(e) =>
                          setCmsData({
                            ...cmsData,
                            leadership: {
                              ...cmsData.leadership,
                              chairman: { ...cmsData.leadership.chairman, name: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Designation</label>
                      <input
                        type="text"
                        value={cmsData.leadership.chairman.title}
                        onChange={(e) =>
                          setCmsData({
                            ...cmsData,
                            leadership: {
                              ...cmsData.leadership,
                              chairman: { ...cmsData.leadership.chairman, title: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Key Quote</label>
                    <textarea
                      rows={2}
                      value={cmsData.leadership.chairman.quote}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, quote: e.target.value }
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Vision Message</label>
                    <textarea
                      rows={3}
                      value={cmsData.leadership.chairman.fullMessage}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, fullMessage: e.target.value }
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Principal Desk */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Principal Desk (Smt. Mamta Verma)
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Pedagogical Leadership
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-300">Principal Photo</label>
                  <div className="h-44 rounded-2xl border-2 border-emerald-400/40 overflow-hidden bg-slate-900 relative group">
                    <img
                      src={cmsData.leadership.principal.photoUrl || "/photos/headmaster-mamta-verma.jpg"}
                      alt="Principal"
                      className="w-full h-full object-cover object-top"
                    />
                    <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-emerald-400 font-bold cursor-pointer transition">
                      <Upload className="w-5 h-5 mb-1" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (base64) => {
                            setCmsData({
                              ...cmsData,
                              leadership: {
                                ...cmsData.leadership,
                                principal: { ...cmsData.leadership.principal, photoUrl: base64 }
                              }
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={cmsData.leadership.principal.photoUrl}
                    onChange={(e) =>
                      setCmsData({
                        ...cmsData,
                        leadership: {
                          ...cmsData.leadership,
                          principal: { ...cmsData.leadership.principal, photoUrl: e.target.value }
                        }
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    placeholder="Photo URL"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={cmsData.leadership.principal.name}
                        onChange={(e) =>
                          setCmsData({
                            ...cmsData,
                            leadership: {
                              ...cmsData.leadership,
                              principal: { ...cmsData.leadership.principal, name: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Credentials</label>
                      <input
                        type="text"
                        value={cmsData.leadership.principal.title}
                        onChange={(e) =>
                          setCmsData({
                            ...cmsData,
                            leadership: {
                              ...cmsData.leadership,
                              principal: { ...cmsData.leadership.principal, title: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Key Quote</label>
                    <textarea
                      rows={2}
                      value={cmsData.leadership.principal.quote}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, quote: e.target.value }
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Welcome Message</label>
                    <textarea
                      rows={3}
                      value={cmsData.leadership.principal.fullMessage}
                      onChange={(e) =>
                        setCmsData({
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, fullMessage: e.target.value }
                          }
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Leadership Desks
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: DAY-TO-DAY ACTIVITIES & ALBUMS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "activities" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" />
                  <span>Day-to-Day Activity Albums ({cmsData.activityAlbums.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Har event me multiple photos dalein, cover choose karein, aur <strong className="text-amber-400">"Feature on Top Hero Banner"</strong> tick karke main slider par dikhayein!
                </p>
              </div>

              <button
                onClick={() => {
                  const newAlbum: ActivityEventAlbum = {
                    id: `event-${Date.now()}`,
                    title: "New Campus Event / Assembly",
                    category: "Campus Life",
                    date: "Today",
                    location: "Haflaganj Campus",
                    participants: "All Students & Staff",
                    coverImage: "/photos/IMG_20230815_112245.jpg",
                    photoCount: 1,
                    photos: [
                      {
                        url: "/photos/IMG_20230815_112245.jpg",
                        caption: "Event photo 1"
                      }
                    ],
                    summary: "Brief event overview.",
                    fullStory: "Comprehensive chronicle of the event program, speeches, and outcomes.",
                    highlights: ["Disciplined student gathering", "Faculty coordination"],
                    featuredInHero: false
                  };
                  setCmsData({
                    ...cmsData,
                    activityAlbums: [newAlbum, ...cmsData.activityAlbums]
                  });
                  showToast("Naya Event add ho gaya! Details bhar ke Save karein.");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add New Event / Album
              </button>
            </div>

            <div className="space-y-6">
              {cmsData.activityAlbums.map((album, aIdx) => (
                <div
                  key={album.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                        Album #{aIdx + 1}
                      </span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                        {album.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Top Hero Banner Toggle Checkbox */}
                      <label className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 cursor-pointer hover:bg-amber-500/20 transition">
                        <input
                          type="checkbox"
                          checked={album.featuredInHero || false}
                          onChange={(e) => {
                            const updated = [...cmsData.activityAlbums];
                            updated[aIdx].featuredInHero = e.target.checked;
                            setCmsData({ ...cmsData, activityAlbums: updated });
                          }}
                          className="rounded text-amber-500 focus:ring-0 w-4 h-4"
                        />
                        <span>⭐ Feature on Main Top Slide (Hero Banner)</span>
                      </label>

                      <button
                        onClick={() => {
                          const updated = cmsData.activityAlbums.filter((_, i) => i !== aIdx);
                          setCmsData({ ...cmsData, activityAlbums: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Album"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Cover Preview & Upload */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-300">
                        Album Cover Photo
                      </label>
                      <div className="h-40 rounded-xl border border-slate-800 overflow-hidden bg-slate-900 relative group">
                        <img
                          src={album.coverImage}
                          alt={album.title}
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-xs text-amber-400 font-bold cursor-pointer transition">
                          <Upload className="w-5 h-5 mb-1" />
                          <span>Change Cover</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (base64) => {
                                const updated = [...cmsData.activityAlbums];
                                updated[aIdx].coverImage = base64;
                                setCmsData({ ...cmsData, activityAlbums: updated });
                              })
                            }
                          />
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {album.photos?.length || 1} photo(s) in this album
                      </p>
                    </div>

                    {/* Album Info */}
                    <div className="md:col-span-2 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={album.title}
                          onChange={(e) => {
                            const updated = [...cmsData.activityAlbums];
                            updated[aIdx].title = e.target.value;
                            setCmsData({ ...cmsData, activityAlbums: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Category
                          </label>
                          <select
                            value={album.category}
                            onChange={(e) => {
                              const updated = [...cmsData.activityAlbums];
                              updated[aIdx].category = e.target.value as any;
                              setCmsData({ ...cmsData, activityAlbums: updated });
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                          >
                            <option value="National Festivals">National Festivals</option>
                            <option value="Assemblies">Assemblies</option>
                            <option value="Cultural & Arts">Cultural &amp; Arts</option>
                            <option value="Academic & Labs">Academic &amp; Labs</option>
                            <option value="Campus Life">Campus Life</option>
                            <option value="Sports & Athletics">Sports &amp; Athletics</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Date
                          </label>
                          <input
                            type="text"
                            value={album.date}
                            onChange={(e) => {
                              const updated = [...cmsData.activityAlbums];
                              updated[aIdx].date = e.target.value;
                              setCmsData({ ...cmsData, activityAlbums: updated });
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={album.location}
                            onChange={(e) => {
                              const updated = [...cmsData.activityAlbums];
                              updated[aIdx].location = e.target.value;
                              setCmsData({ ...cmsData, activityAlbums: updated });
                            }}
                            className="w-full px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Short Summary
                        </label>
                        <textarea
                          rows={2}
                          value={album.summary}
                          onChange={(e) => {
                            const updated = [...cmsData.activityAlbums];
                            updated[aIdx].summary = e.target.value;
                            setCmsData({ ...cmsData, activityAlbums: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Album Gallery Photos list */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>All Photos in this Album ({album.photos?.length || 0})</span>
                      </span>
                      <label className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Photo to Album</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (base64) => {
                              const updated = [...cmsData.activityAlbums];
                              const newPhoto = { url: base64, caption: `${album.title} photo` };
                              updated[aIdx].photos = [...(updated[aIdx].photos || []), newPhoto];
                              updated[aIdx].photoCount = updated[aIdx].photos.length;
                              setCmsData({ ...cmsData, activityAlbums: updated });
                            })
                          }
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {(album.photos || []).map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="h-24 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden relative group"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-1 gap-1 text-[10px] text-white transition">
                            <button
                              onClick={() => {
                                const updated = [...cmsData.activityAlbums];
                                updated[aIdx].coverImage = photo.url;
                                setCmsData({ ...cmsData, activityAlbums: updated });
                                showToast("Is photo ko album cover set kar diya!");
                              }}
                              className="px-2 py-0.5 bg-amber-500 text-slate-950 rounded font-bold"
                            >
                              Make Cover
                            </button>
                            <button
                              onClick={() => {
                                const updated = [...cmsData.activityAlbums];
                                updated[aIdx].photos = updated[aIdx].photos.filter((_, i) => i !== pIdx);
                                updated[aIdx].photoCount = updated[aIdx].photos.length;
                                setCmsData({ ...cmsData, activityAlbums: updated });
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Albums Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: TOP RUNNING MARQUEE TICKER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "ticker" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Top Running Marquee Ticker ({cmsData.tickerAnnouncements.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Website ke top par dheere-dheere scroll karne wali announcements. Yahan naye items add ya remove karein.
              </p>
            </div>

            {/* Add new ticker input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={tickerInput}
                onChange={(e) => setTickerInput(e.target.value)}
                placeholder="Enter new scrolling announcement (e.g. ⭐ Admissions Open for 2026–27...)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => {
                  if (!tickerInput.trim()) return;
                  setCmsData({
                    ...cmsData,
                    tickerAnnouncements: [...cmsData.tickerAnnouncements, tickerInput.trim()]
                  });
                  setTickerInput("");
                  showToast("New ticker announcement added!");
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {cmsData.tickerAnnouncements.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-mono font-bold text-amber-400/80 w-6">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...cmsData.tickerAnnouncements];
                        updated[idx] = e.target.value;
                        setCmsData({ ...cmsData, tickerAnnouncements: updated });
                      }}
                      className="flex-1 bg-transparent text-xs text-white border-b border-transparent focus:border-amber-400 focus:outline-none py-1"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const updated = cmsData.tickerAnnouncements.filter((_, i) => i !== idx);
                      setCmsData({ ...cmsData, tickerAnnouncements: updated });
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Ticker Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: PUBLIC NOTICES & CIRCULARS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "notices" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-400" />
                  <span>Public Notices &amp; Circulars ({cmsData.notices.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Parent/Student notice board items. Click karke slide drawer me full khulne wale circulars yahan se manage karein.
                </p>
              </div>

              <button
                onClick={() => {
                  const d = new Date();
                  const { nextRefNo } = generateNextRefNo(cmsData.notices, "Academic");
                  const newNotice: NoticeItem = {
                    id: `notice-${Date.now()}`,
                    title: "New Administrative or Examination Notice",
                    category: "Academic",
                    date: `${d.getDate()} Oct ${d.getFullYear()}`,
                    day: `${d.getDate()}`,
                    month: "OCT",
                    description: "Full detailed instructions and guidelines regarding the upcoming school activity.",
                    urgent: false,
                    refNo: nextRefNo,
                    targetAudience: "All Students & Parents",
                    issuedBy: "Principal Office (Smt. Mamta Verma)"
                  };
                  setCmsData({
                    ...cmsData,
                    notices: [newNotice, ...cmsData.notices]
                  });
                  showToast(`Naya notice add ho gaya! (Ref: ${nextRefNo})`);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add New Notice
              </button>
            </div>

            <div className="space-y-4">
              {cmsData.notices.map((notice, nIdx) => (
                <div
                  key={notice.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-black uppercase text-amber-400">
                      Notice #{nIdx + 1}
                    </span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs text-rose-400 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notice.urgent || false}
                          onChange={(e) => {
                            const updated = [...cmsData.notices];
                            updated[nIdx].urgent = e.target.checked;
                            setCmsData({ ...cmsData, notices: updated });
                          }}
                          className="rounded text-rose-500 focus:ring-0"
                        />
                        <span>Urgent Tag</span>
                      </label>
                      <button
                        onClick={() => {
                          const updated = cmsData.notices.filter((_, i) => i !== nIdx);
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-3">
                      <label className="block text-[11px] text-slate-400 mb-1">Notice Title</label>
                      <input
                        type="text"
                        value={notice.title}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].title = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Category</label>
                      <select
                        value={notice.category}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].category = e.target.value as any;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      >
                        <option value="Examination">Examination</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Academic">Academic</option>
                        <option value="Holiday">Holiday</option>
                        <option value="Administrative">Administrative</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] text-slate-400">Official Ref No. (पत्रांक)</label>
                        <button
                          type="button"
                          onClick={() => {
                            const { nextRefNo } = generateNextRefNo(cmsData.notices, notice.category);
                            const updated = [...cmsData.notices];
                            updated[nIdx].refNo = nextRefNo;
                            setCmsData({ ...cmsData, notices: updated });
                            showToast(`Ref No auto-set: ${nextRefNo}`);
                          }}
                          className="text-[10px] text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer"
                          title="Pichle notice se aage ka agla number lein"
                        >
                          🔄 Auto Next
                        </button>
                      </div>
                      <input
                        type="text"
                        value={notice.refNo || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].refNo = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        placeholder="e.g. DSMPS/ADM/2026-27/019"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Target Audience (कक्षा/समूह)</label>
                      <input
                        type="text"
                        value={notice.targetAudience || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].targetAudience = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        placeholder="e.g. All Students & Parents"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Issued By Authority</label>
                      <input
                        type="text"
                        value={notice.issuedBy || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].issuedBy = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        placeholder="e.g. Principal Office"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Day (e.g. 15)</label>
                      <input
                        type="text"
                        value={notice.day}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].day = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Month (e.g. OCT)</label>
                      <input
                        type="text"
                        value={notice.month}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].month = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Full Date String</label>
                      <input
                        type="text"
                        value={notice.date}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].date = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Attachment Title (PDF/Doc)</label>
                      <input
                        type="text"
                        value={notice.attachmentName || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].attachmentName = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        placeholder="e.g. Download Timetable PDF"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Attachment Link / URL</label>
                      <input
                        type="text"
                        value={notice.attachmentUrl || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.notices];
                          updated[nIdx].attachmentUrl = e.target.value;
                          setCmsData({ ...cmsData, notices: updated });
                        }}
                        placeholder="e.g. #admissions or file link"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Full Notice Description / Circular Body
                    </label>
                    <textarea
                      rows={3}
                      value={notice.description}
                      onChange={(e) => {
                        const updated = [...cmsData.notices];
                        updated[nIdx].description = e.target.value;
                        setCmsData({ ...cmsData, notices: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Notices Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 8: STAFF & FACULTY MEETINGS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "meetings" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Staff &amp; Faculty Internal Meetings ({cmsData.staffMeetings.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Academic planning, quarterly reviews, curriculum and committee meetings.
                </p>
              </div>

              <button
                onClick={() => {
                  const newMeeting: StaffMeetingItem = {
                    id: `meeting-${Date.now()}`,
                    title: "Quarterly Academic Review & Planning Session",
                    date: "Saturday, 24 Oct 2026",
                    time: "02:00 PM – 03:30 PM",
                    location: "Central Conference Hall",
                    chairedBy: "Col. Uday Shankar Verma (Chairman)",
                    priority: "High Priority",
                    attendees: "All Teaching Faculty & Academic Coordinators",
                    agenda: "Lesson plan progression, internal evaluation reviews, and remedial class strategies.",
                    status: "Scheduled",
                    decisions: ["Syllabus completion review", "Pre-board examination timetable approved"],
                    notes: "Chaired jointly by Chairman Col. Uday Shankar Verma & Principal Smt. Mamta Verma."
                  };
                  setCmsData({
                    ...cmsData,
                    staffMeetings: [newMeeting, ...cmsData.staffMeetings]
                  });
                  showToast("Nayi Meeting schedule add ho gayi!");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add New Meeting
              </button>
            </div>

            <div className="space-y-4">
              {cmsData.staffMeetings.map((meet, mIdx) => (
                <div
                  key={meet.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-black uppercase text-amber-400">
                      Meeting #{mIdx + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <select
                        value={meet.priority || "Routine"}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].priority = e.target.value as any;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className="text-xs font-bold px-2 py-1 rounded-lg border bg-amber-500/20 text-amber-300 border-amber-500/30"
                      >
                        <option value="Routine">Routine</option>
                        <option value="High Priority">High Priority</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Statutory">Statutory</option>
                      </select>
                      <select
                        value={meet.status}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].status = e.target.value as any;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className={`text-xs font-bold px-2 py-1 rounded-lg border ${
                          meet.status === "Scheduled"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        }`}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        onClick={() => {
                          const updated = cmsData.staffMeetings.filter((_, i) => i !== mIdx);
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Meeting Title</label>
                    <input
                      type="text"
                      value={meet.title}
                      onChange={(e) => {
                        const updated = [...cmsData.staffMeetings];
                        updated[mIdx].title = e.target.value;
                        setCmsData({ ...cmsData, staffMeetings: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm font-bold text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Chaired By (Presiding Authority)</label>
                      <input
                        type="text"
                        value={meet.chairedBy || ""}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].chairedBy = e.target.value;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        placeholder="e.g. Col. Uday Shankar Verma (Chairman)"
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Location / Venue</label>
                      <input
                        type="text"
                        value={meet.location}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].location = e.target.value;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Date</label>
                      <input
                        type="text"
                        value={meet.date}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].date = e.target.value;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Time</label>
                      <input
                        type="text"
                        value={meet.time}
                        onChange={(e) => {
                          const updated = [...cmsData.staffMeetings];
                          updated[mIdx].time = e.target.value;
                          setCmsData({ ...cmsData, staffMeetings: updated });
                        }}
                        className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Attendees</label>
                    <input
                      type="text"
                      value={meet.attendees}
                      onChange={(e) => {
                        const updated = [...cmsData.staffMeetings];
                        updated[mIdx].attendees = e.target.value;
                        setCmsData({ ...cmsData, staffMeetings: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Agenda Details</label>
                    <textarea
                      rows={2}
                      value={meet.agenda}
                      onChange={(e) => {
                        const updated = [...cmsData.staffMeetings];
                        updated[mIdx].agenda = e.target.value;
                        setCmsData({ ...cmsData, staffMeetings: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Key Decisions &amp; Minutes of Meeting (MoM) — One per line
                    </label>
                    <textarea
                      rows={3}
                      value={(meet.decisions || []).join("\n")}
                      onChange={(e) => {
                        const updated = [...cmsData.staffMeetings];
                        updated[mIdx].decisions = e.target.value
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setCmsData({ ...cmsData, staffMeetings: updated });
                      }}
                      placeholder="e.g. Syllabus completion timeline fixed&#10;Remedial batches will commence from next Monday"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Notes / Leadership remarks</label>
                    <input
                      type="text"
                      value={meet.notes || ""}
                      onChange={(e) => {
                        const updated = [...cmsData.staffMeetings];
                        updated[mIdx].notes = e.target.value;
                        setCmsData({ ...cmsData, staffMeetings: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Meetings Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 9: ACADEMIC WINGS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "academics" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Academic Stages &amp; Wings ({cmsData.academics.length})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pre-Primary, Primary, Middle aur Secondary Wings ki descriptions aur highlights customize karein.
              </p>
            </div>

            <div className="space-y-6">
              {cmsData.academics.map((wing, wIdx) => (
                <div
                  key={wing.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-black uppercase text-amber-400">
                      {wing.badge || `Stage ${wIdx + 1}`}
                    </span>
                    <input
                      type="text"
                      value={wing.badge}
                      onChange={(e) => {
                        const updated = [...cmsData.academics];
                        updated[wIdx].badge = e.target.value;
                        setCmsData({ ...cmsData, academics: updated });
                      }}
                      className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-amber-300 font-bold"
                      placeholder="Badge (e.g. Foundational Wing)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Stage Title</label>
                      <input
                        type="text"
                        value={wing.name}
                        onChange={(e) => {
                          const updated = [...cmsData.academics];
                          updated[wIdx].name = e.target.value;
                          setCmsData({ ...cmsData, academics: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Classes Covered</label>
                      <input
                        type="text"
                        value={wing.classes}
                        onChange={(e) => {
                          const updated = [...cmsData.academics];
                          updated[wIdx].classes = e.target.value;
                          setCmsData({ ...cmsData, academics: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Wing Description</label>
                    <textarea
                      rows={2}
                      value={wing.description}
                      onChange={(e) => {
                        const updated = [...cmsData.academics];
                        updated[wIdx].description = e.target.value;
                        setCmsData({ ...cmsData, academics: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Bullet Highlights (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={wing.points.join(", ")}
                      onChange={(e) => {
                        const updated = [...cmsData.academics];
                        updated[wIdx].points = e.target.value.split(",").map((p) => p.trim());
                        setCmsData({ ...cmsData, academics: updated });
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Academic Wings
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 10: CAMPUS FACILITIES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "facilities" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" />
                  <span>Campus Facilities &amp; Amenities ({cmsData.facilities.length})</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Smart classrooms, labs, library, playground aur amenities ko edit ya add karein.
                </p>
              </div>

              <button
                onClick={() => {
                  const newFacility: FacilityItemConfig = {
                    id: `facility-${Date.now()}`,
                    title: "New Facility Title",
                    description: "Description of the modern school infrastructure amenity.",
                    tag: "Campus Amenity"
                  };
                  setCmsData({
                    ...cmsData,
                    facilities: [...cmsData.facilities, newFacility]
                  });
                  showToast("New facility added!");
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" /> Add Facility
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cmsData.facilities.map((fac, fIdx) => (
                <div
                  key={fac.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black uppercase text-amber-400">
                      Amenity #{fIdx + 1}
                    </span>
                    <button
                      onClick={() => {
                        const updated = cmsData.facilities.filter((_, i) => i !== fIdx);
                        setCmsData({ ...cmsData, facilities: updated });
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Facility Name</label>
                    <input
                      type="text"
                      value={fac.title}
                      onChange={(e) => {
                        const updated = [...cmsData.facilities];
                        updated[fIdx].title = e.target.value;
                        setCmsData({ ...cmsData, facilities: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tag / Category</label>
                    <input
                      type="text"
                      value={fac.tag}
                      onChange={(e) => {
                        const updated = [...cmsData.facilities];
                        updated[fIdx].tag = e.target.value;
                        setCmsData({ ...cmsData, facilities: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={fac.description}
                      onChange={(e) => {
                        const updated = [...cmsData.facilities];
                        updated[fIdx].description = e.target.value;
                        setCmsData({ ...cmsData, facilities: updated });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Facilities Live
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 11: BACKUP, EXPORT & RESET */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "backup" && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <span>Data Backup, JSON Import/Export &amp; Factory Reset</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Poore website ka snapshot JSON file me download karein ya kisi purani backup file ko restore karein.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export JSON */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <FileDown className="w-5 h-5" />
                  <span>Download Live Website JSON Backup</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Isme aapke sabhi custom hero slides, photo albums, notices, staff meetings, counter stats aur school details ka complete data backup file me save ho jayega.
                </p>
                <button
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsData, null, 2));
                    const downloadAnchor = document.createElement("a");
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `dsmps-backup-${new Date().toISOString().slice(0, 10)}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                    showToast("Website snapshot JSON file downloaded!");
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <FileDown className="w-4 h-4" /> Download Backup JSON
                </button>
              </div>

              {/* Import JSON */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <FileUp className="w-5 h-5" />
                  <span>Restore from JSON Backup File</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kisi purani backup file ko upload karke website ka data turant restore karein.
                </p>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold transition cursor-pointer">
                  <FileUp className="w-4 h-4" /> Select Backup JSON File
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const parsed = JSON.parse(event.target?.result as string);
                          setCmsData(parsed);
                          saveCmsData(parsed);
                          showToast("Backup restored successfully!");
                        } catch (err) {
                          alert("Invalid JSON file!");
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="bg-slate-950 border border-red-950 rounded-2xl p-6 space-y-4 md:col-span-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                  <RotateCcw className="w-5 h-5" />
                  <span>Factory Reset to Default School State</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Agar aap sabhi components ko shuruaati authentic DSMPS details me reset karna chahte hain, toh yahan click karein.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Kya aap sach me sabhi changes reset karke authentic defaults par jana chahte hain?")) {
                      resetCmsDataToDefaults();
                      setCmsData(DEFAULT_CMS_DATA);
                      showToast("Website default settings par reset ho gayi!");
                    }
                  }}
                  className="px-5 py-2.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reset All Components to Default
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Developer Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>
          Dr. Shyam Memorial Public School &bull; Component Architecture by{" "}
          <strong className="text-amber-400">Anand Kr. Mandal</strong> &bull; Haflaganj, Katihar
        </p>
      </footer>
    </div>
  );
}
