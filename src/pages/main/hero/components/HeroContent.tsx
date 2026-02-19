import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ButtonLetsStarted from "./ButtomLetsStarted";

export default function HeroContent() {
  const container = useRef(null);
  const title = "Intelligent text analysis";
  const desc =
    "Intelligent text analysis helps you create summaries efficiently and understand fundamental topics.";
  useGSAP(
    () => {
      gsap.fromTo(
        ".appearing",
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
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
        {title.split(" ").map((word, i) => (
          <span key={i} className="appearing inline-block mr-4 opacity-0">
            {word}
          </span>
        ))}
      </h1>

      <p className="mt-6 text-white/80 max-w-xl text-sm lg:text-xl">
        {desc.split(" ").map((word, i) => (
          <span key={i} className="appearing inline-block mr-2 opacity-0">
            {word}
          </span>
        ))}
      </p>

      <ButtonLetsStarted />
    </section>
  );
}
