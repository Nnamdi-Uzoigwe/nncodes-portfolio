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
      "A booking and management platform used day to day by a real client, covering availability, bookings and admin workflows.",
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
      "A responsive marketing site for a legal and cybersecurity firm, structured around clear services and a simple lead flow.",
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
      "A fast, responsive brand site with a clean layout and straightforward contact options.",
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
      "A habit and goal tracker with daily check ins, streaks and progress views, built to make consistency visible.",
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
      "A clothing store app with onboarding, authentication and product browsing and checkout, themed with a clean custom design system.",
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
      "An expense tracker for logging spending, grouping it by category and seeing where the money goes.",
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
      "A full stack food delivery app with onboarding, cart, checkout, favorites and notifications, backed by its own API.",
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
      "A utility app that turns photos into shareable PDF documents, built around the device camera and file handling.",
    status: "Personal project",
    tags: ["React Native", "Expo", "TypeScript", "SQLite"],
    screen: screenFor("scanly"),
    github: "https://github.com/Nnamdi-Uzoigwe/scanly",
  },
];