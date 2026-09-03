"use client";

import React, { useState } from "react";
import { testimonialsData } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonialsData.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonialsData.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="py-24 bg-[#0a0d14] relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <div className="eyebrow">Client Validation</div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Trusted by 1,200+ Families & Enterprises
            </h2>
            <p className="text-slate-400 font-sans text-base mt-2">
              Hear directly from residential home-owners and commercial corporate tenants who made Digireach their long-term address.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-sm bg-[#121824] hover:bg-[#e07a2c] hover:text-[#0a0d14] text-white border border-white/10 flex items-center justify-center transition-colors shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-sm bg-[#121824] hover:bg-[#e07a2c] hover:text-[#0a0d14] text-white border border-white/10 flex items-center justify-center transition-colors shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#121824] border border-white/15 rounded-sm p-8 sm:p-12 shadow-2xl relative"
            >
              <Quote className="w-16 h-16 text-[#e07a2c]/20 absolute top-8 right-8 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Avatar & Meta */}
                <div className="lg:col-span-4 flex sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-sm overflow-hidden border-2 border-[#e07a2c] relative shrink-0 shadow-lg">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-xl text-white uppercase">{current.name}</h3>
                    <div className="font-mono text-xs text-[#e07a2c] mt-0.5">{current.title}</div>
                    <div className="font-mono text-xs text-slate-400">{current.companyOrRole}</div>

                    <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-1 mt-2 text-amber-400">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1 mt-3 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono rounded-sm">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified {current.projectType === "residential" ? "Resident" : "Tenant"}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Detailed Quote & Project Tag */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="font-mono text-xs text-amber-300 uppercase tracking-widest">
                    Asset Acquired: {current.projectBought}
                  </div>
                  <blockquote className="text-lg sm:text-2xl text-slate-200 font-sans italic leading-relaxed">
                    "{current.quote}"
                  </blockquote>

                  {/* Indicator dots */}
                  <div className="flex items-center gap-2 pt-4">
                    {testimonialsData.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentIndex(dotIdx)}
                        className={`h-1.5 transition-all rounded-full ${
                          currentIndex === dotIdx ? "w-8 bg-[#e07a2c]" : "w-2 bg-white/20"
                        }`}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
