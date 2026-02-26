import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  const description =
    "Intelligent Text Analysis is a SaaS platform designed to transform unstructured content into actionable insights. Upload documents, recordings or videos and instantly obtain summaries, sentiment analysis, topic extraction and structured information ready to use.";

  const lines = useMemo(() => {
    const words = description.split(" ");

    const pattern = [6, 12, 12, 10, 6];

    const result: string[][] = [];
    let index = 0;

    for (const size of pattern) {
      if (index >= words.length) break;
      result.push(words.slice(index, index + size));
      index += size;
    }

    if (index < words.length) {
      result.splice(Math.floor(result.length / 2), 0, words.slice(index));
    }

    return result;
  }, []);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".about-char");

      gsap.fromTo(
        chars,
        {
          opacity: 0.2,
          color: "#6b7280",
          textShadow: "0 0 0 rgba(168,85,247,0)",
        },
        {
          opacity: 1,
          color: "#ffffff",
          textShadow: "0 0 14px rgba(168,85,247,0.45)",
          stagger: 0.015,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 40%",
            end: "bottom 100%",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      id="about"
      ref={container}
      className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="flex flex-col items-center gap-2 max-w-5xl">
        <p className="text-sm tracking-widest text-purple-400 uppercase mb-8">
          About the platform
        </p>

        <div className="flex flex-col items-center leading-10 text-3xl md:text-4xl font-bold text-center">
          {lines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="flex flex-wrap justify-center gap-x-2"
            >
              {line.map((word, i) => (
                <span key={i} className="flex">
                  {word.split("").map((char, j) => (
                    <span key={j} className="about-char whitespace-pre">
                      {char}
                    </span>
                  ))}
                  <span className="about-char whitespace-pre"> </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
