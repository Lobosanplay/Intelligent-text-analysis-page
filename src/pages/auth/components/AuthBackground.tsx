import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function AuthBackground() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const STAR_COUNT = isMobile ? 25 : 250;

  useGSAP(() => {
    const orbs = gsap.utils.toArray<HTMLElement>(".auth-orb");
    const driftX = gsap.utils.random(-80, 80);
    const driftY = gsap.utils.random(-60, 60);

    orbs.forEach((orb) => {
      gsap.to(orb, {
        x: driftX,
        y: driftY,
        duration: "random(12, 25)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  useGSAP(() => {
    const stars = gsap.utils.toArray<HTMLElement>(".auth-star");

    stars.forEach((star) => {
      const driftX = gsap.utils.random(-180, 180);
      const driftY = gsap.utils.random(-160, 160);

      gsap.to(star, {
        x: driftX,
        y: driftY,
        opacity: gsap.utils.random(0.4, 1),
        duration: gsap.utils.random(12, 18),
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  });

  return (
    <div ref={containerRef} className="absolute inset-1 overflow-hidden">
      <div
        className={`
          absolute top-0 h-full overflow-hidden
          ${isMobile ? "w-full" : "left-0 w-full"}
        `}
      >
        <div
          className={`auth-orb absolute top-[20%] left-full w-72 h-72 bg-purple-500/50 ${isMobile ? "blur-[60px]" : "blur-[120px]"} opacity-80 mix-blend-screen rounded-full`}
        />
        <div className="auth-orb absolute top-[50%] left-[60%] w-64 h-64 bg-blue-500/30 blur-[110px] rounded-full" />
        <div className="auth-orb absolute bottom-[20%] left-[40%] w-80 h-80 bg-pink-500/20 blur-[130px] rounded-full" />

        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/90" />

        {[...Array(STAR_COUNT)].map((_, i) => (
          <div
            key={i}
            className="auth-star absolute z-0 size-0.5 blur-10 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
            }}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-l from-black via-black/90 to-transparent" />
      </div>
    </div>
  );
}
