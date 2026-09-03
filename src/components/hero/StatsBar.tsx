"use client";

import React from "react";
import { siteConfig } from "@/config/siteConfig";
import { motion } from "framer-motion";

export const StatsBar: React.FC = () => {
  return (
    <div className="bg-[#121824] border border-white/10 rounded-sm p-6 lg:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Background architectural pattern */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />
      
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {siteConfig.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="text-center relative after:hidden md:after:block after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-[1px] after:bg-white/10 last:after:hidden"
          >
            <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e07a2c] tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mt-2">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
