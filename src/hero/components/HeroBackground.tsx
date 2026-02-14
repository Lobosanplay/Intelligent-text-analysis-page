import Stars from "../../shared/components/Stars";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroBackground() {
  useGSAP(() => {
    const orbs = gsap.utils.toArray<HTMLElement>(".orb");

    orbs.forEach((orb) => {
      const radius = gsap.utils.random(40, 120);
      const duration = gsap.utils.random(20, 40);

      gsap.to(orb, {
        rotation: 360,
        transformOrigin: `${radius}px ${radius}px`,
        duration,
        repeat: -1,
        ease: "none",
      });

      gsap.to(orb, {
        x: `+=${gsap.utils.random(-30, 30)}`,
        y: `+=${gsap.utils.random(-30, 30)}`,
        duration: duration / 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 backdrop-blur-[80px] bg-linear-to-b from-black/80 via-black/40 to-transparent" />

      <div className="relative w-full h-full">
        <div className="orb absolute top-[20%] left-[50%] -translate-x-1/2 w-225 h-225 bg-[radial-gradient(circle,#8b5cf680_0%,transparent_60%)] blur-[120px] opacity-50" />
        <div className="orb absolute top-[30%] right-[20%] w-175 h-175 bg-[radial-gradient(circle,#3b82f680_0%,transparent_65%)] blur-[100px] opacity-40" />
        <div className="orb absolute bottom-[10%] left-[30%] w-162.5 h-162.5 bg-[radial-gradient(circle,#ec489980_0%,transparent_65%)] blur-[90px] opacity-35" />

        <div className="orb absolute top-[40%] left-[20%] w-75 h-75 bg-[radial-gradient(circle,#06b6d480_0%,transparent_70%)] blur-[80px] opacity-20" />
        <div className="orb absolute bottom-[20%] right-[15%] w-87.5 h-87.5 bg-[radial-gradient(circle,#10b98180_0%,transparent_70%)] blur-[70px] opacity-20" />
        <div className="orb absolute top-[40%] left-[70%] w-62.5 h-62.5 bg-[radial-gradient(circle,#f59e0b80_0%,transparent_70%)] blur-[60px] opacity-15" />
      </div>

      <Stars numOfStart={100} />

      <div className="absolute top-140 left-1/2 -translate-x-1/2 w-[180vw] h-[70vh]">
        <div
          className="absolute inset-0 rounded-[100%] bg-[#0a0a0a]
          shadow-[inset_0_10px_60px_rgba(255,255,255,0.25),0_-40px_120px_rgba(255,255,255,0.2)]"
        />

        <div
          className="
          absolute left-1/2 -translate-x-1/2 top-0
          w-[60vw] h-12
          bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent)]
          blur-3xl
          mix-blend-screen
          opacity-80
        "
        />
      </div>
    </div>
  );
}
