export type ProjectType = "residential" | "commercial";
export type ProjectStatus = "ready_to_move" | "under_construction" | "new_launch";

export interface FloorPlan {
  unitType: string; // e.g. "2 BHK Smart Suite", "3 BHK Sky Villa", "Grade-A Office Plate"
  areaSqFt: number;
  carpetAreaSqFt: number;
  priceEstimate: string;
  image: string;
  features: string[];
}

export interface MilestoneProgress {
  stage: string;
  pct: number;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  type: ProjectType;
  subType: string; // "Luxury Apartments", "Contemporary Villas", "Tech Park", "Retail Complex"
  tagline: string;
  location: string;
  city: string;
  priceStart: string;
  priceStartNum: number; // in INR Lakhs
  possessionDate: string;
  status: ProjectStatus;
  statusLabel: string;
  featured?: boolean;
  constructionProgressPct: number;
  reraNumber: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  unitTypes: string[]; // ["2 BHK", "3 BHK", "4 BHK"] or ["Retail Floor", "Bare-shell Office"]
  amenities: string[];
  floorPlans: FloorPlan[];
  milestones: MilestoneProgress[];
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyLandmarks: {
    name: string;
    distance: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "proj-1",
    name: "Digireach Lumina Towers",
    slug: "digireach-lumina-towers",
    type: "residential",
    subType: "Ultra-Luxury High-Rise",
    tagline: "Panoramic skyline residences with private double-height sky decks.",
    location: "Race Course Boulevard, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹1.45 Cr",
    priceStartNum: 145,
    possessionDate: "December 2026",
    status: "under_construction",
    statusLabel: "Under Construction",
    featured: true,
    constructionProgressPct: 68,
    reraNumber: "TN/01/BLDR/2024/0912",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Designed by celebrated international architects, Lumina Towers stands as a 28-storey architectural masterpiece overlooking Coimbatore's prestigious Race Course promenade. Featuring acoustic insulated glass facades, Italian marble flooring, biometric access, and a cantilevered infinity pool at the 25th tier.",
    unitTypes: ["2 BHK", "3 BHK", "4 BHK Sky Penthouse"],
    amenities: [
      "25th-Floor Cantilevered Infinity Pool",
      "Private Squash & Badminton Courts",
      "Biometric & Video Door Security System",
      "2 Dedicated EV Fast-Charging Bays per Flat",
      "15,000 Sq.Ft Clubhouse & Wellness Spa",
      "100% DG Power Backup & Rainwater Harvesting"
    ],
    floorPlans: [
      {
        unitType: "2 BHK Luxury Suite",
        areaSqFt: 1420,
        carpetAreaSqFt: 1120,
        priceEstimate: "₹1.45 Cr onwards",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        features: ["East Facing Entry", "Double Deck Balcony", "Walk-in Wardrobe", "Modular Kitchen"]
      },
      {
        unitType: "3 BHK Royal Residence",
        areaSqFt: 2180,
        carpetAreaSqFt: 1750,
        priceEstimate: "₹2.15 Cr onwards",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        features: ["Corner Unit with 270° Views", "Servant Room with Toilet", "Dry & Wet Kitchen", "Powder Room"]
      },
      {
        unitType: "4 BHK Sky Penthouse",
        areaSqFt: 3850,
        carpetAreaSqFt: 3100,
        priceEstimate: "₹3.80 Cr onwards",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80",
        features: ["Private Plunge Pool", "Exclusive High-Speed Lift", "Master Suite with Jacuzzi", "Dedicated 3-Car Parking"]
      }
    ],
    milestones: [
      { stage: "Piling & Deep Substructure", pct: 100, completed: true },
      { stage: "Basement & Podium RCC Structure", pct: 100, completed: true },
      { stage: "Tower RCC Superstructure (22 of 28 Floors)", pct: 80, completed: false },
      { stage: "Brick Masonry & Internal Plastering", pct: 55, completed: false },
      { stage: "Façade Glazing & MEP Installations", pct: 40, completed: false }
    ],
    coordinates: { lat: 11.0016, lng: 76.9744 },
    nearbyLandmarks: [
      { name: "Race Course Promenade", distance: "200 meters" },
      { name: "Coimbatore International Airport", distance: "8.5 km (15 mins)" },
      { name: "KMCH Multispecialty Hospital", distance: "6.2 km" },
      { name: "TIDEL Park IT Corridor", distance: "7.0 km" }
    ]
  },
  {
    id: "proj-2",
    name: "Digireach Aurum Enclave",
    slug: "digireach-aurum-enclave",
    type: "residential",
    subType: "Private Gated Villas",
    tagline: "Ultra-luxury biophilic villas nested in a 14-acre private reserve.",
    location: "Saravanampatti - Kalapatti Link Road, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹2.75 Cr",
    priceStartNum: 275,
    possessionDate: "Ready to Move",
    status: "ready_to_move",
    statusLabel: "Ready to Move",
    featured: true,
    constructionProgressPct: 100,
    reraNumber: "TN/01/BLDR/2023/0741",
    coverImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "44 bespoke triplex villas crafted for discerning multi-generational families. Features private landscaped Zen gardens, temperature-controlled plunge pools, rooftop stargazing terraces, and smart home automation powered by solar micro-grids.",
    unitTypes: ["3 BHK Villa", "4 BHK Luxury Villa", "5 BHK Presidential Estate"],
    amenities: [
      "Private Temperature-Controlled Plunge Pool",
      "5 KVA Dedicated Rooftop Solar Micro-Grid",
      "Private Landscaped Lawn & Courtyard",
      "40-Seat Private Screening Theatre",
      "Tennis & Pickleball Courts",
      "Gated Community with 24/7 Security Patrol"
    ],
    floorPlans: [
      {
        unitType: "4 BHK Grande Villa",
        areaSqFt: 3450,
        carpetAreaSqFt: 2900,
        priceEstimate: "₹2.75 Cr onwards",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        features: ["Ground + 2 Floors", "Private Internal Elevator Provision", "Home Theatre Room", "Double Car Portico"]
      },
      {
        unitType: "5 BHK Presidential Estate",
        areaSqFt: 4800,
        carpetAreaSqFt: 4100,
        priceEstimate: "₹3.90 Cr onwards",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        features: ["Triple Car Parking", "Staff Quarters", "Gazebo Deck", "Private Steam & Sauna"]
      }
    ],
    milestones: [
      { stage: "Civil Structure & Roofing", pct: 100, completed: true },
      { stage: "Landscaping & Road Paving", pct: 100, completed: true },
      { stage: "Clubhouse & Amenities Commissioning", pct: 100, completed: true },
      { stage: "Occupancy Certificate (OC) Issued", pct: 100, completed: true }
    ],
    coordinates: { lat: 11.0825, lng: 77.0012 },
    nearbyLandmarks: [
      { name: "CHIL SEZ IT Tech Park", distance: "1.5 km (3 mins)" },
      { name: "Manchester International School", distance: "2.0 km" },
      { name: "Coimbatore Airport", distance: "9.0 km" }
    ]
  },
  {
    id: "proj-3",
    name: "Digireach Nexus One Tech Park",
    slug: "digireach-nexus-one",
    type: "commercial",
    subType: "Grade-A IT & Tech Park",
    tagline: "IGBC Platinum-rated corporate headquarters with high floor-load efficiency.",
    location: "Avinashi Road IT Corridor, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹2.20 Cr",
    priceStartNum: 220,
    possessionDate: "September 2026",
    status: "under_construction",
    statusLabel: "Under Construction",
    featured: true,
    constructionProgressPct: 54,
    reraNumber: "TN/01/BLDR/2024/1108",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Digireach Nexus One is engineered to host Fortune 500 tech companies, MNC GCCs, and high-growth fintech enterprises. Features 40,000 sq.ft column-free floor plates, high-efficiency double-glazed solar façades, 10 high-speed destination elevators, and multi-cuisine food atrium.",
    unitTypes: ["Bare-shell Office Plate", "Furnished Tech Suite", "Enterprise Floor"],
    amenities: [
      "IGBC Platinum Certified Green Architecture",
      "40,000 Sq.Ft Column-Free Flexible Floor Plates",
      "10 High-Speed Destination Control Elevators",
      "Multi-Tier Security & Central Command BMS",
      "3-Tier Basement Parking with 900+ Car Bays",
      "Grand Double-Height Corporate Arrival Atrium"
    ],
    floorPlans: [
      {
        unitType: "Mid-Market Tech Suite",
        areaSqFt: 3500,
        carpetAreaSqFt: 2800,
        priceEstimate: "₹2.20 Cr onwards",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
        features: ["Seating for 45-60 Workstations", "2 Executive Boardrooms", "Server Room", "Pantry Lounge"]
      },
      {
        unitType: "Full Floor Corporate Plate",
        areaSqFt: 22000,
        carpetAreaSqFt: 18200,
        priceEstimate: "₹14.50 Cr onwards",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80",
        features: ["360° Glass Perimeter", "Independent Chilled Water HVAC", "Dedicated Restroom Hub", "Direct Service Lift"]
      }
    ],
    milestones: [
      { stage: "Piling & Deep Basement Retaining Wall", pct: 100, completed: true },
      { stage: "RCC Post-Tensioned Slab Cast (Tier 7)", pct: 75, completed: false },
      { stage: "Structural Glazing & Façade Mullions", pct: 40, completed: false },
      { stage: "Central Air Conditioning Plant", pct: 30, completed: false }
    ],
    coordinates: { lat: 11.0289, lng: 77.0175 },
    nearbyLandmarks: [
      { name: "TIDEL Park Coimbatore", distance: "1.2 km" },
      { name: "Coimbatore International Airport", distance: "4.5 km (8 mins)" },
      { name: "Codissia Trade Fair Complex", distance: "2.8 km" }
    ]
  },
  {
    id: "proj-4",
    name: "Digireach Boulevard Galleria",
    slug: "digireach-boulevard-galleria",
    type: "commercial",
    subType: "High-Street Retail & F&B Hub",
    tagline: "Pedestrianized open-air retail promenade with premium road frontage.",
    location: "Trichy Road, Ramanathapuram, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹1.10 Cr",
    priceStartNum: 110,
    possessionDate: "March 2027",
    status: "new_launch",
    statusLabel: "New Launch",
    featured: false,
    constructionProgressPct: 22,
    reraNumber: "TN/01/BLDR/2024/1390",
    coverImage: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Designed on the lines of Singapore's waterfront promenades, Boulevard Galleria offers 3 floors of premium brand anchor stores, boutique fashion flagship outlets, microbreweries, and al-fresco culinary terraces.",
    unitTypes: ["High-Street Retail Showroom", "F&B Terrace Deck", "Anchor Brand Flagship"],
    amenities: [
      "350-Foot Continuous Highway Frontage",
      "Wide Pedestrian Plaza with Water Fountains",
      "Dedicated Valet Drop-off & 500-Car Basement",
      "Rooftop Open-Air Dining Decks",
      "High Footfall Catchment of 3.5 Lakh Residents"
    ],
    floorPlans: [
      {
        unitType: "Ground Floor Premium Retail",
        areaSqFt: 1250,
        carpetAreaSqFt: 1050,
        priceEstimate: "₹1.85 Cr onwards",
        image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=900&q=80",
        features: ["Double Height Ceilings (18 Ft)", "Direct Road Visage", "Dedicated Outdoor Seating Area"]
      },
      {
        unitType: "Second Floor F&B Terrace",
        areaSqFt: 2600,
        carpetAreaSqFt: 2150,
        priceEstimate: "₹2.95 Cr onwards",
        image: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&w=900&q=80",
        features: ["Kitchen Exhaust Shaft Ready", "Sky Terrace Seating", "Direct Escalator Access"]
      }
    ],
    milestones: [
      { stage: "Excavation & Shoring Works", pct: 100, completed: true },
      { stage: "Basement Raft Foundation", pct: 60, completed: false },
      { stage: "Ground Floor Slab Casting", pct: 10, completed: false }
    ],
    coordinates: { lat: 10.9984, lng: 76.9856 },
    nearbyLandmarks: [
      { name: "Trichy Road Flyover Junction", distance: "400 meters" },
      { name: "Singanallur Bus Terminal", distance: "2.1 km" },
      { name: "Coimbatore Railway Junction", distance: "4.8 km" }
    ]
  },
  {
    id: "proj-5",
    name: "Digireach Serenity Woods",
    slug: "digireach-serenity-woods",
    type: "residential",
    subType: "Eco-Conscious Forest Apartments",
    tagline: "3 & 4 BHK forest-view residences with 78% open green lungs.",
    location: "Vadavalli Foothills, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹92 Lakhs",
    priceStartNum: 92,
    possessionDate: "Ready to Move",
    status: "ready_to_move",
    statusLabel: "Ready to Move",
    featured: false,
    constructionProgressPct: 100,
    reraNumber: "TN/01/BLDR/2023/0655",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Nestled at the base of the Western Ghats, Serenity Woods provides year-round cooler temperatures, pure aquifer water, zero pollution, and organic community gardens.",
    unitTypes: ["2 BHK Eco Suite", "3 BHK Forest View", "4 BHK Penthouse"],
    amenities: [
      "Miyawaki Forest & Nature Walking Trails",
      "Natural Stone Infinity Pool",
      "Organic Herb & Vegetable Community Garden",
      "Acupressure Reflexology Pathway",
      "Children's Biophilic Adventure Playground"
    ],
    floorPlans: [
      {
        unitType: "2 BHK Eco Suite",
        areaSqFt: 1280,
        carpetAreaSqFt: 1010,
        priceEstimate: "₹92 Lakhs",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        features: ["Natural Cross-Ventilation", "Balcony facing Marudhamalai Hills", "Utility Area"]
      },
      {
        unitType: "3 BHK Forest View",
        areaSqFt: 1850,
        carpetAreaSqFt: 1490,
        priceEstimate: "₹1.35 Cr",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        features: ["East Facing Entry", "3 Attached Baths", "Spacious Modular Kitchen"]
      }
    ],
    milestones: [
      { stage: "All Structural Phases Completed", pct: 100, completed: true },
      { stage: "Landscaping & Organic Gardens", pct: 100, completed: true },
      { stage: "Occupancy Certificate (OC) Handover", pct: 100, completed: true }
    ],
    coordinates: { lat: 11.0251, lng: 76.9022 },
    nearbyLandmarks: [
      { name: "Bharathiar University", distance: "3.0 km" },
      { name: "Marudhamalai Temple Hill", distance: "4.5 km" },
      { name: "RS Puram Shopping District", distance: "6.5 km" }
    ]
  },
  {
    id: "proj-6",
    name: "Digireach Horizon Corporate Suites",
    slug: "digireach-horizon-suites",
    type: "commercial",
    subType: "Executive Boutique Offices",
    tagline: "Plug-and-play boutique commercial suites for professionals and C-level firms.",
    location: "Kavundampalayam, Mettupalayam Road, Coimbatore",
    city: "Coimbatore",
    priceStart: "₹85 Lakhs",
    priceStartNum: 85,
    possessionDate: "August 2026",
    status: "under_construction",
    statusLabel: "Under Construction",
    featured: false,
    constructionProgressPct: 78,
    reraNumber: "TN/01/BLDR/2024/0998",
    coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Compact, high-yielding boutique commercial suites tailored for chartered accountancy firms, architectural studios, tech consulting agencies, and legal practices.",
    unitTypes: ["Compact Studio Office", "Executive Suite", "Duplex Penthouse Office"],
    amenities: [
      "Common Executive Boardrooms with 4K Video Conferencing",
      "Concierge Reception Desk & Mail Handling",
      "Fiber-Optic Dual Redundant Internet Backbone",
      "EV Fleet Charging Hub",
      "Rooftop Espresso Bar & Networking Terrace"
    ],
    floorPlans: [
      {
        unitType: "Executive Studio Office",
        areaSqFt: 1100,
        carpetAreaSqFt: 880,
        priceEstimate: "₹85 Lakhs onwards",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        features: ["Accommodates 12-16 Desks", "Private MD Cabin", "Restroom Inside Unit"]
      }
    ],
    milestones: [
      { stage: "RCC Structure Complete", pct: 100, completed: true },
      { stage: "Façade & Curtain Wall Installation", pct: 85, completed: false },
      { stage: "Internal Electrical & Elevators", pct: 65, completed: false }
    ],
    coordinates: { lat: 11.0425, lng: 76.9388 },
    nearbyLandmarks: [
      { name: "Mettupalayam Highway Axis", distance: "100 meters" },
      { name: "RS Puram Commercial Center", distance: "4.0 km" },
      { name: "Saibaba Colony Junction", distance: "2.5 km" }
    ]
  }
];
