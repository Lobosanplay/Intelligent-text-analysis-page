import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SummaryAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = gsap.utils.toArray<HTMLElement>(".summary-line");

      const widths = ["92%", "78%", "60%", "38%"];

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.6,
      });

      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { width: "0%" },
          {
            width: widths[i],
            duration: 2,
            ease: "power2.out",
          },
          i * 0.25,
        );
      });

      tl.set(lines, {
        width: "0%",
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="space-y-2 w-full">
      <div className="summary-line h-2 bg-purple-400/50 rounded" />
      <div className="summary-line h-2 bg-white/40 rounded" />
      <div className="summary-line h-2 bg-white/30 rounded" />
      <div className="summary-line h-2 bg-white/20 rounded" />
    </div>
  );
}
