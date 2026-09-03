export interface Testimonial {
  id: string;
  name: string;
  title: string;
  companyOrRole: string;
  projectBought: string;
  projectType: "residential" | "commercial";
  rating: number;
  quote: string;
  avatar: string;
  verifiedBuyer: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Arvind Swaminathan",
    title: "Senior Cardiac Surgeon",
    companyOrRole: "Resident Owner",
    projectBought: "Digireach Lumina Towers (3 BHK Royal Residence)",
    projectType: "residential",
    rating: 5,
    quote: "The acoustic insulation in Lumina Towers is extraordinary. Even on Avinashi Road, my residence is whisper quiet. Handover was executed 2 months ahead of schedule, with every legal document vetted with utmost transparency.",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
    verifiedBuyer: true,
  },
  {
    id: "test-2",
    name: "Nandhini Prakash",
    title: "VP of Global Engineering",
    companyOrRole: "FinTech Cloud Solutions",
    projectBought: "Digireach Nexus One Tech Park (Floor 5 & 6)",
    projectType: "commercial",
    rating: 5,
    quote: "Relocating our offshore software R&D hub to Digireach Nexus One gave our enterprise LEED Platinum compliance and pristine high-speed fiber infrastructure. The floor loading capacity and high ceiling heights are best-in-class in Coimbatore.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    verifiedBuyer: true,
  },
  {
    id: "test-3",
    name: "Karthik Subramaniam & Deepa Karthik",
    title: "Entrepreneurs & Angel Investors",
    companyOrRole: "Villa Owners",
    projectBought: "Digireach Aurum Enclave (Grande Villa #14)",
    projectType: "residential",
    rating: 5,
    quote: "From the private plunge pool to the 100% solar microgrid, Aurum Enclave delivers a sanctuary. Digireach's site engineers gave us bi-weekly construction video logs and total clarity throughout the build journey.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    verifiedBuyer: true,
  },
  {
    id: "test-4",
    name: "Gaurav Malhotra",
    title: "Director of Retail Real Estate",
    companyOrRole: "Artisanal Coffee Roasters",
    projectBought: "Digireach Boulevard Galleria (Anchor Unit #03)",
    projectType: "commercial",
    rating: 5,
    quote: "The highway frontage and wide pedestrian colonnade at Boulevard Galleria provided our flagship café 40% higher foot traffic than projected. Excellent parking ratio and flawless facility management.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    verifiedBuyer: true,
  },
];
