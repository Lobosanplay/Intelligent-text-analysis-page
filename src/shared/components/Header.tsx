import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Header() {
  const data = ["Services", "Plans", "About", "Why Us", "FAQs"];
  const [scrolled, setScrolled] = useState(false);

  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!borderRef.current) return;

    gsap.to(borderRef.current, {
      rotate: 360,
      duration: 6,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <header
      className={`fixed flex top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
        ${scrolled ? "px-6 py-3" : "px-16 py-6"}
      `}
    >
      <div
        className={`relative flex flex-none items-center rounded-full
          ${scrolled ? "bg-black gap-10 border border-gray-800" : "bg-transparent gap-70"}
          transition-all duration-500 px-2 py-2`}
      >
        <span className="text-white font-bold text-xl">Logo</span>

        <nav className="flex items-center">
          {data.map((item, index) => (
            <NavItem key={index} label={item} />
          ))}
        </nav>

        <NeonButton />
      </div>
    </header>
  );
}

function NavItem({ label }: { label: string }) {
  const bgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const scaleTo = gsap.quickTo(el, "scaleX", {
      duration: 0.3,
      ease: "power3.out",
    });

    const opacityTo = gsap.quickTo(el, "opacity", {
      duration: 0.25,
      ease: "power3.out",
    });

    const parent = el.parentElement!;

    const enter = () => {
      scaleTo(1);
      opacityTo(1);
    };

    const leave = () => {
      scaleTo(0);
      opacityTo(0);
    };

    parent.addEventListener("pointerenter", enter);
    parent.addEventListener("pointerleave", leave);

    return () => {
      parent.removeEventListener("pointerenter", enter);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a
      href={`#${label.toLowerCase().replace(/\s/g, "-")}`}
      className="relative px-4 py-2 text-white overflow-hidden"
    >
      <span
        ref={bgRef}
        className="absolute inset-0 bg-white/10 rounded-full origin-left scale-x-0 opacity-0 pointer-events-none"
      />

      <span className="relative z-10">{label}</span>
    </a>
  );
}

function NeonButton() {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(borderRef.current, {
      rotate: 360,
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <button className="relative rounded-full overflow-hidden px-0.5 py-0.5">
      <div
        ref={borderRef}
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #a855f7, transparent 40%)",
          filter: "blur(1.5px)",
        }}
      />

      <span className="relative block bg-black text-white font-bold px-6 py-2 rounded-full hover:bg-neutral-900 transition">
        Lets Started
      </span>
    </button>
  );
}
