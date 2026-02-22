import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export default function MediaAnalysisAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bars = gsap.utils.toArray<HTMLElement>(".media-bar");
    const scan = ".scan-line";

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.out" },
    });

    tl.fromTo(
      bars,
      {
        opacity: 0,
        height: 5,
      },
      {
        opacity: 1,
        height: "random(15,40)",
        stagger: {
          each: 0.03,
          yoyo: true,
        },
        ease: "sine.inOut",
        duration: 0.5,
      },
    );

    tl.fromTo(
      scan,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: container.current!.offsetWidth,
        duration: 3,
        ease: "none",
      },
      "<1",
    );

    tl.to(bars, {
      opacity: 0,
      height: 5,
      stagger: 0.01,
      duration: 0.5,
    });

    tl.to(scan, {
      opacity: 0,
      duration: 0.3,
    });

    tl.to({}, { duration: 2 });
  });

  return (
    <div
      ref={container}
      className="relative w-full h-20 overflow-hidden rounded-lg bg-white/5 border border-white/10 flex items-end gap-0.5 px-2"
    >
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="media-bar w-3 bg-purple-400/70 rounded-sm opacity-0"
        />
      ))}

      <div className="scan-line absolute inset-y-0 w-12 opacity-0 bg-linear-to-r from-transparent via-purple-400/40 to-transparent" />
    </div>
  );
}
