export type CaseStudy = {
  platform: string;
  audience: string;
  overview: string;
  features: { title: string; text: string }[];
  decisions: { title: string; text: string }[];
  challenges: { problem: string; approach: string; result: string }[];
  results: string[];
  next: string[];
};

export const caseStudies: Record<string, CaseStudy> = {
  momentum: {
    platform: "Mobile, React Native with Expo",
    audience: "People building daily habits and tracking personal goals",
    overview:
      "Momentum is a habit and goal tracker that makes consistency visible. You create habits, check them off each day and watch streaks and progress build over time. I built it step by step from a written design system, with an Ember orange theme running through every screen.",
    features: [
      {
        title: "Habit creation",
        text: "Set up habits with simple, focused inputs.",
      },
      {
        title: "Daily check ins",
        text: "Mark habits done each day in a couple of taps.",
      },
      {
        title: "Streaks",
        text: "See how many days in a row each habit has held.",
      },
      {
        title: "Goals and progress",
        text: "Track larger goals with progress you can read at a glance.",
      },
    ],
    decisions: [
      {
        title: "Local first data",
        text: "Everything lives in SQLite on the device, so the app works offline and loads instantly.",
      },
      {
        title: "Typed end to end",
        text: "TypeScript types describe habits, completions and goals, so the data layer and the screens always agree.",
      },
      {
        title: "Design system first",
        text: "Colors, spacing and type came from a design system document, which kept screens consistent as the app grew.",
      },
      {
        title: "File based navigation",
        text: "Expo Router with a tab layout keeps routes simple and easy to extend.",
      },
    ],
    // Draft: confirm against the real app
    challenges: [
      {
        problem: "Keeping streaks accurate when days are missed or edited.",
        approach:
          "Derive each streak from stored completion dates instead of a running counter.",
        result: "Streaks stay correct after edits and gaps.",
      },
      {
        problem: "Building many screens without the design drifting.",
        approach: "Centralized theme tokens and reusable components.",
        result: "New screens match the rest of the app by default.",
      },
    ],
    results: [
      "Working MVP with the full habit loop in place",
      "All data stored on the device, fully offline",
      "Reusable themed components across screens",
    ],
    next: ["Reminders and notifications", "Cloud sync and accounts", "Store release"],
  },

  novara: {
    platform: "Mobile, React Native with Expo",
    audience: "Shoppers using a branded store app",
    overview:
      "Novara is an e-commerce store app currently in development. So far I have built the foundations a store needs: a custom theme and typography, an onboarding flow and a complete set of authentication screens.",
    features: [
      {
        title: "Onboarding",
        text: "A short introduction flow that sets the tone for the brand.",
      },
      {
        title: "Authentication screens",
        text: "Sign in and sign up screens with clear validation states.",
      },
      {
        title: "Forgot password sheet",
        text: "A bottom sheet that handles recovery without leaving the screen.",
      },
      {
        title: "Custom theme",
        text: "Shared colors, spacing and the Urbanist typeface across the app.",
      },
    ],
    decisions: [
      {
        title: "Theme before screens",
        text: "I set up the theme and typography first, so every screen after it inherits the same look.",
      },
      {
        title: "Current Expo SDK",
        text: "Built on a recent Expo SDK so the project starts on up to date tooling.",
      },
      {
        title: "Bottom sheet for recovery",
        text: "Password recovery happens in a sheet, which keeps the user in context and the flow short.",
      },
    ],
    // Draft: confirm against the real app
    challenges: [
      {
        problem: "Making auth screens feel consistent across states.",
        approach:
          "Built shared input, button and error components used by every form.",
        result: "Forms look and behave the same everywhere.",
      },
      {
        problem: "Keeping the typeface consistent across the whole app.",
        approach: "Loaded the font once and applied it through the theme.",
        result: "No per screen font overrides.",
      },
    ],
    results: [
      "Theme, onboarding and auth flow complete",
      "Reusable form components ready for the rest of the store",
    ],
    next: ["Product browsing and details", "Cart and checkout", "Backend integration"],
  },

  spendwise: {
    platform: "Mobile, React Native with Expo",
    audience: "People who want a clear view of where their money goes",
    // Draft copy: replace with the real details of your app
    overview:
      "SpendWise is an expense tracker for logging spending, grouping it by category and seeing the totals at a glance. It is built to make daily tracking quick enough that people actually keep doing it.",
    features: [
      { title: "Expense entry", text: "Add an expense in a few taps." },
      { title: "Categories", text: "Group spending so patterns are easy to see." },
      { title: "Summaries", text: "Totals by period and category." },
      { title: "Clean history", text: "Browse past expenses in one list." },
    ],
    decisions: [
      {
        title: "Fast entry first",
        text: "The add flow is the most used screen, so it has the fewest steps.",
      },
      {
        title: "Typed data model",
        text: "Expenses and categories are typed, so totals are computed from one source of truth.",
      },
    ],
    challenges: [
      {
        problem: "Summing expenses correctly across dates and categories.",
        approach: "Aggregate from stored records rather than keeping running totals.",
        result: "Totals always match the underlying data.",
      },
    ],
    results: ["Core tracking flow working", "Summaries computed from stored data"],
    next: ["Budgets and limits", "Charts", "Export and backup"],
  },

  bobo: {
    platform: "Mobile, React Native with Expo, plus a NestJS API",
    audience: "People ordering food for delivery",
    overview:
      "Bobo is a full stack food delivery app. The mobile app covers onboarding, authentication, browsing, cart, checkout, favorites, notifications and profile, and it talks to a NestJS and MongoDB backend I also built.",
    features: [
      {
        title: "Animated onboarding",
        text: "A polished first run that introduces the app.",
      },
      {
        title: "Cart and checkout",
        text: "Add items, adjust quantities and place an order.",
      },
      {
        title: "Favorites",
        text: "Save the dishes you love for quick reordering.",
      },
      {
        title: "Notifications and profile",
        text: "Order updates and account management in one place.",
      },
    ],
    decisions: [
      {
        title: "Own API with NestJS and MongoDB",
        text: "A dedicated backend with modules for auth, cart, orders, favorites and notifications.",
      },
      {
        title: "JWT auth with email OTP",
        text: "Token based sessions, with one time codes sent by email to verify accounts.",
      },
      {
        title: "Cloudinary for images",
        text: "Food images are hosted and served through Cloudinary instead of bundled in the app.",
      },
      {
        title: "Zustand for state",
        text: "Small, focused stores keep cart, auth and favorites easy to reason about.",
      },
    ],
    challenges: [
      {
        problem:
          "Native phone input and country picker packages broke the Metro web build.",
        approach:
          "Replaced them with a custom, dependency free phone input and country picker modal.",
        result: "The app bundles cleanly on web and on device.",
      },
      {
        problem:
          "Bundler and package conflicts around Babel versions and Zustand module formats.",
        approach: "Traced each conflict and aligned versions and configuration.",
        result: "A stable build across platforms.",
      },
    ],
    results: [
      "20+ screens built across the full user flow",
      "Auth, cart, orders, favorites and notifications integrated with the API",
      "Custom components that avoid fragile native dependencies",
    ],
    next: ["Payment integration", "Real time order tracking", "Store release"],
  },

  scanly: {
    platform: "Mobile, React Native with Expo",
    audience: "Anyone who needs to turn paper into shareable PDFs",
    // Draft copy: replace with the real details of your app
    overview:
      "Scanly is a utility app that turns photos into PDF documents you can share. It is built around the device camera and file handling, with the goal of making a clean scan quick and simple.",
    features: [
      { title: "Capture", text: "Take a photo or pick one from the gallery." },
      { title: "Multi page documents", text: "Combine several images into one PDF." },
      { title: "Reorder pages", text: "Arrange pages before exporting." },
      { title: "Share and export", text: "Send the finished PDF anywhere." },
    ],
    decisions: [
      {
        title: "Device first",
        text: "Scans are processed on the device, so documents stay with the user.",
      },
      {
        title: "Simple flow",
        text: "Capture, arrange and export, with nothing extra in the way.",
      },
    ],
    challenges: [
      {
        problem: "Keeping PDF size reasonable with high resolution photos.",
        approach: "Compress and resize images before building the document.",
        result: "Smaller files that still read clearly.",
      },
    ],
    results: ["Capture to PDF flow working", "Multi page export supported"],
    next: ["Image cropping and enhancement", "Text recognition", "Cloud backup"],
  },
};