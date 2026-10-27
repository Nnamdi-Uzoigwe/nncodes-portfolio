export type AppScreen = {
  app: string;
  slug: string;
  label: string;
  src: string;
  tone: string;
  hasImage: boolean;
};

const apps = [
  {
    app: "Momentum",
    slug: "momentum",
    tone: "bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-200",
  },
  {
    app: "Novara",
    slug: "novara",
    tone: "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-200",
  },
  {
    app: "SpendWise",
    slug: "spendwise",
    tone: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  },
  {
    app: "Bobo",
    slug: "bobo",
    tone: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
  },
  {
    app: "Scanly",
    slug: "scanly",
    tone: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
  },
];

// Apps that have real screenshots in public/screens.
// Files must be named <slug>-1, <slug>-2 ... using the extension below.
// Apps not listed here fall back to placeholder screens.
const available: Record<string, { count: number; ext: string }> = {
  momentum: { count: 4, ext: "png" },
  novara: { count: 4, ext: "png" },
  scanly: { count: 4, ext: "png" },
  bobo: { count: 4, ext: "png" },
  spendwise: { count: 4, ext: "png" },

};

const PLACEHOLDER_COUNT = 4;
const MARQUEE_PER_APP = 2;

export function getScreens(slug: string): AppScreen[] {
  const meta = apps.find((a) => a.slug === slug);
  if (!meta) return [];

  const info = available[slug];
  const count = info?.count ?? PLACEHOLDER_COUNT;

  return Array.from({ length: count }, (_, i) => ({
    app: meta.app,
    slug,
    tone: meta.tone,
    label: `Screen ${i + 1}`,
    src: info ? `/screens/${slug}-${i + 1}.${info.ext}` : "",
    hasImage: Boolean(info),
  }));
}

// Interleaved so the same app is never side by side in the marquee
export const marqueeScreens: AppScreen[] = Array.from({
  length: MARQUEE_PER_APP,
}).flatMap((_, round) => apps.map((a) => getScreens(a.slug)[round]));