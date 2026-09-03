"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { Sparkles, X, Check, ArrowRight, RotateCcw, Building2 } from "lucide-react";

interface ProjectMatcherQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMatchedProject: (project: Project) => void;
  onBookVisit: (projectName: string, projectType: string) => void;
}

export const ProjectMatcherQuiz: React.FC<ProjectMatcherQuizProps> = ({
  isOpen,
  onClose,
  onSelectMatchedProject,
  onBookVisit,
}) => {
  const [step, setStep] = useState<number>(1);
  const [assetType, setAssetType] = useState<string>("residential");
  const [budgetTier, setBudgetTier] = useState<string>("1-2cr");
  const [preferredArea, setPreferredArea] = useState<string>("central");

  if (!isOpen) return null;

  // Calculate matching projects based on answers
  const getMatches = (): Project[] => {
    return projectsData.filter((p) => {
      // Asset type filter
      const matchesType = p.type === assetType;

      // Budget filter
      let matchesBudget = true;
      if (budgetTier === "under-1cr") {
        matchesBudget = p.priceStartNum <= 100;
      } else if (budgetTier === "1-2cr") {
        matchesBudget = p.priceStartNum >= 90 && p.priceStartNum <= 220;
      } else if (budgetTier === "2-3.5cr") {
        matchesBudget = p.priceStartNum >= 200 && p.priceStartNum <= 350;
      } else if (budgetTier === "above-3.5cr") {
        matchesBudget = p.priceStartNum >= 250;
      }

      return matchesType && matchesBudget;
    }).slice(0, 2);
  };

  const matches = getMatches().length > 0 ? getMatches() : projectsData.filter(p => p.type === assetType).slice(0, 2);

  const resetQuiz = () => {
    setStep(1);
    setAssetType("residential");
    setBudgetTier("1-2cr");
    setPreferredArea("central");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#121824] border border-white/15 rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quiz Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#e07a2c]/20 text-[#e07a2c] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#e07a2c]">
            Project Matcher Wizard
          </span>
        </div>

        {/* STEP 1: Asset Purpose */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
              What type of property are you looking for?
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Step 1 of 3 · Select your primary investment purpose
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: "residential", label: "Residential Home / Villa", sub: "For self-occupancy or high-yield rental" },
                { id: "commercial", label: "Commercial Office / Tech Space", sub: "Grade-A office suites & IT corporate floors" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAssetType(opt.id);
                    setStep(2);
                  }}
                  className={`w-full p-4 rounded-sm border text-left flex items-center justify-between transition-all ${
                    assetType === opt.id
                      ? "bg-[#0a0d14] border-[#e07a2c] text-white"
                      : "bg-[#0a0d14]/60 border-white/10 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{opt.label}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{opt.sub}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#e07a2c]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Budget Range */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
              What is your target budget bracket?
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Step 2 of 3 · All figures in INR inclusive of basic car parking
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                { id: "under-1cr", label: "Under ₹1.00 Crore", sub: "Smart 2 BHK & Boutique Suites" },
                { id: "1-2cr", label: "₹1.00 Cr – ₹2.00 Cr", sub: "Luxury 3 BHK & Retail units" },
                { id: "2-3.5cr", label: "₹2.00 Cr – ₹3.50 Cr", sub: "Triplex Villas & Tech Suites" },
                { id: "above-3.5cr", label: "₹3.50 Cr+", sub: "Sky Penthouses & Full Floors" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setBudgetTier(opt.id);
                    setStep(3);
                  }}
                  className={`p-3.5 rounded-sm border text-left flex flex-col justify-between transition-all ${
                    budgetTier === opt.id
                      ? "bg-[#0a0d14] border-[#e07a2c] text-white"
                      : "bg-[#0a0d14]/60 border-white/10 text-slate-300 hover:border-white/30"
                  }`}
                >
                  <div className="font-bold text-sm text-amber-300">{opt.label}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">{opt.sub}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Location */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-display text-2xl sm:text-3xl uppercase text-white">
              Which growth corridor do you prefer?
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Step 3 of 3 · We develop in top-tier growth zones
            </p>

            <div className="space-y-2.5 pt-2">
              {[
                { id: "central", label: "Race Course / Central City Promenade", sub: "Premier legacy address with high appreciation" },
                { id: "it-corridor", label: "Avinashi Road & Peelamedu IT Axis", sub: "Adjacent to TIDEL Park, KMCH & Airport" },
                { id: "saravanampatti", label: "Saravanampatti / Tech Hub Link", sub: "Gated villas & IT SEZ proximity" },
                { id: "hills", label: "Vadavalli & Marudhamalai Foothills", sub: "Clean air, lush green lungs & tranquil living" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPreferredArea(opt.id);
                    setStep(4);
                  }}
                  className="w-full p-3.5 rounded-sm border border-white/10 bg-[#0a0d14]/60 hover:border-[#e07a2c] text-left flex items-center justify-between transition-all"
                >
                  <div>
                    <div className="font-bold text-sm text-white">{opt.label}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{opt.sub}</div>
                  </div>
                  <Check className="w-4 h-4 text-[#e07a2c]" />
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Results Screen */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="text-center pb-2 border-b border-white/10">
              <span className="font-mono text-xs uppercase text-[#e07a2c] tracking-widest">
                Matches Found
              </span>
              <h3 className="font-display text-2xl sm:text-3xl uppercase text-white mt-1">
                Your Ideal Developments
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Curated based on your {assetType} preference and budget criteria.
              </p>
            </div>

            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#0a0d14] border border-white/10 rounded-sm p-4 flex flex-col sm:flex-row items-center gap-4 hover:border-[#e07a2c] transition-colors"
                >
                  <img
                    src={match.coverImage}
                    alt={match.name}
                    className="w-full sm:w-28 h-20 object-cover rounded-sm"
                  />
                  <div className="flex-1 text-left">
                    <div className="text-xs font-mono text-[#e07a2c] uppercase">{match.subType}</div>
                    <div className="font-display text-lg text-white uppercase">{match.name}</div>
                    <div className="text-xs font-mono text-amber-300">Starting from {match.priceStart}</div>
                  </div>
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectMatchedProject(match);
                      }}
                      className="flex-1 sm:flex-none px-3 py-1.5 border border-white/20 hover:border-white text-xs font-mono text-white rounded-sm"
                    >
                      View Plans
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onBookVisit(match.name, match.type);
                      }}
                      className="flex-1 sm:flex-none px-3 py-1.5 bg-[#e07a2c] text-[#0a0d14] font-bold text-xs font-mono uppercase rounded-sm"
                    >
                      Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white/10 text-white font-mono text-xs uppercase rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
