"use client";

/* --------------------------------------------------------------------------
   DSMPS CMS DATA STORE & STATE MANAGER
   Handles Day-to-Day Events, Photo Albums, Top Marquee Ticker,
   Notices, Staff Meetings, and Leadership Messages with Local & Cloud Sync.
-------------------------------------------------------------------------- */

export interface EventPhoto {
  url: string;
  caption: string;
}

export interface ActivityEventAlbum {
  id: string;
  title: string;
  category: "National Festivals" | "Assemblies" | "Cultural & Arts" | "Academic & Labs" | "Campus Life" | "Sports & Athletics";
  date: string;
  location: string;
  participants: string;
  coverImage: string;
  photoCount: number;
  photos: EventPhoto[];
  summary: string;
  fullStory: string;
  highlights: string[];
  featuredInHero?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: "Examination" | "Admissions" | "Academic" | "Holiday" | "Administrative";
  date: string;
  day: string;
  month: string;
  description: string;
  urgent?: boolean;
  refNo?: string;
  targetAudience?: string;
  issuedBy?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  addToTicker?: boolean;
}

export interface StaffMeetingItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string;
  agenda: string;
  status: "Scheduled" | "Completed";
  notes?: string;
  chairedBy?: string;
  priority?: "Routine" | "High Priority" | "Urgent" | "Statutory";
  decisions?: string[];
}

export interface LeadershipProfile {
  name: string;
  title: string;
  role: string;
  badge: string;
  photoUrl: string;
  quote: string;
  fullMessage: string;
  pillars: string[];
}

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
  badgeText: string;
  orderIndex: number;
  active: boolean;
}

export interface SchoolIdentityConfig {
  name: string;
  tagline: string;
  motto: string;
  location: string;
  establishedYear: string;
  recognitionText: string;
  recognitionNo: string;
  udiseNo: string;
  helplinePhone: string;
  officePhone: string;
  email: string;
  officeTimings: string;
  admissionCtaLabel: string;
  admissionSubtext: string;
  logoUrl: string;
}

export interface StatItemConfig {
  value: string;
  label: string;
}

export interface AcademicWingConfig {
  id: string;
  name: string;
  classes: string;
  description: string;
  badge: string;
  points: string[];
}

export interface FacilityItemConfig {
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface DeveloperCreditConfig {
  name: string;
  title: string;
  role: string;
  githubOrPortfolio: string;
  contact: string;
  note: string;
}

export interface CmsSiteData {
  version: number;
  lastUpdated: string;
  schoolIdentity: SchoolIdentityConfig;
  tickerAnnouncements: string[];
  heroSlides: HeroSlideItem[];
  stats: {
    students: StatItemConfig;
    faculty: StatItemConfig;
    heritage: StatItemConfig;
    curriculum: StatItemConfig;
  };
  activityAlbums: ActivityEventAlbum[];
  notices: NoticeItem[];
  staffMeetings: StaffMeetingItem[];
  leadership: {
    chairman: LeadershipProfile;
    principal: LeadershipProfile;
  };
  academics: AcademicWingConfig[];
  facilities: FacilityItemConfig[];
  developer: DeveloperCreditConfig;
}

/* --------------------------------------------------------------------------
   DEFAULT AUTHENTIC DATA
-------------------------------------------------------------------------- */
export const DEFAULT_CMS_DATA: CmsSiteData = {
  version: 2,
  lastUpdated: "2026-10-04T09:20:00Z",
  schoolIdentity: {
    name: "Dr. Shyam Memorial Public School",
    tagline: "Enlightening Lives",
    motto: "Discipline, Academic Rigor & Moral Excellence",
    location: "Haflaganj, Sirnia West, Katihar, Bihar - 854103",
    establishedYear: "2016",
    recognitionText: "Recognized by District Education Office, Katihar • Education Department, Govt. of Bihar • Under RTE Act, 2009",
    recognitionNo: "212115120221118160113",
    udiseNo: "10100106805",
    helplinePhone: "070165 60240",
    officePhone: "+91 70165 60240",
    email: "shyammemorialhafla@gmail.com",
    officeTimings: "Mon–Sat: 08:00 AM – 03:00 PM",
    admissionCtaLabel: "Apply for Admission 2026–27",
    admissionSubtext: "Nursery to Class 10th • CBSE Curriculum",
    logoUrl: "/logo.png"
  },
  heroSlides: [
    {
      id: "slide-1",
      imageUrl: "/photos/IMG_20230815_112245.jpg",
      headline: "77th Independence Day Flag Hoisting & Faculty Felicitation",
      subline: "Dedicated educators, patriotic assemblies and national heritage celebration",
      ctaLabel: "View Independence Day Album (4 Photos)",
      ctaHref: "#activities",
      badgeText: "Patriotic Celebration • Haflaganj Campus",
      orderIndex: 1,
      active: true
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
      active: true
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
      active: true
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
      active: true
    }
  ],
  stats: {
    students: { value: "212+", label: "Active Students" },
    faculty: { value: "24+", label: "Dedicated Faculty" },
    heritage: { value: "10+", label: "Years of Heritage" },
    curriculum: { value: "100%", label: "CBSE Curriculum" }
  },
  tickerAnnouncements: [
    "⭐ Admissions Open for Academic Session 2026–27 (Nursery to Class 10th) — Apply Online Now!",
    "📋 Half-Yearly (SA-I) Examinations Timetable & Syllabus released for all classes.",
    "🇮🇳 77th Independence Day Celebrations & Staff Felicitation highlights updated in Album Gallery.",
    "👥 Parent-Teacher Meeting (PTM) scheduled for Saturday, 10:00 AM – 1:00 PM.",
    "🏆 DSMPS students awarded 3rd place in District Inter-School Science Exhibition.",
    "🚌 School Bus & Van routes operating smoothly across Haflaganj & Katihar.",
    "❄️ Prescribed winter uniform guidelines effective from 1st November."
  ],
  activityAlbums: [
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
      highlights: [
        "Tricolour Flag Hoisting & Guard of Honour",
        "Patriotic Speeches & Choir Hymns",
        "Faculty Honor Roll & Token of Appreciation",
        "Traditional Sweets Distribution"
      ],
      featuredInHero: true
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
          url: "/photos/classroom-art-drawing.jpg",
          caption: "Morning discipline drill, posture alignment and physical exercises."
        }
      ],
      summary: "Daily morning assembly begins with meditative prayers, daily Hindi/English news bulletin, thought for the day, and national anthem.",
      fullStory: "Dr. Shyam Memorial Public School places sacred importance on beginning every school day with mindfulness, ethical values, and physical alignment. Guided by senior mentors and student captains, students take the integrity pledge, recite inspiring thoughts, and hear words of guidance from Principal Smt. Mamta Verma.",
      highlights: [
        "Universal Prayer with Folded Hands",
        "Daily News Bulletin & GK Quiz",
        "House Captain Discipline Inspection",
        "National Anthem Chorus"
      ]
    },
    {
      id: "act-annual-function",
      title: "Annual Cultural Day & Merit Awards Ceremony ('Umang')",
      category: "Cultural & Arts",
      date: "Annual Celebration",
      location: "Central Campus Auditorium",
      participants: "Students, Parents, Faculty & Community Leaders",
      coverImage: "/photos/annual-function-stage.jpg",
      photoCount: 3,
      photos: [
        {
          url: "/photos/annual-function-stage.jpg",
          caption: "Stage dignitaries and honorable patrons on the fest podium with commemorative garlands."
        },
        {
          url: "/photos/educational-trust-banner.jpg",
          caption: "Campus gathering celebrating the founding principles of Enlightening Lives Trust."
        },
        {
          url: "/photos/IMG_20230815_112245.jpg",
          caption: "Faculty & leadership felicitated during the annual gathering."
        }
      ],
      summary: "A vibrant showcase of musical dramas, regional folk dances, academic toppers felicitation, and founder address.",
      fullStory: "The Annual Function is the flagship cultural festival of DSMPS. Students showcase months of dedication in music, classical dance, skits, and public oration. Academic shields and sports medals are conferred on outstanding achievers in the presence of esteemed district guests.",
      highlights: [
        "Academic Excellence Trophies",
        "Bhojpuri & Maithili Folk Dances",
        "Chairman's Annual Address",
        "Parents & Alumni Meet"
      ]
    },
    {
      id: "act-classroom-art",
      title: "Primary Wing Creative Art, Science Drawings & Craft Expo",
      category: "Academic & Labs",
      date: "Weekly Practical Period",
      location: "Primary Block Activity Room",
      participants: "Classes 1st to 5th Students",
      coverImage: "/photos/classroom-art-drawing.jpg",
      photoCount: 2,
      photos: [
        {
          url: "/photos/classroom-art-drawing.jpg",
          caption: "Students proudly displaying colorful wildlife and bird drawing sheets on DSMPS study tables."
        },
        {
          url: "/photos/morning-assembly-prayer.jpg",
          caption: "Hands-on model building, origami crafts, and geometric puzzle workshops."
        }
      ],
      summary: "Nurturing aesthetic appreciation and fine motor creativity through freehand drawing, clay modelling, and science sketches.",
      fullStory: "At DSMPS, creative arts are seamlessly integrated into academic learning. During weekly art and experiential learning periods, students illustrate concepts from Environmental Studies (EVS), biological flora and fauna, and regional geography, cultivating both imagination and precision.",
      highlights: [
        "Color Palette Mastery",
        "EVS Science Illustration Sheets",
        "Peer Exhibition on Display Boards",
        "Teacher Mentorship"
      ]
    }
  ],
  notices: [
    {
      id: "not-1",
      title: "Admission Open for Academic Session 2026–27 (Nursery to Class 10th)",
      category: "Admissions",
      date: "15 Oct 2026",
      day: "15",
      month: "Oct",
      description: "Registration forms and prospectus for the upcoming session 2026-27 are now available at the school administrative counter and through the online portal.",
      urgent: true,
      refNo: "DSMPS/ADM/2026-27/018",
      targetAudience: "All Prospective Students & Parents",
      issuedBy: "Principal Office (Smt. Mamta Verma)",
      attachmentName: "Session 2026-27 Prospectus & Fee Structure",
      attachmentUrl: "#admissions"
    },
    {
      id: "not-2",
      title: "Half-Yearly (SA-I) Examination Timetable & Syllabus Circular",
      category: "Examination",
      date: "10 Oct 2026",
      day: "10",
      month: "Oct",
      description: "Detailed date-sheet for classes 1st to 10th has been released. Parents are requested to ensure regular revision and timely attendance during exam days.",
      urgent: true,
      refNo: "DSMPS/EXAM/2026/042",
      targetAudience: "Classes 1st to 10th Scholars",
      issuedBy: "Examination Controller & Headmaster",
      attachmentName: "Download SA-I Timetable & Portion PDF",
      attachmentUrl: "#"
    },
    {
      id: "not-3",
      title: "Parent-Teacher Meeting (PTM) for Term 1 Review",
      category: "Academic",
      date: "05 Oct 2026",
      day: "05",
      month: "Oct",
      description: "PTM will be conducted this Saturday from 10:00 AM to 01:00 PM. Parents are encouraged to discuss report cards and behavioral growth with subject teachers.",
      urgent: false,
      refNo: "DSMPS/PTM/2026/009",
      targetAudience: "All Parents & Guardians",
      issuedBy: "Academic Coordination Council",
      attachmentName: "PTM Schedule & Slot Timings",
      attachmentUrl: "#"
    },
    {
      id: "not-4",
      title: "Autumn Break & Festival Vacation Notification",
      category: "Holiday",
      date: "02 Oct 2026",
      day: "02",
      month: "Oct",
      description: "The school will observe autumn holidays as per state educational calendar. Structured holiday assignments have been distributed.",
      urgent: false,
      refNo: "DSMPS/HOL/2026/014",
      targetAudience: "All Students, Parents & Staff",
      issuedBy: "Administrative Office",
      attachmentName: "Holiday Homework Booklet (All Classes)",
      attachmentUrl: "#"
    },
    {
      id: "not-5",
      title: "Winter School Uniform Dress Code & Guidelines",
      category: "Administrative",
      date: "26 Sep 2026",
      day: "26",
      month: "Sep",
      description: "Prescribed navy blazers, cardigans, and woollen sweaters are mandatory starting 1st November. Available at authorized uniform counters.",
      urgent: false,
      refNo: "DSMPS/ADM/2026/033",
      targetAudience: "All Enrolled Students",
      issuedBy: "Discipline & Proctorial Board"
    }
  ],
  staffMeetings: [
    {
      id: "meet-1",
      title: "Bi-Weekly Academic Review & CBSE Pattern Syllabus Audit",
      date: "07 Oct 2026",
      time: "03:30 PM – 04:45 PM",
      location: "Conference Hall (Admin Block)",
      attendees: "All TGT, PRT & Mother Teachers",
      agenda: "Review of completed syllabus, notebook corrections audit, remedial classes for slow learners, and question paper submission for upcoming SA-I.",
      status: "Scheduled",
      chairedBy: "Col. Uday Shankar Verma (Chairman)",
      priority: "High Priority",
      notes: "Please carry latest lesson plans and monthly attendance registers."
    },
    {
      id: "meet-2",
      title: "Staff Coordination & Discipline Council Meeting",
      date: "28 Sep 2026",
      time: "03:15 PM – 04:15 PM",
      location: "Principal Chamber",
      attendees: "House Mentors, PTI & Section In-charges",
      agenda: "Bus route monitoring, student punctuality in morning assemblies, and anti-bullying guidelines compliance review.",
      status: "Completed",
      chairedBy: "Smt. Mamta Verma (Principal)",
      priority: "Routine",
      notes: "House mentors assigned weekly assembly themes."
    },
    {
      id: "meet-3",
      title: "Pre-Primary Pedagogy & Experiential Activity Workshop",
      date: "21 Sep 2026",
      time: "02:30 PM – 04:00 PM",
      location: "Kindergarten Activity Wing",
      attendees: "Nursery, LKG & UKG Faculty",
      agenda: "Implementation of play-based phonics, gross motor activity charts, and healthy lunchbox monitoring.",
      status: "Completed",
      chairedBy: "Smt. Mamta Verma (Principal)",
      priority: "Routine",
      notes: "Flashcards and rhymes schedule updated."
    }
  ],
  leadership: {
    chairman: {
      name: "Col. Uday Shankar Verma",
      title: "Indian Army Veteran",
      role: "Chairman & Managing Trustee",
      badge: "Founder & Chairman Desk",
      photoUrl: "/photos/chairman-col-uday-shankar-verma.jpg",
      quote: "Discipline, patriotism, and unyielding character form the bedrock upon which real knowledge flourishes.",
      fullMessage: "Having served the Indian Army with honour, my lifelong conviction remains that education is not merely the accumulation of facts from textbooks, but the forging of character, courage, and civic responsibility. At Dr. Shyam Memorial Public School, we infuse the same steadfast discipline, moral rectitude, and love for our motherland that drives our armed forces. Every child in Haflaganj and Katihar deserves world-class learning grounded in authentic Indian ethos. We pledge to shape young citizens who stand tall, think critically, and serve our society with fearless integrity.",
      pillars: [
        "Army-grade discipline, punctual habits & moral rectitude",
        "Deep patriotic ethos & respect for national traditions",
        "Rural empowerment through high-standard schooling"
      ]
    },
    principal: {
      name: "Smt. Mamta Verma",
      title: "M.A., B.Ed. • Senior Educator",
      role: "Principal & Academic Head",
      badge: "Academic Leadership",
      photoUrl: "/photos/headmaster-mamta-verma.jpg",
      quote: "Every child is endowed with boundless potential; our sacred mission is to guide that spark into a shining flame of wisdom.",
      fullMessage: "As the Principal of Dr. Shyam Memorial Public School, I welcome every family seeking an environment where children are heard, encouraged, and guided toward academic and moral excellence. Our pedagogical approach blends structured CBSE curricula with joyful co-curricular discovery. In every classroom, from Nursery through Class 10th, our faculty nurtures curiosity, emotional well-being, and scientific thinking. We partner closely with parents to ensure that every student graduates not only with high marks, but with deep empathy, respectful speech, and resolute confidence.",
      pillars: [
        "Child-centric pedagogy blending modern concepts with foundational values",
        "Continuous comprehensive evaluation & remedial care",
        "Transparent, warm communication with parents & guardians"
      ]
    }
  },
  academics: [
    {
      id: "wing-preprimary",
      name: "Pre-Primary Foundation Wing",
      classes: "Nursery, LKG & UKG",
      badge: "Play-Based Early Childhood",
      description: "Montessori-inspired foundational curriculum focusing on phonetic awareness, fine-motor coordination, sensory puzzles, and joyful social interaction.",
      points: [
        "Phonics & Vocabulary Builder",
        "Sensory Discovery & Math Counting",
        "Weekly Coloring & Story Circles",
        "Child-Safe Mother Teacher Care"
      ]
    },
    {
      id: "wing-primary",
      name: "Primary Scholastic Wing",
      classes: "Class 1st to 5th",
      badge: "CBSE Foundational Stage",
      description: "Comprehensive instruction in English, Hindi, Mathematics, and Environmental Studies (EVS), developing reading fluency, arithmetic logic, and moral virtues.",
      points: [
        "Spelling Bee & Mental Math",
        "Science Illustration Sheets",
        "Hindi & English Handwriting Drill",
        "Environmental Project Work"
      ]
    },
    {
      id: "wing-middle",
      name: "Middle School Wing",
      classes: "Class 6th to 8th",
      badge: "Experiential & Scientific",
      description: "Subject-specialized pedagogy covering General Science, Social Studies, Mathematics, and Computer Applications with hands-on laboratory demonstrations.",
      points: [
        "Science Demonstration Sessions",
        "Social Science Regional Mapping",
        "Structured Problem Solving",
        "Introduction to Digital Literacy"
      ]
    },
    {
      id: "wing-secondary",
      name: "Secondary Board Preparation",
      classes: "Class 9th & 10th",
      badge: "Board Exam Excellence",
      description: "Rigorous academic preparation according to the latest CBSE pattern, periodic mock assessments, remedial booster batches, and individualized mentor feedback.",
      points: [
        "Periodic Unit Assessments & SA-I",
        "Formula Sheets & Board Question Banks",
        "Remedial Doubt-Clearing Classes",
        "Career Guidance & Character Mentorship"
      ]
    }
  ],
  facilities: [
    {
      id: "fac-1",
      title: "Smart Ventilated Classrooms",
      description: "Airy, well-lit classrooms fitted with ergonomic student desks, display boards, and teaching audio-visual aids for interactive engagement.",
      tag: "Academic Infrastructure"
    },
    {
      id: "fac-2",
      title: "Science & Discovery Corner",
      description: "Equipped with biological specimens, physical balance sets, prisms, and charts to make theoretical concepts experiential and tangible.",
      tag: "Experiential Learning"
    },
    {
      id: "fac-3",
      title: "School Library & Reading Zone",
      description: "Rich collection of illustrated storybooks, Hindi literature, encyclopedias, and reference volumes cultivating lifelong reading habits.",
      tag: "Knowledge Resource"
    },
    {
      id: "fac-4",
      title: "Computer & ICT Laboratory",
      description: "Modern computer systems with guided computing periods, typing drills, and foundational software literacy for primary and middle grades.",
      tag: "Digital Literacy"
    },
    {
      id: "fac-5",
      title: "Sports, Athletics & Yoga Ground",
      description: "Expansive outdoor courtyard for football, cricket, volleyball, morning yoga drills, and structured physical training sessions.",
      tag: "Health & Stamina"
    },
    {
      id: "fac-6",
      title: "Safe Transport Fleet",
      description: "Dedicated school vans and buses covering Haflaganj, Sirnia West, and adjoining rural pockets with trained attendants and speed monitoring.",
      tag: "Safety & Commute"
    }
  ],
  developer: {
    name: "Anand Kr. Mandal",
    title: "Full-Stack Software Engineer & System Architect",
    role: "Lead Platform Developer & Webmaster",
    githubOrPortfolio: "https://github.com",
    contact: "+91 70165 60240 / shyammemorialhafla@gmail.com",
    note: "Official Developer & Master Component Architect for Dr. Shyam Memorial Public School (DSMPS) Cloud Portal."
  }
};

/* --------------------------------------------------------------------------
   STORAGE HELPERS
-------------------------------------------------------------------------- */
const STORAGE_KEY = "dsmps_cms_data_v2";

export function getCmsData(): CmsSiteData {
  if (typeof window === "undefined") {
    return DEFAULT_CMS_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_CMS_DATA;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CMS_DATA,
      ...parsed,
      schoolIdentity: { ...DEFAULT_CMS_DATA.schoolIdentity, ...parsed.schoolIdentity },
      heroSlides: parsed.heroSlides?.length ? parsed.heroSlides : DEFAULT_CMS_DATA.heroSlides,
      stats: { ...DEFAULT_CMS_DATA.stats, ...parsed.stats },
      activityAlbums: parsed.activityAlbums?.length ? parsed.activityAlbums : DEFAULT_CMS_DATA.activityAlbums,
      tickerAnnouncements: parsed.tickerAnnouncements?.length ? parsed.tickerAnnouncements : DEFAULT_CMS_DATA.tickerAnnouncements,
      notices: parsed.notices?.length ? parsed.notices : DEFAULT_CMS_DATA.notices,
      staffMeetings: parsed.staffMeetings?.length ? parsed.staffMeetings : DEFAULT_CMS_DATA.staffMeetings,
      leadership: {
        chairman: {
          ...DEFAULT_CMS_DATA.leadership.chairman,
          ...parsed.leadership?.chairman,
          photoUrl: parsed.leadership?.chairman?.photoUrl || DEFAULT_CMS_DATA.leadership.chairman.photoUrl
        },
        principal: {
          ...DEFAULT_CMS_DATA.leadership.principal,
          ...parsed.leadership?.principal,
          photoUrl: parsed.leadership?.principal?.photoUrl || DEFAULT_CMS_DATA.leadership.principal.photoUrl
        }
      },
      academics: parsed.academics?.length ? parsed.academics : DEFAULT_CMS_DATA.academics,
      facilities: parsed.facilities?.length ? parsed.facilities : DEFAULT_CMS_DATA.facilities,
      developer: { ...DEFAULT_CMS_DATA.developer, ...parsed.developer }
    };
  } catch (err) {
    console.error("Error reading CMS store:", err);
    return DEFAULT_CMS_DATA;
  }
}

export function saveCmsData(data: CmsSiteData): void {
  if (typeof window === "undefined") return;

  try {
    const updated = {
      ...data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event so all active tabs/pages update immediately
    window.dispatchEvent(new CustomEvent("dsmps_cms_updated", { detail: updated }));
  } catch (err) {
    console.error("Error saving CMS store:", err);
  }
}

export function resetCmsDataToDefaults(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("dsmps_cms_updated", { detail: DEFAULT_CMS_DATA }));
}

/**
 * Auto-calculates the next sequential Reference Number based on previous notices.
 * Allows institutional sequence numbering (e.g. DSMPS/ADM/2026-27/018 -> 019).
 */
export function generateNextRefNo(
  existingNotices: NoticeItem[] = [],
  category?: string
): { nextRefNo: string; previousRefNo?: string } {
  const currentYear = new Date().getFullYear();
  const nextYearShort = String(currentYear + 1).slice(-2);
  const currentSession = `${currentYear}-${nextYearShort}`;

  const catCodeMap: Record<string, string> = {
    Admissions: "ADM",
    Admission: "ADM",
    Examination: "EXAM",
    Exam: "EXAM",
    Academic: "ACAD",
    Holiday: "HOL",
    Administrative: "ADMIN",
    Admin: "ADMIN",
    Circular: "CIR",
    General: "GEN"
  };

  const code = (category && catCodeMap[category]) || "CIR";

  // Helper to extract numeric parts from reference strings
  const extractParts = (refStr: string) => {
    if (!refStr) return null;
    const trimmed = refStr.trim();
    // 1. Matches patterns ending with digits like DSMPS/ADM/2026-27/018 or REF-105
    const trailingMatch = trimmed.match(/^(.*?)(\d+)$/);
    if (trailingMatch) {
      return {
        prefix: trailingMatch[1],
        num: parseInt(trailingMatch[2], 10),
        padLength: trailingMatch[2].length,
        suffix: ""
      };
    }
    // 2. Matches patterns where number is followed by slash/suffix: e.g. DSMPS/018/2026
    const slashMatch = trimmed.match(/^(.*\/)(\d+)(\/?[^\d]*)$/);
    if (slashMatch) {
      return {
        prefix: slashMatch[1],
        num: parseInt(slashMatch[2], 10),
        padLength: slashMatch[2].length,
        suffix: slashMatch[3]
      };
    }
    return null;
  };

  // 1. Look for matching category or code in existing notices
  const matchingNotices = existingNotices.filter((n) => {
    if (!n.refNo) return false;
    if (category && n.category?.toLowerCase() === category.toLowerCase()) return true;
    return n.refNo.toUpperCase().includes(`/${code}/`) || n.refNo.toUpperCase().includes(`/${code}`);
  });

  if (matchingNotices.length > 0) {
    let maxNum = -1;
    let bestParts: { prefix: string; num: number; padLength: number; suffix?: string } | null = null;
    let latestRef: string = matchingNotices[0].refNo!;

    for (const mn of matchingNotices) {
      if (!mn.refNo) continue;
      const parts = extractParts(mn.refNo);
      if (parts && parts.num > maxNum) {
        maxNum = parts.num;
        bestParts = parts;
        latestRef = mn.refNo;
      }
    }

    if (bestParts) {
      const nextNum = bestParts.num + 1;
      const paddedNextNum = String(nextNum).padStart(Math.max(bestParts.padLength, 3), "0");
      const nextRefNo = `${bestParts.prefix}${paddedNextNum}${bestParts.suffix || ""}`;
      return { nextRefNo, previousRefNo: latestRef };
    }
  }

  // 2. If no direct match in category, look at all existing notices to find highest sequence number
  let maxFoundNum = 0;
  let samplePrefix = `DSMPS/${code}/${currentSession}/`;
  let padLen = 3;
  let previousRef: string | undefined = undefined;

  for (const n of existingNotices) {
    if (!n.refNo) continue;
    const parts = extractParts(n.refNo);
    if (parts) {
      if (!previousRef) previousRef = n.refNo;
      if (parts.num > maxFoundNum) {
        maxFoundNum = parts.num;
        padLen = Math.max(parts.padLength, 3);
      }
    }
  }

  if (maxFoundNum > 0) {
    const nextNum = maxFoundNum + 1;
    const nextRefNo = `${samplePrefix}${String(nextNum).padStart(padLen, "0")}`;
    return { nextRefNo, previousRefNo: previousRef };
  }

  // 3. Fallback default
  return {
    nextRefNo: `DSMPS/${code}/${currentSession}/001`,
    previousRefNo: undefined
  };
}
