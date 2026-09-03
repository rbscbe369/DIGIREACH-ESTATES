"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { ProjectTypeCards } from "@/components/cards/ProjectTypeCards";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { ProjectDetailModal } from "@/components/portfolio/ProjectDetailModal";
import { InteractiveSiteMap } from "@/components/interactive/InteractiveSiteMap";
import { ConstructionTracker } from "@/components/interactive/ConstructionTracker";
import { EmiCalculator } from "@/components/interactive/EmiCalculator";
import { ProjectMatcherQuiz } from "@/components/interactive/ProjectMatcherQuiz";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { LeadershipCards } from "@/components/cards/LeadershipCards";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { LocationMap } from "@/components/sections/LocationMap";
import { Footer } from "@/components/layout/Footer";
import { BookingModal } from "@/components/booking/BookingModal";
import { Project, projectsData } from "@/data/projects";

export default function Home() {
  // Modal states
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingProject, setSelectedBookingProject] = useState<string | undefined>(undefined);
  const [selectedBookingType, setSelectedBookingType] = useState<string | undefined>(undefined);
  const [selectedBookingUnit, setSelectedBookingUnit] = useState<string | undefined>(undefined);

  const [detailModalProject, setDetailModalProject] = useState<Project | null>(null);
  const [quizModalOpen, setQuizModalOpen] = useState(false);

  const handleOpenBooking = (project?: string, type?: string, unit?: string) => {
    setSelectedBookingProject(project);
    setSelectedBookingType(type);
    setSelectedBookingUnit(unit);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-[#e07a2c] selection:text-black">
      {/* 1. Header Navigation */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Stripe Divider evoking architectural floor line markings */}
      <div className="stripes" />

      {/* 2. Hero Section + High-Contrast Scoreboard */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={() => setQuizModalOpen(true)}
      />

      {/* 3. Project Type / Asset Class Cards (Apartments / Villas / Commercial / Tech Parks) */}
      <ProjectTypeCards
        onSelectType={(typeTitle) => {
          handleOpenBooking(undefined, typeTitle);
        }}
      />

      {/* 4. Filterable Project Portfolio Grid */}
      <PortfolioSection
        onSelectProject={(project) => setDetailModalProject(project)}
        onBookVisit={(projName, projType) => handleOpenBooking(projName, projType)}
      />

      {/* 5. Interactive Master Plan Site Map */}
      <InteractiveSiteMap
        onSelectZone={(zoneName) => {
          handleOpenBooking(`Township Master Plan (${zoneName})`, "residential");
        }}
      />

      {/* 6. Live Construction Progress Tracker */}
      <ConstructionTracker
        onBookVisit={(projName, projType) => handleOpenBooking(projName, projType)}
      />

      {/* 7. Real Estate EMI Calculator */}
      <EmiCalculator
        onOpenBooking={() => handleOpenBooking(undefined, "residential", "Home Loan Assistance")}
      />

      {/* 8. Institutional Standards: Why Choose Us */}
      <WhyChooseUs />

      {/* 9. Leadership & Architect Cards */}
      <LeadershipCards />

      {/* 10. Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 11. Location Map & Transit Connectivity */}
      <LocationMap onOpenBooking={() => handleOpenBooking(undefined, undefined, "Chauffeur Escort")} />

      {/* 12. Pre-Footer Call to Action Banner & Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* --- POPUPS & MODALS --- */}

      {/* Multi-step Booking Modal with WhatsApp Deep Link */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        defaultProject={selectedBookingProject}
        defaultType={selectedBookingType}
        defaultUnit={selectedBookingUnit}
      />

      {/* Project Detail Modal with Floor Plans, Amenities & Brochure */}
      <ProjectDetailModal
        project={detailModalProject}
        onClose={() => setDetailModalProject(null)}
        onBookVisit={(name, type, unit) => handleOpenBooking(name, type, unit)}
      />

      {/* Budget Matcher Quiz Modal */}
      <ProjectMatcherQuiz
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onSelectMatchedProject={(p) => setDetailModalProject(p)}
        onBookVisit={(name, type) => handleOpenBooking(name, type)}
      />
    </main>
  );
}
