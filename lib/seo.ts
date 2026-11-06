const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000";

export const siteUrl = new URL(configuredUrl).origin;

export const seo = {
  name: "Nnamdi Uzoigwe",
  title: "Nnamdi Uzoigwe | Mobile & Web Developer",
  description:
    "Mobile and web developer building React Native apps and Next.js websites. Explore live client projects, independent mobile apps, and the thinking behind each build.",
};