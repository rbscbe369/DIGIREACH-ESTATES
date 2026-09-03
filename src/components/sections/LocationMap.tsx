"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Plane, Train, Building, School, Car, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const landmarks = [
  { category: "transit", icon: Plane, name: "Coimbatore International Airport", distance: "8.5 km", time: "14 mins" },
  { category: "transit", icon: Train, name: "Coimbatore Central Junction (SBC)", distance: "5.2 km", time: "12 mins" },
  { category: "tech", icon: Building, name: "TIDEL Park & ELCOT IT SEZ", distance: "4.8 km", time: "9 mins" },
  { category: "tech", icon: Building, name: "CHIL SEZ IT Park (Cognizant/Bosch)", distance: "9.0 km", time: "16 mins" },
  { category: "health", icon: Building, name: "KMCH Multispecialty Hospital", distance: "6.0 km", time: "11 mins" },
  { category: "education", icon: School, name: "PSG College of Technology & Medical", distance: "3.8 km", time: "7 mins" },
];

interface LocationMapProps {
  onOpenBooking: () => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredLandmarks =
    activeCategory === "all"
      ? landmarks
      : landmarks.filter((l) => l.category === activeCategory);

  return (
    <section id="location" className="py-24 bg-[#121824] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Strategic Corridors</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Connected to Prime Growth Hubs
          </h2>
          <p className="text-slate-400 font-sans text-base mt-2">
            Strategically clustered around arterial highways, metro transit arteries, and high-yielding commercial corridors.
          </p>
        </div>

        {/* Main Grid: Map & Landmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Embed Frame */}
          <div className="lg:col-span-7 bg-[#0a0d14] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-[#161f30] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e07a2c]" />
                <span>Digireach Corporate Experience Center</span>
              </div>
              <span className="text-emerald-400">Live Satellite View</span>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative flex-1 min-h-[360px] sm:min-h-[420px] w-full bg-slate-900">
              <iframe
                title="Digireach Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62657.4109156475!2d76.9535308!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Landmarks Matrix */}
          <div className="lg:col-span-5 bg-[#0a0d14] border border-white/10 rounded-sm p-6 flex flex-col justify-between space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#e07a2c]">
                  Nearby Transit & Landmarks
                </span>
                <span className="text-[10px] font-mono text-slate-400">Drive times from Site</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 my-4">
                {[
                  { id: "all", label: "All Hubs" },
                  { id: "transit", label: "Transit" },
                  { id: "tech", label: "IT SEZs" },
                  { id: "health", label: "Hospitals" },
                  { id: "education", label: "Institutes" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded-sm transition-colors ${
                      activeCategory === cat.id
                        ? "bg-[#e07a2c] text-[#0a0d14] font-bold"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Landmark List */}
              <div className="space-y-2.5">
                {filteredLandmarks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#121824] p-3 rounded-sm border border-white/5 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2.5 text-slate-200">
                        <Icon className="w-4 h-4 text-[#e07a2c] shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-amber-400 font-bold block">{item.distance}</span>
                        <span className="text-slate-500 text-[10px]">{item.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Escort Cab Offer */}
            <div className="p-4 bg-gradient-to-r from-amber-950/40 to-[#e07a2c]/10 border border-[#e07a2c]/30 rounded-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold uppercase">
                <Car className="w-4 h-4 text-[#e07a2c]" />
                <span>Complimentary Chauffeur Site Escort</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Visiting from airport or railway station? We arrange a private luxury chauffeur to escort your family directly to our project sites.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider py-2.5 rounded-sm transition-colors text-center"
              >
                Request Chauffeur Escort
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
