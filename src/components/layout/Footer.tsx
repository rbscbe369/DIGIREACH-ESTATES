"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { projectsData } from "@/data/projects";
import { Building2, Mail, Phone, MapPin, ShieldCheck, ArrowRight, Check } from "lucide-react";

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#070a0e] text-slate-400 font-sans border-t border-white/10 relative">
      {/* Pre-Footer Call to Action Banner (matches gym demo's trial banner) */}
      <div className="bg-gradient-to-r from-amber-950/60 via-[#121824] to-orange-950/60 py-16 px-4 border-b border-white/10 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="eyebrow justify-center !mb-2">Private Site Escorts</div>
          <h2 className="font-display text-4xl sm:text-6xl text-white uppercase">
            Experience the Craftsmanship In Person.
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Walk our structural floors, touch the natural stone cladding, and meet our principal site architects. Complimentary chauffeur pickup provided.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-sm shadow-xl transition-all"
            >
              Schedule a Site Visit →
            </button>
            <a
              href={`https://wa.me/${siteConfig.phone}?text=${encodeURIComponent("Hi Digireach Estates! I would like to schedule a private site visit.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-[#e07a2c] text-white font-mono text-sm font-bold uppercase tracking-wider px-6 py-4 rounded-sm transition-all hover:bg-white/5"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand Info & RERA */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-[#e07a2c] flex items-center justify-center text-black">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="font-display text-2xl tracking-wider text-white">
                DIGIREACH <span className="text-[#e07a2c]">ESTATES</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Institutional-grade residential high-rises, private villa communities, and Grade-A commercial tech parks engineered with biophilic principles and lifetime structural durability.
            </p>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e07a2c] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e07a2c] shrink-0" />
                <span>{siteConfig.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e07a2c] shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Promoter RERA: {siteConfig.reraNumber}</span>
            </div>
          </div>

          {/* Col 2: Project Portfolio Quick List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Signature Developments
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {projectsData.map((proj) => (
                <li key={proj.id}>
                  <a href="#portfolio" className="hover:text-[#e07a2c] transition-colors flex items-center justify-between">
                    <span className="truncate">{proj.name}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{proj.type}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {siteConfig.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-[#e07a2c] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#location" className="hover:text-[#e07a2c] transition-colors">
                  Location Map
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#e07a2c] transition-colors">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Investor Insights & New Phases
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Subscribe to receive pre-launch priority allotments, construction video logs, and quarterly real estate appreciation reports.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-[#121824] border border-white/10 rounded-l-sm px-3 py-2 text-xs text-white placeholder-slate-500 font-mono w-full focus:outline-none focus:border-[#e07a2c]"
                />
                <button
                  type="submit"
                  className="bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] px-4 rounded-r-sm font-mono text-xs font-bold uppercase transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed! You will receive our next investor docket.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar & Reusable Demo Pitch Note */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Registered under Real Estate Regulatory Authority.
          </div>
          <div className="text-slate-400">
            Sample real estate platform built by <strong className="text-amber-400">Digireach Technologies</strong> · digireachtech.in
          </div>
        </div>
      </div>
    </footer>
  );
};
