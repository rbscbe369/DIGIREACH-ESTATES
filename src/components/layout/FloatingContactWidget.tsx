"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { MessageCircle, Phone, X, CalendarCheck, FileText, ArrowRight } from "lucide-react";

interface FloatingContactWidgetProps {
  onOpenBooking: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const waUrl = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(
    "Hi Digireach Estates! I would like to enquire about project availability and schedule a private site visit."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Action Popover */}
      {isOpen && (
        <div className="mb-3 bg-[#0a0e18] border border-white/20 rounded-sm p-4 w-72 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase text-slate-200 font-bold">Priority Sales Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 font-sans mt-2 mb-3">
            Direct builder support. Get price sheets, live video tours, or escorted site visits.
          </p>

          <div className="space-y-2 font-mono text-xs">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold py-2.5 px-3 rounded-sm flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#05070c] font-bold py-2.5 px-3 rounded-sm flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                <span>Schedule Site Visit</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 py-2.5 px-3 rounded-sm flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f59e0b]" />
                <span>Call {siteConfig.displayPhone}</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all transform hover:scale-105 active:scale-95 group"
          aria-label="Direct WhatsApp & Sales Desk"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-black" />
          </div>
          <span className="hidden sm:inline">WhatsApp Desk</span>
        </button>
      </div>
    </div>
  );
};
