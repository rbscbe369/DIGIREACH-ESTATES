"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { StatsBar } from "./StatsBar";
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenQuiz }) => {
  return (
    <section className="relative pt-12 pb-20 bg-[#05070c] overflow-hidden border-b border-white/10">
      {/* Background Architectural Glow */}
      <div className="absolute inset-0 bg-radial-hero pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* RERA Badge & Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow !mb-0">
                Crafting Legacies Since 2002
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] rounded-full uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                RERA Registered: {siteConfig.reraNumber}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display uppercase tracking-tight text-white leading-[0.95]">
              BUILT WITH PRECISION.<br />
              LIVED WITH <span className="text-[#f59e0b] drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">PRIDE.</span>
            </h1>

            {/* Subtitle / Lead */}
            <p className="text-slate-300 text-lg sm:text-xl font-sans max-w-2xl leading-relaxed">
              From sky-rise panoramic residences and biophilic private villas to Grade-A corporate headquarters — Digireach Estates builds with 100% clear freehold titles, IGBC green standards, and uncompromising handover commitments.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] hover:from-[#f38634] hover:to-[#fbbf24] text-[#05070c] font-mono text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-sm shadow-2xl shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Site Visit →</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-2 border border-white/20 hover:border-[#f59e0b] text-white font-mono text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-all hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                <span>Find My Match</span>
              </button>

              <a
                href="#portfolio"
                className="flex items-center gap-1.5 text-slate-400 hover:text-white font-mono text-xs uppercase tracking-widest px-2 py-2"
              >
                <span>Browse Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-mono text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                <span>100% On-Time Record</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                <span>Pre-Approved Bank Loans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />
                <span>Zero Hidden Escalations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bright, Sun-Drenched Architectural Highlight on Deep Dark Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-white/20 bg-[#0c1017] shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
              {/* Bright, Vivid Architectural Photo */}
              <div className="aspect-[4/3] overflow-hidden relative bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Digireach Lumina Towers Flagship"
                  className="w-full h-full object-cover object-center bright-img group-hover:scale-105"
                />
                
                {/* Floating status pill */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#05070c]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wider text-amber-300 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Flagship Development
                </div>
              </div>

              {/* Card Meta Content on Deep Dark Panel */}
              <div className="p-6 bg-[#0a0e18] border-t border-white/10 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-[#f59e0b] font-semibold">
                      Now Booking Phase II
                    </div>
                    <h3 className="font-display text-2xl text-white mt-1">
                      Digireach Lumina Towers
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Race Course Boulevard, Coimbatore
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                      Starting At
                    </span>
                    <span className="font-mono text-2xl font-bold text-amber-400">
                      ₹1.45 Cr*
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono text-slate-200">
                  <span>2, 3 & 4 BHK Sky Residences</span>
                  <button
                    onClick={onOpenBooking}
                    className="text-[#f59e0b] hover:text-amber-300 hover:underline flex items-center gap-1 font-bold uppercase transition-colors"
                  >
                    <span>Request Escort</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Contrast Scoreboard */}
        <div className="mt-14">
          <StatsBar />
        </div>
      </div>
    </section>
  );
};
