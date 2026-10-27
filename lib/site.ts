export const siteConfig = {
  name: "Nnamdi Uzoigwe",
  shortName: "Nnamdi",
  role: "Mobile App Developer",
  description:
    "Mobile app developer building React Native apps for businesses, startups and founders.",
  url: "https://example.com",
  email: "hello@example.com",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Web", href: "/#web" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  projects: [
    { name: "Momentum", slug: "momentum" },
    { name: "Novara", slug: "novara" },
    { name: "SpendWise", slug: "spendwise" },
    { name: "Bobo", slug: "bobo" },
    { name: "Scanly", slug: "scanly" },
  ],
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    tiktok: "https://tiktok.com/",
  },
} as const;