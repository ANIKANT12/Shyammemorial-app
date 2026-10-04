"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock,
  Users,
  GraduationCap,
  Trophy,
  BookOpen,
  Camera,
  X,
  ZoomIn,
  Building2,
  CheckCircle2,
  Megaphone,
  Star,
  Shield,
  ShieldCheck,
  Microscope,
  Music,
  Dumbbell,
  CalendarDays,
  Bell,
  CreditCard,
  ClipboardList,
  Newspaper,
  Award,
  Sparkles,
  Calendar,
  Filter,
  Check,
  AlertCircle,
  Eye,
  Layers,
  Flag,
  Compass,
  Printer,
  Copy
} from "lucide-react";
import InstitutionalFooter from "@/components/Footer";
import {
  CmsSiteData,
  DEFAULT_CMS_DATA,
  getCmsData,
  ActivityEventAlbum,
  NoticeItem,
  StaffMeetingItem
} from "@/lib/cms-store";

export type { ActivityEventAlbum, NoticeItem, StaffMeetingItem };

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
export interface HeroSlide {
  id: string;
  imageUrl: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  badgeText?: string;
  orderIndex: number;
  active: boolean;
}

/* ---------------------------------------------
   DEFAULT HERO SLIDES
--------------------------------------------- */
export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-independence-day",
    imageUrl: "/photos/IMG_20230815_112245.jpg",
    headline: "Patriotic Spirit & Dedicated Faculty",
    subline: "Teachers, educators & staff assembled on 77th Independence Day celebration at DSMPS",
    ctaLabel: "Apply for Admission 2026–27",
    ctaHref: "#admissions",
    badgeText: "15th August Celebration • DSMPS Faculty & Staff",
    orderIndex: 0,
    active: true,
  },
  {
    id: "slide-1",
    imageUrl: "/photos/morning-assembly-prayer.jpg",
    headline: "Building Character & Academic Excellence",
    subline: "Pre-Primary to Class 10th • Haflaganj, Katihar, Bihar",
    ctaLabel: "Apply for Admission 2026–27",
    ctaHref: "#admissions",
    badgeText: "Session 2026–27 • Admissions Open",
    orderIndex: 1,
    active: true,
  },
  {
    id: "slide-2",
    imageUrl: "/photos/school-campus-assembly.jpg",
    headline: "Nurturing Young Minds & Values",
    subline: "Structured morning assemblies, moral prayers & disciplined learning",
    ctaLabel: "Explore Our Academics",
    ctaHref: "#academics",
    badgeText: "Holistic Education & Moral Values",
    orderIndex: 2,
    active: true,
  },
  {
    id: "slide-3",
    imageUrl: "/photos/annual-function-stage.jpg",
    headline: "Celebrating Excellence & Heritage",
    subline: "Estd. 2016 • Enlightening lives of young scholars in Haflaganj",
    ctaLabel: "About Our School",
    ctaHref: "#about",
    badgeText: "Estd. 2016 • Haflaganj Campus",
    orderIndex: 3,
    active: true,
  },
  {
    id: "slide-4",
    imageUrl: "/photos/classroom-art-drawing.jpg",
    headline: "Interactive Classrooms & Creative Growth",
    subline: "Dedicated educators, holistic activities & nurturing community",
    ctaLabel: "View Photo Gallery",
    ctaHref: "#gallery",
    badgeText: "Creative & Co-Scholastic Activities",
    orderIndex: 4,
    active: true,
  },
];

/* ---------------------------------------------
   DEFAULT RUNNING TICKER ANNOUNCEMENTS
--------------------------------------------- */
const TICKER_ANNOUNCEMENTS = [
  "⭐ Admissions Open for Academic Session 2026–27 (Nursery to Class 10th) — Apply Online Now!",
  "📋 Half-Yearly (SA-I) Examinations Timetable & Syllabus released for all classes.",
  "🇮🇳 77th Independence Day Celebrations & Staff Felicitation highlights updated in Album Gallery.",
  "👥 Parent-Teacher Meeting (PTM) scheduled for Saturday, 10:00 AM – 1:00 PM.",
  "🏆 DSMPS students awarded 3rd place in District Inter-School Science Exhibition.",
  "🚌 School Bus & Van routes operating smoothly across Haflaganj & Katihar.",
  "❄️ Prescribed winter uniform guidelines effective from 1st November."
];

/* ---------------------------------------------
   DAY-TO-DAY ACTIVITIES & EVENT ALBUMS
--------------------------------------------- */
const ACTIVITY_ALBUMS: ActivityEventAlbum[] = [
  {
    id: "act-indep-2023",
    title: "77th Independence Day Flag Hoisting & Faculty Felicitation",
    category: "National Festivals",
    date: "15 August",
    location: "Main Campus Courtyard",
    participants: "Full Teaching & Non-Teaching Staff, Student Council",
    coverImage: "/photos/IMG_20230815_112245.jpg",
    photoCount: 4,
    photos: [
      {
        url: "/photos/IMG_20230815_112245.jpg",
        caption: "All DSMPS educators and staff assembled in festive traditional attire with tricolour badges before the national flag backdrop."
      },
      {
        url: "/photos/annual-function-stage.jpg",
        caption: "Dignitaries and faculty members felicitated on the official campus stage under the school insignia."
      },
      {
        url: "/photos/educational-trust-banner.jpg",
        caption: "Teachers and students holding the Enlightening Lives Educational Trust banner on the school grounds."
      },
      {
        url: "/photos/school-campus-assembly.jpg",
        caption: "Students standing in disciplined house formation during the national flag hoisting."
      }
    ],
    summary: "Grand tricolour flag hoisting followed by patriotic address by Chairman Col. Uday Shankar Verma, patriotic songs, and educator awards.",
    fullStory: "On the occasion of 77th Independence Day, Dr. Shyam Memorial Public School celebrated with patriotic fervor. The national flag was unfurled by the leadership desk, followed by the National Anthem. All teachers, staff, and students participated with tri-colour rosettes. Special cultural performances and a speech on civic responsibility highlighted the ceremony.",
    highlights: ["Tricolour Flag Hoisting", "Patriotic Speeches & Choir", "Educator Honor Roll", "Sweets & Token Distribution"]
  },
  {
    id: "act-morning-assembly",
    title: "Daily Morning Assembly, Moral Pledge & House Uniform Inspection",
    category: "Assemblies",
    date: "Every Morning (08:00 AM)",
    location: "School Assembly Courtyard",
    participants: "Pre-Primary to Class 10th (All Houses)",
    coverImage: "/photos/morning-assembly-prayer.jpg",
    photoCount: 3,
    photos: [
      {
        url: "/photos/morning-assembly-prayer.jpg",
        caption: "Young scholars standing with folded hands during universal moral prayers."
      },
      {
        url: "/photos/school-campus-assembly.jpg",
        caption: "House squad lineup (Yellow, Green, Blue uniforms) in front of the main school building."
      },
      {
        url: "/photos/20221105_082740.jpg",
        caption: "Morning discipline drill, posture alignment and physical exercises."
      }
    ],
    summary: "Daily morning assembly begins with meditative prayers, daily Hindi/English news bulletin, thought for the day, and national anthem.",
    fullStory: "Dr. Shyam Memorial Public School places sacred importance on beginning every school day with mindfulness, ethical values, and physical alignment. Guided by senior mentors and student captains, students take the integrity pledge, recite inspiring thoughts, and hear words of guidance from Principal Smt. Mamta Verma.",
    highlights: ["Universal Prayer with Folded Hands", "Daily News Bulletin & GK Quiz", "House Captain Discipline Inspection", "National Anthem Chorus"]
  },
  {
    id: "act-annual-function",
    title: "Annual Cultural Day & Merit Awards Ceremony ('Umang')",
    category: "Cultural & Arts",
    date: "Annual Celebration",
    location: "Central Campus Auditorium",
    participants: "Students, Parents, Faculty & Community Leaders",
    coverImage: "/photos/annual-function-stage.jpg",
    photoCount: 4,
    photos: [
      {
        url: "/photos/annual-function-stage.jpg",
        caption: "Stage dignitaries and honorable patrons on the fest podium with commemorative garlands."
      },
      {
        url: "/photos/20230215_091515.jpg",
        caption: "Prize distribution and merit certificates handed to scholastic toppers."
      },
      {
        url: "/photos/educational-trust-banner.jpg",
        caption: "Campus gathering celebrating the founding principles of Enlightening Lives Trust."
      },
      {
        url: "/photos/20210327_111453.jpg",
        caption: "Cultural dance group in traditional folk attire representing Bihar's heritage."
      }
    ],
    summary: "A vibrant showcase of musical dramas, regional folk dances, academic toppers felicitation, and founder address.",
    fullStory: "The Annual Function is the flagship cultural festival of DSMPS. Students showcase months of dedication in music, classical dance, skits, and public oration. Academic shields and sports medals are conferred on outstanding achievers in the presence of esteemed district guests.",
    highlights: ["Academic Excellence Trophies", "Bhojpuri & Maithili Folk Dances", "Chairman's Annual Address", "Parents & Alumni Meet"]
  },
  {
    id: "act-classroom-art",
    title: "Primary Wing Creative Art, Science Drawings & Craft Expo",
    category: "Academic & Labs",
    date: "Weekly Practical Period",
    location: "Primary Block Activity Room",
    participants: "Classes 1st to 5th Students",
    coverImage: "/photos/classroom-art-drawing.jpg",
    photoCount: 3,
    photos: [
      {
        url: "/photos/classroom-art-drawing.jpg",
        caption: "Students proudly displaying colorful wildlife and bird drawing sheets on DSMPS study tables."
      },
      {
        url: "/photos/20220810_123757.jpg",
        caption: "Hands-on model building, origami crafts, and geometric puzzle workshops."
      },
      {
        url: "/photos/20221109_080440.jpg",
        caption: "Exhibition display boards decorated with students' weekly art sheets."
      }
    ],
    summary: "Nurturing aesthetic appreciation and fine motor creativity through freehand drawing, clay modelling, and science sketches.",
    fullStory: "At DSMPS, creative arts are seamlessly integrated into academic learning. During weekly art and experiential learning periods, students illustrate concepts from Environmental Studies (EVS), biological flora and fauna, and regional geography, cultivating both imagination and precision.",
    highlights: ["Color Palette Mastery", "EVS Science Illustration Sheets", "Peer Exhibition on Display Boards", "Teacher Mentorship"]
  }
];

/* ---------------------------------------------
   OFFICIAL NOTICES DATA
--------------------------------------------- */
const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "not-1",
    title: "Admission Open for Academic Session 2026–27 (Nursery to Class 10th)",
    category: "Admissions",
    date: "15 Oct 2026",
    day: "15",
    month: "Oct",
    description: "Registration forms and prospectus for the upcoming session 2026-27 are now available at the school administrative counter and through the online portal.",
    urgent: true
  },
  {
    id: "not-2",
    title: "Half-Yearly (SA-I) Examination Timetable & Syllabus Circular",
    category: "Examination",
    date: "10 Oct 2026",
    day: "10",
    month: "Oct",
    description: "Detailed date-sheet for classes 1st to 10th has been released. Parents are requested to ensure regular revision and timely attendance during exam days.",
    urgent: true
  },
  {
    id: "not-3",
    title: "Parent-Teacher Meeting (PTM) for Term 1 Review",
    category: "Academic",
    date: "05 Oct 2026",
    day: "05",
    month: "Oct",
    description: "PTM will be conducted this Saturday from 10:00 AM to 01:00 PM. Parents are encouraged to discuss report cards and behavioral growth with subject teachers.",
    urgent: false
  },
  {
    id: "not-4",
    title: "Autumn Break & Festival Vacation Notification",
    category: "Holiday",
    date: "02 Oct 2026",
    day: "02",
    month: "Oct",
    description: "The school will observe autumn holidays as per state educational calendar. Structured holiday assignments have been distributed.",
    urgent: false
  },
  {
    id: "not-5",
    title: "Winter School Uniform Dress Code & Guidelines",
    category: "Administrative",
    date: "26 Sep 2026",
    day: "26",
    month: "Sep",
    description: "Prescribed navy blazers, cardigans, and woollen sweaters are mandatory starting 1st November. Available at authorized uniform counters.",
    urgent: false
  }
];

/* ---------------------------------------------
   STAFF & FACULTY MEETINGS DATA
--------------------------------------------- */
const DEFAULT_MEETINGS: StaffMeetingItem[] = [
  {
    id: "meet-1",
    title: "Curriculum Progression & Monthly Lesson Plan Audit",
    date: "Saturday, 07 Oct 2026",
    time: "02:30 PM – 04:00 PM",
    location: "Central Conference Hall",
    attendees: "All Primary & Middle Wing Teachers",
    agenda: "Review of weekly homework registers, syllabus completion targets, and remedial classes for slow learners in Mathematics and Science.",
    status: "Scheduled",
    notes: "Please bring updated lesson diaries and periodic marks registers."
  },
  {
    id: "meet-2",
    title: "CBSE Pattern Secondary Board Exam Strategy Session",
    date: "Wednesday, 11 Oct 2026",
    time: "03:15 PM – 04:30 PM",
    location: "Principal's Boardroom",
    attendees: "Secondary Wing Subject Faculty (Classes 8th to 10th)",
    agenda: "Analysis of sample question papers, pre-board timetable formulation, and doubt resolution clinics for students.",
    status: "Scheduled",
    notes: "Chaired jointly by Chairman Col. Uday Shankar Verma & Principal Smt. Mamta Verma."
  },
  {
    id: "meet-3",
    title: "Annual Sports Meet & Cultural Coordination Committee",
    date: "Monday, 16 Oct 2026",
    time: "01:45 PM – 03:00 PM",
    location: "Staff Recreation Hall",
    attendees: "Physical Education Staff, House Mentors & Activity Coordinators",
    agenda: "Finalizing athletic track events, house squad rosters, march-past rehearsals, and awards allocation.",
    status: "Scheduled",
    notes: "Led by Chairman Col. Uday Shankar Verma."
  },
  {
    id: "meet-4",
    title: "Monthly Campus Safety, Hygiene & Bus Route Review",
    date: "28 Sep 2026",
    time: "02:00 PM – 03:30 PM",
    location: "Central Conference Hall",
    attendees: "Teaching & Non-Teaching Staff, Transport Supervisors",
    agenda: "Audit of 24/7 CCTV cameras, bus route timing logs, RO drinking water purifiers servicing, and student wellness measures.",
    status: "Completed",
    notes: "All safety protocols ratified; playground maintenance approved."
  }
];

export default function Home() {
  // Dynamic CMS Store Data
  const [cmsData, setCmsData] = useState<CmsSiteData>(DEFAULT_CMS_DATA);

  // Sync CMS data on mount & listen to live admin updates across tabs & windows
  useEffect(() => {
    setCmsData(getCmsData());
    const handleCmsUpdate = () => {
      setCmsData(getCmsData());
    };
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === "dsmps_cms_data_v2" || !e.key) {
        setCmsData(getCmsData());
      }
    };
    window.addEventListener("dsmps_cms_updated", handleCmsUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("dsmps_cms_updated", handleCmsUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  // 1. Hero Slide Carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Announcements Ticker
  const announcements = cmsData.tickerAnnouncements || TICKER_ANNOUNCEMENTS;

  // 3. Activity Albums Filter
  const [activityCategory, setActivityCategory] = useState<string>("All");

  // 4. Modal Lightbox for Clicked Activity Album
  const [selectedAlbum, setSelectedAlbum] = useState<ActivityEventAlbum | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // 5. Announcement Corner Tab: "notices" | "meetings"
  const [announcementTab, setAnnouncementTab] = useState<"notices" | "meetings">("notices");

  // 6. Sliding Reader Drawer for Notices & Staff Meetings
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<StaffMeetingItem | null>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const handleCopyNoticeText = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Dynamic Hero Slides (combining admin-featured events with base slides)
  const featuredEventSlides: HeroSlide[] = (cmsData.activityAlbums || [])
    .filter((album) => album.featuredInHero)
    .map((album, idx) => ({
      id: `hero-event-${album.id}`,
      imageUrl: album.coverImage,
      headline: album.title,
      subline: album.summary || "DSMPS Activity & Campus Event",
      ctaLabel: `View Photo Album (${album.photos?.length || 1} Photos)`,
      ctaHref: "#activities",
      badgeText: `Featured Event • ${album.category} • ${album.date}`,
      orderIndex: idx,
      active: true
    }));

  const school = cmsData.schoolIdentity || DEFAULT_CMS_DATA.schoolIdentity;

  const baseSlides: HeroSlide[] = (cmsData.heroSlides && cmsData.heroSlides.length > 0)
    ? cmsData.heroSlides.filter((s) => s.active)
    : DEFAULT_HERO_SLIDES;

  const allHeroSlides: HeroSlide[] = featuredEventSlides.length > 0
    ? [...featuredEventSlides, ...baseSlides]
    : baseSlides;

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allHeroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [allHeroSlides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % allHeroSlides.length);
  }, [allHeroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + allHeroSlides.length) % allHeroSlides.length);
  }, [allHeroSlides.length]);

  // Keyboard navigation for album modal and sliding notice reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAlbum(null);
        setSelectedNotice(null);
        setSelectedMeeting(null);
      } else if (selectedAlbum) {
        if (e.key === "ArrowRight") {
          setActivePhotoIndex((prev) => (prev + 1) % selectedAlbum.photos.length);
        } else if (e.key === "ArrowLeft") {
          setActivePhotoIndex((prev) => (prev - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAlbum, selectedNotice, selectedMeeting]);

  const openAlbumModal = (album: ActivityEventAlbum) => {
    setSelectedAlbum(album);
    setActivePhotoIndex(0);
  };

  const activeAlbumsList = cmsData.activityAlbums?.length ? cmsData.activityAlbums : ACTIVITY_ALBUMS;
  const filteredAlbums = activityCategory === "All"
    ? activeAlbumsList
    : activeAlbumsList.filter((a) => a.category === activityCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased">
      
      {/* ========================================================================= */}
      {/* 1. TOP UTILITY, CONTACT & HELPLINE BAR */}
      {/* ========================================================================= */}
      <div className="bg-[#071126] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {school.location || "Haflaganj, Sirnia West, Katihar, Bihar - 854103"}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {school.officeTimings ? `Office: ${school.officeTimings}` : "Office: Mon–Sat 08:00 AM – 03:00 PM"}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${school.helplinePhone?.replace(/\s+/g, '') || "07016560240"}`} className="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Helpline: {school.helplinePhone || "070165 60240"}
            </a>
            <a href={`mailto:${school.email || "shyammemorialhafla@gmail.com"}`} className="flex items-center gap-1.5 text-slate-300 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              {school.email || "shyammemorialhafla@gmail.com"}
            </a>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-slate-200 bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/15 px-3 py-1 rounded-full text-[11px] font-bold transition shadow-2xs"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN BRAND HEADER */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-[#0a1538] via-[#0f1f4a] to-[#162e70] text-white py-4 sm:py-5 px-4 sm:px-6 shadow-md border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Logo & School Identity */}
          <Link href="/" className="flex items-center gap-4 text-center md:text-left group">
            <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-white border-2 border-amber-400 ring-4 ring-amber-400/20 shadow-lg shrink-0 flex items-center justify-center overflow-hidden p-1 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="DSMPS Crest" className="h-full w-full object-contain" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-2xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-white" />
                  Govt. Recognized
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-amber-300 tracking-wide">
                  {school.recognitionText || "District Education Office, Katihar • Govt. of Bihar • Under RTE Act, 2009"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white uppercase leading-tight drop-shadow-sm">
                {school.name || "Dr. Shyam Memorial Public School"}
              </h1>
              <div className="text-xs text-slate-200 font-medium flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span className="text-slate-300 font-semibold">{school.tagline || "Haflaganj, Katihar (Bihar)"}</span>
                <span className="text-amber-400/60 font-black">•</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-amber-300 font-bold font-mono text-[11px] border border-white/10">
                  Recog. No.: {school.recognitionNo || "212115120221118160113"}
                </span>
                <span className="text-amber-400/60 font-black">•</span>
                <span className="bg-[#071126]/70 px-2 py-0.5 rounded text-slate-200 font-mono text-[11px] border border-blue-900">
                  UDISE+: <strong className="text-amber-300">{school.udiseNo || "10100106805"}</strong>
                </span>
              </div>
            </div>
          </Link>

          {/* Action CTA: Admission */}
          <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
            <a
              href="#admissions"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4 text-slate-950" />
              {school.admissionCtaLabel || "Apply for Admission 2026–27"}
            </a>
            <span className="text-[11px] font-semibold text-amber-200/90 text-center md:text-right">
              {school.admissionSubtext || "Nursery to Class 10th • CBSE Curriculum"}
            </span>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MAIN NAVIGATION BAR (STICKY) */}
      {/* ========================================================================= */}
      <nav className="bg-[#12245e] border-b border-blue-900 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto gap-0 text-xs font-semibold text-white">
          <Link href="/" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0 font-bold">Home</Link>
          <a href="#about" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0">Leadership Desk</a>
          <a href="#activities" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0 font-bold text-amber-300 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Day-to-Day Activities &amp; Albums
          </a>
          <a href="#announcement-corner" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0 flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-amber-400" /> Notice &amp; Meeting Corner
          </a>
          <a href="#academics" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0">Academics</a>
          <a href="#facilities" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0">Facilities</a>
          <a href="#gallery" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0">Photo Gallery</a>
          <a href="#admissions" className="px-4 py-3.5 hover:bg-amber-500/80 bg-amber-500/20 text-amber-300 whitespace-nowrap transition shrink-0 font-bold">Admissions</a>
          <a href="#contact" className="px-4 py-3.5 hover:bg-white/10 whitespace-nowrap transition shrink-0">Contact Us</a>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. LIVE CONTINUOUS RUNNING TICKER RIBBON */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0a1128] via-[#0f1f4a] to-[#1a3a8f] text-white py-2 px-3 border-b border-amber-400/40 shadow-xs overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          
          {/* Ticker Badge */}
          <div className="shrink-0 flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-xs z-10">
            <Megaphone className="w-3.5 h-3.5 animate-bounce" />
            <span>Live Circulars:</span>
          </div>

          {/* Marquee Container */}
          <div className="relative flex-1 overflow-hidden" title="Hover over notices to pause scrolling / Notice padhne ke liye cursor upar layein">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-medium text-slate-200">
              {announcements.concat(announcements).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors cursor-pointer"
                  onClick={() => {
                    const noticeList = cmsData.notices?.length ? cmsData.notices : DEFAULT_NOTICES;
                    const words = item.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter((w) => w.length > 4);
                    const matched = noticeList.find((n) => {
                      const nText = (n.title + " " + n.description).toLowerCase();
                      return words.some((w) => nText.includes(w));
                    });
                    if (matched) {
                      setSelectedNotice(matched);
                    } else {
                      const el = document.getElementById("announcement-corner");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item}
                  <span className="text-amber-400 font-black">•</span>
                </span>
              ))}
            </div>
          </div>

          {/* Fast Link to Corner */}
          <a
            href="#announcement-corner"
            className="shrink-0 hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-white underline z-10"
          >
            All Notices <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. HERO SLIDER CAROUSEL */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[320px] sm:h-[440px] lg:h-[520px] overflow-hidden bg-slate-900">
        {allHeroSlides.map((slide, index) => {
          const isEventSlide = slide.id.startsWith("hero-event-");
          const targetAlbum = isEventSlide
            ? (cmsData.activityAlbums || []).find((a) => `hero-event-${a.id}` === slide.id)
            : null;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.headline}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/photos/IMG_20230815_112245.jpg";
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-16 max-w-4xl">
                {slide.badgeText && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black uppercase tracking-wider mb-3 w-fit shadow-md">
                    <Star className="h-3 w-3 fill-slate-900" />
                    {slide.badgeText}
                  </div>
                )}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
                  {slide.headline}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-slate-200 mt-2 max-w-2xl drop-shadow-sm font-medium">
                  {slide.subline}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {targetAlbum ? (
                    <button
                      onClick={() => openAlbumModal(targetAlbum)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg transition cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                      {slide.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <a
                      href={slide.ctaHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg transition"
                    >
                      {slide.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href="#activities"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/30 transition"
                  >
                    <Camera className="h-4 w-4 text-amber-300" />
                    View Day-to-Day Activity Albums
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-6 z-20 flex gap-2">
          {allHeroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentSlide ? "w-8 bg-amber-400" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STATS COUNTER */}
      {/* ========================================================================= */}
      <section id="stats-section" className="bg-gradient-to-r from-[#0f1f4a] via-[#1a3a8f] to-[#0f1f4a] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: cmsData.stats?.students?.value || "212+", label: cmsData.stats?.students?.label || "Active Students", color: "text-amber-400" },
              { icon: GraduationCap, value: cmsData.stats?.faculty?.value || "24+", label: cmsData.stats?.faculty?.label || "Dedicated Faculty", color: "text-emerald-400" },
              { icon: Trophy, value: cmsData.stats?.heritage?.value || "10+", label: cmsData.stats?.heritage?.label || "Years of Heritage", color: "text-sky-400" },
              { icon: Award, value: cmsData.stats?.curriculum?.value || "100%", label: cmsData.stats?.curriculum?.label || "CBSE Curriculum", color: "text-violet-400" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className={`mx-auto h-12 w-12 rounded-full bg-white/10 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`text-3xl sm:text-4xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. LEADERSHIP DESK: CHAIRMAN & PRINCIPAL (FEATURE 3) */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Guiding Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
              Messages from the Leadership Desk
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining army-grade discipline, traditional moral values, and experienced child-centric pedagogy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* 1. CHAIRMAN'S DESK (COL. UDAY SHANKAR VERMA) */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-slate-300 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0f1f4a] text-amber-300 text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider">
                Founder & Chairman Desk
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Portrait of Col. Uday Shankar Verma */}
                  {cmsData.leadership?.chairman?.photoUrl ? (
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white border-2 border-amber-400 overflow-hidden shadow-lg shrink-0">
                      <img
                        src={cmsData.leadership.chairman.photoUrl}
                        alt="Col. Uday Shankar Verma - Chairman & Managing Trustee"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/photos/chairman-col-uday-shankar-verma.jpg";
                        }}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0a1128] via-[#0f1f4a] to-[#1a3a8f] text-white flex items-center justify-center p-2 shadow-lg border-2 border-amber-400 shrink-0">
                      <Shield className="w-10 h-10 text-amber-300" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0f1f4a]">
                      {cmsData.leadership?.chairman?.name || "Col. Uday Shankar Verma"}
                    </h3>
                    <p className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mt-0.5">
                      {cmsData.leadership?.chairman?.title || "Chairman • Indian Army Veteran"}
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Dr. Shyam Memorial Public School, Haflaganj
                    </p>
                  </div>
                </div>

                <div className="relative pl-5 border-l-4 border-[#0f1f4a] space-y-3 italic text-slate-700 text-sm leading-relaxed">
                  <p>
                    &ldquo;{cmsData.leadership?.chairman?.quote || "True education does not merely train a child to score marks; it builds the character to withstand adversity, lead with courage, and serve the nation with unwavering integrity."}&rdquo;
                  </p>
                  <p>
                    &ldquo;{cmsData.leadership?.chairman?.fullMessage || "Having served our Motherland in the Armed Forces, my vision for Dr. Shyam Memorial Public School is to provide military-grade discipline, robust physical health, and moral fortitude to the sons and daughters of Katihar. Every student here is trained to become a responsible, patriotic, and visionary citizen."}&rdquo;
                  </p>
                </div>

                {/* Chairman's Core Pillars */}
                <div className="grid grid-cols-2 gap-2.5 pt-6 text-xs text-slate-700 font-semibold">
                  {(cmsData.leadership?.chairman?.pillars || [
                    "Army-Grade Discipline",
                    "Patriotic Nation-Building",
                    "Physical Stamina & Sports",
                    "Character & Moral Ethics"
                  ]).map((pillar, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Executive Leadership</span>
                <span className="text-[#0f1f4a]">Estd. Haflaganj, Katihar</span>
              </div>
            </div>

            {/* 2. PRINCIPAL'S DESK (SMT. MAMTA VERMA) */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border-2 border-slate-300 shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-800 text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider">
                Principal's Desk
              </div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Photo of Smt. Mamta Verma */}
                  <div className="w-18 h-18 rounded-2xl bg-white border-2 border-amber-400 overflow-hidden shadow-lg shrink-0">
                    <img
                      src={cmsData.leadership?.principal?.photoUrl || "/photos/headmaster-mamta-verma.jpg"}
                      alt="Smt. Mamta Verma - Principal"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/photos/headmaster-mamta-verma.jpg";
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0f1f4a]">
                      {cmsData.leadership?.principal?.name || "Smt. Mamta Verma"}
                    </h3>
                    <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mt-0.5">
                      {cmsData.leadership?.principal?.title || "Principal • M.A. English, B.Ed."}
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      20+ Years Educational &amp; Pedagogical Experience
                    </p>
                  </div>
                </div>

                <div className="relative pl-5 border-l-4 border-emerald-700 space-y-3 italic text-slate-700 text-sm leading-relaxed">
                  <p>
                    &ldquo;{cmsData.leadership?.principal?.quote || "Every child enters our school with immense natural curiosity and potential. Our sacred mission is to provide an encouraging, joyful, and rigorous academic atmosphere where they can flourish."}&rdquo;
                  </p>
                  <p>
                    &ldquo;{cmsData.leadership?.principal?.fullMessage || "Through structured phonics, mathematics aptitude, scientific inquiry, and cultural arts, we work hand-in-hand with parents to ensure holistic growth. We welcome all parents to join our family at Haflaganj."}&rdquo;
                  </p>
                </div>

                {/* Principal's Core Pillars */}
                <div className="grid grid-cols-2 gap-2.5 pt-6 text-xs text-slate-700 font-semibold">
                  {(cmsData.leadership?.principal?.pillars || [
                    "Conceptual CBSE Learning",
                    "Child-Centric Pedagogy",
                    "Continuous Assessment",
                    "Dedicated Parent Connect"
                  ]).map((pillar, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Head of Pedagogy</span>
                <span className="text-emerald-800">DSMPS Administration</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. DAY-TO-DAY ACTIVITIES & EVENT ALBUMS WITH MODAL VIEWER (FEATURE 1) */}
      {/* ========================================================================= */}
      <div id="gallery" className="scroll-mt-20" />
      <section id="activities" className="py-16 bg-[#f0f4ff] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-white px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3 shadow-xs">
                Live Campus Feed &amp; Galleries
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
                Day-to-Day Activities &amp; Event Albums
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                Click any event below to open its <strong>full multi-photo album, high-resolution photo viewer, and event story</strong>!
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category:
              </span>
              {["All", "National Festivals", "Assemblies", "Cultural & Arts", "Academic & Labs"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivityCategory(cat)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activityCategory === cat
                      ? "bg-[#0f1f4a] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlbums.map((album) => (
              <div
                key={album.id}
                onClick={() => openAlbumModal(album)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Cover Photo with Photo Count Badge */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/photos/morning-assembly-prayer.jpg";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Photo Count Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-amber-300 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-400/40 shadow-md">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{album.photoCount} Photos</span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#0f1f4a]/90 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider">
                      {album.category}
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-2.5 left-3 text-xs text-white font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      <span>{album.date}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-black text-slate-900 text-base leading-snug group-hover:text-[#1a3a8f] transition-colors line-clamp-2">
                      {album.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {album.summary}
                    </p>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                      <MapPin className="w-3 h-3 text-[#1a3a8f]" />
                      <span className="truncate">{album.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="w-full py-2 px-3 rounded-xl bg-blue-50 group-hover:bg-[#0f1f4a] group-hover:text-white text-[#0f1f4a] text-xs font-black transition-colors flex items-center justify-center gap-1.5">
                    <span>View Album ({album.photoCount} Photos)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. NOTICE & MEETING ANNOUNCEMENT CORNER (FEATURE 2) */}
      {/* ========================================================================= */}
      <section id="announcement-corner" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Announcement Hub
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
              Official Notices &amp; Faculty Meetings Corner
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Stay informed with daily administrative circulars, examination schedules, and teacher coordination meetings.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex gap-2 border border-slate-200 shadow-inner">
              <button
                onClick={() => setAnnouncementTab("notices")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  announcementTab === "notices"
                    ? "bg-[#0f1f4a] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Megaphone className="w-4 h-4 text-amber-400" />
                School Circulars &amp; Notices ({(cmsData.notices?.length || DEFAULT_NOTICES.length)})
              </button>

              <button
                onClick={() => setAnnouncementTab("meetings")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                  announcementTab === "meetings"
                    ? "bg-[#0f1f4a] text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Users className="w-4 h-4 text-sky-400" />
                Faculty &amp; Staff Meetings ({(cmsData.staffMeetings?.length || DEFAULT_MEETINGS.length)})
              </button>
            </div>
          </div>

          {/* TAB 1: SCHOOL CIRCULARS & NOTICES */}
          {announcementTab === "notices" && (
            <div className="space-y-4 max-w-5xl mx-auto animate-fadeIn">
              {(cmsData.notices?.length ? cmsData.notices : DEFAULT_NOTICES).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(notice)}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 hover:shadow-md flex flex-col md:flex-row gap-5 items-start md:items-center justify-between cursor-pointer group ${
                    notice.urgent ? "border-amber-300 bg-amber-50/20" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="bg-[#0f1f4a] text-white rounded-2xl p-2.5 w-16 h-18 text-center flex flex-col justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <span className="text-2xl font-black leading-none text-amber-300">{notice.day}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">{notice.month}</span>
                    </div>

                    {/* Notice Text */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1a3a8f] border border-blue-200">
                          {notice.category}
                        </span>
                        {notice.urgent && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-1 animate-pulse">
                            <AlertCircle className="w-3 h-3" /> Priority Notice
                          </span>
                        )}
                        {notice.refNo && (
                          <span className="font-mono text-[10px] text-slate-600 font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            {notice.refNo}
                          </span>
                        )}
                        {notice.targetAudience && (
                          <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                            🎯 {notice.targetAudience}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">Published: {notice.date}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#1a3a8f] transition-colors">
                        {notice.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl line-clamp-2">
                        {notice.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotice(notice);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-[#1a3a8f] text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" /> Read Full Circular &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: FACULTY & STAFF MEETINGS */}
          {announcementTab === "meetings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto animate-fadeIn">
              {(cmsData.staffMeetings?.length ? cmsData.staffMeetings : DEFAULT_MEETINGS).map((meet) => (
                <div
                  key={meet.id}
                  onClick={() => setSelectedMeeting(meet)}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                          meet.status === "Scheduled"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}>
                          {meet.status}
                        </span>
                        {meet.priority && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            {meet.priority}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-[#0f1f4a] bg-blue-50 px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-blue-100">
                        <MapPin className="w-3 h-3 text-[#1a3a8f]" /> {meet.location}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 leading-snug group-hover:text-[#1a3a8f] transition-colors">
                      {meet.title}
                    </h4>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                      <div>
                        <span className="font-semibold text-slate-400 block">Date:</span>
                        <span className="font-bold">{meet.date}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-400 block">Time:</span>
                        <span className="font-bold">{meet.time}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60">
                        <span className="font-semibold text-slate-400 block">Attendees:</span>
                        <span className="font-bold text-[#0f1f4a]">{meet.attendees}</span>
                      </div>
                      {meet.chairedBy && (
                        <div className="col-span-2 pt-1 border-t border-slate-200/60">
                          <span className="font-semibold text-slate-400 block">Chaired By:</span>
                          <span className="font-bold text-blue-900">{meet.chairedBy}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Meeting Agenda:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {meet.agenda}
                      </p>
                    </div>

                    {meet.notes && (
                      <div className="text-[11px] bg-amber-50 border border-amber-200 p-2 rounded-lg text-amber-900 font-medium">
                        <strong>Note:</strong> {meet.notes}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Authorized Faculty Circular</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMeeting(meet);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-[#0f1f4a] hover:text-white text-[#0f1f4a] font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-sky-500" /> View Complete Agenda &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. ACADEMICS SECTION */}
      {/* ========================================================================= */}
      <section id="academics" className="py-16 bg-[#f8fafc] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Curriculum &amp; Stages
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
              Structured Academic Stages
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From early childhood play-way methods through secondary board level rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(cmsData.academics && cmsData.academics.length > 0 ? cmsData.academics : DEFAULT_CMS_DATA.academics).map((wing, idx) => (
              <div key={wing.id || idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
                <div className="text-xs font-black uppercase text-amber-600 mb-1">{wing.badge}</div>
                <h3 className="text-xl font-black text-[#0f1f4a] mb-2">{wing.name} ({wing.classes})</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {wing.description}
                </p>
                <ul className="text-xs space-y-1.5 font-semibold text-slate-700">
                  {(wing.points || []).map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. ADMISSIONS CALLOUT */}
      {/* ========================================================================= */}
      <section id="admissions" className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-12 text-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-wider bg-slate-950 text-white px-3.5 py-1 rounded-full inline-block">
            Enrollment 2026–27
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            Admissions Open for Session 2026–27
          </h2>
          <p className="text-sm sm:text-base font-semibold max-w-2xl mx-auto text-slate-900">
            Nursery to Class 10th &bull; No Login Required &bull; Free Campus Prospectus
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`tel:${school.helplinePhone?.replace(/\s+/g, '') || "07016560240"}`}
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" /> Call Admissions Desk: {school.helplinePhone || "070165 60240"}
            </a>
            <a
              href={`https://wa.me/${school.helplinePhone?.replace(/\D/g, '') || "917016560240"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. CAMPUS FACILITIES */}
      {/* ========================================================================= */}
      <section id="facilities" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
              Campus Infrastructure &amp; Amenities
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(cmsData.facilities && cmsData.facilities.length > 0 ? cmsData.facilities : DEFAULT_CMS_DATA.facilities).map((fac, idx) => {
              const icons = [Building2, Microscope, BookOpen, Dumbbell, Shield, Star];
              const IconComp = icons[idx % icons.length];
              return (
                <div key={fac.id || idx} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 text-center transition shadow-2xs">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">{fac.title}</span>
                  <span className="text-[10px] text-slate-500 line-clamp-2">{fac.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. SINGLE DEDICATED ADMIN LOGIN CARD */}
      {/* ========================================================================= */}
      <section className="py-14 bg-slate-50 border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="rounded-3xl border-2 border-slate-300 border-t-4 border-t-[#0f1f4a] bg-white p-8 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-[#0f1f4a] text-amber-400 shadow-md flex items-center justify-center shrink-0">
              <Building2 className="h-8 w-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 mb-2">
                <Lock className="h-3 w-3 text-amber-500" /> Authorized Access Only
              </div>
              <h3 className="font-black text-[#0f1f4a] text-xl">School Administrator Console</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Restricted portal for principal desk, admissions validation, and official school record maintenance.
              </p>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4 text-amber-400" /> Admin Login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. CAMPUS CONTACT & LOCATION */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 bg-[#f8fafc] border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 inline-block mb-3">
              Reach Out
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0f1f4a]">
              Campus Location &amp; Contact Info
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0f1f4a] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0f1f4a]">School Campus</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {school.location || "Haflaganj, Sirnia West, Katihar, Bihar - 854103"}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0f1f4a]">Direct Helplines</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Phone: <a href={`tel:${school.helplinePhone?.replace(/\s+/g, '') || "07016560240"}`} className="font-bold text-[#1a3a8f]">{school.helplinePhone || "070165 60240"}</a><br />
                  Office: <a href={`tel:${school.officePhone?.replace(/\s+/g, '') || "+917016560240"}`} className="font-bold text-[#1a3a8f]">{school.officePhone || "+91 70165 60240"}</a>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0f1f4a]">Official Email</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {school.email || "shyammemorialhafla@gmail.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Map Representation */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Campus Location Map</h4>
                <p className="text-xs text-slate-500">Haflaganj, Sirnia West, Katihar (Bihar)</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Dr+Shyam+Memorial+Public+School+Haflaganj+Katihar"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" /> Open in Google Maps
              </a>
            </div>

            <div className="w-full h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <iframe
                title="School Location Map"
                src="https://maps.google.com/maps?q=Haflaganj%2C%20Katihar%20Bihar%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. INSTITUTIONAL FOOTER */}
      {/* ========================================================================= */}
      <InstitutionalFooter />

      {/* ========================================================================= */}
      {/* 16. INTERACTIVE MULTI-PHOTO ALBUM LIGHTBOX MODAL (FEATURE 1) */}
      {/* ========================================================================= */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-300">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0f1f4a] to-[#1a3a8f] text-white flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                    {selectedAlbum.category}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{selectedAlbum.date} &bull; {selectedAlbum.location}</span>
                </div>
                <h3 className="text-base sm:text-xl font-black text-white mt-1 leading-snug">
                  {selectedAlbum.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAlbum(null)}
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition"
                aria-label="Close Album"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Photo Viewer + Description */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              
              {/* Main Active Photo Frame */}
              <div className="relative h-[280px] sm:h-[420px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
                <img
                  src={selectedAlbum.photos[activePhotoIndex].url}
                  alt={selectedAlbum.photos[activePhotoIndex].caption}
                  className="w-full h-full object-contain"
                />

                {/* Left/Right Arrows */}
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setActivePhotoIndex((prev) => (prev + 1) % selectedAlbum.photos.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Photo Counter */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  {activePhotoIndex + 1} / {selectedAlbum.photos.length} Photos
                </div>

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 text-xs text-white font-medium">
                  {selectedAlbum.photos[activePhotoIndex].caption}
                </div>
              </div>

              {/* Thumbnails Filmstrip Selector */}
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                  Click to View Photo in High Resolution:
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {selectedAlbum.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        idx === activePhotoIndex
                          ? "border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/50"
                          : "border-slate-300 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={p.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Event Details & Story */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-black text-[#0f1f4a] text-sm sm:text-base">
                  Event Story &amp; Details
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedAlbum.fullStory}
                </p>

                <div className="pt-2 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Key Highlights &amp; Outcomes:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    {selectedAlbum.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-1">
                  <strong>Participants:</strong> {selectedAlbum.participants}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Dr. Shyam Memorial Public School, Haflaganj</span>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="px-5 py-2 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold transition cursor-pointer"
              >
                Close Album
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 14. SLIDE-OVER FULL READER DRAWER (NOTICES & STAFF MEETINGS) */}
      {/* ========================================================================= */}
      {(selectedNotice || selectedMeeting) && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => {
            setSelectedNotice(null);
            setSelectedMeeting(null);
          }}
        >
          <div
            className="w-full max-w-xl sm:max-w-2xl bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out translate-x-0 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-[#0a1128] via-[#0f1f4a] to-[#1a3a8f] text-white p-5 sm:p-6 border-b border-amber-400/40 relative shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border-2 border-amber-400 overflow-hidden shrink-0 shadow-md">
                    <img src="/logo.png" alt="DSMPS" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30">
                      {selectedNotice ? "Official Institutional Circular" : "Faculty Council Coordination"}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1 leading-snug">
                      Dr. Shyam Memorial Public School
                    </h3>
                    <p className="text-[11px] text-slate-300">Haflaganj, Sirnia West, Katihar, Bihar - 854103</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedNotice(null);
                    setSelectedMeeting(null);
                  }}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition shrink-0"
                  aria-label="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Statutory Strip in Drawer Header */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-300 font-medium gap-1">
                <span>RTE Recognition No.: <strong className="text-amber-300 font-mono">{school.recognitionNo || "212115120221118160113"}</strong></span>
                <span>UDISE+: <strong className="text-amber-300 font-mono">{school.udiseNo || "10100106805"}</strong></span>
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* NOTICE CONTENT */}
              {selectedNotice && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-blue-100 text-[#0f1f4a] border border-blue-200">
                        {selectedNotice.category}
                      </span>
                      {selectedNotice.urgent && (
                        <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1.5 animate-pulse">
                          <AlertCircle className="w-3.5 h-3.5" /> High Priority Alert
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-900" />
                      Date of Circular: <strong className="text-slate-900">{selectedNotice.date}</strong>
                    </div>
                  </div>

                  {/* Circular Reference Number & Target Audience */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-500 font-mono">Ref No: </span>
                      <strong className="text-slate-800 font-mono">{selectedNotice.refNo || `DSMPS/CIR/2026/${selectedNotice.id.toUpperCase()}`}</strong>
                    </div>
                    {selectedNotice.targetAudience && (
                      <div className="bg-amber-100/70 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300/60">
                        🎯 Applicable For: {selectedNotice.targetAudience}
                      </div>
                    )}
                  </div>

                  {/* Notice Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                    {selectedNotice.title}
                  </h2>

                  {/* Optional Attachment Document Button */}
                  {selectedNotice.attachmentName && (
                    <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-5 h-5 text-[#1a3a8f] shrink-0" />
                        <div>
                          <div className="text-xs font-black text-[#0f1f4a]">{selectedNotice.attachmentName}</div>
                          <div className="text-[10px] text-slate-500">Official attachment document</div>
                        </div>
                      </div>
                      <a
                        href={selectedNotice.attachmentUrl || "#"}
                        target={selectedNotice.attachmentUrl?.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition shrink-0"
                      >
                        Download / View &rarr;
                      </a>
                    </div>
                  )}

                  {/* Official Notification Body */}
                  <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border-2 border-slate-200/90 shadow-inner space-y-4">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#1a3a8f]" /> Notification Text &amp; Directives:
                    </div>
                    
                    <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal whitespace-pre-line space-y-3">
                      <p>{selectedNotice.description}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500 italic">
                      All parents, students, and staff members are requested to take note of the above circular and adhere to the scheduled timelines accordingly.
                    </div>
                  </div>

                  {/* Official Seal & Signature Authority */}
                  <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#0f1f4a] text-amber-300 flex items-center justify-center font-black text-lg border-2 border-amber-400 shadow-sm shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 uppercase">
                          Authorized Institutional Notification
                        </div>
                        <div className="text-[11px] text-slate-600">
                          {selectedNotice.issuedBy || "Office of the Principal & Secretariat • Haflaganj"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-500 font-medium">
                      <span>Valid For Academic Session: 2026–27</span>
                    </div>
                  </div>

                </div>
              )}

              {/* MEETING CONTENT */}
              {selectedMeeting && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Status, Priority & Location Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                        selectedMeeting.status === "Scheduled"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-slate-100 text-slate-700 border border-slate-300"
                      }`}>
                        {selectedMeeting.status}
                      </span>
                      {selectedMeeting.priority && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                          {selectedMeeting.priority}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#0f1f4a] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#1a3a8f]" /> {selectedMeeting.location}
                    </span>
                  </div>

                  {/* Meeting Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                    {selectedMeeting.title}
                  </h2>

                  {/* 4-Box Key Schedule Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-400 block mb-0.5">Date:</span>
                      <strong className="text-slate-900 text-sm">{selectedMeeting.date}</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-400 block mb-0.5">Scheduled Time:</span>
                      <strong className="text-slate-900 text-sm">{selectedMeeting.time}</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                      <span className="font-semibold text-slate-400 block mb-0.5">Chaired / Presided By:</span>
                      <strong className="text-[#0f1f4a] text-xs sm:text-sm">{selectedMeeting.chairedBy || "Col. Uday Shankar Verma / Smt. Mamta Verma"}</strong>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                      <span className="font-semibold text-slate-400 block mb-0.5">Invited Faculty / Attendees:</span>
                      <strong className="text-[#0f1f4a] text-xs sm:text-sm">{selectedMeeting.attendees}</strong>
                    </div>
                  </div>

                  {/* Agenda Section */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Users className="w-4 h-4 text-sky-600" /> Complete Agenda &amp; Discussion Points:
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                      {selectedMeeting.agenda}
                    </p>
                  </div>

                  {/* Key Decisions / MoM if present */}
                  {selectedMeeting.decisions && selectedMeeting.decisions.length > 0 && (
                    <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                      <div className="text-xs font-black text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Key Decisions &amp; Resolutions (MoM):
                      </div>
                      <ul className="text-xs space-y-1.5 font-medium text-emerald-900">
                        {selectedMeeting.decisions.map((dec, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">&bull;</span>
                            <span>{dec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notes / Special Instructions */}
                  {selectedMeeting.notes && (
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                      <div className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Faculty Instructions &amp; Preparation:
                      </div>
                      <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                        {selectedMeeting.notes}
                      </p>
                    </div>
                  )}

                  {/* Authority Footer Note */}
                  <div className="text-xs text-slate-500 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span>Meeting Secretariat: Principal Chamber</span>
                    <span>DSMPS Haflaganj</span>
                  </div>

                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" /> Print
                </button>
                <button
                  onClick={() => {
                    const textToCopy = selectedNotice
                      ? `Dr. Shyam Memorial Public School, Haflaganj\n\nCircular: ${selectedNotice.title}\nDate: ${selectedNotice.date}\nCategory: ${selectedNotice.category}\n\n${selectedNotice.description}\n\nRecognition No.: 212115120221118160113`
                      : selectedMeeting
                      ? `Dr. Shyam Memorial Public School, Haflaganj\n\nStaff Meeting: ${selectedMeeting.title}\nDate & Time: ${selectedMeeting.date} at ${selectedMeeting.time}\nVenue: ${selectedMeeting.location}\nAttendees: ${selectedMeeting.attendees}\n\nAgenda:\n${selectedMeeting.agenda}\n\nNotes: ${selectedMeeting.notes || "None"}`
                      : "";
                    handleCopyNoticeText(textToCopy);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 shadow-2xs transition cursor-pointer"
                >
                  {copiedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-600" /> Copy Text
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedNotice(null);
                  setSelectedMeeting(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#0f1f4a] hover:bg-[#1a3a8f] text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Close Reader
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
