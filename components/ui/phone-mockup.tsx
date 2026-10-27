// import Image from "next/image";
// import type { AppScreen } from "@/data/screens";
// import { cn } from "@/lib/utils";

// function PlaceholderScreen({ screen }: { screen: AppScreen }) {
//   return (
//     <div className={cn("flex size-full flex-col gap-2 p-3 pt-9", screen.tone)}>
//       <p className="text-xs font-semibold">{screen.app}</p>
//       <div className="h-16 rounded-lg bg-white/60 dark:bg-white/10" />
//       <div className="grid grid-cols-2 gap-2">
//         <div className="h-14 rounded-lg bg-white/60 dark:bg-white/10" />
//         <div className="h-14 rounded-lg bg-white/60 dark:bg-white/10" />
//       </div>
//       <div className="h-8 rounded-lg bg-white/60 dark:bg-white/10" />
//       <div className="h-8 w-2/3 rounded-lg bg-white/60 dark:bg-white/10" />
//       <p className="mt-auto text-[10px] opacity-60">{screen.label}</p>
//     </div>
//   );
// }

// type PhoneMockupProps = {
//   screen: AppScreen;
//   className?: string;
//   priority?: boolean;
// };

// export function PhoneMockup({ screen, className, priority }: PhoneMockupProps) {
//   // Your own images already include the phone frame, so render them as is
//   if (screen.hasImage) {
//     return (
//       <Image
//         src={screen.src}
//         alt={`${screen.app} app, ${screen.label.toLowerCase()}`}
//         width={0}
//         height={0}
//         sizes="(min-width: 640px) 192px, 150px"
//         priority={priority}
//         draggable={false}
//         className={cn(
//           "h-auto w-full select-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]",
//           className,
//         )}
//       />
//     );
//   }

//   // Placeholder: draw a simple frame until a real image is added
//   return (
//     <div
//       className={cn(
//         "relative aspect-[9/19.5] rounded-[2rem] border border-border bg-card p-1.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]",
//         className,
//       )}
//     >
//       <div className="relative size-full overflow-hidden rounded-[1.6rem] bg-muted">
//         <PlaceholderScreen screen={screen} />
//         <div
//           className="absolute top-2 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-black/90"
//           aria-hidden="true"
//         />
//       </div>
//     </div>
//   );
// }


import Image from "next/image";
import type { AppScreen } from "@/data/screens";
import { cn } from "@/lib/utils";

// Temporary test: true serves your original file untouched.
// If it looks sharper, the optimizer is the cause. Set back to false after testing.
const TEST_UNOPTIMIZED = true;

function PlaceholderScreen({ screen }: { screen: AppScreen }) {
  return (
    <div className={cn("flex size-full flex-col gap-2 p-3 pt-9", screen.tone)}>
      <p className="text-xs font-semibold">{screen.app}</p>
      <div className="h-16 rounded-lg bg-white/60 dark:bg-white/10" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-14 rounded-lg bg-white/60 dark:bg-white/10" />
        <div className="h-14 rounded-lg bg-white/60 dark:bg-white/10" />
      </div>
      <div className="h-8 rounded-lg bg-white/60 dark:bg-white/10" />
      <div className="h-8 w-2/3 rounded-lg bg-white/60 dark:bg-white/10" />
      <p className="mt-auto text-[10px] opacity-60">{screen.label}</p>
    </div>
  );
}

type PhoneMockupProps = {
  screen: AppScreen;
  className?: string;
  priority?: boolean;
};

export function PhoneMockup({ screen, className, priority }: PhoneMockupProps) {
  // Your own images already include the phone frame, so render them as is
  if (screen.hasImage) {
    return (
      <Image
        src={screen.src}
        alt={`${screen.app} app, ${screen.label.toLowerCase()}`}
        width={0}
        height={0}
        sizes="(min-width: 640px) 240px, 200px"
        quality={90}
        unoptimized={TEST_UNOPTIMIZED}
        priority={priority}
        draggable={false}
        className={cn(
          "h-auto w-full select-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]",
          className,
        )}
      />
    );
  }

  // Placeholder: draw a simple frame until a real image is added
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] rounded-[2rem] border border-border bg-card p-1.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[1.6rem] bg-muted">
        <PlaceholderScreen screen={screen} />
        <div
          className="absolute top-2 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-black/90"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}