export interface SiteConfig {
  name: string;
  tagline: string;
  reraNumber: string;
  phone: string;
  displayPhone: string;
  email: string;
  address: string;
  experienceYears: number;
  sqftDelivered: string;
  projectsCompleted: number;
  citiesCount: number;
  stats: {
    value: string;
    label: string;
  }[];
  quickLinks: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Digireach Estates",
  tagline: "Architectural Precision. Timeless Living & Working Spaces.",
  reraNumber: "TN/RERA/BLDR/2026/0894",
  phone: "7810067898",
  displayPhone: "7810067898",
  email: "connect@digireachestates.com",
  address: "Digireach Towers, Level 9, Avinashi Road, Peelamedu, Coimbatore, TN 641004",
  experienceYears: 24,
  sqftDelivered: "4.8M+",
  projectsCompleted: 42,
  citiesCount: 6,
  stats: [
    { value: "4.8M+", label: "Sq. Ft. Delivered" },
    { value: "42+", label: "Projects Completed" },
    { value: "24+", label: "Years in Business" },
    { value: "6", label: "Cities Across South India" },
  ],
  quickLinks: [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Project Types", href: "#types" },
    { label: "Site Map", href: "#sitemap" },
    { label: "Construction", href: "#construction" },
    { label: "EMI Calculator", href: "#calculator" },
    { label: "Leadership", href: "#leadership" },
  ],
};
