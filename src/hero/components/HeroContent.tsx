import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroContent() {
  const container = useRef(null);
  const title = "Intelligent text analysis";

  useGSAP(
    () => {
      gsap.fromTo(
        ".title-word",
        {
          opacity: 0,
          filter: "blur(20px)",
          y: 80,
          scale: 1.1,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-10 min-h-screen overflow-hidden isolate flex flex-col justify-center items-center text-center px-6"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white">
        {title.split(" ").map((word, i) => (
          <span key={i} className="title-word inline-block mr-4 opacity-0">
            {word}
          </span>
        ))}
      </h1>

      <p className="mt-6 text-white/80 max-w-xl">
        Intelligent text analysis helps you create summaries efficiently and
        understand fundamental topics.
      </p>
    </section>
  );
}
