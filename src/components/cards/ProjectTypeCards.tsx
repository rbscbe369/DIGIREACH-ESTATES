"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";

interface ProjectTypeCardData {
  title: string;
  category: "Residential" | "Commercial";
  startingPrice: string;
  priceSuffix: string;
  featured?: boolean;
  featuredBadge?: string;
  features: string[];
  specs: string;
  ctaText: string;
}

interface ProjectTypeCardsProps {
  onSelectType: (type: string) => void;
}

const tiers: ProjectTypeCardData[] = [
  {
    title: "Skyline Apartments",
    category: "Residential",
    startingPrice: "₹75 Lakhs",
    priceSuffix: "onwards",
    specs: "2, 3 & 4 BHK High-Rise Residences",
    features: [
      "Acoustic double-glazed panoramic windows",
      "Tier-3 Biometric security & clubhouse access",
      "EV charger installed in covered parking bay",
      "100% DG generator backup for full flat",
      "RERA verified delivery milestones",
    ],
    ctaText: "Explore Apartments",
  },
  {
    title: "Gated Private Villas",
    category: "Residential",
    startingPrice: "₹2.20 Cr",
    priceSuffix: "onwards",
    featured: true,
    featuredBadge: "Most In-Demand",
    specs: "3, 4 & 5 BHK Triplex Sanctuaries",
    features: [
      "Private plunge pool & landscaped Zen courtyard",
      "5 KVA dedicated rooftop solar micro-grid",
      "Internal private hydraulic elevator provision",
      "Independent 3-car portico & driver quarters",
      "Exclusive community clubhouse & tennis court",
    ],
    ctaText: "Explore Luxury Villas",
  },
  {
    title: "High-Street Retail",
    category: "Commercial",
    startingPrice: "₹1.10 Cr",
    priceSuffix: "onwards",
    specs: "Flagship Stores, F&B & Boutiques",
    features: [
      "High-visibility 350-ft arterial highway frontage",
      "18-foot clear double-height floor ceilings",
      "Dedicated multi-tier customer basement parking",
      "Al-fresco dining terraces & grease trap ready",
      "Target footfall of 350,000+ prime consumers",
    ],
    ctaText: "Explore Retail Hubs",
  },
  {
    title: "Corporate Tech Parks",
    category: "Commercial",
    startingPrice: "₹2.50 Cr",
    priceSuffix: "onwards",
    specs: "Grade-A IT & GCC Headquarters",
    features: [
      "IGBC Platinum Green Building Certified",
      "40,000 sq.ft column-free flexible floor plates",
      "10 high-speed destination control elevators",
      "Dedicated HVAC chillers & 24/7 power redundancy",
      "Grand double-height corporate arrival lobby",
    ],
    ctaText: "Explore Office Parks",
  },
];

export const ProjectTypeCards: React.FC<ProjectTypeCardsProps> = ({ onSelectType }) => {
  return (
    <section id="types" className="py-24 bg-[#05070c] border-t border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Development Portfolio</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Choose Your Asset Class
          </h2>
          <p className="text-slate-300 font-sans text-base mt-3">
            Whether securing a generational family residence or acquiring high-yielding commercial assets, Digireach delivers institutional-grade quality with lifetime structural integrity.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`bg-[#0a0e18] border rounded-sm p-7 flex flex-col justify-between transition-all duration-300 relative group hover:border-[#f59e0b] hover:-translate-y-1 shadow-2xl ${
                tier.featured
                  ? "border-[#f59e0b] ring-1 ring-[#f59e0b]/40 shadow-[0_15px_40px_rgba(245,158,11,0.2)]"
                  : "border-white/15"
              }`}
            >
              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute -top-3.5 left-7 bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] text-[#05070c] font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                  {tier.featuredBadge || "Featured"}
                </div>
              )}

              <div>
                {/* Category Tag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#f59e0b] font-semibold">
                    {tier.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10">
                    {tier.specs}
                  </span>
                </div>

                {/* Plan / Segment Title */}
                <h3 className="font-display text-2xl text-white mt-3 uppercase tracking-wide">
                  {tier.title}
                </h3>

                {/* Price Display */}
                <div className="mt-4 pb-5 border-b border-white/10">
                  <div className="font-display text-4xl text-amber-400 tracking-tight">
                    {tier.startingPrice}
                  </div>
                  <span className="font-mono text-xs text-slate-400 block mt-0.5">
                    {tier.priceSuffix} · Base Selling Price
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3.5 my-6">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200 font-sans">
                      <div className="w-4 h-4 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectType(tier.title)}
                className={`w-full font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all mt-4 ${
                  tier.featured
                    ? "bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] hover:from-[#f38634] hover:to-[#fbbf24] text-[#05070c] shadow-lg"
                    : "border border-white/20 hover:border-[#f59e0b] text-white hover:bg-white/5"
                }`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
