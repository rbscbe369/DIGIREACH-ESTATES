"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import { projectsData } from "@/data/projects";
import {
  X,
  Check,
  Calendar,
  Clock,
  Building,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
  defaultType?: string;
  defaultUnit?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultProject,
  defaultType,
  defaultUnit,
}) => {
  // Wizard Step (1: Personal, 2: Project & Unit, 3: Schedule, 4: Confirmation)
  const [step, setStep] = useState<number>(1);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(defaultProject || projectsData[0].name);
  const [projectType, setProjectType] = useState<"residential" | "commercial">(
    (defaultType?.toLowerCase() as any) || "residential"
  );
  const [unitPreference, setUnitPreference] = useState(defaultUnit || "3 BHK Residence");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM – 1:00 PM)");
  const [visitMode, setVisitMode] = useState("In-Person Executive Escort");

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceId, setReferenceId] = useState("");

  // Sync default props when modal opens with pre-selections
  useEffect(() => {
    if (defaultProject) setProject(defaultProject);
    if (defaultType) {
      const lower = defaultType.toLowerCase();
      if (lower.includes("commercial")) setProjectType("commercial");
      else setProjectType("residential");
    }
    if (defaultUnit) setUnitPreference(defaultUnit);

    // Set default tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    setDate(dateStr);
  }, [defaultProject, defaultType, defaultUnit, isOpen]);

  if (!isOpen) return null;

  // Validation
  const validateStep1 = () => {
    setErrorMessage("");
    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit WhatsApp / phone number.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setErrorMessage("");
    if (!project) {
      setErrorMessage("Please select a project of interest.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    setErrorMessage("");
    if (!date) {
      setErrorMessage("Please pick your preferred visit date.");
      return false;
    }
    return true;
  };

  // Submit Handler
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    setErrorMessage("");

    const ref = "DE-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);

    const leadPayload = {
      referenceId: ref,
      name: name.trim(),
      phone: phone.replace(/\D/g, ""),
      email: email.trim(),
      project,
      project_type: projectType,
      unit_preference: unitPreference,
      date,
      time: timeSlot,
      visit_mode: visitMode,
      submittedAt: new Date().toISOString(),
    };

    // 1. Dispatch to Next.js API Route (which calls n8n webhook)
    try {
      await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
    } catch (apiErr) {
      console.warn("API route non-blocking notice:", apiErr);
    }

    // 2. Backup to browser localStorage for offline resilience
    try {
      const existing = JSON.parse(localStorage.getItem("digireach_site_visits") || "[]");
      existing.unshift(leadPayload);
      localStorage.setItem("digireach_site_visits", JSON.stringify(existing));
    } catch (lsErr) {
      console.warn("LocalStorage save error:", lsErr);
    }

    setLoading(false);
    setStep(4); // Advance to Confirmation Summary Screen
  };

  // Pre-filled WhatsApp deep link
  const waText = encodeURIComponent(
    `Hi Digireach Estates! I just scheduled a site visit.\n\n` +
      `🎫 Pass Ref: ${referenceId || "DE-VISIT"}\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `🏢 Project: ${project}\n` +
      `📐 Preference: ${unitPreference} (${projectType.toUpperCase()})\n` +
      `📅 Date: ${date}\n` +
      `⏰ Slot: ${timeSlot}\n` +
      `🚗 Mode: ${visitMode}\n\n` +
      `Please confirm escort details and gate pass.`
  );
  const waUrl = `https://wa.me/${siteConfig.phone}?text=${waText}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && step !== 4) onClose();
      }}
    >
      <div className="bg-[#121824] border border-white/15 rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Step Progress (1 to 4) */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-2">
              <span className="text-[#e07a2c] font-bold">Step {step} of 3</span>
              <span>
                {step === 1 && "Personal & WhatsApp Contact"}
                {step === 2 && "Property & Configuration"}
                {step === 3 && "Preferred Schedule & Escort"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
              <div
                className="bg-[#e07a2c] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border-l-2 border-red-500 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: Name + Phone */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <div className="eyebrow !mb-1">Complimentary Gate Pass</div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
                Schedule a Site Visit
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Enter your details to generate your VIP visitor gate pass. No spam, zero broker calls.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                  Full Name <span className="text-[#e07a2c]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#0a0d14] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-[#e07a2c]"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp / Phone Number <span className="text-[#e07a2c]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-[#0a0d14] border border-white/10 rounded-sm pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-[#e07a2c]"
                    required
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                  Site visit pass & Google Maps location pin will be sent via WhatsApp.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                  Email Address <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full bg-[#0a0d14] border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-[#e07a2c]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="w-full bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>Continue to Project Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Project + Type + Unit Preference */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <div className="eyebrow !mb-1">Property Preference</div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
                Select Your Asset of Interest
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Choose between our residential communities and Grade-A commercial parks.
              </p>
            </div>

            {/* Residential vs Commercial Type Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProjectType("residential")}
                className={`py-3 px-4 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  projectType === "residential"
                    ? "bg-[#e07a2c] text-[#0a0d14] font-bold"
                    : "bg-[#0a0d14] border border-white/10 text-slate-300"
                }`}
              >
                <span>Residential (Homes/Villas)</span>
              </button>
              <button
                type="button"
                onClick={() => setProjectType("commercial")}
                className={`py-3 px-4 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  projectType === "commercial"
                    ? "bg-[#e07a2c] text-[#0a0d14] font-bold"
                    : "bg-[#0a0d14] border border-white/10 text-slate-300"
                }`}
              >
                <span>Commercial (Offices/Retail)</span>
              </button>
            </div>

            {/* Project Select Dropdown */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                Project Development <span className="text-[#e07a2c]">*</span>
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full bg-[#0a0d14] border border-white/10 rounded-sm px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#e07a2c]"
              >
                {projectsData
                  .filter((p) => p.type === projectType)
                  .map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — {p.location} ({p.priceStart})
                    </option>
                  ))}
              </select>
            </div>

            {/* Unit Preference Radio Chips */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Preferred Unit Layout <span className="text-[#e07a2c]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(projectType === "residential"
                  ? ["2 BHK Smart Suite", "3 BHK Royal Residence", "4 BHK Sky Penthouse", "Triplex Private Villa"]
                  : ["Bare-Shell Office Plate", "Furnished Tech Suite", "High-Street Retail Store", "Duplex Boutique Office"]
                ).map((u) => (
                  <button
                    type="button"
                    key={u}
                    onClick={() => setUnitPreference(u)}
                    className={`p-3 rounded-sm border text-xs font-mono uppercase tracking-wider text-center transition-all ${
                      unitPreference === u
                        ? "bg-[#e07a2c]/20 border-[#e07a2c] text-white font-bold"
                        : "bg-[#0a0d14] border-white/10 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 border border-white/20 hover:border-white text-white font-mono text-xs uppercase py-3.5 rounded-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="w-2/3 bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase py-3.5 rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>Select Schedule Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Date & Time Slot + Mode */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="space-y-5">
            <div>
              <div className="eyebrow !mb-1">Timing & Escort</div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
                Choose Visit Date & Time
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Our site relationship managers are available 7 days a week from 9:30 AM to 7:00 PM.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                  Preferred Date <span className="text-[#e07a2c]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#0a0d14] border border-white/10 rounded-sm px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#e07a2c]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
                  Time Slot <span className="text-[#e07a2c]">*</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#0a0d14] border border-white/10 rounded-sm px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-[#e07a2c]"
                >
                  <option value="Morning (10:00 AM – 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                  <option value="Afternoon (2:00 PM – 4:30 PM)">Afternoon (2:00 PM – 4:30 PM)</option>
                  <option value="Sunset Hour (5:00 PM – 7:00 PM)">Sunset Hour (5:00 PM – 7:00 PM)</option>
                  <option value="Weekend Special (11:00 AM – 3:00 PM)">Weekend Special (11:00 AM – 3:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Visit Mode */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Visit Experience Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: "In-Person Executive Escort", desc: "Chauffeur & On-Site Engineer Escort" },
                  { id: "Virtual 3D Interactive Walkthrough", desc: "Guided Live Video Stream & 3D Tour" },
                ].map((mode) => (
                  <button
                    type="button"
                    key={mode.id}
                    onClick={() => setVisitMode(mode.id)}
                    className={`p-3 rounded-sm border text-left transition-all ${
                      visitMode === mode.id
                        ? "bg-[#e07a2c]/20 border-[#e07a2c] text-white"
                        : "bg-[#0a0d14] border-white/10 text-slate-400 hover:border-white/30"
                    }`}
                  >
                    <div className="font-mono text-xs font-bold">{mode.id}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 border border-white/20 hover:border-white text-white font-mono text-xs uppercase py-3.5 rounded-sm"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase py-3.5 rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating VIP Pass... ⏳</span>
                ) : (
                  <>
                    <span>Confirm Site Visit Reservation →</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Confirmation Summary Screen */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#e07a2c]">
                Reservation Confirmed
              </div>
              <h3 className="font-display text-3xl sm:text-4xl uppercase text-white mt-1">
                You're On The VIP Guest List!
              </h3>
              <p className="text-xs font-sans text-slate-300 mt-1 max-w-md mx-auto">
                We've reserved your private site escort. A relationship officer will welcome you at the experience pavilion.
              </p>
            </div>

            {/* Booking Summary Box (Matches Gym Demo layout) */}
            <div className="bg-[#0a0d14] border border-white/10 rounded-sm p-4 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Pass Reference</span>
                <span className="text-amber-400 font-bold">{referenceId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Visitor Name</span>
                <span className="text-white font-bold">{name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Contact</span>
                <span className="text-white">{phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Project</span>
                <span className="text-white font-bold">{project}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Category & Unit</span>
                <span className="text-amber-300 font-bold">{unitPreference} ({projectType.toUpperCase()})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400 uppercase">Date & Time</span>
                <span className="text-white font-bold">{date} · {timeSlot}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400 uppercase">Experience Mode</span>
                <span className="text-emerald-400 font-bold">{visitMode}</span>
              </div>
            </div>

            {/* WhatsApp Deep Link Button (High conversion priority) */}
            <div className="space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>Open Instant WhatsApp Pass ↗</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-[#e07a2c]" />
                <span>Print VIP Gate Pass</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full border border-white/10 text-slate-400 hover:text-white font-mono text-xs uppercase py-2.5 rounded-sm transition-colors"
              >
                Back to Digireach Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
