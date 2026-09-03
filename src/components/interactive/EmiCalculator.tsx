"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, Home, Building, HelpCircle } from "lucide-react";

interface EmiCalculatorProps {
  onOpenBooking: () => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onOpenBooking }) => {
  // State for inputs
  const [loanType, setLoanType] = useState<"residential" | "commercial">("residential");
  const [loanAmountLakhs, setLoanAmountLakhs] = useState<number>(120); // in INR Lakhs
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5); // % p.a.

  // EMI Calculations
  const { monthlyEmi, totalPayment, totalInterest, principalAmount } = useMemo(() => {
    const P = loanAmountLakhs * 100000;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEmi: Math.round(emi),
        totalPayment: Math.round(P),
        totalInterest: 0,
        principalAmount: P,
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - P;

    return {
      monthlyEmi: Math.round(emi),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest),
      principalAmount: P,
    };
  }, [loanAmountLakhs, tenureYears, interestRate]);

  // Format currency in Indian numbering format
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const principalRatio = (principalAmount / totalPayment) * 100;
  const interestRatio = (totalInterest / totalPayment) * 100;

  return (
    <section id="calculator" className="py-24 bg-[#121824] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">Financial Planning</div>
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
            Real Estate EMI Calculator
          </h2>
          <p className="text-slate-400 font-sans text-base mt-2">
            Model your monthly cash flow with precision. All Digireach developments are pre-approved by SBI, HDFC, ICICI, and Axis Bank with zero processing hurdles.
          </p>
        </div>

        {/* Loan Type Selector Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => {
              setLoanType("residential");
              setInterestRate(8.5);
            }}
            className={`px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
              loanType === "residential"
                ? "bg-[#e07a2c] text-[#0a0d14] font-bold shadow-md"
                : "bg-[#0a0d14] border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Residential Home Loan (8.5% avg)</span>
          </button>
          <button
            onClick={() => {
              setLoanType("commercial");
              setInterestRate(9.75);
            }}
            className={`px-5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
              loanType === "commercial"
                ? "bg-[#e07a2c] text-[#0a0d14] font-bold shadow-md"
                : "bg-[#0a0d14] border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Commercial / Asset Finance (9.75% avg)</span>
          </button>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (Sliders & Presets) */}
          <div className="lg:col-span-7 bg-[#0a0d14] border border-white/10 rounded-sm p-6 sm:p-8 space-y-7 shadow-xl">
            {/* Slider 1: Loan Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <label className="text-slate-300 uppercase tracking-wider">Loan Amount (Principal)</label>
                <span className="text-amber-400 font-bold text-base">
                  ₹{loanAmountLakhs >= 100 ? `${(loanAmountLakhs / 100).toFixed(2)} Cr` : `${loanAmountLakhs} Lakhs`}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="5"
                value={loanAmountLakhs}
                onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                className="w-full accent-[#e07a2c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>₹20 Lakhs</span>
                <span>₹2.50 Cr</span>
                <span>₹5.00 Cr</span>
              </div>
            </div>

            {/* Slider 2: Loan Tenure */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <label className="text-slate-300 uppercase tracking-wider">Tenure (Years)</label>
                <span className="text-white font-bold text-base">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#e07a2c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <label className="text-slate-300 uppercase tracking-wider">Interest Rate (% p.a.)</label>
                <span className="text-amber-400 font-bold text-base">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="7.5"
                max="14.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#e07a2c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>7.5%</span>
                <span>10.5%</span>
                <span>14.0%</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Quick Project Presets
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setLoanAmountLakhs(90);
                    setTenureYears(20);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300"
                >
                  2 BHK Residence (₹90L)
                </button>
                <button
                  onClick={() => {
                    setLoanAmountLakhs(160);
                    setTenureYears(20);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300"
                >
                  3 BHK Sky Suite (₹1.60 Cr)
                </button>
                <button
                  onClick={() => {
                    setLoanAmountLakhs(240);
                    setTenureYears(15);
                  }}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300"
                >
                  Triplex Villa (₹2.40 Cr)
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-[#0a0d14] border border-white/15 rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#e07a2c] block">
                  Projected Monthly Installment
                </span>
                <div className="font-mono text-4xl sm:text-5xl font-bold text-white mt-1">
                  {formatINR(monthlyEmi)}
                  <span className="text-xs font-mono text-slate-400 block font-normal">/ month</span>
                </div>
              </div>

              {/* Breakdown Bar (Principal vs Interest) */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Total Breakdown</span>
                  <span className="text-slate-300 font-bold">{formatINR(totalPayment)}</span>
                </div>
                
                <div className="h-4 w-full bg-slate-900 rounded-sm overflow-hidden flex">
                  <div
                    style={{ width: `${principalRatio}%` }}
                    className="bg-[#e07a2c] h-full"
                    title={`Principal: ${principalRatio.toFixed(1)}%`}
                  />
                  <div
                    style={{ width: `${interestRatio}%` }}
                    className="bg-amber-600/50 h-full"
                    title={`Interest: ${interestRatio.toFixed(1)}%`}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#e07a2c]" />
                    <span>Principal: {formatINR(principalAmount)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-600/50" />
                    <span>Total Interest: {formatINR(totalInterest)}</span>
                  </div>
                </div>
              </div>

              {/* Bank Partners */}
              <div className="bg-[#121824] p-3.5 rounded-sm border border-white/5 space-y-1 text-xs font-mono">
                <div className="text-[#e07a2c] font-semibold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Approved Loan Partners</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  SBI, HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra. Special developer subvention schemes available.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider py-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <span>Request Pre-Approved Loan Assistance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
