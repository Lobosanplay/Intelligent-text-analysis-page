import { useState } from "react";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: el.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <div className="border border-neutral-800 rounded-xl bg-black/60 backdrop-blur-sm overflow-hidden transition hover:border-purple-500/60">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left p-5"
      >
        <span className="text-white font-medium">{question}</span>

        <span
          className={`text-purple-400 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: 0 }}
        className="overflow-hidden px-5"
      >
        <p className="pb-5 text-neutral-400 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
