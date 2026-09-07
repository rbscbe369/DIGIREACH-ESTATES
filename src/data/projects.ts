export type ProjectType = "residential" | "commercial";
export type ProjectStatus = "ready_to_move" | "under_construction" | "new_launch";

export interface FloorPlan {
  unitType: string;
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
  subType: string;
  tagline: string;
  location: string;
  city: string; // "Coimbatore" | "Chennai"
  priceStart: string;
  priceStartNum: number; // in INR Lakhs
  possessionDate: string;
  status: ProjectStatus;
  statusLabel: string;
  featured?: boolean;
  lifestyleTheme?: string; // Casagrand-style USP: e.g. "Kids & Sports-Themed Community", "Zero Dead-Space High-Rise"
  amenitiesCount?: number; // e.g. 75+, 100+
  constructionProgressPct: number;
  reraNumber: string;
  coverImage: string;
  galleryImages: string[];
  description: string;
  unitTypes: string[];
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
    lifestyleTheme: "Pinnacle Skyline & Sky Lounges",
    amenitiesCount: 85,
    constructionProgressPct: 68,
    reraNumber: "TN/Coimbatore/Building/0912/2024",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "28-storey architectural masterpiece overlooking Coimbatore's prestigious Race Course promenade. Features zero dead-space layouts, acoustic insulated glass facades, Italian marble, biometric access, and a cantilevered infinity pool at the 25th tier.",
    unitTypes: ["2 BHK", "3 BHK", "4 BHK Sky Penthouse"],
    amenities: [
      "25th-Floor Cantilevered Infinity Pool",
      "Zero Dead-Space Spatial Engineering",
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
    lifestyleTheme: "Biophilic Luxury & Private Pools",
    amenitiesCount: 65,
    constructionProgressPct: 100,
    reraNumber: "TN/Coimbatore/Building/0741/2023",
    coverImage: "/images/aurum_enclave_villa.jpg",
    galleryImages: [
      "/images/aurum_enclave_villa.jpg",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
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
    name: "Digireach Marina Bay Residences",
    slug: "digireach-marina-bay-chennai",
    type: "residential",
    subType: "Sea-Facing High-Rise",
    tagline: "Unobstructed Bay of Bengal ocean-view residences with private sun decks.",
    location: "East Coast Road (ECR) & OMR Link, Chennai",
    city: "Chennai",
    priceStart: "₹1.85 Cr",
    priceStartNum: 185,
    possessionDate: "March 2027",
    status: "new_launch",
    statusLabel: "New Launch",
    featured: true,
    lifestyleTheme: "100+ World-Class Resort Amenities",
    amenitiesCount: 110,
    constructionProgressPct: 25,
    reraNumber: "TN/Chennai/Building/1820/2024",
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Spread over 12 lush coastal acres along Chennai's scenic ECR-OMR expressway. Features 110+ lifestyle amenities including a wave pool, Olympic-length lap pool, sea-view fitness skydeck, and 78% open green landscaped podiums.",
    unitTypes: ["2 BHK Sea View", "3 BHK Azure Suite", "4 BHK Presidential Deck"],
    amenities: [
      "100+ World-Class Resort Amenities",
      "Zero Dead-Space Guaranteed Living Layouts",
      "Private Sea-View Sun Decks",
      "Olympic-Size Temperature Regulated Pool",
      "Kids-Themed Water Park & Skating Rink",
      "Multi-Tier Biometric Coastal Security"
    ],
    floorPlans: [
      {
        unitType: "3 BHK Azure Suite",
        areaSqFt: 1980,
        carpetAreaSqFt: 1610,
        priceEstimate: "₹1.85 Cr onwards",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
        features: ["Direct Ocean Visage", "Double Height Living Area", "Maid Room with Toilet"]
      }
    ],
    milestones: [
      { stage: "Piling & Foundation Works", pct: 100, completed: true },
      { stage: "Basement 1 & 2 Car Park Slab", pct: 45, completed: false },
      { stage: "Podium Clubhouse Structure", pct: 15, completed: false }
    ],
    coordinates: { lat: 12.8995, lng: 80.2458 },
    nearbyLandmarks: [
      { name: "Tidel Park OMR", distance: "6.5 km" },
      { name: "Akkarai Beach Promenade", distance: "800 meters" },
      { name: "Apollo Specialty Hospital OMR", distance: "4.0 km" }
    ]
  },
  {
    id: "proj-4",
    name: "Digireach Silicon Heights",
    slug: "digireach-silicon-heights-chennai",
    type: "residential",
    subType: "Kids & Sports-Themed Community",
    tagline: "20-acre integrated sports and wellness community in Chennai's OMR IT corridor.",
    location: "OMR IT Expressway, Navalur - Siruseri SIPCOT, Chennai",
    city: "Chennai",
    priceStart: "₹1.60 Cr",
    priceStartNum: 160,
    possessionDate: "January 2027",
    status: "under_construction",
    statusLabel: "Under Construction",
    featured: true,
    lifestyleTheme: "Kids & Sports Themed Community",
    amenitiesCount: 105,
    constructionProgressPct: 58,
    reraNumber: "TN/Chennai/Building/0655/2025",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Designed for modern tech leaders and growing families along Chennai's prime OMR IT corridor. Features an Olympic-grade football turf, indoor badminton academy, zero-vehicle pedestrian podium, and CBSE school feeder shuttle.",
    unitTypes: ["2 BHK Smart", "3 BHK Family Suite", "4 BHK Duplex"],
    amenities: [
      "Professional Football Turf & Cricket Nets",
      "Kids Discovery Science Park & Creche",
      "Zero Dead-Space Architectural Efficiency",
      "Zero Vehicle Movement on Surface Podium",
      "Metro Station Connected Feeder Shuttle"
    ],
    floorPlans: [
      {
        unitType: "3 BHK Family Suite",
        areaSqFt: 1820,
        carpetAreaSqFt: 1470,
        priceEstimate: "₹1.60 Cr onwards",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
        features: ["Cross-Ventilated Living Room", "Study Nook", "Balcony Garden Ready"]
      }
    ],
    milestones: [
      { stage: "Substructure & Basement Levels", pct: 100, completed: true },
      { stage: "RCC Superstructure (Tier 14 of 24)", pct: 60, completed: false },
      { stage: "Brick Masonry & Electrical Piping", pct: 35, completed: false }
    ],
    coordinates: { lat: 12.8398, lng: 80.2223 },
    nearbyLandmarks: [
      { name: "Siruseri SIPCOT IT Park", distance: "1.2 km (4 mins)" },
      { name: "OMR Metro Phase II Station", distance: "800 meters" },
      { name: "Chettinad Health City Multispecialty", distance: "2.5 km" }
    ]
  },
  {
    id: "proj-5",
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
    featured: false,
    lifestyleTheme: "IGBC Platinum Certified Green Park",
    amenitiesCount: 40,
    constructionProgressPct: 54,
    reraNumber: "TN/Coimbatore/Building/1108/2024",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Digireach Nexus One is engineered to host Fortune 500 tech companies, MNC GCCs, and high-growth fintech enterprises. Features 40,000 sq.ft column-free floor plates, high-efficiency double-glazed solar façades, 10 high-speed destination elevators, and multi-cuisine food atrium.",
    unitTypes: ["Bare-shell Office Plate", "Furnished Tech Suite", "Enterprise Floor"],
    amenities: [
      "IGBC Platinum Certified Green Architecture",
      "40,000 Sq.Ft Column-Free Flexible Floor Plates",
      "10 High-Speed Destination Control Elevators",
      "Multi-Tier Security & Central Command BMS",
      "3-Tier Basement Parking with 900+ Car Bays"
    ],
    floorPlans: [
      {
        unitType: "Mid-Market Tech Suite",
        areaSqFt: 3500,
        carpetAreaSqFt: 2800,
        priceEstimate: "₹2.20 Cr onwards",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
        features: ["Seating for 45-60 Workstations", "2 Executive Boardrooms", "Server Room"]
      }
    ],
    milestones: [
      { stage: "Piling & Retaining Wall", pct: 100, completed: true },
      { stage: "Post-Tensioned Slab Cast (Tier 7)", pct: 75, completed: false },
      { stage: "Structural Glazing & Façade", pct: 40, completed: false }
    ],
    coordinates: { lat: 11.0289, lng: 77.0175 },
    nearbyLandmarks: [
      { name: "TIDEL Park Coimbatore", distance: "1.2 km" },
      { name: "Coimbatore Airport", distance: "4.5 km" }
    ]
  },
  {
    id: "proj-6",
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
    lifestyleTheme: "High-Footfall Retail Promenade",
    amenitiesCount: 30,
    constructionProgressPct: 22,
    reraNumber: "TN/Coimbatore/Building/1390/2024",
    coverImage: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1200&q=85"
    ],
    description: "Designed on the lines of Singapore's waterfront promenades, Boulevard Galleria offers 3 floors of premium brand anchor stores, boutique fashion flagship outlets, microbreweries, and al-fresco culinary terraces.",
    unitTypes: ["High-Street Retail Showroom", "F&B Terrace Deck", "Anchor Brand Flagship"],
    amenities: [
      "350-Foot Continuous Highway Frontage",
      "Wide Pedestrian Plaza with Fountains",
      "Dedicated Valet Drop-off & 500-Car Basement",
      "Rooftop Open-Air Dining Decks"
    ],
    floorPlans: [
      {
        unitType: "Ground Floor Premium Retail",
        areaSqFt: 1250,
        carpetAreaSqFt: 1050,
        priceEstimate: "₹1.85 Cr onwards",
        image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=900&q=80",
        features: ["Double Height Ceilings (18 Ft)", "Direct Road Visage"]
      }
    ],
    milestones: [
      { stage: "Excavation & Shoring", pct: 100, completed: true },
      { stage: "Basement Raft Foundation", pct: 60, completed: false }
    ],
    coordinates: { lat: 10.9984, lng: 76.9856 },
    nearbyLandmarks: [
      { name: "Trichy Road Flyover Junction", distance: "400 meters" },
      { name: "Singanallur Terminal", distance: "2.1 km" }
    ]
  }
];
