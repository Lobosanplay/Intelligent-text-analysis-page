import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const TOPICS = [
  "AI",
  "Machine Learning",
  "Finance",
  "Healthcare",
  "Marketing",
  "Startups",
  "Politics",
  "Technology",
  "Education",
  "Data Science",
  "Climate",
  "Security",
  "Automation",
  "Productivity",
  "Economy",
  "Innovation",
];

export default function TopicsAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current!;
      const doc = root.querySelector(".doc-icon") as HTMLElement;

      const pulseDocument = () => {
        gsap.fromTo(
          doc,
          {
            scale: 1,
            filter: "drop-shadow(0 0 0px rgba(168,85,247,0))",
          },
          {
            scale: 1.08,
            filter: "drop-shadow(0 0 8px rgba(168,85,247,0.7))",
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          },
        );
      };

      const spawnTopics = () => {
        const rect = doc.getBoundingClientRect();
        const parentRect = root.getBoundingClientRect();

        const startX = rect.right - parentRect.left + 18;
        const startY = rect.top - parentRect.top + rect.height / 2 - 8;

        const maxWidth = root.offsetWidth - startX - 12;

        const shuffled = [...TOPICS].sort(() => Math.random() - 0.5);
        const count = Math.random() > 0.5 ? 2 : 1;
        const batch = shuffled.slice(0, count);

        const created: HTMLElement[] = [];
        let currentOffset = 0;

        batch.forEach((topic, i) => {
          const el = document.createElement("div");
          el.textContent = topic;

          el.className =
            "absolute text-[10px] px-2 py-1 rounded-md bg-purple-400/20 border border-purple-400/30 text-purple-200 opacity-0 whitespace-nowrap";

          root.appendChild(el);
          created.push(el);

          const width = el.offsetWidth;

          if (currentOffset + width > maxWidth) {
            el.remove();
            return;
          }

          gsap.set(el, {
            x: startX + currentOffset,
            y: startY,
          });

          gsap.delayedCall(i * 0.2, pulseDocument);

          gsap.to(el, {
            opacity: 1,
            y: startY - 2,
            duration: 0.5,
            ease: "power2.out",
            delay: i * 0.2,
          });

          currentOffset += width + 6;
        });

        gsap.delayedCall(1.6, () => {
          gsap.to(created, {
            opacity: 0,
            y: "-=6",
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => created.forEach((el) => el.remove()),
          });
        });
      };

      const tl = gsap.timeline({ repeat: -1 });
      tl.call(spawnTopics).to({}, { duration: 2.4 });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative w-full h-full overflow-hidden rounded-lg bg-white/5 border border-white/10 p-3"
    >
      <svg
        className="doc-icon absolute left-2 top-1/2 -translate-y-1/2"
        width="34"
        height="42"
        viewBox="0 0 40 48"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="46"
          rx="6"
          stroke="#a855f7"
          strokeWidth="2"
        />
        <line x1="8" y1="14" x2="32" y2="14" stroke="#a855f7" />
        <line x1="8" y1="22" x2="28" y2="22" stroke="#a855f7" />
        <line x1="8" y1="30" x2="24" y2="30" stroke="#a855f7" />
      </svg>

      <p className="absolute left-17 top-7 lg:top-4 text-[9px] tracking-widest text-purple-300/70">
        EXTRACTION
      </p>
    </div>
  );
}
