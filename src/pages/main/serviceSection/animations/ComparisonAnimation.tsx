import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function ComparisonAnimation() {
  useGSAP(() => {
    gsap.to(".compare-bar", {
      x: 20,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
      stagger: 0.2,
    });
  });

  return (
    <div className="space-y-2">
      <div className="compare-bar h-2 bg-purple-400/60 rounded w-3/4" />
      <div className="compare-bar h-2 bg-white/20 rounded w-2/3" />
      <div className="compare-bar h-2 bg-purple-400/60 rounded w-4/5" />
    </div>
  );
}
