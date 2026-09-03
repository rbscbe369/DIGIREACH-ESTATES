-- ==============================================================================
-- DIGIREACH ESTATES - SUPABASE DATABASE SCHEMA
-- Tables: `projects`, `site_visits`
-- Features: Row Level Security (RLS), Auto-timestamp Triggers, Indexes,
--           Database Webhook / Edge Function Trigger, and Seed Data
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLE 1: PROJECTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('residential', 'commercial')),
    sub_type VARCHAR(100),
    tagline TEXT,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Coimbatore',
    price_start VARCHAR(50) NOT NULL,
    price_start_num NUMERIC(10,2) NOT NULL, -- In INR Lakhs for range filtering
    possession_date VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('ready_to_move', 'under_construction', 'new_launch')),
    status_label VARCHAR(100) NOT NULL,
    featured BOOLEAN DEFAULT false,
    construction_progress_pct INT NOT NULL DEFAULT 0 CHECK (construction_progress_pct BETWEEN 0 AND 100),
    rera_number VARCHAR(100) NOT NULL,
    cover_image TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    unit_types JSONB NOT NULL DEFAULT '[]'::jsonb, -- e.g. ["2 BHK", "3 BHK", "4 BHK"]
    amenities JSONB NOT NULL DEFAULT '[]'::jsonb,  -- Array of amenity strings
    floor_plans JSONB NOT NULL DEFAULT '[]'::jsonb,
    milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
    coordinates JSONB DEFAULT '{"lat": 11.0168, "lng": 76.9558}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- TABLE 2: SITE_VISITS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    project_name VARCHAR(255) NOT NULL,
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('residential', 'commercial')),
    unit_preference VARCHAR(100),
    date DATE NOT NULL,
    time VARCHAR(100) NOT NULL,
    visit_mode VARCHAR(100) DEFAULT 'In-Person Executive Escort',
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'rescheduled', 'cancelled', 'no_show')),
    notes TEXT,
    wacrm_message_id VARCHAR(255),
    webhook_dispatched BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for high-speed filtering & queries
CREATE INDEX IF NOT EXISTS idx_projects_type ON public.projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_price ON public.projects(price_start_num);
CREATE INDEX IF NOT EXISTS idx_site_visits_date ON public.site_visits(date);
CREATE INDEX IF NOT EXISTS idx_site_visits_status ON public.site_visits(status);
CREATE INDEX IF NOT EXISTS idx_site_visits_phone ON public.site_visits(phone);

-- ==============================================================================
-- AUTOMATIC TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_projects_updated_at ON public.projects;
CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS trg_site_visits_updated_at ON public.site_visits;
CREATE TRIGGER trg_site_visits_updated_at
BEFORE UPDATE ON public.site_visits
FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Projects: Anyone can view published projects (public read)
CREATE POLICY "Allow public read access to projects"
ON public.projects FOR SELECT
USING (true);

-- Site Visits: Anyone can insert a site visit booking (public lead generation)
CREATE POLICY "Allow public insert to site_visits"
ON public.site_visits FOR INSERT
WITH CHECK (true);

-- Site Visits: Only authenticated staff can view or update full booking records
CREATE POLICY "Allow authenticated staff to read site_visits"
ON public.site_visits FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated staff to update site_visits"
ON public.site_visits FOR UPDATE
TO authenticated
USING (true);

-- ==============================================================================
-- SEED DATA FOR DEMO PROJECTS
-- ==============================================================================
INSERT INTO public.projects (
    name, slug, project_type, sub_type, tagline, location, city,
    price_start, price_start_num, possession_date, status, status_label, featured,
    construction_progress_pct, rera_number, cover_image, description,
    unit_types, amenities
) VALUES
(
    'Digireach Lumina Towers',
    'digireach-lumina-towers',
    'residential',
    'Ultra-Luxury High-Rise',
    'Panoramic skyline residences with private double-height sky decks.',
    'Race Course Boulevard, Coimbatore',
    'Coimbatore',
    '₹1.45 Cr',
    145.00,
    'December 2026',
    'under_construction',
    'Under Construction',
    true,
    68,
    'TN/01/BLDR/2024/0912',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'Designed by celebrated international architects, Lumina Towers stands as a 28-storey architectural masterpiece overlooking Coimbatore Race Course promenade.',
    '["2 BHK", "3 BHK", "4 BHK Sky Penthouse"]'::jsonb,
    '["25th-Floor Cantilevered Infinity Pool", "Private Squash & Badminton Courts", "Biometric & Video Door Security", "EV Charging Bays per Flat", "15,000 Sq.Ft Clubhouse", "100% DG Power Backup"]'::jsonb
),
(
    'Digireach Aurum Enclave',
    'digireach-aurum-enclave',
    'residential',
    'Private Gated Villas',
    'Ultra-luxury biophilic villas nested in a 14-acre private reserve.',
    'Saravanampatti - Kalapatti Link Road, Coimbatore',
    'Coimbatore',
    '₹2.75 Cr',
    275.00,
    'Ready to Move',
    'ready_to_move',
    'Ready to Move',
    true,
    100,
    'TN/01/BLDR/2023/0741',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    '44 bespoke triplex villas crafted for discerning multi-generational families with private plunge pools, rooftop stargazing terraces, and 5 KVA solar micro-grids.',
    '["3 BHK Villa", "4 BHK Luxury Villa", "5 BHK Presidential Estate"]'::jsonb,
    '["Private Plunge Pool", "5 KVA Solar Micro-Grid", "Private Landscaped Lawn", "40-Seat Screening Theatre", "Tennis & Pickleball Courts", "24/7 Security Patrol"]'::jsonb
),
(
    'Digireach Nexus One Tech Park',
    'digireach-nexus-one',
    'commercial',
    'Grade-A IT & Tech Park',
    'IGBC Platinum-rated corporate headquarters with high floor-load efficiency.',
    'Avinashi Road IT Corridor, Coimbatore',
    'Coimbatore',
    '₹2.20 Cr',
    220.00,
    'September 2026',
    'under_construction',
    'Under Construction',
    true,
    54,
    'TN/01/BLDR/2024/1108',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'Engineered to host Fortune 500 tech firms, MNC GCCs, and high-growth enterprises with 40,000 sq.ft column-free floor plates.',
    '["Bare-shell Office Plate", "Furnished Tech Suite", "Enterprise Floor"]'::jsonb,
    '["IGBC Platinum Certified Green Architecture", "40,000 Sq.Ft Column-Free Plates", "10 High-Speed Destination Elevators", "Multi-Tier Security & BMS", "900+ Car Parking Bays"]'::jsonb
),
(
    'Digireach Boulevard Galleria',
    'digireach-boulevard-galleria',
    'commercial',
    'High-Street Retail & F&B Hub',
    'Pedestrianized open-air retail promenade with premium road frontage.',
    'Trichy Road, Ramanathapuram, Coimbatore',
    'Coimbatore',
    '₹1.10 Cr',
    110.00,
    'March 2027',
    'new_launch',
    'New Launch',
    false,
    22,
    'TN/01/BLDR/2024/1390',
    'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80',
    '3 floors of premium brand anchor stores, boutique fashion outlets, microbreweries, and al-fresco culinary terraces.',
    '["High-Street Retail Showroom", "F&B Terrace Deck", "Anchor Brand Flagship"]'::jsonb,
    '["350-Foot Highway Frontage", "Wide Pedestrian Plaza", "500-Car Basement Parking", "Rooftop Open-Air Dining Decks"]'::jsonb
);
