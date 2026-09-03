"use client";

import React from "react";
import { leadershipData } from "@/data/leadership";
import { Award, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const LeadershipCards: React.FC = () => {
  return (
    <section id="leadership" className="py-24 bg-[#05070c] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="eyebrow">Architectural Vision</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Pioneered by Engineers & Architects
          </h2>
          <p className="text-slate-300 font-sans text-base mt-3">
            Every square foot is conceived by award-winning structural masters, landscape urbanists, and accredited green building council fellows.
          </p>
        </div>

        {/* Staff / Leadership 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipData.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#0a0e18] border border-white/15 rounded-sm overflow-hidden flex flex-col group hover:border-[#f59e0b] hover:shadow-[0_12px_40px_rgba(245,158,11,0.15)] transition-all duration-300 shadow-2xl"
            >
              {/* Photo Frame: Bright, Crisp & Crystal Clear with zero dark veil */}
              <div className="aspect-[3/4] relative overflow-hidden bg-slate-950">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top bright-img group-hover:scale-105"
                />
                
                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 bg-[#05070c]/90 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-sm text-[10px] font-mono text-amber-300 flex items-center gap-1.5 uppercase font-semibold shadow-md">
                  <Briefcase className="w-3 h-3 text-[#f59e0b]" />
                  <span>{leader.experience}</span>
                </div>
              </div>

              {/* Leader Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#0a0e18]">
                <div>
                  <h3 className="font-display text-xl text-white uppercase tracking-wide">
                    {leader.name}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#f59e0b] font-bold mt-1">
                    {leader.role}
                  </div>
                  <div className="flex items-start gap-1.5 mt-2.5 text-[11px] font-mono text-slate-200 bg-white/5 p-2 rounded-sm border border-white/10">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{leader.credentials}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-white/10">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
