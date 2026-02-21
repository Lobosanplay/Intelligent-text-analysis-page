import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function DashboardAnimation() {
  useGSAP(() => {
    gsap.to(".dash-bar", {
      height: "random(20,60)",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      stagger: 0.15,
      ease: "sine.inOut",
    });
  });

  return (
    <div className="flex items-end gap-2 h-16">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="dash-bar w-3 bg-purple-400/70 rounded" />
      ))}
    </div>
  );
}
