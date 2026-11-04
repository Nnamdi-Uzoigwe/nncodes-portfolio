import { useEffect, useRef } from "react";

 export default function FluidWord({ word }: { word: string }) {
  const letters = word.split("");
   const refs = useRef<(HTMLSpanElement | null)[]>([]);
   const pointerX = useRef<number | null>(null);

   useEffect(() => {
     const reduce = window.matchMedia(
       "(prefers-reduced-motion: reduce)"
     ).matches;

     const weights = letters.map(() => 600);
     let time = 0;
     let frame = 0;

     const handlePointerMove = (event: PointerEvent) => {
       pointerX.current = event.clientX;
     };

     const handlePointerLeave = () => {
       pointerX.current = null;
     };

     window.addEventListener("pointermove", handlePointerMove);
     window.addEventListener("pointerleave", handlePointerLeave);

     const tick = () => {
       time += 0.035;

       refs.current.forEach((letter, index) => {
         if (!letter) return;

         let target = 600;

         if (!reduce) {
           if (pointerX.current !== null) {
             const rect = letter.getBoundingClientRect();
             const center = rect.left + rect.width / 2;
             const distance = Math.abs(pointerX.current - center);

            //   Closest letter becomes boldest.
             target = 800 - Math.min(distance / 180, 1) * 550;
           } else {
            //   Idle wave when the cursor is away.
             target = 500 + Math.sin(time + index * 0.8) * 280;
           }
         }

         weights[index] += (target - weights[index]) * 0.12;

         letter.style.fontVariationSettings = `"wght" ${Math.round(
           weights[index]
         )}`;
       });

       frame = requestAnimationFrame(tick);
     };

     frame = requestAnimationFrame(tick);

     return () => {
       cancelAnimationFrame(frame);
       window.removeEventListener("pointermove", handlePointerMove);
       window.removeEventListener("pointerleave", handlePointerLeave);
     };
   }, [letters.length]);

   return (
     <span
       className="font-body cursor-default py-2 text-[5.75rem] leading-[0.85] tracking-[-0.04em] text-[#5b1f5e] select-none sm:text-[2rem] md:text-[9rem]"
       aria-label={word}
     >
       {letters.map((letter, index) => (
         <span
           key={`${letter}-${index}`}
           aria-hidden
           ref={(el) => {
             refs.current[index] = el;
           }}
           className="inline-block"
           style={{ fontVariationSettings: '"wght" 600' }}
         >
           {letter}
         </span>
       ))}
     </span>
   );
 }