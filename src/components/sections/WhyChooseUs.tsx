"use client";

import React from "react";
import { ShieldCheck, Clock, Award, Leaf, Building, Banknote, Check } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "100% Clear Freehold Titles",
    desc: "Every acre is vetted by senior high court legal counsels. Zero joint-development ambiguity, zero litigation, and absolute title clarity.",
  },
  {
    icon: Clock,
    title: "Guaranteed On-Time Possession",
    desc: "Backed by strict RERA escrow account compliance. We guarantee handover on the committed date, supported by contractual delay compensation.",
  },
  {
    icon: Leaf,
    title: "IGBC Platinum Certified",
    desc: "Energy-efficient double-glazed façades, rainwater harvesting, solar microgrids, and EV charging stations standard across projects.",
  },
  {
    icon: Building,
    title: "In-House Structural Mastery",
    desc: "No outsourced general contractors. Our own permanent team of 60+ civil engineers and structural auditors oversee every concrete pour.",
  },
  {
    icon: Award,
    title: "5-Year Structural Warranty",
    desc: "Comprehensive 5-year structural defect liability coverage and lifetime preventative waterproofing inspections for complete peace of mind.",
  },
  {
    icon: Banknote,
    title: "Pre-Approved Tier-1 Home Loans",
    desc: "Fast-tracked 48-hour approvals from SBI, HDFC, ICICI, and Axis Bank with zero title verification charges and attractive interest concessions.",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-[#121824] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Institutional Standards</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Why Discerning Buyers Choose Digireach
          </h2>
          <p className="text-slate-400 font-sans text-base mt-3">
            In an industry plagued by delayed handovers and opaque pricing, Digireach Estates has delivered 4.8M+ sq.ft with zero compromise on legal integrity and civil craftsmanship.
          </p>
        </div>

        {/* 6-Card Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0a0e18] border border-white/15 p-7 rounded-sm flex flex-col justify-between group hover:border-[#f59e0b] hover:shadow-[0_12px_40px_rgba(245,158,11,0.15)] transition-all shadow-2xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#e07a2c]/20 to-transparent border border-[#f59e0b]/40 text-[#f59e0b] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-sans mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>RERA & ISO 9001:2015 Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
