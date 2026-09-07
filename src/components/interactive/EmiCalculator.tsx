"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Calculator,
  ArrowRight,
  Home,
  Building,
  HelpCircle,
  RotateCcw,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export interface EmiCalculatorProps {
  onOpenBooking?: () => void;
  initialPropertyValue?: number;
  projectName?: string;
  compact?: boolean;
}

// Indian currency formatter (e.g. ₹12,34,567)
export const formatINR = (val: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

// Parse price strings like "₹1.45 Cr onwards" or "₹90 Lakhs" to a numeric value in INR
export const parsePriceToNumber = (priceStr?: string, fallbackLakhs?: number): number => {
  if (!priceStr && fallbackLakhs) return fallbackLakhs * 100000;
  if (!priceStr) return 5000000;
  const clean = priceStr.replace(/,/g, "").trim();
  const crMatch = clean.match(/([\d.]+)\s*Cr/i);
  if (crMatch) {
    return Math.round(parseFloat(crMatch[1]) * 10000000);
  }
  const lakhMatch = clean.match(/([\d.]+)\s*(?:Lakh|Lakhs|Lacs|Lac|L)/i);
  if (lakhMatch) {
    return Math.round(parseFloat(lakhMatch[1]) * 100000);
  }
  const numMatch = clean.match(/[\d.]+/);
  if (numMatch) {
    const val = parseFloat(numMatch[0]);
    if (val < 50) return Math.round(val * 10000000);
    if (val < 1000) return Math.round(val * 100000);
    return Math.round(val);
  }
  return fallbackLakhs ? fallbackLakhs * 100000 : 5000000;
};

// Compact Indian format for axis markers (e.g. ₹50 L, ₹1.5 Cr)
export const formatINRCompact = (val: number): string => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return formatINR(val);
};

// Hook for smooth debounced count-up animation
function useDebouncedCountUp(target: number, duration = 280, debounceMs = 150): number {
  const [displayValue, setDisplayValue] = useState(target);
  const currentValRef = useRef(target);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startVal = currentValRef.current;
      const endVal = target;
      if (startVal === endVal) return;

      const startTime = performance.now();
      let frameId: number;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const nextVal = Math.round(startVal + (endVal - startVal) * ease);
        currentValRef.current = nextVal;
        setDisplayValue(nextVal);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          currentValRef.current = endVal;
          setDisplayValue(endVal);
        }
      };

      frameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frameId);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [target, duration, debounceMs]);

  return displayValue;
}

const DEFAULT_PROPERTY_VAL = 5000000; // ₹50 Lakhs
const DEFAULT_DOWN_PAYMENT_PCT = 20; // 20%
const DEFAULT_TENURE_YEARS = 20;
const DEFAULT_INTEREST_RATE = 8.5;

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  onOpenBooking,
  initialPropertyValue,
  projectName = "Digireach Estates",
  compact = false,
}) => {
  // Input states
  const [loanType, setLoanType] = useState<"residential" | "commercial">("residential");
  const [propertyValue, setPropertyValue] = useState<number>(() => {
    return initialPropertyValue && initialPropertyValue >= 500000
      ? initialPropertyValue
      : DEFAULT_PROPERTY_VAL;
  });
  const [propertyValueInput, setPropertyValueInput] = useState<string>(() =>
    String(
      initialPropertyValue && initialPropertyValue >= 500000
        ? initialPropertyValue
        : DEFAULT_PROPERTY_VAL
    )
  );

  const [downPaymentMode, setDownPaymentMode] = useState<"rupees" | "percent">("percent");
  const [downPaymentRupees, setDownPaymentRupees] = useState<number>(() => {
    const pVal = initialPropertyValue || DEFAULT_PROPERTY_VAL;
    return Math.round((DEFAULT_DOWN_PAYMENT_PCT / 100) * pVal);
  });
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(DEFAULT_DOWN_PAYMENT_PCT);
  const [downPaymentInput, setDownPaymentInput] = useState<string>(
    String(DEFAULT_DOWN_PAYMENT_PCT)
  );

  const [tenureYears, setTenureYears] = useState<number>(DEFAULT_TENURE_YEARS);
  const [tenureInput, setTenureInput] = useState<string>(String(DEFAULT_TENURE_YEARS));

  const [interestRate, setInterestRate] = useState<number>(DEFAULT_INTEREST_RATE);
  const [interestRateInput, setInterestRateInput] = useState<string>(
    String(DEFAULT_INTEREST_RATE)
  );

  // Track if user explicitly clicked "Reset to Defaults" to avoid pre-fill re-applying
  const hasUserResetRef = useRef(false);
  const prevInitialPropRef = useRef(initialPropertyValue);

  // Sync when initialPropertyValue changes from modal floor plan selection
  useEffect(() => {
    if (
      initialPropertyValue &&
      initialPropertyValue !== prevInitialPropRef.current &&
      !hasUserResetRef.current
    ) {
      prevInitialPropRef.current = initialPropertyValue;
      setPropertyValue(initialPropertyValue);
      setPropertyValueInput(String(initialPropertyValue));

      // Re-calculate down payment in rupees if in percent mode
      if (downPaymentMode === "percent") {
        const inr = Math.round((downPaymentPercent / 100) * initialPropertyValue);
        setDownPaymentRupees(inr);
      } else {
        // If current rupees exceed new property value, clamp down
        if (downPaymentRupees > initialPropertyValue) {
          setDownPaymentRupees(initialPropertyValue);
          setDownPaymentInput(String(initialPropertyValue));
        }
      }
    }
  }, [initialPropertyValue, downPaymentMode, downPaymentPercent, downPaymentRupees]);

  // Compute effective down payment in Rupees
  const effectiveDownPayment = useMemo(() => {
    if (downPaymentMode === "percent") {
      return Math.round((downPaymentPercent / 100) * propertyValue);
    }
    return downPaymentRupees;
  }, [downPaymentMode, downPaymentPercent, downPaymentRupees, propertyValue]);

  // Validation: Down payment cannot exceed property value
  const isDownPaymentExceeded = effectiveDownPayment > propertyValue;

  // Net Principal for EMI
  const netPrincipal = useMemo(() => {
    if (isDownPaymentExceeded) return 0;
    return Math.max(0, propertyValue - effectiveDownPayment);
  }, [propertyValue, effectiveDownPayment, isDownPaymentExceeded]);

  // EMI Calculations
  const { monthlyEmi, totalPayment, totalInterest, principalAmount } = useMemo(() => {
    const P = netPrincipal;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || n <= 0) {
      return {
        monthlyEmi: 0,
        totalPayment: 0,
        totalInterest: 0,
        principalAmount: 0,
      };
    }

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
  }, [netPrincipal, tenureYears, interestRate]);

  // Debounced count-up for animated numbers
  const animatedEmi = useDebouncedCountUp(monthlyEmi);
  const animatedInterest = useDebouncedCountUp(totalInterest);
  const animatedTotal = useDebouncedCountUp(totalPayment);
  const animatedPrincipal = useDebouncedCountUp(principalAmount);

  // Ratios for the breakdown bar
  const principalRatio = totalPayment > 0 ? (principalAmount / totalPayment) * 100 : 0;
  const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  // -------------------------------------------------------------
  // Input Synchronization Handlers
  // -------------------------------------------------------------

  // 1. Property Value Handlers
  const handlePropertyValueSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPropertyValue(val);
    setPropertyValueInput(String(val));
    hasUserResetRef.current = false;
    if (downPaymentMode === "percent") {
      setDownPaymentRupees(Math.round((downPaymentPercent / 100) * val));
    }
  };

  const handlePropertyValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setPropertyValueInput(raw);
    const val = Number(raw);
    if (!isNaN(val) && val >= 500000 && val <= 50000000) {
      setPropertyValue(val);
      hasUserResetRef.current = false;
      if (downPaymentMode === "percent") {
        setDownPaymentRupees(Math.round((downPaymentPercent / 100) * val));
      }
    }
  };

  const handlePropertyValueBlur = () => {
    const num = Number(propertyValueInput);
    const clamped = isNaN(num)
      ? DEFAULT_PROPERTY_VAL
      : Math.min(50000000, Math.max(500000, Math.round(num / 50000) * 50000));
    setPropertyValue(clamped);
    setPropertyValueInput(String(clamped));
    if (downPaymentMode === "percent") {
      setDownPaymentRupees(Math.round((downPaymentPercent / 100) * clamped));
    } else if (downPaymentRupees > clamped) {
      setDownPaymentRupees(clamped);
      setDownPaymentInput(String(clamped));
    }
  };

  // 2. Down Payment Handlers
  const toggleDownPaymentMode = (newMode: "rupees" | "percent") => {
    if (newMode === downPaymentMode) return;
    if (newMode === "rupees") {
      const inr = Math.round((downPaymentPercent / 100) * propertyValue);
      setDownPaymentRupees(inr);
      setDownPaymentInput(String(inr));
      setDownPaymentMode("rupees");
    } else {
      const pct =
        propertyValue > 0
          ? Math.min(90, Math.round((downPaymentRupees / propertyValue) * 100))
          : DEFAULT_DOWN_PAYMENT_PCT;
      setDownPaymentPercent(pct);
      setDownPaymentInput(String(pct));
      setDownPaymentMode("percent");
    }
  };

  const handleDownPaymentSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    hasUserResetRef.current = false;
    if (downPaymentMode === "rupees") {
      setDownPaymentRupees(val);
      setDownPaymentInput(String(val));
    } else {
      setDownPaymentPercent(val);
      setDownPaymentInput(String(val));
      setDownPaymentRupees(Math.round((val / 100) * propertyValue));
    }
  };

  const handleDownPaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDownPaymentInput(raw);
    const val = Number(raw);
    if (!isNaN(val)) {
      hasUserResetRef.current = false;
      if (downPaymentMode === "rupees") {
        if (val >= 0 && val <= propertyValue) {
          setDownPaymentRupees(val);
        }
      } else {
        if (val >= 0 && val <= 90) {
          setDownPaymentPercent(val);
          setDownPaymentRupees(Math.round((val / 100) * propertyValue));
        }
      }
    }
  };

  const handleDownPaymentBlur = () => {
    const num = Number(downPaymentInput);
    if (downPaymentMode === "rupees") {
      const clamped = isNaN(num)
        ? 0
        : Math.min(propertyValue, Math.max(0, Math.round(num / 50000) * 50000));
      setDownPaymentRupees(clamped);
      setDownPaymentInput(String(clamped));
    } else {
      const clamped = isNaN(num) ? 20 : Math.min(90, Math.max(0, Math.round(num)));
      setDownPaymentPercent(clamped);
      setDownPaymentInput(String(clamped));
      setDownPaymentRupees(Math.round((clamped / 100) * propertyValue));
    }
  };

  // 3. Tenure Handlers
  const handleTenureSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTenureYears(val);
    setTenureInput(String(val));
  };

  const handleTenureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setTenureInput(raw);
    const val = Number(raw);
    if (!isNaN(val) && val >= 1 && val <= 30) {
      setTenureYears(val);
    }
  };

  const handleTenureBlur = () => {
    const num = Number(tenureInput);
    const clamped = isNaN(num) ? DEFAULT_TENURE_YEARS : Math.min(30, Math.max(1, Math.round(num)));
    setTenureYears(clamped);
    setTenureInput(String(clamped));
  };

  // 4. Interest Rate Handlers
  const handleInterestRateSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInterestRate(val);
    setInterestRateInput(String(val));
  };

  const handleInterestRateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInterestRateInput(raw);
    const val = Number(raw);
    if (!isNaN(val) && val >= 6.0 && val <= 15.0) {
      setInterestRate(val);
    }
  };

  const handleInterestRateBlur = () => {
    const num = Number(interestRateInput);
    const clamped = isNaN(num)
      ? DEFAULT_INTEREST_RATE
      : Math.min(15.0, Math.max(6.0, parseFloat(num.toFixed(1))));
    setInterestRate(clamped);
    setInterestRateInput(String(clamped));
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    hasUserResetRef.current = true;
    prevInitialPropRef.current = undefined;

    setLoanType("residential");
    setPropertyValue(DEFAULT_PROPERTY_VAL);
    setPropertyValueInput(String(DEFAULT_PROPERTY_VAL));

    setDownPaymentMode("percent");
    setDownPaymentPercent(DEFAULT_DOWN_PAYMENT_PCT);
    setDownPaymentInput(String(DEFAULT_DOWN_PAYMENT_PCT));
    setDownPaymentRupees(Math.round((DEFAULT_DOWN_PAYMENT_PCT / 100) * DEFAULT_PROPERTY_VAL));

    setTenureYears(DEFAULT_TENURE_YEARS);
    setTenureInput(String(DEFAULT_TENURE_YEARS));

    setInterestRate(DEFAULT_INTEREST_RATE);
    setInterestRateInput(String(DEFAULT_INTEREST_RATE));
  };

  // WhatsApp Loan Advisor URL
  const waAdvisorText = `Hi, I'd like to discuss financing for ${projectName} — Property Value ${formatINR(
    propertyValue
  )}, Est. EMI ${formatINR(monthlyEmi)}/month.`;
  const waAdvisorUrl = `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(waAdvisorText)}`;

  // Main interactive controls & outputs
  const content = (
    <div className="space-y-6">
      {/* Header controls: Loan Type Tabs + Reset to Defaults */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setLoanType("residential");
              setInterestRate(8.5);
              setInterestRateInput("8.5");
            }}
            className={`px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none ${
              loanType === "residential"
                ? "bg-[#e07a2c] text-[#0a0d14] font-bold shadow-md"
                : "bg-[#0a0d14] border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Loan (8.5% avg)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setLoanType("commercial");
              setInterestRate(9.75);
              setInterestRateInput("9.75");
            }}
            className={`px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none ${
              loanType === "commercial"
                ? "bg-[#e07a2c] text-[#0a0d14] font-bold shadow-md"
                : "bg-[#0a0d14] border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Commercial Finance (9.75% avg)</span>
          </button>
        </div>

        {/* Reset to Defaults button */}
        <button
          type="button"
          onClick={handleResetToDefaults}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white font-mono text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
          title="Reset all inputs to defaults and clear pre-filled unit price"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Main Grid: Controls vs Results Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-[#0a0d14] border border-white/10 rounded-sm p-5 sm:p-7 space-y-6 shadow-xl">
          {/* Input 1: Property Value */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center font-mono text-xs flex-wrap gap-2">
              <label
                htmlFor="property-value-input"
                className="text-slate-300 uppercase tracking-wider font-semibold cursor-pointer"
              >
                Property Value (₹)
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-xs">₹</span>
                <input
                  id="property-value-input"
                  type="number"
                  min={500000}
                  max={50000000}
                  step={50000}
                  value={propertyValueInput}
                  onChange={handlePropertyValueInputChange}
                  onBlur={handlePropertyValueBlur}
                  className="bg-[#121824] border border-white/20 rounded px-2.5 py-1 text-right text-amber-400 font-bold font-mono text-sm w-36 focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
                />
              </div>
            </div>
            <input
              id="property-value-slider"
              type="range"
              min={500000}
              max={50000000}
              step={50000}
              value={propertyValue}
              onChange={handlePropertyValueSlider}
              aria-label="Property value range slider"
              className="w-full accent-[#e07a2c] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e07a2c]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>₹5 Lakhs</span>
              <span className="text-amber-300/90 font-medium">
                {formatINR(propertyValue)} ({formatINRCompact(propertyValue)})
              </span>
              <span>₹5.00 Cr</span>
            </div>
          </div>

          {/* Input 2: Down Payment */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center font-mono text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="down-payment-input"
                  className="text-slate-300 uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Down Payment
                </label>
                {/* ₹ vs % toggle */}
                <div className="inline-flex items-center bg-[#121824] border border-white/15 rounded p-0.5">
                  <button
                    type="button"
                    onClick={() => toggleDownPaymentMode("rupees")}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
                      downPaymentMode === "rupees"
                        ? "bg-[#e07a2c] text-[#0a0d14] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    ₹
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleDownPaymentMode("percent")}
                    className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-colors ${
                      downPaymentMode === "percent"
                        ? "bg-[#e07a2c] text-[#0a0d14] font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    %
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-xs">
                  {downPaymentMode === "rupees" ? "₹" : "%"}
                </span>
                <input
                  id="down-payment-input"
                  type="number"
                  min={0}
                  max={downPaymentMode === "rupees" ? propertyValue : 90}
                  step={downPaymentMode === "rupees" ? 50000 : 1}
                  value={downPaymentInput}
                  onChange={handleDownPaymentInputChange}
                  onBlur={handleDownPaymentBlur}
                  className="bg-[#121824] border border-white/20 rounded px-2.5 py-1 text-right text-amber-400 font-bold font-mono text-sm w-36 focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
                />
              </div>
            </div>

            <input
              id="down-payment-slider"
              type="range"
              min={0}
              max={downPaymentMode === "rupees" ? propertyValue : 90}
              step={downPaymentMode === "rupees" ? 50000 : 1}
              value={downPaymentMode === "rupees" ? downPaymentRupees : downPaymentPercent}
              onChange={handleDownPaymentSlider}
              aria-label="Down payment range slider"
              className="w-full accent-[#e07a2c] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e07a2c]"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>{downPaymentMode === "rupees" ? "₹0" : "0%"}</span>
              <span className="text-slate-300">
                Effective: {formatINR(effectiveDownPayment)} (
                {propertyValue > 0
                  ? `${((effectiveDownPayment / propertyValue) * 100).toFixed(0)}%`
                  : "0%"}
                )
              </span>
              <span>
                {downPaymentMode === "rupees" ? formatINRCompact(propertyValue) : "90%"}
              </span>
            </div>

            {/* Validation Warning */}
            {isDownPaymentExceeded && (
              <div className="text-xs font-mono text-red-400 flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Down payment cannot exceed property value.</span>
              </div>
            )}
          </div>

          {/* Net Principal Summary Badge */}
          <div className="bg-[#121824] border border-white/10 p-3 rounded-sm flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Net Principal Loan Amount:</span>
            <span className="text-white font-bold text-sm">{formatINR(netPrincipal)}</span>
          </div>

          {/* Input 3: Loan Tenure */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center font-mono text-xs flex-wrap gap-2">
              <label
                htmlFor="tenure-input"
                className="text-slate-300 uppercase tracking-wider font-semibold cursor-pointer"
              >
                Loan Tenure (Years)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="tenure-input"
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureInput}
                  onChange={handleTenureInputChange}
                  onBlur={handleTenureBlur}
                  className="bg-[#121824] border border-white/20 rounded px-2.5 py-1 text-right text-white font-bold font-mono text-sm w-28 focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
                />
                <span className="text-slate-400 font-mono text-xs">Yrs</span>
              </div>
            </div>
            <input
              id="tenure-slider"
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={handleTenureSlider}
              aria-label="Loan tenure in years range slider"
              className="w-full accent-[#e07a2c] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e07a2c]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>1 Year</span>
              <span className="text-slate-300">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Input 4: Interest Rate */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center font-mono text-xs flex-wrap gap-2">
              <label
                htmlFor="interest-rate-input"
                className="text-slate-300 uppercase tracking-wider font-semibold cursor-pointer"
              >
                Interest Rate (% p.a.)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="interest-rate-input"
                  type="number"
                  min={6.0}
                  max={15.0}
                  step={0.1}
                  value={interestRateInput}
                  onChange={handleInterestRateInputChange}
                  onBlur={handleInterestRateBlur}
                  className="bg-[#121824] border border-white/20 rounded px-2.5 py-1 text-right text-amber-400 font-bold font-mono text-sm w-28 focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
                />
                <span className="text-slate-400 font-mono text-xs">%</span>
              </div>
            </div>
            <input
              id="interest-rate-slider"
              type="range"
              min={6.0}
              max={15.0}
              step={0.1}
              value={interestRate}
              onChange={handleInterestRateSlider}
              aria-label="Interest rate range slider"
              className="w-full accent-[#e07a2c] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#e07a2c]"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>6.0%</span>
              <span className="text-amber-300/90 font-medium">{interestRate.toFixed(1)}% p.a.</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Quick Project Presets */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
              Quick Budget Presets
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setPropertyValue(9000000);
                  setPropertyValueInput("9000000");
                  setDownPaymentMode("percent");
                  setDownPaymentPercent(20);
                  setDownPaymentInput("20");
                  setDownPaymentRupees(1800000);
                  setTenureYears(20);
                  setTenureInput("20");
                }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
              >
                2 BHK (₹90L)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPropertyValue(16000000);
                  setPropertyValueInput("16000000");
                  setDownPaymentMode("percent");
                  setDownPaymentPercent(20);
                  setDownPaymentInput("20");
                  setDownPaymentRupees(3200000);
                  setTenureYears(20);
                  setTenureInput("20");
                }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
              >
                3 BHK Sky Suite (₹1.60 Cr)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPropertyValue(24000000);
                  setPropertyValueInput("24000000");
                  setDownPaymentMode("percent");
                  setDownPaymentPercent(20);
                  setDownPaymentInput("20");
                  setDownPaymentRupees(4800000);
                  setTenureYears(15);
                  setTenureInput("15");
                }}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-sm text-xs font-mono text-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
              >
                Triplex Villa (₹2.40 Cr)
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary Card */}
        <div className="lg:col-span-5 bg-[#0a0d14] border border-white/15 rounded-sm p-5 sm:p-7 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-6">
            {/* Live ARIA Region for Screen Readers & Monthly Installment */}
            <div aria-live="polite" aria-atomic="true" className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#e07a2c] block">
                Projected Monthly Installment
              </span>
              <div className="font-mono text-4xl sm:text-5xl font-bold text-white mt-1 tracking-tight">
                {formatINR(animatedEmi)}
                <span className="text-xs font-mono text-slate-400 block font-normal mt-0.5">
                  / month
                </span>
              </div>
              <span className="sr-only">
                Estimated monthly installment is {formatINR(monthlyEmi)} per month for property
                value {formatINR(propertyValue)} with {formatINR(effectiveDownPayment)} down
                payment over {tenureYears} years.
              </span>
            </div>

            {/* Breakdown Stacked Bar (Principal vs Interest) with CSS transition */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Total Outflow (P + I)</span>
                <span className="text-slate-200 font-bold">{formatINR(animatedTotal)}</span>
              </div>

              {/* Stacked bar with smooth transition */}
              <div
                className="h-4 w-full bg-slate-900 rounded-sm overflow-hidden flex"
                role="progressbar"
                aria-valuenow={Math.round(principalRatio)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Principal vs Interest ratio"
              >
                <div
                  style={{ width: `${principalRatio}%` }}
                  className="bg-[#e07a2c] h-full transition-all duration-300 ease-out"
                  title={`Principal: ${principalRatio.toFixed(1)}%`}
                />
                <div
                  style={{ width: `${interestRatio}%` }}
                  className="bg-amber-600/50 h-full transition-all duration-300 ease-out"
                  title={`Interest: ${interestRatio.toFixed(1)}%`}
                />
              </div>

              {/* Percentage and formatted values */}
              <div className="flex justify-between text-[11px] font-mono pt-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#e07a2c] shrink-0" />
                  <span>
                    Principal: {formatINR(animatedPrincipal)} ({principalRatio.toFixed(0)}%)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-600/50 shrink-0" />
                  <span>
                    Interest: {formatINR(animatedInterest)} ({interestRatio.toFixed(0)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Bank Loan Partners Callout */}
            <div className="bg-[#121824] p-3.5 rounded-sm border border-white/5 space-y-1 text-xs font-mono">
              <div className="text-[#e07a2c] font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Pre-Approved Banking Partners</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                SBI, HDFC Bank, ICICI Bank, Axis Bank & Kotak Mahindra. Special developer
                subvention & instant in-principle sanction available.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            {/* WhatsApp Advisor CTA */}
            <a
              href={waAdvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400 focus:outline-none"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Talk to our Loan Advisor</span>
            </a>

            {/* Site Visit / Booking CTA */}
            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full bg-[#e07a2c] hover:bg-[#f38634] text-[#0a0d14] font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-xl focus-visible:ring-2 focus-visible:ring-[#e07a2c] focus:outline-none"
              >
                <span>Request Pre-Approved Loan Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // If in compact mode (e.g. inside ProjectDetailModal)
  if (compact) {
    return (
      <div className="bg-[#05070c] border border-white/15 rounded-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-[#e07a2c]" />
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#e07a2c] font-bold">
              Unit EMI & Financing Estimator
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            For: <strong className="text-amber-300">{projectName}</strong>
          </span>
        </div>
        {content}
      </div>
    );
  }

  // Standalone section mode (landing page)
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
            Model your monthly cash flow with precision. All Digireach developments are
            pre-approved by SBI, HDFC, ICICI, and Axis Bank with zero processing hurdles.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
};
