"use client";

import React, { useState, useMemo } from "react";
import { Project, FloorPlan } from "@/data/projects";
import {
  X,
  CheckCircle2,
  FileText,
  Download,
  Calendar,
  MapPin,
  Building,
  ShieldCheck,
  ChevronRight,
  Calculator,
} from "lucide-react";
import { EmiCalculator, parsePriceToNumber } from "@/components/interactive/EmiCalculator";
import { siteConfig } from "@/config/siteConfig";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onBookVisit: (projectName: string, projectType: string, unitPreference?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onBookVisit,
}) => {
  const [selectedFloorPlanIndex, setSelectedFloorPlanIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"floorplans" | "calculator" | "amenities" | "gallery">("floorplans");

  const currentPlan: FloorPlan | undefined = project?.floorPlans[selectedFloorPlanIndex] || project?.floorPlans[0];

  // Pre-fill property value estimate for active floor plan / project
  const unitPriceEstimate = useMemo(() => {
    if (!project) return 5000000;
    return parsePriceToNumber(currentPlan?.priceEstimate, project.priceStartNum);
  }, [project, currentPlan?.priceEstimate]);

  if (!project) return null;

  const handleDownloadBrochure = () => {
    const printContent = `
      <html>
        <head>
          <title>${project.name} - Official Project Dossier</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1e293b; }
            h1 { color: #e07a2c; margin-bottom: 4px; }
            .badge { background: #1e293b; color: #fff; padding: 4px 10px; font-size: 12px; border-radius: 4px; }
            .section { margin-top: 24px; border-top: 1px solid #cbd5e1; padding-top: 16px; }
            ul { line-height: 1.8; }
          </style>
        </head>
        <body>
          <span class="badge">RERA: ${project.reraNumber}</span>
          <h1>${project.name}</h1>
          <p><strong>Location:</strong> ${project.location}</p>
          <p><strong>Status:</strong> ${project.statusLabel} · Possession: ${project.possessionDate}</p>
          <p><strong>Starting Price:</strong> ${project.priceStart}</p>
          <div class="section">
            <h3>Overview</h3>
            <p>${project.description}</p>
          </div>
          <div class="section">
            <h3>Amenities</h3>
            <ul>${project.amenities.map(a => `<li>${a}</li>`).join("")}</ul>
          </div>
          <div class="section">
            <p>For verified bookings, contact Digireach Estates Desk: ${siteConfig.displayPhone}</p>
          </div>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
      }, 500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#05070c]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0a0e18] border border-white/20 rounded-sm max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#05070c]/90 hover:bg-[#f59e0b] text-white hover:text-black p-2 rounded-sm font-mono text-xs transition-colors flex items-center gap-1 shadow-lg"
          aria-label="Close modal"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4" />
        </button>

        {/* Hero Header with Bright Sunlit Cover */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover bright-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-[#f59e0b] text-[#05070c] font-mono text-xs font-bold uppercase rounded-sm shadow-md">
                  {project.type}
                </span>
                <span className="px-2.5 py-0.5 bg-[#05070c]/90 text-emerald-400 border border-emerald-500/40 font-mono text-xs uppercase rounded-sm flex items-center gap-1 shadow-md">
                  <ShieldCheck className="w-3 h-3" />
                  RERA: {project.reraNumber}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display uppercase tracking-wide text-white drop-shadow-md">
                {project.name}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-200 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{project.location}</span>
              </div>
            </div>

            <div className="text-right bg-[#05070c]/80 backdrop-blur-sm p-2 px-3 rounded-sm border border-white/10">
              <span className="text-xs font-mono uppercase text-slate-400 block">Starting Price</span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">
                {project.priceStart}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-white/10 flex items-center gap-6 bg-[#05070c] font-mono text-xs uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab("floorplans")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "floorplans"
                ? "border-[#f59e0b] text-[#f59e0b] font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Floor Plans & Units ({project.floorPlans.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "calculator"
                ? "border-[#f59e0b] text-[#f59e0b] font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>EMI Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab("amenities")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "amenities"
                ? "border-[#f59e0b] text-[#f59e0b] font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Amenities Checklist</span>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
              activeTab === "gallery"
                ? "border-[#f59e0b] text-[#f59e0b] font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <span>Gallery</span>
          </button>
        </div>

        {/* Body Content on Deep Dark Panel */}
        <div className="p-6 space-y-6 bg-[#0a0e18]">
          <p className="text-slate-200 font-sans text-sm leading-relaxed">
            {project.description}
          </p>

          {/* TAB 1: Floor Plans */}
          {activeTab === "floorplans" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.floorPlans.map((plan, idx) => (
                  <button
                    key={plan.unitType}
                    onClick={() => setSelectedFloorPlanIndex(idx)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                      selectedFloorPlanIndex === idx
                        ? "bg-[#f59e0b] text-[#05070c] font-bold"
                        : "bg-[#05070c] border border-white/15 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {plan.unitType}
                  </button>
                ))}
              </div>

              {currentPlan && (
                <div className="bg-[#05070c] border border-white/15 rounded-sm p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-950 border border-white/10">
                    <img
                      src={currentPlan.image}
                      alt={currentPlan.unitType}
                      className="w-full h-full object-cover bright-img"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-amber-300 border border-white/10">
                      High-Definition Render
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-3">
                    <div className="font-mono text-xs text-[#f59e0b] uppercase tracking-widest font-semibold">
                      Unit Specification
                    </div>
                    <h3 className="font-display text-2xl text-white uppercase">
                      {currentPlan.unitType}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 font-mono text-xs">
                      <div>
                        <span className="text-slate-400 block">Super Built-Up</span>
                        <span className="text-white font-bold text-sm">{currentPlan.areaSqFt} Sq. Ft</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Carpet Area</span>
                        <span className="text-white font-bold text-sm">{currentPlan.carpetAreaSqFt} Sq. Ft</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Indicative Cost</span>
                        <span className="text-amber-400 font-bold text-sm">{currentPlan.priceEstimate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Possession</span>
                        <span className="text-white font-bold text-sm">{project.possessionDate}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-mono uppercase text-slate-300 block">Key Highlights</span>
                      {currentPlan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-wrap gap-2">
                      <button
                        onClick={handleDownloadBrochure}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-white rounded-sm transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span>Download Floor Plan PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onBookVisit(project.name, project.type, currentPlan.unitType);
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] text-[#05070c] font-mono text-xs font-bold uppercase rounded-sm transition-all"
                      >
                        <span>Reserve Unit Visit</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Unit EMI Calculator (Embedded directly with floor plan & pricing) */}
              <div className="pt-2">
                <EmiCalculator
                  compact={true}
                  initialPropertyValue={unitPriceEstimate}
                  projectName={`${project.name} (${currentPlan?.unitType || "Selected Unit"})`}
                  onOpenBooking={() => {
                    onClose();
                    onBookVisit(project.name, project.type, currentPlan?.unitType);
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB: Dedicated EMI Calculator */}
          {activeTab === "calculator" && (
            <div className="space-y-4">
              {/* Unit Selector Bar inside Calculator Tab */}
              <div className="bg-[#05070c] border border-white/10 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Unit Model:</span>
                  <strong className="text-amber-400">{currentPlan?.unitType || "Standard Unit"}</strong>
                  <span className="text-slate-500">({currentPlan?.priceEstimate || project.priceStart})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.floorPlans.map((plan, idx) => (
                    <button
                      key={plan.unitType}
                      onClick={() => setSelectedFloorPlanIndex(idx)}
                      className={`px-3 py-1 text-[11px] uppercase tracking-wider rounded-sm transition-all ${
                        selectedFloorPlanIndex === idx
                          ? "bg-[#f59e0b] text-[#05070c] font-bold"
                          : "bg-[#0a0e18] border border-white/15 text-slate-400 hover:text-white"
                      }`}
                    >
                      {plan.unitType}
                    </button>
                  ))}
                </div>
              </div>

              <EmiCalculator
                compact={true}
                initialPropertyValue={unitPriceEstimate}
                projectName={`${project.name} (${currentPlan?.unitType || "Selected Unit"})`}
                onOpenBooking={() => {
                  onClose();
                  onBookVisit(project.name, project.type, currentPlan?.unitType);
                }}
              />
            </div>
          )}

          {/* TAB 2: Amenities Checklist */}
          {activeTab === "amenities" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {project.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#05070c] border border-white/10 p-3.5 rounded-sm flex items-center gap-3 text-sm text-slate-200"
                >
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Gallery */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.galleryImages.map((img, idx) => (
                <div key={idx} className="aspect-video rounded-sm overflow-hidden border border-white/10 bg-slate-950">
                  <img src={img} alt={`${project.name} photo ${idx + 1}`} className="w-full h-full object-cover bright-img hover:scale-105" />
                </div>
              ))}
            </div>
          )}

          {/* Proximity Matrix */}
          <div className="bg-[#05070c] border border-white/10 p-4 rounded-sm">
            <div className="text-xs font-mono uppercase text-[#f59e0b] tracking-wider mb-2 font-semibold">
              Strategic Proximity & Connectivity
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {project.nearbyLandmarks.map((lm, idx) => (
                <div key={idx} className="border-l border-white/10 pl-2.5">
                  <span className="text-slate-400 block text-[11px]">{lm.name}</span>
                  <span className="text-amber-300 font-bold">{lm.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-[#05070c] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs text-slate-300">
            <span>RERA Registration ID: </span>
            <strong className="text-amber-300">{project.reraNumber}</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadBrochure}
              className="px-4 py-2.5 border border-white/20 hover:border-white text-xs font-mono text-white uppercase rounded-sm flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Project Brochure</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookVisit(project.name, project.type);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] hover:from-[#f38634] hover:to-[#fbbf24] text-[#05070c] font-mono text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Site Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
