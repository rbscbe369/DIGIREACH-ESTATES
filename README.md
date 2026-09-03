# Digireach Estates — Real Estate Builder Showcase & Lead Engine

> A high-converting, institutional-grade Next.js + Tailwind CSS real estate builder sample site and pitch demo, cloned and elevated from the interaction patterns of `rbscbe369/iron-core-gym-demo`.

---

## 🌟 Key Capabilities & Architectural Highlights

1. **Hero & High-Contrast Scoreboard**:
   - Prominently positioned Govt. RERA registration badge (`TN/RERA/BLDR/2026/0894`).
   - Four core institutional metrics: **4.8M+ Sq. Ft. Delivered**, **42+ Projects Completed**, **24+ Years in Business**, **6 Metro Cities**.
2. **Project Type / Asset Class Cards**:
   - Covers both **Residential** (High-Rise Apartments, Gated Triplex Villas) and **Commercial** (High-Street Retail, Corporate Tech Parks).
   - Layout matching the gym membership tiers with starting prices, key specs, feature checklists, and booking triggers.
3. **Filterable Project Portfolio Grid & Modal**:
   - Real-time search by keyword, project type (Residential vs Commercial), project status (Ongoing, Ready to Move, New Launch), BHK / configuration, and dynamic price slider.
   - Comprehensive **Project Detail Modal**: unit specifications, interactive floor plans, downloadable PDF brochure generator, amenities checklist, and strategic proximity matrix.
4. **Interactive Polish Modules (Zero External Cost, No Paid APIs)**:
   - **EMI Calculator**: Pure frontend mathematical model calculating monthly EMI, total interest, and principal vs interest ratio bar with loan type presets.
   - **Budget-to-Project Matcher Quiz**: 3-step wizard (asset category, budget range, growth corridor) that curates matching developments.
   - **Live Construction Progress Tracker**: Real-time progress bars with certified civil milestone logs (Foundation, RCC superstructure, MEP, Plastering, Handover).
   - **Interactive Master Plan Site Map**: Interactive SVG map of a 28-acre integrated township with hover tooltips, live unit inventory counters, and direct escort booking.
5. **Leadership & Architect Cards**:
   - Sleek profile cards featuring principal architects, chief structural engineers, and green building fellows with qualifications and project track records.
6. **Social Proof & Location**:
   - **Why Choose Us**: 6-pillar trust checklist (100% clear freehold titles, guaranteed on-time handover, IGBC Platinum certification, 5-year structural warranty).
   - **Testimonials Carousel**: Verified quotes from residential buyers and commercial enterprise tenants.
   - **Location Section**: Dark-mode interactive Google Maps embed with transit times to airports, IT SEZs, and hospitals.
7. **Multi-Step Site Visit Booking Modal**:
   - Step 1: Full name and validated 10-digit WhatsApp number.
   - Step 2: Project selector, category toggle, and unit preference.
   - Step 3: Date picker, time slot, and visit mode (In-person executive escort vs Virtual 3D tour).
   - Step 4: Confirmation summary screen with unique Reference ID, print pass action, and direct **WhatsApp deep link (`wa.me`)**.

---

## 🚀 Quick Start

### 1. Install & Run Locally
```bash
# Clone or navigate to the directory
cd "Digireach Estates"

# Install dependencies (already installed)
npm install

# Start local Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build Verification
```bash
npm run build
npm run start
```

---

## 🎨 Rebranding in Under 2 Minutes for Client Pitches

To pitch this demo to a different builder or developer:
1. Open [`src/config/siteConfig.ts`](./src/config/siteConfig.ts).
2. Update:
   - `name`: Target developer name
   - `reraNumber`: Client's state RERA registration
   - `phone` / `displayPhone`: Sales team contact
   - `stats`: Delivered sq.ft, projects count, years
3. Open [`src/data/projects.ts`](./src/data/projects.ts) to adjust project names, images, prices, and locations.

---

## 🗄️ Backend & Automation Setup

### 1. Supabase Database
Run [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL Editor:
- Creates `projects` and `site_visits` tables.
- Enables Row Level Security (RLS) policies.
- Automatically handles timestamp triggers and indexes.
- Seeds 4 complete signature developments.

### 2. Supabase Edge Function
Deploy the Edge Function to forward new bookings to n8n:
```bash
supabase functions deploy site-visit-notification --no-verify-jwt
supabase secrets set N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/digireach-site-visit-webhook"
```

### 3. n8n WhatsApp Automation Workflows (via wacrm)
Import the JSON workflow definitions from [`automation/`](./automation/):
- **Immediate Confirmation**: [`automation/n8n-site-visit-confirmation.json`](./automation/n8n-site-visit-confirmation.json)
- **24h Reminder & 48h Follow-Up**: [`automation/n8n-reminder-and-followup.json`](./automation/n8n-reminder-and-followup.json)
- **Weekly Lead Nurture Sequence**: [`automation/n8n-weekly-nurture.json`](./automation/n8n-weekly-nurture.json)
- **Rule-Based Inbound Keyword Router**: [`automation/n8n-keyword-router.json`](./automation/n8n-keyword-router.json)

For detailed payload schemas and test curl commands, consult [`automation/PAYLOAD_CONTRACTS.md`](./automation/PAYLOAD_CONTRACTS.md).
