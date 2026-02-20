import { useRef } from "react";
import Stars from "./Stars";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const wrappers = gsap.utils.toArray<HTMLElement>(".orbit");

    wrappers.forEach((orb) => {
      const moveOrb = () => {
        const radius = gsap.utils.random(60, 140);
        const angle = gsap.utils.random(0, Math.PI * 2);

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.to(orb, {
          x: `+=${x}`,
          y: `+=${y}`,
          duration: gsap.utils.random(18, 35),
          ease: "sine.inOut",
          onComplete: moveOrb,
        });
      };

      gsap.delayedCall(gsap.utils.random(0, 5), moveOrb);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 backdrop-blur-[80px] bg-linear-to-b from-black/80 via-black/40 to-transparent" />

      <div className="relative w-full h-full">
        <div className="orbit absolute top-[18%] left-1/2 -translate-x-1/2">
          <div className="w-225 h-225 bg-[radial-gradient(circle,#8b5cf680_0%,transparent_60%)] blur-[120px] opacity-50" />
        </div>

        <div className="orbit absolute top-[35%] right-[22%]">
          <div className="w-175 h-175 bg-[radial-gradient(circle,#3b82f680_0%,transparent_65%)] blur-[100px] opacity-40" />
        </div>

        <div className="orbit absolute bottom-[18%] left-[32%]">
          <div className="w-162.5 h-162.5 bg-[radial-gradient(circle,#ec489980_0%,transparent_65%)] blur-[90px] opacity-35" />
        </div>

        <div className="orbit absolute top-[45%] left-[22%]">
          <div className=" w-75 h-75 bg-[radial-gradient(circle,#06b6d480_0%,transparent_70%)] blur-[80px] opacity-20" />
        </div>

        <div className="orbit absolute bottom-[25%] right-[18%]">
          <div className="w-87.5 h-87.5 bg-[radial-gradient(circle,#10b98180_0%,transparent_70%)] blur-[70px] opacity-20" />
        </div>

        <div className="orbit absolute top-[42%] left-[68%]">
          <div className="w-62.5 h-62.5 bg-[radial-gradient(circle,#f59e0b80_0%,transparent_70%)] blur-[60px] opacity-15" />
        </div>
      </div>

      <Stars numOfStart={100} />

      <div className="absolute top-128 left-1/2 -translate-x-1/2 w-400 lg:w-[140vw] h-screen">
        <div
          className="
              absolute inset-0 rounded-[100%] scale-y-[0.857] scale-x-[0.85] bottom-10
              bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.35)_20%,rgba(255,255,255,0)_55%)]
              opacity-full
              pointer-events-none
            "
        />
        <div
          className="absolute inset-0 rounded-[100%] scale-y-[0.85] scale-x-[0.9] bg-[#0A0A0A]
          shadow-[inset_0_2px_20px_rgb(255,255,255),0_-10px_50px_rgba(255,255,255,0.49)]"
        />

        <div
          className="
            absolute left-1/2 -translate-x-1/2 -top-4
            w-[60vw] h-12
            bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent)]
            blur-3xl
            mix-blend-screen
            opacity-80
          "
        />
      </div>
      <div className="absolute inset-0 flex w-full justify-between pointer-events-none z-10 overflow-hidden">
        <div
          className="
            w-[50%] h-full shrink-0
            bg-[linear-gradient(90deg,#0A0A0A,transparent)]
          "
        />

        <div
          className="
            w-[50%] h-full shrink-0
            bg-[linear-gradient(270deg,#0A0A0A,transparent)]
          "
        />
      </div>
    </div>
  );
}
