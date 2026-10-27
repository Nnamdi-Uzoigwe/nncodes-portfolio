import { marqueeScreens, type AppScreen } from "@/data/screens";

export type ProjectStatus =
  | "Personal project"
  | "MVP"
  | "In development"
  | "Live demo available";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  screen: AppScreen;
  github?: string;
  demo?: string;
};

function screenFor(slug: string): AppScreen {
  return marqueeScreens.find((s) => s.slug === slug) ?? marqueeScreens[0];
}

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
    github: "https://github.com/",
  },
  {
    slug: "novara",
    name: "Novara",
    tagline: "E-commerce store app",
    description:
      "A store app with onboarding, authentication and product browsing, themed with a clean custom design system.",
    status: "In development",
    tags: ["React Native", "Expo", "TypeScript"],
    screen: screenFor("novara"),
    github: "https://github.com/",
  },
  {
    slug: "spendwise",
    name: "SpendWise",
    tagline: "Expense tracker",
    description:
      "An expense tracker for logging spending, grouping it by category and seeing where the money goes.",
    status: "Personal project",
    tags: ["React Native", "Expo", "TypeScript"],
    screen: screenFor("spendwise"),
    github: "https://github.com/",
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
    github: "https://github.com/",
  },
  {
    slug: "scanly",
    name: "Scanly",
    tagline: "Image to PDF scanner",
    description:
      "A utility app that turns photos into shareable PDF documents, built around the device camera and file handling.",
    status: "Personal project",
    tags: ["React Native", "Expo", "TypeScript"],
    screen: screenFor("scanly"),
    github: "https://github.com/",
  },
];

export const flagship = projects[0];

export type WebProject = {
  name: string;
  label: string;
  description: string;
  tags: string[];
  live?: boolean;
  url?: string;
};

export const webProjects: WebProject[] = [
  {
    name: "Cave Management",
    label: "Live production platform",
    description:
      "A booking and management platform used day to day by a real client, covering availability, bookings and admin workflows.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    live: true,
    url: "https://example.com",
  },
  {
    name: "Knowing Solution",
    label: "Client website",
    description:
      "A responsive marketing site for a legal and cybersecurity firm, structured around clear services and a simple lead flow.",
    tags: ["Next.js", "Tailwind CSS"],
    url: "https://example.com",
  },
  {
    name: "Company website",
    label: "Company site",
    description:
      "A fast, responsive brand site with a clean layout and straightforward contact options.",
    tags: ["Next.js", "Tailwind CSS"],
    url: "https://example.com",
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
    items: ["Git and GitHub", "Cloudinary", "Paystack", "Appwrite"],
  },
];

export const timeline = [
  {
    period: "Now",
    role: "Freelance mobile and web developer",
    org: "Independent",
  },
  {
    period: "Now",
    role: "Contract backend developer",
    org: "Software agency",
  },
  {
    period: "2025",
    role: "Computer Science graduate",
    org: "University of Calabar",
  },
];