"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Camera,
  Megaphone,
  Calendar,
  Users,
  Award,
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Sparkles,
  FileText,
  Clock,
  MapPin,
  Lock,
  ArrowLeft,
  Star
} from "lucide-react";
import {
  CmsSiteData,
  ActivityEventAlbum,
  NoticeItem,
  StaffMeetingItem,
  EventPhoto,
  getCmsData,
  saveCmsData,
  resetCmsDataToDefaults,
  generateNextRefNo,
  DEFAULT_CMS_DATA
} from "@/lib/cms-store";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [cmsData, setCmsData] = useState<CmsSiteData>(DEFAULT_CMS_DATA);
  const [activeTab, setActiveTab] = useState<"overview" | "events" | "ticker" | "leadership" | "backup">("events");
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Form states for creating a new Event
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState<ActivityEventAlbum["category"]>("National Festivals");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("DSMPS Campus, Haflaganj");
  const [eventParticipants, setEventParticipants] = useState("Students, Faculty & Staff");
  const [eventSummary, setEventSummary] = useState("");
  const [eventFullStory, setEventFullStory] = useState("");
  const [eventHighlights, setEventHighlights] = useState("");
  const [eventPhotos, setEventPhotos] = useState<EventPhoto[]>([]);
  const [eventCoverIndex, setEventCoverIndex] = useState(0);
  const [eventFeaturedInHero, setEventFeaturedInHero] = useState<boolean>(true);

  // Form state for Ticker
  const [newTickerText, setNewTickerText] = useState("");
  const [editingTickerIndex, setEditingTickerIndex] = useState<number | null>(null);

  // Form state for Notice
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeCategory, setNoticeCategory] = useState<NoticeItem["category"]>("Admissions");
  const [noticeDate, setNoticeDate] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");
  const [noticeUrgent, setNoticeUrgent] = useState(false);
  const [noticeRefNo, setNoticeRefNo] = useState("");
  const [noticePreviousRef, setNoticePreviousRef] = useState("");
  const [noticeTargetAudience, setNoticeTargetAudience] = useState("All Students & Parents");
  const [noticeIssuedBy, setNoticeIssuedBy] = useState("Principal Office (Smt. Mamta Verma)");
  const [noticeAttachmentName, setNoticeAttachmentName] = useState("");
  const [noticeAttachmentUrl, setNoticeAttachmentUrl] = useState("");
  const [noticeAddToTicker, setNoticeAddToTicker] = useState(false);

  // Form state for Meeting
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("Conference Hall (Admin Block)");
  const [meetingAttendees, setMeetingAttendees] = useState("All Faculty & Staff");
  const [meetingAgenda, setMeetingAgenda] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [meetingChairedBy, setMeetingChairedBy] = useState("Col. Uday Shankar Verma (Chairman)");
  const [meetingPriority, setMeetingPriority] = useState<"Routine" | "High Priority" | "Urgent" | "Statutory">("Routine");
  const [meetingStatus, setMeetingStatus] = useState<"Scheduled" | "Completed">("Scheduled");
  const [meetingDecisions, setMeetingDecisions] = useState("");

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  // Check auth & load data on mount
  useEffect(() => {
    const auth = localStorage.getItem("dsmps_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      const data = getCmsData();
      setCmsData(data);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out from the Administrator Console?")) {
      localStorage.removeItem("dsmps_admin_auth");
      window.location.href = "/login";
    }
  };

  /* --------------------------------------------------------------------------
     EVENT ALBUM ACTIONS
  -------------------------------------------------------------------------- */
  const handleMultiplePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setEventPhotos((prev) => [
            ...prev,
            {
              url: base64Url,
              caption: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    showToast(`Loaded ${files.length} photo(s). Don't forget to save!`);
  };

  const removePhotoFromEvent = (indexToRemove: number) => {
    setEventPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (eventCoverIndex >= indexToRemove && eventCoverIndex > 0) {
      setEventCoverIndex(eventCoverIndex - 1);
    }
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) {
      showToast("Please provide an Event Title.", "error");
      return;
    }
    if (eventPhotos.length === 0) {
      showToast("Please upload at least 1 photo for this activity album.", "error");
      return;
    }

    const coverPhotoUrl = eventPhotos[eventCoverIndex]?.url || eventPhotos[0].url;
    const highlightsList = eventHighlights
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const newAlbum: ActivityEventAlbum = {
      id: editingEventId || `act-${Date.now()}`,
      title: eventTitle,
      category: eventCategory,
      date: eventDate || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long" }),
      location: eventLocation,
      participants: eventParticipants,
      coverImage: coverPhotoUrl,
      photoCount: eventPhotos.length,
      photos: eventPhotos,
      summary: eventSummary || eventTitle,
      fullStory: eventFullStory || eventSummary || eventTitle,
      highlights: highlightsList.length > 0 ? highlightsList : ["Campus Event", "Student Participation"],
      featuredInHero: eventFeaturedInHero
    };

    let updatedAlbums: ActivityEventAlbum[];
    if (editingEventId) {
      updatedAlbums = cmsData.activityAlbums.map((a) => (a.id === editingEventId ? newAlbum : a));
    } else {
      updatedAlbums = [newAlbum, ...cmsData.activityAlbums];
    }

    const updatedData: CmsSiteData = {
      ...cmsData,
      activityAlbums: updatedAlbums
    };

    setCmsData(updatedData);
    saveCmsData(updatedData);
    resetEventForm();
    setShowEventModal(false);
    showToast(editingEventId ? "Event album successfully updated!" : "New event album successfully published!");
  };

  const resetEventForm = () => {
    setEditingEventId(null);
    setEventTitle("");
    setEventCategory("National Festivals");
    setEventDate("");
    setEventLocation("DSMPS Campus, Haflaganj");
    setEventParticipants("Students, Faculty & Staff");
    setEventSummary("");
    setEventFullStory("");
    setEventHighlights("");
    setEventPhotos([]);
    setEventCoverIndex(0);
    setEventFeaturedInHero(true);
  };

  const handleEditEvent = (album: ActivityEventAlbum) => {
    setEditingEventId(album.id);
    setEventTitle(album.title);
    setEventCategory(album.category);
    setEventDate(album.date);
    setEventLocation(album.location);
    setEventParticipants(album.participants);
    setEventSummary(album.summary);
    setEventFullStory(album.fullStory);
    setEventHighlights(album.highlights.join("\n"));
    setEventPhotos(album.photos);
    const coverIdx = album.photos.findIndex((p) => p.url === album.coverImage);
    setEventCoverIndex(coverIdx >= 0 ? coverIdx : 0);
    setEventFeaturedInHero(!!album.featuredInHero);
    setShowEventModal(true);
  };

  const handleToggleHeroFeature = (id: string) => {
    const updatedAlbums = cmsData.activityAlbums.map((a) =>
      a.id === id ? { ...a, featuredInHero: !a.featuredInHero } : a
    );
    const updatedData = { ...cmsData, activityAlbums: updatedAlbums };
    setCmsData(updatedData);
    saveCmsData(updatedData);
    const target = updatedAlbums.find((a) => a.id === id);
    showToast(
      target?.featuredInHero
        ? "⭐ Event is now featured on the Main Homepage Banner!"
        : "Event removed from Main Homepage Banner."
    );
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the event album "${title}"?`)) {
      const updatedAlbums = cmsData.activityAlbums.filter((a) => a.id !== id);
      const updatedData = { ...cmsData, activityAlbums: updatedAlbums };
      setCmsData(updatedData);
      saveCmsData(updatedData);
      showToast("Event album deleted.");
    }
  };

  /* --------------------------------------------------------------------------
     TICKER ACTIONS
  -------------------------------------------------------------------------- */
  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;

    const updatedTicker = [newTickerText.trim(), ...cmsData.tickerAnnouncements];
    const updatedData = { ...cmsData, tickerAnnouncements: updatedTicker };
    setCmsData(updatedData);
    saveCmsData(updatedData);
    setNewTickerText("");
    showToast("Added headline to the running marquee ticker!");
  };

  const handleDeleteTicker = (index: number) => {
    const updatedTicker = cmsData.tickerAnnouncements.filter((_, idx) => idx !== index);
    const updatedData = { ...cmsData, tickerAnnouncements: updatedTicker };
    setCmsData(updatedData);
    saveCmsData(updatedData);
    showToast("Ticker announcement removed.");
  };

  const handleEditTicker = (index: number) => {
    const current = cmsData.tickerAnnouncements[index];
    const edited = prompt("Edit Running Ticker Headline:", current);
    if (edited !== null && edited.trim() !== "") {
      const updatedTicker = [...cmsData.tickerAnnouncements];
      updatedTicker[index] = edited.trim();
      const updatedData = { ...cmsData, tickerAnnouncements: updatedTicker };
      setCmsData(updatedData);
      saveCmsData(updatedData);
      showToast("Ticker announcement updated!");
    }
  };

  /* --------------------------------------------------------------------------
     NOTICE ACTIONS (FULL CREATE, EDIT & DELETE)
  -------------------------------------------------------------------------- */
  const resetNoticeForm = () => {
    setEditingNoticeId(null);
    setNoticeTitle("");
    setNoticeCategory("Admissions");
    setNoticeDate(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
    setNoticeDesc("");
    setNoticeUrgent(false);
    const { nextRefNo, previousRefNo } = generateNextRefNo(cmsData.notices, "Admissions");
    setNoticeRefNo(nextRefNo);
    setNoticePreviousRef(previousRefNo || "");
    setNoticeTargetAudience("All Students & Parents");
    setNoticeIssuedBy("Principal Office (Smt. Mamta Verma)");
    setNoticeAttachmentName("");
    setNoticeAttachmentUrl("");
    setNoticeAddToTicker(false);
  };

  const handleEditNotice = (notice: NoticeItem) => {
    setEditingNoticeId(notice.id);
    setNoticeTitle(notice.title);
    setNoticeCategory(notice.category);
    setNoticeDate(notice.date);
    setNoticeDesc(notice.description);
    setNoticeUrgent(!!notice.urgent);
    setNoticeRefNo(notice.refNo || "");
    setNoticePreviousRef("");
    setNoticeTargetAudience(notice.targetAudience || "All Students & Parents");
    setNoticeIssuedBy(notice.issuedBy || "Principal Office (Smt. Mamta Verma)");
    setNoticeAttachmentName(notice.attachmentName || "");
    setNoticeAttachmentUrl(notice.attachmentUrl || "");
    setNoticeAddToTicker(!!notice.addToTicker);
    setShowNoticeModal(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const d = new Date(noticeDate || Date.now());
    const formattedDay = isNaN(d.getDate()) ? "01" : String(d.getDate()).padStart(2, "0");
    const formattedMonth = isNaN(d.getMonth()) ? "OCT" : d.toLocaleString("en-IN", { month: "short" });

    let updatedNotices: NoticeItem[];

    if (editingNoticeId) {
      updatedNotices = cmsData.notices.map((n) =>
        n.id === editingNoticeId
          ? {
              ...n,
              title: noticeTitle,
              category: noticeCategory,
              date: noticeDate || n.date,
              day: formattedDay,
              month: formattedMonth,
              description: noticeDesc,
              urgent: noticeUrgent,
              refNo: noticeRefNo,
              targetAudience: noticeTargetAudience,
              issuedBy: noticeIssuedBy,
              attachmentName: noticeAttachmentName,
              attachmentUrl: noticeAttachmentUrl,
              addToTicker: noticeAddToTicker
            }
          : n
      );
    } else {
      const newNotice: NoticeItem = {
        id: `not-${Date.now()}`,
        title: noticeTitle,
        category: noticeCategory,
        date: noticeDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        day: formattedDay,
        month: formattedMonth,
        description: noticeDesc,
        urgent: noticeUrgent,
        refNo: noticeRefNo,
        targetAudience: noticeTargetAudience,
        issuedBy: noticeIssuedBy,
        attachmentName: noticeAttachmentName,
        attachmentUrl: noticeAttachmentUrl,
        addToTicker: noticeAddToTicker
      };
      updatedNotices = [newNotice, ...cmsData.notices];
    }

    // If addToTicker is checked, automatically sync to top running ticker!
    let updatedTicker = cmsData.tickerAnnouncements || [];
    if (noticeAddToTicker && !updatedTicker.some((t) => t.includes(noticeTitle))) {
      updatedTicker = [`📢 ${noticeTitle} — ${noticeDesc.slice(0, 75)}...`, ...updatedTicker];
    }

    const updatedData = { ...cmsData, notices: updatedNotices, tickerAnnouncements: updatedTicker };
    setCmsData(updatedData);
    saveCmsData(updatedData);
    setShowNoticeModal(false);
    resetNoticeForm();
    showToast(editingNoticeId ? "Notice circular successfully updated!" : "Official notice circular published!");
  };

  const handleDeleteNotice = (id: string) => {
    if (confirm("Are you sure you want to delete this notice circular?")) {
      const updatedNotices = cmsData.notices.filter((n) => n.id !== id);
      const updatedData = { ...cmsData, notices: updatedNotices };
      setCmsData(updatedData);
      saveCmsData(updatedData);
      showToast("Notice circular deleted.");
    }
  };

  /* --------------------------------------------------------------------------
     STAFF MEETING ACTIONS (FULL CREATE, EDIT & DELETE)
  -------------------------------------------------------------------------- */
  const resetMeetingForm = () => {
    setEditingMeetingId(null);
    setMeetingTitle("");
    setMeetingDate(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
    setMeetingTime("03:30 PM");
    setMeetingLocation("Conference Hall (Admin Block)");
    setMeetingAttendees("All Faculty & Staff");
    setMeetingAgenda("");
    setMeetingNotes("");
    setMeetingChairedBy("Col. Uday Shankar Verma (Chairman)");
    setMeetingPriority("Routine");
    setMeetingStatus("Scheduled");
    setMeetingDecisions("");
  };

  const handleEditMeeting = (meeting: StaffMeetingItem) => {
    setEditingMeetingId(meeting.id);
    setMeetingTitle(meeting.title);
    setMeetingDate(meeting.date);
    setMeetingTime(meeting.time);
    setMeetingLocation(meeting.location);
    setMeetingAttendees(meeting.attendees);
    setMeetingAgenda(meeting.agenda);
    setMeetingNotes(meeting.notes || "");
    setMeetingChairedBy(meeting.chairedBy || "Col. Uday Shankar Verma (Chairman)");
    setMeetingPriority(meeting.priority || "Routine");
    setMeetingStatus(meeting.status || "Scheduled");
    setMeetingDecisions((meeting.decisions || []).join("\n"));
    setShowMeetingModal(true);
  };

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle.trim()) return;

    const decisionsList = meetingDecisions
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    let updatedMeetings: StaffMeetingItem[];

    if (editingMeetingId) {
      updatedMeetings = cmsData.staffMeetings.map((m) =>
        m.id === editingMeetingId
          ? {
              ...m,
              title: meetingTitle,
              date: meetingDate || m.date,
              time: meetingTime || m.time,
              location: meetingLocation,
              attendees: meetingAttendees,
              agenda: meetingAgenda,
              notes: meetingNotes,
              chairedBy: meetingChairedBy,
              priority: meetingPriority,
              status: meetingStatus,
              decisions: decisionsList
            }
          : m
      );
    } else {
      const newMeeting: StaffMeetingItem = {
        id: `meet-${Date.now()}`,
        title: meetingTitle,
        date: meetingDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        time: meetingTime || "03:30 PM",
        location: meetingLocation,
        attendees: meetingAttendees,
        agenda: meetingAgenda,
        status: meetingStatus,
        notes: meetingNotes,
        chairedBy: meetingChairedBy,
        priority: meetingPriority,
        decisions: decisionsList
      };
      updatedMeetings = [newMeeting, ...cmsData.staffMeetings];
    }

    const updatedData = { ...cmsData, staffMeetings: updatedMeetings };
    setCmsData(updatedData);
    saveCmsData(updatedData);
    setShowMeetingModal(false);
    resetMeetingForm();
    showToast(editingMeetingId ? "Staff meeting schedule updated!" : "Staff meeting circular scheduled!");
  };

  const handleDeleteMeeting = (id: string) => {
    if (confirm("Are you sure you want to delete this staff meeting schedule?")) {
      const updatedMeetings = cmsData.staffMeetings.filter((m) => m.id !== id);
      const updatedData = { ...cmsData, staffMeetings: updatedMeetings };
      setCmsData(updatedData);
      saveCmsData(updatedData);
      showToast("Staff meeting schedule removed.");
    }
  };

  /* --------------------------------------------------------------------------
     BACKUP & FACTORY RESET
  -------------------------------------------------------------------------- */
  const handleExportBackup = () => {
    const jsonStr = JSON.stringify(cmsData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsmps_cms_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Complete CMS backup downloaded successfully!");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.activityAlbums && parsed.tickerAnnouncements) {
          setCmsData(parsed);
          saveCmsData(parsed);
          showToast("Data successfully restored from backup file!");
        } else {
          showToast("Invalid backup JSON format.", "error");
        }
      } catch (err) {
        showToast("Failed to parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleFactoryReset = () => {
    if (confirm("⚠️ WARNING: This will reset all photos, events, tickers, and notices to factory original data. Continue?")) {
      resetCmsDataToDefaults();
      setCmsData(DEFAULT_CMS_DATA);
      showToast("System reset to original factory data.");
    }
  };

  const handleSaveLeadership = (deskType?: "chairman" | "principal" | "all") => {
    saveCmsData(cmsData);
    if (deskType === "chairman") {
      showToast("Chairman Col. Uday Shankar Verma's details & message saved live to website!", "success");
    } else if (deskType === "principal") {
      showToast("Principal Smt. Mamta Verma's details & message saved live to website!", "success");
    } else {
      showToast("All leadership messages & details saved and published live to website!", "success");
    }
  };

  /* --------------------------------------------------------------------------
     IF NOT AUTHENTICATED
  -------------------------------------------------------------------------- */
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Administrator Access Required</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            You must be authenticated as an administrator to manage photos, events, and website circulars.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition"
            >
              Go to Administrator Login <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-500 font-bold text-sm">Verifying credentials...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all animate-bounce ${
            toastMessage.type === "success"
              ? "bg-emerald-900 text-emerald-100 border-emerald-500"
              : "bg-red-900 text-red-100 border-red-500"
          }`}
        >
          {toastMessage.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* TOP BAR */}
      <header className="bg-[#0f1f4a] text-white border-b border-blue-950 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow flex items-center justify-center border border-amber-400">
              <img src="/logo.png" alt="DSMPS" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black tracking-tight leading-tight flex items-center gap-2">
                Dr. Shyam Memorial Public School
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5 flex-wrap">
                <span>DEO Katihar</span>
                <span>&bull;</span>
                <span>RTE Act, 2009</span>
                <span>&bull;</span>
                <span className="font-mono">Recog. No.: 212115120221118160113</span>
                <span>&bull;</span>
                <span className="font-mono">UDISE+: 10100106805</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-slate-200 text-xs font-bold transition border border-blue-700/50"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-[#0a1533] border-t border-blue-900/60 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-3 overflow-x-auto py-2 scrollbar-none text-xs font-bold">
            
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "overview"
                  ? "bg-amber-400 text-slate-950 font-black shadow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Dashboard
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "events"
                  ? "bg-amber-400 text-slate-950 font-black shadow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Camera className="w-3.5 h-3.5" /> Day-to-Day Activities &amp; Photos ({cmsData.activityAlbums.length})
            </button>

            <button
              onClick={() => setActiveTab("ticker")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "ticker"
                  ? "bg-amber-400 text-slate-950 font-black shadow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" /> Ticker &amp; Notices ({cmsData.tickerAnnouncements.length + cmsData.notices.length})
            </button>

            <button
              onClick={() => setActiveTab("leadership")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "leadership"
                  ? "bg-amber-400 text-slate-950 font-black shadow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Leadership Desks
            </button>

            <button
              onClick={() => setActiveTab("backup")}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "backup"
                  ? "bg-amber-400 text-slate-950 font-black shadow"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Download className="w-3.5 h-3.5" /> Backup &amp; Reset
            </button>

          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1 w-full">
        
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="bg-gradient-to-r from-[#0f1f4a] via-[#1a3a8f] to-[#0f1f4a] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-blue-900 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-slate-900 px-3 py-1 rounded-full inline-block mb-2">
                  Live Control Center
                </span>
                <h2 className="text-xl sm:text-3xl font-black">
                  Welcome to DSMPS Website Administration
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium leading-relaxed">
                  Upload daily student activities, manage multiple event photo albums, update continuous marquee news, and maintain institutional notices with zero coding required.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      resetEventForm();
                      setShowEventModal(true);
                      setActiveTab("events");
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Upload New Activity / Photos
                  </button>
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
                  >
                    <Eye className="w-4 h-4 text-amber-300" /> View Public Website
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Event Albums</span>
                  <Camera className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{cmsData.activityAlbums.length}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {cmsData.activityAlbums.reduce((acc, curr) => acc + (curr.photos?.length || 0), 0)} total uploaded photos
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Running Tickers</span>
                  <Megaphone className="w-5 h-5 text-amber-600" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{cmsData.tickerAnnouncements.length}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">Live on marquee strip</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Circular Notices</span>
                  <FileText className="w-5 h-5 text-sky-600" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{cmsData.notices.length}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Published on Notice Board</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Staff Meetings</span>
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">{cmsData.staffMeetings.length}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Internal Faculty Schedules</div>
                </div>
              </div>
            </div>

            {/* Quick Overview of Recent Events */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Recently Published Activity Albums
                </h3>
                <button
                  onClick={() => setActiveTab("events")}
                  className="text-xs text-blue-700 font-bold hover:underline"
                >
                  Manage All Albums &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cmsData.activityAlbums.slice(0, 4).map((album) => (
                  <div key={album.id} className="p-3 rounded-2xl border border-slate-200 flex gap-4 items-center bg-slate-50/50">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-20 h-16 object-cover rounded-xl shrink-0 border border-slate-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {album.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">{album.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate mt-1">{album.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">📸 {album.photos?.length || 0} high-res photos</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DAY-TO-DAY ACTIVITIES & PHOTO ALBUM MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "events" && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                  Day-to-Day Activity &amp; Events Hub
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Manage Photo Albums &amp; School Activities
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Upload multiple photos from sports days, assemblies, national festivals, or classroom activities. When users click an event on the homepage, a full interactive photo lightbox opens.
                </p>
              </div>

              <button
                onClick={() => {
                  resetEventForm();
                  setShowEventModal(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0f1f4a] hover:bg-blue-950 text-white font-extrabold text-xs shadow-md transition shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" /> Create New Event Album
              </button>
            </div>

            {/* List of Published Albums */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsData.activityAlbums.map((album) => (
                <div
                  key={album.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 bg-[#0f1f4a]/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full backdrop-blur-xs border border-white/20">
                        {album.category}
                      </div>

                      {album.featuredInHero && (
                        <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-slate-950" /> Main Slide
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <span className="text-xs font-bold drop-shadow">{album.date}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                          📸 {album.photos?.length || 0} Photos
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                        {album.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 font-medium">
                        {album.summary}
                      </p>
                      <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{album.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleToggleHeroFeature(album.id)}
                        className={`p-2 rounded-xl transition text-xs font-bold inline-flex items-center gap-1 cursor-pointer ${
                          album.featuredInHero
                            ? "bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        }`}
                        title={album.featuredInHero ? "Remove from Main Slide" : "Show on Main Slide"}
                      >
                        <Star className={`w-3.5 h-3.5 ${album.featuredInHero ? "fill-amber-600 text-amber-600" : ""}`} />
                        <span>{album.featuredInHero ? "Slide: ON" : "Slide: OFF"}</span>
                      </button>
                      <button
                        onClick={() => handleEditEvent(album)}
                        className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        title="Edit Album"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(album.id, album.title)}
                        className="p-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        title="Delete Album"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>

                    <Link
                      href="/"
                      target="_blank"
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      View on site <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TICKER & ANNOUNCEMENTS */}
        {/* ========================================================================= */}
        {activeTab === "ticker" && (
          <div className="space-y-8">
            
            {/* Top Running Marquee Ticker Controller */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                  Top Running Marquee Ticker
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Continuous Running Announcement Strip
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  These alerts scroll continuously at the very top of the website. Visitors can pause by hovering.
                </p>
              </div>

              {/* Live Preview Box */}
              <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-2xl">
                <div className="text-[10px] font-black uppercase text-amber-800 tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Ticker Simulation:
                </div>
                <div className="overflow-hidden bg-[#0a1128] text-white py-2 px-3 rounded-xl flex items-center gap-3 text-xs font-bold">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0">
                    LATEST
                  </span>
                  <div className="truncate text-amber-300">
                    {cmsData.tickerAnnouncements.join("   ★   ")}
                  </div>
                </div>
              </div>

              {/* Add New Ticker Form */}
              <form onSubmit={handleAddTicker} className="flex gap-2">
                <input
                  type="text"
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  placeholder="Type new headline (e.g. ⭐ Summer Vacation dates announced from 15th May...)"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0f1f4a]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-400" /> Add to Ticker
                </button>
              </form>

              {/* Ticker List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-500">Active Ticker Items ({cmsData.tickerAnnouncements.length})</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  {cmsData.tickerAnnouncements.map((text, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-800 truncate">{text}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEditTicker(idx)}
                          className="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                          title="Edit Headline"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTicker(idx)}
                          className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"
                          title="Remove from Ticker"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Official Notices Board Manager */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                    Official Notice Corner
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    School Circulars &amp; Notifications
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Published in the Official Announcement Hub tabs on the homepage.
                  </p>
                </div>

                <button
                  onClick={() => {
                    resetNoticeForm();
                    setShowNoticeModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" /> Add New Circular
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cmsData.notices.map((notice) => (
                  <div key={notice.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                          {notice.category}
                        </span>
                        {notice.urgent && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 animate-pulse font-bold">
                            URGENT
                          </span>
                        )}
                        {notice.refNo && (
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {notice.refNo}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-medium ml-auto">{notice.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{notice.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{notice.description}</p>
                      
                      <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-1">
                        <span>🎯 <strong className="text-slate-700">{notice.targetAudience || "All Students & Parents"}</strong></span>
                        <span className="text-slate-600">✍️ {notice.issuedBy || "Principal Office"}</span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Circular
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Circular
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Staff & Faculty Meetings Manager */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                    Faculty &amp; Staff Coordination
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Faculty Meeting Schedules
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Internal academic review, pedagogical sessions, and staff briefings.
                  </p>
                </div>

                <button
                  onClick={() => {
                    resetMeetingForm();
                    setShowMeetingModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" /> Schedule Meeting
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cmsData.staffMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          meeting.status === "Scheduled" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {meeting.status}
                        </span>
                        {meeting.priority && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                            {meeting.priority}
                          </span>
                        )}
                        <span className="text-xs text-slate-500 font-medium ml-auto">{meeting.date} &bull; {meeting.time}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{meeting.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{meeting.agenda}</p>
                      
                      <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                        <div>📍 <strong className="text-slate-700">{meeting.location || "Conference Hall"}</strong></div>
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <span>👥 {meeting.attendees}</span>
                          <span className="text-blue-900 font-semibold">🎖️ {meeting.chairedBy || "Chairman / Principal"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        onClick={() => handleEditMeeting(meeting)}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Schedule
                      </button>
                      <button
                        onClick={() => handleDeleteMeeting(meeting.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LEADERSHIP DESKS */}
        {/* ========================================================================= */}
        {activeTab === "leadership" && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                    Institutional Leadership
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Chairman &amp; Principal Desk Messages
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Update leadership vision statements, titles, and photo representations displayed on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveLeadership("all")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0f1f4a] to-[#1a3a8f] hover:from-[#1a3a8f] hover:to-[#0f1f4a] text-white font-extrabold text-xs sm:text-sm shadow-md transition cursor-pointer shrink-0"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  Save &amp; Publish Live
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                
                {/* Chairman */}
                <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#0f1f4a] text-amber-400 text-xs font-black uppercase">
                      Chairman Desk
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Managing Trustee</span>
                  </div>

                  {/* Chairman Photo Preview & Upload */}
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-amber-400 overflow-hidden shrink-0 shadow-xs">
                      {cmsData.leadership.chairman.photoUrl ? (
                        <img
                          src={cmsData.leadership.chairman.photoUrl}
                          alt="Chairman Portrait"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Users className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {cmsData.leadership.chairman.name || "Col. Uday Shankar Verma"}
                      </div>
                      <p className="text-[11px] text-slate-500">Official Chairman Portrait</p>
                      <label className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:text-blue-700 cursor-pointer">
                        <Upload className="w-3 h-3 text-amber-500" /> Change Portrait
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const b64 = ev.target?.result as string;
                              if (b64) {
                                const updated = {
                                  ...cmsData,
                                  leadership: {
                                    ...cmsData.leadership,
                                    chairman: { ...cmsData.leadership.chairman, photoUrl: b64 }
                                  }
                                };
                                setCmsData(updated);
                                saveCmsData(updated);
                                showToast("Chairman portrait updated successfully!");
                              }
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Chairman Name</label>
                    <input
                      type="text"
                      value={cmsData.leadership.chairman.name}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, name: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title &amp; Background</label>
                    <input
                      type="text"
                      value={cmsData.leadership.chairman.title}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, title: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Featured Quote</label>
                    <textarea
                      rows={2}
                      value={cmsData.leadership.chairman.quote}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, quote: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Message</label>
                    <textarea
                      rows={5}
                      value={cmsData.leadership.chairman.fullMessage}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            chairman: { ...cmsData.leadership.chairman, fullMessage: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  {/* Save Chairman Button */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-200/80">
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Auto-Save Active
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSaveLeadership("chairman")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f1f4a] hover:bg-[#1a3a8f] text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-amber-400" /> Save Chairman Details
                    </button>
                  </div>
                </div>

                {/* Principal */}
                <div className="p-6 rounded-2xl border-2 border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#0f1f4a] text-amber-400 text-xs font-black uppercase">
                      Principal Desk
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">Academic Head</span>
                  </div>

                  {/* Principal Photo Preview & Upload */}
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border-2 border-amber-400 overflow-hidden shrink-0 shadow-xs">
                      {cmsData.leadership.principal.photoUrl ? (
                        <img
                          src={cmsData.leadership.principal.photoUrl}
                          alt="Principal Portrait"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Users className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {cmsData.leadership.principal.name || "Smt. Mamta Verma"}
                      </div>
                      <p className="text-[11px] text-slate-500">Official Principal Portrait</p>
                      <label className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:text-blue-700 cursor-pointer">
                        <Upload className="w-3 h-3 text-amber-500" /> Change Portrait
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              const b64 = ev.target?.result as string;
                              if (b64) {
                                const updated = {
                                  ...cmsData,
                                  leadership: {
                                    ...cmsData.leadership,
                                    principal: { ...cmsData.leadership.principal, photoUrl: b64 }
                                  }
                                };
                                setCmsData(updated);
                                saveCmsData(updated);
                                showToast("Principal portrait updated successfully!");
                              }
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Principal Name</label>
                    <input
                      type="text"
                      value={cmsData.leadership.principal.name}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, name: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title &amp; Qualifications</label>
                    <input
                      type="text"
                      value={cmsData.leadership.principal.title}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, title: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Featured Quote</label>
                    <textarea
                      rows={2}
                      value={cmsData.leadership.principal.quote}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, quote: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Message</label>
                    <textarea
                      rows={5}
                      value={cmsData.leadership.principal.fullMessage}
                      onChange={(e) => {
                        const updated = {
                          ...cmsData,
                          leadership: {
                            ...cmsData.leadership,
                            principal: { ...cmsData.leadership.principal, fullMessage: e.target.value }
                          }
                        };
                        setCmsData(updated);
                        saveCmsData(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>

                  {/* Save Principal Button */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-200/80">
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Auto-Save Active
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSaveLeadership("principal")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-amber-400" /> Save Principal Details
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Sync Banner */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-50/70 p-5 rounded-2xl border border-blue-200/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f1f4a] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Real-Time Website Synchronization</h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Any edit saved here is automatically updated live on the school website for all students, parents, and visitors.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveLeadership("all")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0f1f4a] hover:bg-[#1a3a8f] text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  Save &amp; Update Live Website
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: BACKUP & FACTORY RESET */}
        {/* ========================================================================= */}
        {activeTab === "backup" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-1.5">
                  Data Persistence &amp; Safety
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Export, Backup &amp; Restore
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Keep a secure backup of all uploaded photos, events, and notices on your computer or restore from a previously exported file.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Export Backup File (JSON)</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Save complete website content including all photo albums to a single file.
                    </p>
                  </div>
                  <button
                    onClick={handleExportBackup}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-sm transition shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Export JSON
                  </button>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Restore from Backup File</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Upload an exported .json file to restore all website content.
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={backupInputRef}
                      onChange={handleImportBackup}
                      accept=".json"
                      className="hidden"
                    />
                    <button
                      onClick={() => backupInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-950 text-white font-bold text-xs shadow-sm transition shrink-0 cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" /> Import JSON
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-red-200 bg-red-50/50 flex items-center justify-between gap-4 mt-6">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-red-900">Reset to Factory Default Data</h4>
                    <p className="text-[11px] text-red-700/80 mt-0.5">
                      Restores original sample events, authentic school photos, and notices.
                    </p>
                  </div>
                  <button
                    onClick={handleFactoryReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Data
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: CREATE / EDIT ACTIVITY EVENT ALBUM */}
      {/* ========================================================================= */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#0f1f4a] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-black">
                  {editingEventId ? "Edit Activity Event Album" : "Create New Activity Event Album"}
                </h3>
              </div>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-slate-300 hover:text-white text-xl font-bold p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Annual Sports Meet 2026 / Saraswati Puja Celebrations"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0f1f4a] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0f1f4a] focus:outline-none bg-white"
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
                  <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. 15 August 2026 / Every Morning"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#0f1f4a] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="e.g. Main Assembly Ground / Auditorium"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Participants</label>
                  <input
                    type="text"
                    value={eventParticipants}
                    onChange={(e) => setEventParticipants(e.target.value)}
                    placeholder="e.g. Classes 6th to 10th & Teachers"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* MULTI PHOTO UPLOAD SECTION */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-blue-700" /> Upload Event Photos (Multi-Select)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Select one or multiple photos from your device to include in this album.
                    </p>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleMultiplePhotoUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-xs transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" /> Browse Photos
                    </button>
                  </div>
                </div>

                {/* Photos Preview Grid */}
                {eventPhotos.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-slate-700">
                      Uploaded Photos ({eventPhotos.length}) &bull; Click radio button to choose cover photo:
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {eventPhotos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className={`relative rounded-xl border-2 overflow-hidden bg-white shadow-xs p-1.5 transition ${
                            eventCoverIndex === pIdx ? "border-amber-500 ring-2 ring-amber-300" : "border-slate-200"
                          }`}
                        >
                          <img
                            src={photo.url}
                            alt={`Photo ${pIdx + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhotoFromEvent(pIdx)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 cursor-pointer"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>

                          <div className="mt-1.5 space-y-1">
                            <label className="flex items-center gap-1 text-[10px] font-bold text-slate-700 cursor-pointer">
                              <input
                                type="radio"
                                name="coverPhotoRadio"
                                checked={eventCoverIndex === pIdx}
                                onChange={() => setEventCoverIndex(pIdx)}
                              />
                              <span>Set as Cover</span>
                            </label>
                            <input
                              type="text"
                              value={photo.caption}
                              onChange={(e) => {
                                const updated = [...eventPhotos];
                                updated[pIdx].caption = e.target.value;
                                setEventPhotos(updated);
                              }}
                              placeholder="Photo caption..."
                              className="w-full px-1.5 py-1 text-[10px] rounded border border-slate-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary (Shown on Album Card)</label>
                <textarea
                  rows={2}
                  required
                  value={eventSummary}
                  onChange={(e) => setEventSummary(e.target.value)}
                  placeholder="A brief 1-2 sentence overview of the activity..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Story (Shown inside Lightbox Modal)</label>
                <textarea
                  rows={4}
                  required
                  value={eventFullStory}
                  onChange={(e) => setEventFullStory(e.target.value)}
                  placeholder="Detailed narrative of what happened, speeches given, activities conducted..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Highlights (1 per line)</label>
                <textarea
                  rows={3}
                  value={eventHighlights}
                  onChange={(e) => setEventHighlights(e.target.value)}
                  placeholder="Flag Hoisting&#10;Patriotic Speeches&#10;Student March Past&#10;Sweet Distribution"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              {/* Checkbox: Feature on Main Top Slide (Hero Banner) */}
              <div className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/80 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-xs">
                    <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                      Feature on Main Top Slide (Hero Banner)
                      <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">Recommended</span>
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Tick this to display this event &amp; cover photo as a primary banner slide at the top of the website.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="featuredInHeroCheckbox"
                  checked={eventFeaturedInHero}
                  onChange={(e) => setEventFeaturedInHero(e.target.checked)}
                  className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-extrabold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{editingEventId ? "Save Changes" : "Publish Album"}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT NOTICE CIRCULAR */}
      {/* ========================================================================= */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-[#0a1538] via-[#0f1f4a] to-[#162e70] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black">
                    {editingNoticeId ? "Edit School Circular" : "Publish Official Circular / Notice"}
                  </h3>
                  <p className="text-[11px] text-amber-300 font-medium">
                    Dr. Shyam Memorial Public School &bull; Secretariat
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="text-slate-300 hover:text-white text-2xl font-bold leading-none cursor-pointer p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="p-6 sm:p-7 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              
              {/* Circular Title */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Circular Title / Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Science Olympiad & Talent Search Registration 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0f1f4a] focus:ring-1 focus:ring-[#0f1f4a]"
                />
              </div>

              {/* Category & Reference Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => {
                      const newCat = e.target.value as any;
                      setNoticeCategory(newCat);
                      if (!editingNoticeId) {
                        const { nextRefNo, previousRefNo } = generateNextRefNo(cmsData.notices, newCat);
                        setNoticeRefNo(nextRefNo);
                        setNoticePreviousRef(previousRefNo || "");
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Examination">Examination</option>
                    <option value="Academic">Academic</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <label className="font-bold text-slate-700">Official Ref No. (पत्रांक)</label>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Auto +1
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const { nextRefNo, previousRefNo } = generateNextRefNo(cmsData.notices, noticeCategory);
                        setNoticeRefNo(nextRefNo);
                        setNoticePreviousRef(previousRefNo || "");
                        showToast(`Auto Ref No: ${nextRefNo}`);
                      }}
                      className="text-[11px] text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      title="Pichle notice ke adhar par agla number lein"
                    >
                      🔄 Auto-Next
                    </button>
                  </div>
                  <input
                    type="text"
                    value={noticeRefNo}
                    onChange={(e) => setNoticeRefNo(e.target.value)}
                    placeholder="e.g. DSMPS/ADM/2026-27/019"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 bg-white focus:outline-none focus:border-[#0f1f4a] focus:ring-1 focus:ring-[#0f1f4a]"
                  />
                  <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate max-w-[190px]">
                      {noticePreviousRef ? (
                        <>Pichla: <strong className="font-mono text-slate-700">{noticePreviousRef}</strong></>
                      ) : (
                        <span className="text-emerald-700 font-semibold">✨ Auto-sequence</span>
                      )}
                    </span>
                    <span className="text-amber-700 font-semibold shrink-0">✏️ Editable</span>
                  </div>
                </div>
              </div>

              {/* Date & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Date of Circular</label>
                    <button
                      type="button"
                      onClick={() =>
                        setNoticeDate(
                          new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                        )
                      }
                      className="text-[10px] text-emerald-700 hover:underline font-bold"
                    >
                      Set Today
                    </button>
                  </div>
                  <input
                    type="text"
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    placeholder="e.g. 15 Oct 2026"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Audience (किसके लिए)</label>
                  <select
                    value={noticeTargetAudience}
                    onChange={(e) => setNoticeTargetAudience(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  >
                    <option value="All Students & Parents">All Students &amp; Parents</option>
                    <option value="Classes 9th & 10th Scholars">Classes 9th &amp; 10th Scholars</option>
                    <option value="Classes 1st to 8th Scholars">Classes 1st to 8th Scholars</option>
                    <option value="Pre-Primary Wing (Nursery-UKG)">Pre-Primary Wing (Nursery–UKG)</option>
                    <option value="All Teaching Faculty & Staff">All Teaching Faculty &amp; Staff</option>
                    <option value="General Public & Parents">General Public &amp; Parents</option>
                  </select>
                </div>
              </div>

              {/* Issued By Authority */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Issued By / Authorized Signatory (हस्ताक्षरकर्ता)
                </label>
                <select
                  value={noticeIssuedBy}
                  onChange={(e) => setNoticeIssuedBy(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                >
                  <option value="Principal Office (Smt. Mamta Verma)">Principal Office (Smt. Mamta Verma)</option>
                  <option value="Chairman Desk (Col. Uday Shankar Verma)">Chairman Desk (Col. Uday Shankar Verma)</option>
                  <option value="Examination Controller & Headmaster">Examination Controller &amp; Headmaster</option>
                  <option value="Administrative Office & Secretariat">Administrative Office &amp; Secretariat</option>
                  <option value="Discipline & Proctorial Board">Discipline &amp; Proctorial Board</option>
                </select>
              </div>

              {/* Optional Attachment Document */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">
                  Optional Document / PDF Attachment (संलग्नक)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={noticeAttachmentName}
                    onChange={(e) => setNoticeAttachmentName(e.target.value)}
                    placeholder="Document Title (e.g. Timetable PDF)"
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800"
                  />
                  <input
                    type="text"
                    value={noticeAttachmentUrl}
                    onChange={(e) => setNoticeAttachmentUrl(e.target.value)}
                    placeholder="URL / File Link (e.g. #admissions or link)"
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 font-mono"
                  />
                </div>
              </div>

              {/* Circular Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Circular Body / Full Directives (पूरी सूचना) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={noticeDesc}
                  onChange={(e) => setNoticeDesc(e.target.value)}
                  placeholder="Detailed instructions for students, parents, or staff..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Action Checkboxes */}
              <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-2xl space-y-2.5">
                <label className="flex items-center gap-2 text-xs font-bold text-red-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noticeUrgent}
                    onChange={(e) => setNoticeUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-0"
                  />
                  <span>Mark as URGENT (Displays flashing high-priority alert badge)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-[#0f1f4a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noticeAddToTicker}
                    onChange={(e) => setNoticeAddToTicker(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0f1f4a] focus:ring-0"
                  />
                  <span>⭐ Also feature headline on Website's Top Live Marquee Ticker</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{editingNoticeId ? "Save Changes" : "Publish Official Notice"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: SCHEDULE / EDIT FACULTY MEETING */}
      {/* ========================================================================= */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6">
            <div className="bg-gradient-to-r from-[#0a1538] via-[#0f1f4a] to-[#162e70] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black">
                    {editingMeetingId ? "Edit Faculty Meeting" : "Schedule Faculty & Staff Meeting"}
                  </h3>
                  <p className="text-[11px] text-amber-300 font-medium">
                    Internal Pedagogical &amp; Administrative Council
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMeetingModal(false)}
                className="text-slate-300 hover:text-white text-2xl font-bold leading-none cursor-pointer p-1"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveMeeting} className="p-6 sm:p-7 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              {/* Meeting Title */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Meeting Agenda / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Pre-Board Examination Planning & Evaluation Council"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Date</label>
                  <input
                    type="text"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    placeholder="e.g. 15 Oct 2026"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scheduled Time</label>
                  <input
                    type="text"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    placeholder="e.g. 03:30 PM – 04:45 PM"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  />
                </div>
              </div>

              {/* Venue / Location with Quick Chips */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">Location / Venue</label>
                  <div className="flex gap-1">
                    {[
                      "Conference Hall",
                      "Principal Chamber",
                      "Staff Room"
                    ].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setMeetingLocation(loc)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold transition"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  value={meetingLocation}
                  onChange={(e) => setMeetingLocation(e.target.value)}
                  placeholder="e.g. Conference Hall (Admin Block)"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Chaired By & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chaired By (अध्यक्षता)</label>
                  <select
                    value={meetingChairedBy}
                    onChange={(e) => setMeetingChairedBy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  >
                    <option value="Col. Uday Shankar Verma (Chairman)">Col. Uday Shankar Verma (Chairman)</option>
                    <option value="Smt. Mamta Verma (Principal)">Smt. Mamta Verma (Principal)</option>
                    <option value="Jointly: Chairman & Principal">Jointly: Chairman &amp; Principal</option>
                    <option value="Academic In-charge & Headmaster">Academic In-charge &amp; Headmaster</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority / Importance</label>
                  <select
                    value={meetingPriority}
                    onChange={(e) => setMeetingPriority(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                  >
                    <option value="Routine">Routine Academic Review</option>
                    <option value="High Priority">High Priority Committee</option>
                    <option value="Urgent">Urgent / Emergency Briefing</option>
                    <option value="Statutory">Statutory / RTE Compliance</option>
                  </select>
                </div>
              </div>

              {/* Attendees */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Invited Faculty / Attendees</label>
                <input
                  type="text"
                  value={meetingAttendees}
                  onChange={(e) => setMeetingAttendees(e.target.value)}
                  placeholder="e.g. All TGT, PRT & Mother Teachers, House Mentors"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Meeting Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mStatus"
                      value="Scheduled"
                      checked={meetingStatus === "Scheduled"}
                      onChange={() => setMeetingStatus("Scheduled")}
                      className="text-blue-900 focus:ring-0"
                    />
                    <span className="font-bold text-blue-900">Scheduled (आगामी बैठक)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="mStatus"
                      value="Completed"
                      checked={meetingStatus === "Completed"}
                      onChange={() => setMeetingStatus("Completed")}
                      className="text-emerald-700 focus:ring-0"
                    />
                    <span className="font-bold text-emerald-700">Completed (सम्पन्न बैठक)</span>
                  </label>
                </div>
              </div>

              {/* Detailed Agenda */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Discussion Points &amp; Agenda <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={meetingAgenda}
                  onChange={(e) => setMeetingAgenda(e.target.value)}
                  placeholder="Key topics to review during the meeting..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Key Decisions / Minutes of Meeting (MoM) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Decisions / Minutes of Meeting (MoM) (एक लाइन में एक फैसला)
                </label>
                <textarea
                  rows={2}
                  value={meetingDecisions}
                  onChange={(e) => setMeetingDecisions(e.target.value)}
                  placeholder="e.g. Extra doubt clearing period approved for Class 10th&#10;Science practical roster finalized"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Instructions / Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Faculty Preparation Instructions / Special Notes
                </label>
                <input
                  type="text"
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="e.g. Please carry updated lesson plans and monthly attendance registers."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0f1f4a]"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMeetingModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0f1f4a] hover:bg-blue-900 text-white font-black text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{editingMeetingId ? "Save Changes" : "Schedule Meeting"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
