import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function TopicsAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".topic-node", {
      scale: 1.3,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      stagger: 0.2,
      ease: "sine.inOut",
    });

    gsap.fromTo(
      ".topic-line",
      { opacity: 0.2 },
      {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        stagger: 0.3,
      },
    );
  });

  return (
    <div
      ref={container}
      className="relative h-20 w-full flex items-center justify-center"
    >
      <div className="topic-line absolute w-24 h-px bg-purple-400 rotate-12" />
      <div className="topic-line absolute w-20 h-px bg-purple-400 -rotate-12" />
      <div className="topic-line absolute w-28 h-px bg-purple-400 rotate-45" />

      <div className="topic-node absolute w-3 h-3 bg-purple-400 rounded-full left-1/4" />
      <div className="topic-node absolute w-3 h-3 bg-purple-400 rounded-full right-1/4" />
      <div className="topic-node absolute w-3 h-3 bg-purple-400 rounded-full top-2" />
      <div className="topic-node absolute w-3 h-3 bg-purple-400 rounded-full bottom-2" />
      <div className="topic-node absolute w-4 h-4 bg-purple-500 rounded-full" />
    </div>
  );
}
