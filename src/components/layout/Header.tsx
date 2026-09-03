"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { Building2, Phone, Menu, X, ShieldCheck, CalendarCheck } from "lucide-react";

interface HeaderProps {
  onOpenBooking: (project?: string, type?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10 transition-all">
      {/* Top utility ticker: RERA & Direct Contact */}
      <div className="bg-[#121824] border-b border-white/5 py-1.5 px-4 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Govt. Approved Builder · <strong className="text-slate-200">RERA: {siteConfig.reraNumber}</strong></span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Priority Desk: {siteConfig.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#e07a2c] to-[#a84c0c] flex items-center justify-center text-white shadow-lg shadow-orange-950/40 group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-display text-2xl tracking-wider text-white">
              DIGIREACH <span className="text-[#e07a2c]">ESTATES</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 -mt-1">
              Architecture & Development
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-300">
          <a href="#types" className="hover:text-[#e07a2c] transition-colors">Segments</a>
          <a href="#portfolio" className="hover:text-[#e07a2c] transition-colors">Portfolio</a>
          <a href="#sitemap" className="hover:text-[#e07a2c] transition-colors">Master Plan</a>
          <a href="#construction" className="hover:text-[#e07a2c] transition-colors">Live Progress</a>
          <a href="#calculator" className="hover:text-[#e07a2c] transition-colors">EMI Calculator</a>
          <a href="#why-us" className="hover:text-[#e07a2c] transition-colors">Why Choose Us</a>
          <a href="#leadership" className="hover:text-[#e07a2c] transition-colors">Leadership</a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 bg-[#e07a2c] hover:bg-[#f1893c] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Schedule Site Visit</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="bg-[#e07a2c] text-[#0a0d14] font-mono text-xs font-bold uppercase px-3 py-2 rounded-sm"
          >
            Visit
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121824] border-b border-white/10 px-6 py-6 space-y-4 font-mono text-sm tracking-wider uppercase">
          <a
            href="#types"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Project Segments
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Filterable Portfolio
          </a>
          <a
            href="#sitemap"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Interactive Master Plan
          </a>
          <a
            href="#construction"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Construction Tracker
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            EMI Calculator
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Why Choose Us
          </a>
          <a
            href="#leadership"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-[#e07a2c]"
          >
            Architects & Leadership
          </a>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#e07a2c] text-[#0a0d14] font-bold py-3 uppercase tracking-wider rounded-sm text-center"
            >
              Book Site Visit Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
