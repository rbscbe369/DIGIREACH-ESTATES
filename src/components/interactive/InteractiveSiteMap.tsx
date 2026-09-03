"use client";

import React, { useState } from "react";
import { Layers, Info, CheckCircle2, ChevronRight } from "lucide-react";

interface ZoneData {
  id: string;
  name: string;
  type: string;
  status: "available" | "few_left" | "sold_out";
  statusText: string;
  unitsAvailable: number;
  totalUnits: number;
  floors: string;
  possession: string;
  tooltipPos: { x: number; y: number };
}

interface InteractiveSiteMapProps {
  onSelectZone: (zoneName: string) => void;
}

const zones: ZoneData[] = [
  {
    id: "tower-a",
    name: "Tower A (Skyline Heights)",
    type: "3 & 4 BHK Panoramic Sky Suites",
    status: "few_left",
    statusText: "Only 4 Units Left",
    unitsAvailable: 4,
    totalUnits: 64,
    floors: "G + 28 Floors",
    possession: "Dec 2026",
    tooltipPos: { x: 22, y: 35 },
  },
  {
    id: "tower-b",
    name: "Tower B (Imperial Residences)",
    type: "2 & 3 BHK Luxury Suites",
    status: "available",
    statusText: "Now Booking Phase 2",
    unitsAvailable: 18,
    totalUnits: 72,
    floors: "G + 24 Floors",
    possession: "March 2027",
    tooltipPos: { x: 48, y: 30 },
  },
  {
    id: "villas-cluster",
    name: "The Royal Enclave (Triplex Villas)",
    type: "4 & 5 BHK Private Pool Villas",
    status: "few_left",
    statusText: "Only 2 Exclusive Villas Left",
    unitsAvailable: 2,
    totalUnits: 24,
    floors: "G + 2 Floors",
    possession: "Ready to Move",
    tooltipPos: { x: 78, y: 55 },
  },
  {
    id: "clubhouse",
    name: "Clubhouse & Cantilever Pool",
    type: "15,000 Sq.Ft Lifestyle Pavilion",
    status: "available",
    statusText: "Completed & Commissioned",
    unitsAvailable: 0,
    totalUnits: 0,
    floors: "3 Levels",
    possession: "Operational",
    tooltipPos: { x: 35, y: 70 },
  },
  {
    id: "commercial-plaza",
    name: "Commercial & High-Street Retail",
    type: "Boutique Retail & Executive Cafés",
    status: "available",
    statusText: "Anchor Tenants Booking",
    unitsAvailable: 6,
    totalUnits: 16,
    floors: "G + 3 Floors",
    possession: "August 2026",
    tooltipPos: { x: 70, y: 22 },
  },
];

export const InteractiveSiteMap: React.FC<InteractiveSiteMapProps> = ({ onSelectZone }) => {
  const [activeZone, setActiveZone] = useState<ZoneData>(zones[0]);
  const [hoveredZone, setHoveredZone] = useState<ZoneData | null>(null);

  const displayedZone = hoveredZone || activeZone;

  return (
    <section id="sitemap" className="py-24 bg-[#121824] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Interactive Master Plan</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Explore 28-Acre Integrated Township
          </h2>
          <p className="text-slate-400 font-sans text-base mt-2">
            Hover or click over any township zone below to inspect live inventory status, floor heights, and possession timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main: SVG Interactive Master Plan Map */}
          <div className="lg:col-span-8 bg-[#0a0d14] border border-white/15 rounded-sm p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Legend Ticker */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Fast Selling
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e07a2c]" />
                  Active Zone
                </span>
              </div>
              <span className="text-slate-400">Click zone to select</span>
            </div>

            {/* SVG Visual Master Plan */}
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-slate-950 border border-white/5 select-none">
              <svg
                viewBox="0 0 1000 625"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Site Roads & Landscaping */}
                <rect width="1000" height="625" fill="#0c121e" />
                
                {/* Greenery / Miyawaki Parks */}
                <path d="M 0,200 Q 250,180 500,280 T 1000,200 L 1000,625 L 0,625 Z" fill="#0f1f1d" opacity="0.6" />
                
                {/* Perimeter Boulevard */}
                <path d="M 50,580 L 950,580 L 950,50 L 50,50 Z" fill="none" stroke="#223249" strokeWidth="24" strokeDasharray="12,12" />
                <path d="M 50,580 L 950,580 L 950,50 L 50,50 Z" fill="none" stroke="#162335" strokeWidth="32" />
                
                {/* Central Water Body & Reflexology Lagoon */}
                <ellipse cx="420" cy="460" rx="140" ry="70" fill="#0b283d" stroke="#164e63" strokeWidth="4" />
                <text x="420" y="465" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="var(--font-space-mono)">Central Azure Lagoon</text>

                {/* ZONE 1: Tower A (Skyline Heights) */}
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredZone(zones[0])}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => {
                    setActiveZone(zones[0]);
                    onSelectZone(zones[0].name);
                  }}
                >
                  <rect
                    x="150"
                    y="120"
                    width="180"
                    height="170"
                    rx="8"
                    fill={displayedZone.id === "tower-a" ? "#e07a2c" : "#1e2c44"}
                    fillOpacity={displayedZone.id === "tower-a" ? "0.9" : "0.7"}
                    stroke={displayedZone.id === "tower-a" ? "#ffffff" : "#f59e0b"}
                    strokeWidth={displayedZone.id === "tower-a" ? "4" : "2"}
                  />
                  <text x="240" y="195" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="var(--font-anton)">TOWER A</text>
                  <text x="240" y="225" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="var(--font-space-mono)">G + 28 FLOORS</text>
                  <circle cx="310" cy="140" r="10" fill="#f59e0b" />
                  <text x="310" y="144" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">!</text>
                </g>

                {/* ZONE 2: Tower B (Imperial Residences) */}
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredZone(zones[1])}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => {
                    setActiveZone(zones[1]);
                    onSelectZone(zones[1].name);
                  }}
                >
                  <rect
                    x="400"
                    y="100"
                    width="190"
                    height="180"
                    rx="8"
                    fill={displayedZone.id === "tower-b" ? "#e07a2c" : "#1e2c44"}
                    fillOpacity={displayedZone.id === "tower-b" ? "0.9" : "0.7"}
                    stroke={displayedZone.id === "tower-b" ? "#ffffff" : "#10b981"}
                    strokeWidth={displayedZone.id === "tower-b" ? "4" : "2"}
                  />
                  <text x="495" y="180" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="var(--font-anton)">TOWER B</text>
                  <text x="495" y="210" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="var(--font-space-mono)">G + 24 FLOORS</text>
                  <circle cx="570" cy="120" r="10" fill="#10b981" />
                  <text x="570" y="124" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">✓</text>
                </g>

                {/* ZONE 3: The Royal Enclave (Villas) */}
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredZone(zones[2])}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => {
                    setActiveZone(zones[2]);
                    onSelectZone(zones[2].name);
                  }}
                >
                  <polygon
                    points="700,320 920,320 940,540 680,540"
                    fill={displayedZone.id === "villas-cluster" ? "#e07a2c" : "#1b332b"}
                    fillOpacity={displayedZone.id === "villas-cluster" ? "0.9" : "0.75"}
                    stroke={displayedZone.id === "villas-cluster" ? "#ffffff" : "#34d399"}
                    strokeWidth={displayedZone.id === "villas-cluster" ? "4" : "2"}
                  />
                  <text x="810" y="420" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="var(--font-anton)">ROYAL VILLAS</text>
                  <text x="810" y="448" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="var(--font-space-mono)">24 TRIPLEX UNITS</text>
                  <circle cx="910" cy="340" r="10" fill="#f59e0b" />
                  <text x="910" y="344" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">!</text>
                </g>

                {/* ZONE 4: Clubhouse & Pool */}
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredZone(zones[3])}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => {
                    setActiveZone(zones[3]);
                    onSelectZone(zones[3].name);
                  }}
                >
                  <rect
                    x="160"
                    y="360"
                    width="190"
                    height="150"
                    rx="12"
                    fill={displayedZone.id === "clubhouse" ? "#e07a2c" : "#1a2536"}
                    fillOpacity={displayedZone.id === "clubhouse" ? "0.95" : "0.8"}
                    stroke={displayedZone.id === "clubhouse" ? "#ffffff" : "#38bdf8"}
                    strokeWidth={displayedZone.id === "clubhouse" ? "4" : "2"}
                  />
                  <text x="255" y="430" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="bold" fontFamily="var(--font-anton)">CLUBHOUSE</text>
                  <text x="255" y="455" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="var(--font-space-mono)">SPA & INFINITY POOL</text>
                </g>

                {/* ZONE 5: Commercial Plaza */}
                <g
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredZone(zones[4])}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => {
                    setActiveZone(zones[4]);
                    onSelectZone(zones[4].name);
                  }}
                >
                  <rect
                    x="680"
                    y="90"
                    width="230"
                    height="160"
                    rx="8"
                    fill={displayedZone.id === "commercial-plaza" ? "#e07a2c" : "#2d241c"}
                    fillOpacity={displayedZone.id === "commercial-plaza" ? "0.9" : "0.75"}
                    stroke={displayedZone.id === "commercial-plaza" ? "#ffffff" : "#fbbf24"}
                    strokeWidth={displayedZone.id === "commercial-plaza" ? "4" : "2"}
                  />
                  <text x="795" y="165" textAnchor="middle" fill="#ffffff" fontSize="17" fontWeight="bold" fontFamily="var(--font-anton)">COMMERCIAL HUB</text>
                  <text x="795" y="195" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="var(--font-space-mono)">RETAIL & F&B</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Right: Selected Zone Inspector Card */}
          <div className="lg:col-span-4 bg-[#0a0d14] border border-white/15 rounded-sm p-6 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#e07a2c] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Zone Details
              </span>
              <h3 className="font-display text-2xl text-white uppercase mt-1">
                {displayedZone.name}
              </h3>
              <p className="font-mono text-xs text-amber-300 mt-1">
                {displayedZone.type}
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Inventory Status</span>
                <span className="font-bold text-amber-400">{displayedZone.statusText}</span>
              </div>

              {displayedZone.totalUnits > 0 && (
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Available Units</span>
                  <span className="text-white font-bold">{displayedZone.unitsAvailable} / {displayedZone.totalUnits} Units</span>
                </div>
              )}

              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Structural Height</span>
                <span className="text-white">{displayedZone.floors}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Possession Milestone</span>
                <span className="text-white font-bold">{displayedZone.possession}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectZone(displayedZone.name)}
                className="w-full bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>Book Escorted Visit For This Zone</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
