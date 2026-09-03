"use client";

import React, { useState, useMemo } from "react";
import { projectsData, Project } from "@/data/projects";
import { Search, MapPin, Calendar, ArrowRight, Eye, Sparkles, Building2 } from "lucide-react";

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
  onBookVisit: (projectName: string, projectType: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onBookVisit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedUnitType, setSelectedUnitType] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(400); // INR Lakhs

  // Extract unique cities
  const cities = useMemo(() => {
    return ["all", "Coimbatore", "Chennai", "Bengaluru"];
  }, []);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = selectedCity === "all" || p.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesType = selectedType === "all" || p.type === selectedType;
      const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
      const matchesUnit =
        selectedUnitType === "all" ||
        p.unitTypes.some((u) => u.toLowerCase().includes(selectedUnitType.toLowerCase()));
      const matchesPrice = p.priceStartNum <= maxPrice;

      return matchesSearch && matchesCity && matchesType && matchesStatus && matchesUnit && matchesPrice;
    });
  }, [searchQuery, selectedCity, selectedType, selectedStatus, selectedUnitType, maxPrice]);

  return (
    <section id="portfolio" className="py-24 bg-[#05070c] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & City / Type Switchers */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="eyebrow">South India Portfolio</div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Signature Landmark Developments
            </h2>
            <p className="text-slate-300 font-sans text-base mt-2 max-w-xl">
              Explore ongoing high-rises, gated villa communities, and Grade-A commercial tech parks across Coimbatore, Chennai, and Bengaluru.
            </p>
          </div>

          {/* Quick Type & City Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* City Tabs */}
            <div className="flex items-center gap-1.5 bg-[#0c1017] p-1.5 border border-white/15 rounded-sm font-mono text-xs uppercase shadow-lg">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-sm transition-colors ${
                    selectedCity === city
                      ? "bg-[#f59e0b] text-[#05070c] font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {city === "all" ? "All Cities" : city}
                </button>
              ))}
            </div>

            {/* Asset Type Switcher */}
            <div className="flex items-center gap-1.5 bg-[#0c1017] p-1.5 border border-white/15 rounded-sm font-mono text-xs uppercase shadow-lg">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-3 py-1.5 rounded-sm transition-colors ${
                  selectedType === "all"
                    ? "bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] text-[#05070c] font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType("residential")}
                className={`px-3 py-1.5 rounded-sm transition-colors ${
                  selectedType === "residential"
                    ? "bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] text-[#05070c] font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setSelectedType("commercial")}
                className={`px-3 py-1.5 rounded-sm transition-colors ${
                  selectedType === "commercial"
                    ? "bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] text-[#05070c] font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Commercial
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0a0e18] border border-white/15 p-5 rounded-sm mb-10 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project name, corridor, or city..."
                className="w-full bg-[#05070c] border border-white/15 rounded-sm pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 font-sans focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            {/* Status Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#05070c] border border-white/15 rounded-sm px-3.5 py-2.5 text-sm text-slate-200 font-mono focus:outline-none focus:border-[#f59e0b]"
              >
                <option value="all">All Statuses</option>
                <option value="under_construction">Ongoing (Under Construction)</option>
                <option value="ready_to_move">Ready to Move</option>
                <option value="new_launch">New Launch (Phase 1)</option>
              </select>
            </div>

            {/* Unit Preference Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedUnitType}
                onChange={(e) => setSelectedUnitType(e.target.value)}
                className="w-full bg-[#05070c] border border-white/15 rounded-sm px-3.5 py-2.5 text-sm text-slate-200 font-mono focus:outline-none focus:border-[#f59e0b]"
              >
                <option value="all">All Configurations</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK / Penthouse</option>
                <option value="Villa">Villas</option>
                <option value="Office">Offices / Commercial</option>
                <option value="Retail">Retail / Showrooms</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="lg:col-span-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span>Max Budget:</span>
                <span className="text-amber-400 font-bold">₹{maxPrice >= 400 ? "4 Cr+" : `${maxPrice}L`}</span>
              </div>
              <input
                type="range"
                min="70"
                max="400"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>
          </div>

          {/* Results Status Count */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
            <div>
              Showing <span className="text-amber-400 font-bold">{filteredProjects.length}</span> of {projectsData.length} developments
              {selectedCity !== "all" && <span> in <strong className="text-slate-200">{selectedCity}</strong></span>}
            </div>
            {(searchQuery || selectedCity !== "all" || selectedType !== "all" || selectedStatus !== "all" || selectedUnitType !== "all" || maxPrice < 400) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("all");
                  setSelectedType("all");
                  setSelectedStatus("all");
                  setSelectedUnitType("all");
                  setMaxPrice(400);
                }}
                className="text-[#f59e0b] hover:underline"
              >
                Clear all filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Portfolio Grid with Casagrand-style USP badges and bright imagery */}
        {filteredProjects.length === 0 ? (
          <div className="bg-[#0a0e18] border border-white/15 p-12 text-center rounded-sm font-mono text-slate-400">
            <p className="text-base">No developments match your current filter parameters.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("all");
                setSelectedType("all");
                setSelectedStatus("all");
                setSelectedUnitType("all");
                setMaxPrice(400);
              }}
              className="mt-4 px-4 py-2 bg-[#f59e0b] text-[#05070c] text-xs font-bold uppercase rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#0a0e18] border border-white/15 rounded-sm overflow-hidden flex flex-col group hover:border-[#f59e0b] hover:shadow-[0_12px_40px_rgba(245,158,11,0.15)] transition-all duration-300 shadow-2xl"
              >
                  {/* Card Cover Image */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-950">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover bright-img group-hover:scale-105"
                    />

                    {/* Top status badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#05070c]/90 backdrop-blur-md border border-white/20 text-[11px] font-mono uppercase text-amber-300 rounded-sm font-semibold shadow-md">
                        {project.city}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase rounded-sm font-bold shadow-md ${
                          project.status === "ready_to_move"
                            ? "bg-emerald-500 text-white"
                            : project.status === "new_launch"
                            ? "bg-purple-600 text-white"
                            : "bg-[#f59e0b] text-[#05070c]"
                        }`}
                      >
                        {project.statusLabel}
                      </span>
                    </div>

                    {/* Amenities Count Badge (Casagrand style: e.g. 100+ Amenities) */}
                    {project.amenitiesCount && (
                      <div className="absolute top-3 right-3 bg-[#05070c]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-sm text-[10px] font-mono text-emerald-400 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                        <span>{project.amenitiesCount}+ Amenities</span>
                      </div>
                    )}

                    {/* Construction Progress Pill */}
                    <div className="absolute bottom-3 right-3 bg-[#05070c]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-sm text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-md">
                      <span className="text-slate-400">Progress:</span>
                      <strong className="text-amber-400">{project.constructionProgressPct}%</strong>
                    </div>
                  </div>

                  {/* Card Body on Deep Dark Slate */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#0a0e18]">
                    <div>
                      {/* Casagrand-style Lifestyle Theme Banner */}
                      {project.lifestyleTheme && (
                        <div className="inline-block px-2 py-0.5 mb-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-sm text-[10px] font-mono uppercase text-[#f59e0b] font-semibold">
                          ★ {project.lifestyleTheme}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span className="truncate">{project.location}</span>
                      </div>
                      <h3 className="font-display text-2xl text-white mt-1 uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Units tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.unitTypes.map((u, uIdx) => (
                        <span
                          key={uIdx}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono text-slate-200"
                        >
                          {u}
                        </span>
                      ))}
                    </div>

                    {/* Price & Possession Footer */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Starting From</span>
                          <span className="font-mono text-2xl font-bold text-amber-400">{project.priceStart}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Possession</span>
                          <span className="font-mono text-xs text-slate-200 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#f59e0b]" />
                            {project.possessionDate}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => onSelectProject(project)}
                          className="py-2.5 px-3 border border-white/20 hover:border-white text-white font-mono text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#f59e0b]" />
                          <span>Floor Plans</span>
                        </button>
                        <button
                          onClick={() => onBookVisit(project.name, project.type)}
                          className="py-2.5 px-3 bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] hover:from-[#f38634] hover:to-[#fbbf24] text-[#05070c] font-mono text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-1 transition-all shadow-md font-bold"
                        >
                          <span>Site Visit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};
