// "use client";

// import { useEffect, useRef } from "react";
// import { ReactLenis } from "lenis/react";
// import { frame, cancelFrame } from "framer-motion";
// import "lenis/dist/lenis.css";

// export default function SmoothScroll({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const lenisRef = useRef<any>(null);

//   useEffect(() => {
//     const update = ({ timestamp }: { timestamp: number }) => {
//       lenisRef.current?.lenis?.raf(timestamp);
//     };

//     frame.setup(update, true);

//     return () => cancelFrame(update);
//   }, []);

//   return (
//     <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
//       {children}
//     </ReactLenis>
//   );
// }

"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}