export type WebProject = {
  id: string;
  name: string;
  label: string;
  description: string;
  tags: string[];
  live: boolean;
  url: string;
  image: string;
  palette: {
    stage: string;
    glow: string;
    accent: string;
    frame: string;
  };
};

export const webProjects: WebProject[] = [
  {
    id: "01",
    name: "deCave Management",
    label: "Live production platform",
    description:
      "Booking and admin system for a live events business. Over 1000 tickets sold through the platform, with availability, bookings and client management handled in one place. Delivered in 4 weeks.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Express JS", "Redis"],
    live: true,
    url: "https://decavemgt.com",
    image: "/projects/decave.png",
    palette: {
      stage: "#f2e4d0",
      glow: "#E7D5AE",
      accent: "#8A682B",
      frame: "#E4D8C1",
    },
  },
  {
    id: "02",
    name: "Norwyn Solution",
    label: "Client website",
    description:
      "Marketing site for a legal and cybersecurity firm. Rewrote their services into clear pages with a single lead form, so enquiries arrive with context attached.",
    tags: ["Next.js", "Tailwind CSS"],
    live: true,
    url: "https://norwynsolution.com",
    image: "/projects/norwyn.png",
    palette: {
      stage: "#f2e4d0",
      glow: "#D9C39B",
      accent: "#806033",
      frame: "#DCD1BE",
    },
  },
  {
    id: "03",
    name: "Novtryx website",
    label: "Company site",
    description:
      "Brand and company site with a fast, responsive build and one obvious way to get in touch. Pages load clean on a cheap phone and a slow connection, which is what most of their visitors are on.",
    tags: ["Next.js", "Tailwind CSS"],
    live: true,
    url: "https://novtryx.com",
    image: "/projects/novtryx.png",
    palette: {
      stage: "#E6F1ED",
      glow: "#B7DCD0",
      accent: "#236C5A",
      frame: "#C6DDD4",
    },
  },
  {
    id: "04",
    name: "Tavola Web Application",
    label: "Restaurant SaaS",
    description:
      "A QR-powered digital menu platform that helps restaurants showcase their menus, manage dishes and categories, and let guests browse meals and send orders directly through WhatsApp. Features restaurant management, interactive menus, and secure authentication.",
    tags: ["Next.js", "Typescript", "Tailwind CSS", "Neon", "PostgreSQL", "Drizzle ORM", "BetterAuth"],
    live: true,
    url: "https://tavola-web.vercel.app",
    image: "/projects/tavola.png",
    palette: {
      stage: "#f2e4d0",
      glow: "#E7D5AE",
      accent: "#8A682B",
      frame: "#E4D8C1",
    },
  },
];

export const skillGroups = [
  {
    title: "Mobile",
    items: [
      "React Native",
      "Expo",
      "Expo Router",
      "TypeScript",
      "Zustand",
      "SQLite",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "Prisma",
      "MongoDB",
      "JWT auth",
      "Neon",
    ],
  },
  {
    title: "Web",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Tools and services",
    items: [
      "Git and GitHub",
      "Supabase",
      "Cloudinary",
      "Paystack",
      "Appwrite",
      "Figma",
    ],
  },
];

export const timeline = [
  {
    period: "Now",
    role: "Freelance mobile and web developer",
    org: "Independent",
  },
  {
    period: "2026 - Now",
    role: "Contract Software developer",
    org: "Novtryx Ltd",
  },
  {
    period: "2025",
    role: "Computer Science graduate",
    org: "University of Calabar",
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: string;
  tags: string[];
  screen: string;
  github: string;
};

const screenFor = (slug: string) => `/projects/${slug}.png`;

export const projects: Project[] = [
  {
    slug: "momentum",
    name: "Momentum",
    tagline: "Habit and goal tracker",
    description:
      "Habit tracker with daily check-ins, streaks and progress views. Same build a coach or clinic would use to keep clients showing up.",
    status: "MVP",
    tags: ["React Native", "Expo", "TypeScript", "SQLite"],
    screen: screenFor("momentum"),
    github: "https://github.com/Nnamdi-Uzoigwe/momentum",
  },
  {
    slug: "novara",
    name: "Novara",
    tagline: "E-commerce store app",
    description:
      "Clothing store app: onboarding, authentication, product browsing, and checkout, on its own design systtem. The exact structure a retailer needs to sell from a phone.",
    status: "Personal project",
    tags: ["React Native", "Expo", "TypeScript"],
    screen: screenFor("novara"),
    github: "https://github.com/Nnamdi-Uzoigwe/Novara",
  },
  {
    slug: "spendwise",
    name: "SpendWise",
    tagline: "Expense tracker",
    description:
      "Expense tracker that logs spending, groups it by category and shows where the money goes. A small business version of this replaces the notebook every vendor still keeps.",
    status: "In development",
    tags: ["React Native", "Expo", "TypeScript", "Jest", "SQLite"],
    screen: screenFor("spendwise"),
    github: "https://github.com/Nnamdi-Uzoigwe/spendwise",
  },
  {
    slug: "bobo",
    name: "Bobo",
    tagline: "Food delivery app",
    description:
      "Full-stack food delivery app: onboarding, cart, checkout, favorites and notifications, on an API I built in NestJS and MongoDB. Built to the spec a restaurant needs.",
    status: "In development",
    tags: ["React Native", "Expo", "NestJS", "MongoDB", "Zustand"],
    screen: screenFor("bobo"),
    github: "https://github.com/Nnamdi-Uzoigwe/Bobo-app",
  },
  {
    slug: "scanly",
    name: "Scanly",
    tagline: "Image to PDF scanner",
    description:
      "Turns phone photos into clean, shareable PDFs using the device camera and file handling. Utility build, useful for anyone digitising receipts or paperwork.",
    status: "Personal project",
    tags: ["React Native", "Expo", "TypeScript", "SQLite"],
    screen: screenFor("scanly"),
    github: "https://github.com/Nnamdi-Uzoigwe/scanly",
  },
];