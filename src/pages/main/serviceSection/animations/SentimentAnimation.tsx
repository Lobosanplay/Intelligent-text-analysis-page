import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SentimentAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current!;

      const neutral =
        "M0 40 L20 40 L40 40 L60 40 L80 40 L100 40 L120 40 L140 40";

      const emotions = [
        "M0 40 L20 40 L40 28 L60 52 L80 40 L100 30 L120 48 L140 40",
        "M0 40 L20 40 L40 18 L60 65 L80 22 L100 60 L120 20 L140 40",
        "M0 40 L20 40 L40 45 L60 35 L80 48 L100 38 L120 42 L140 40",
      ];

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });

      emotions.forEach((shape) => {
        tl.to(path, {
          attr: { d: shape },
          duration: 0.9,
        }).to(path, {
          attr: { d: neutral },
          duration: 0.8,
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="relative h-20 w-full overflow-hidden">
      <svg
        viewBox="0 0 140 80"
        width="100%"
        height="80"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 40 L20 40 L40 40 L60 40 L80 40 L100 40 L120 40 L140 40"
          stroke="#a855f7"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
