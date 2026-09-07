"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { CheckCircle2, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ConstructionTrackerProps {
  onBookVisit: (projectName: string, projectType: string) => void;
}

export const ConstructionTracker: React.FC<ConstructionTrackerProps> = ({ onBookVisit }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);

  const currentProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <section id="construction" className="py-24 bg-[#05070c] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Real-Time Auditing</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Live Construction Progress Tracker
          </h2>
          <p className="text-slate-300 font-sans text-base mt-2">
            Every Digireach project is logged on-site weekly. Track certified civil engineering milestones, structural slab pouring, and façade completion.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {projectsData.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                selectedProjectId === project.id
                  ? "bg-[#f59e0b] text-[#05070c] font-bold shadow-md"
                  : "bg-[#0a0e18] border border-white/15 text-slate-300 hover:border-white/30"
              }`}
            >
              <span>{project.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  selectedProjectId === project.id
                    ? "bg-[#05070c]/40 text-black font-bold"
                    : "bg-white/5 text-amber-400"
                }`}
              >
                {project.constructionProgressPct}%
              </span>
            </button>
          ))}
        </div>

        {/* Tracker Showcase Card */}
        <div className="bg-[#0a0e18] border border-white/15 rounded-sm p-6 lg:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bright Project Image & Progress Gauge */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-[16/10] relative rounded-sm overflow-hidden border border-white/10 bg-slate-950">
                <img
                  src={currentProject.coverImage}
                  alt={currentProject.name}
                  className="w-full h-full object-cover bright-img"
                />
                
                <div className="absolute top-3 left-3 bg-[#05070c]/90 backdrop-blur-md px-3 py-1 rounded-sm text-xs font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>QC Audited: 3 Days Ago</span>
                </div>
              </div>

              {/* Master Progress Bar */}
              <div className="bg-[#05070c] border border-white/15 p-5 rounded-sm space-y-2 shadow-lg">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-300 uppercase">Overall Project Progress</span>
                  <span className="text-amber-400 font-bold text-lg">
                    {currentProject.constructionProgressPct}% Complete
                  </span>
                </div>

                {/* Animated Bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#e07a2c]"
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProject.constructionProgressPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
                  <span>Foundation & Substructure</span>
                  <span>Handover & OC</span>
                </div>
              </div>
            </div>

            {/* Right: Milestone Breakdown List */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="font-mono text-xs uppercase text-[#f59e0b] tracking-widest font-semibold">
                  Civil Engineering Log · Project RERA: {currentProject.reraNumber}
                </span>
                <h3 className="font-display text-3xl text-white uppercase mt-1">
                  {currentProject.name}
                </h3>
                <p className="font-mono text-xs text-slate-300 flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Committed Handover: {currentProject.possessionDate}</span>
                </p>
              </div>

              {/* Milestones List */}
              <div className="space-y-3 pt-2">
                {currentProject.milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className="bg-[#05070c] border border-white/15 p-4 rounded-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          ms.completed
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}
                      >
                        {ms.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{ms.stage}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {ms.completed ? "Phase 100% Passed QC & Civil Audit" : `Active Engineering · ${ms.pct}% Completed`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                          ms.completed ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {ms.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Site Escort */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-mono text-slate-400">
                  Inspect the physical site with our structural engineers.
                </p>
                <button
                  onClick={() => onBookVisit(currentProject.name, currentProject.type)}
                  className="bg-gradient-to-r from-[#e07a2c] to-[#f59e0b] hover:from-[#f38634] hover:to-[#fbbf24] text-[#05070c] font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-sm flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <span>Book Site Audit Visit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
