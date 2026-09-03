export interface Leader {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  experience: string;
  image: string;
  accentGradient: string;
}

export const leadershipData: Leader[] = [
  {
    id: "lead-1",
    name: "Ar. Rajeshwar Chandran",
    role: "Chief Principal Architect",
    credentials: "B.Arch (SPA Delhi), M.Arch (AA London), IIA Fellow",
    bio: "22+ years crafting sustainable high-rise facades and biophilic living sanctuaries across Singapore and India.",
    experience: "35+ Iconic Projects",
    image: "/images/rajeshwar_chandran.jpg",
    accentGradient: "from-amber-600 to-orange-800",
  },
  {
    id: "lead-2",
    name: "Er. K. Sivakumar",
    role: "Head of Structural Engineering",
    credentials: "M.Tech Structural Engineering (IIT Madras), PE Certified",
    bio: "Pioneer in post-tensioned earthquake-resistant composite structural design with zero safety incident record across 4.8M sq.ft.",
    experience: "26 Years Field Experience",
    image: "/images/sivakumar_er.jpg",
    accentGradient: "from-stone-600 to-slate-800",
  },
  {
    id: "lead-3",
    name: "Meenakshi Sundaram",
    role: "Director of Quality & Sustainability",
    credentials: "IGBC Accredited Professional, LEED AP (USGBC)",
    bio: "Spearheads Digireach's zero-carbon footprint building initiatives, water conservation loops, and platinum certifications.",
    experience: "18 Years in Green Tech",
    image: "/images/meenakshi_sundaram.jpg",
    accentGradient: "from-emerald-700 to-teal-900",
  },
  {
    id: "lead-4",
    name: "Vikramaditya Rao",
    role: "Managing Director & Co-Founder",
    credentials: "B.E Civil (PSG Tech), MBA (ISB Hyderabad)",
    bio: "Believer in transparent builder ethics, 100% clear freehold land titles, and strict on-time delivery warranties.",
    experience: "24 Years in Real Estate",
    image: "/images/vikramaditya_rao.jpg",
    accentGradient: "from-amber-700 to-stone-900",
  },
];
