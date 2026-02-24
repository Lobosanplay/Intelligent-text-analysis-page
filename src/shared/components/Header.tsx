import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Header() {
  const data = ["Services", "Plans", "About", "Why Us", "FAQs"];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const menu = mobileMenuRef.current;

    if (!container || !menu) return;

    if (menuOpen) {
      gsap.set(menu, { display: "flex" });

      const fullHeight = container.scrollHeight;

      gsap.to(container, {
        height: fullHeight,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.35,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    } else {
      gsap.to(container, {
        height: 48,
        duration: 0.35,
        ease: "power2.inOut",
      });

      gsap.to(menu, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          gsap.set(menu, { display: "none", opacity: 1 });
        },
      });
    }
  }, [menuOpen]);

  return (
    <header
      className={`
        fixed top-6 z-50 transition-all duration-500
        w-full md:w-auto px-4
        md:left-1/2 md:-translate-x-1/2
        ${scrolled ? "md:px-10 md:py-4" : "md:px-16 md:py-6"}
      `}
    >
      <div
        ref={containerRef}
        className={`
          relative flex flex-col md:flex-row md:items-center md:justify-center
          rounded-2xl md:rounded-full transition-all duration-500
          px-4 py-2 md:px-12 md:py-8 bg-black border border-gray-800
          ${
            scrolled
              ? "md:bg-black md:gap-10 md:border md:border-gray-800"
              : "md:bg-transparent md:gap-20 lg:gap-50 lg:justify-between md:border-transparent"
          }
        `}
      >
        <span className="text-white font-bold text-xl">Logo</span>

        <nav className="hidden md:flex md:flex-none items-center">
          {data.map((item, index) => (
            <NavItem key={index} label={item} />
          ))}
        </nav>

        <div className="flex flex-none">
          <div className="md:hidden absolute top-2 right-5">
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>

          <div className="hidden md:block">
            <NeonButton />
          </div>
        </div>
        <div
          ref={mobileMenuRef}
          className="hidden flex-col items-center justify-center gap-4 pt-4 pb-2"
        >
          {data.map((item, i) => (
            <a
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-white text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}

          <NeonButton />
        </div>
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

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-8 h-8 ml-10 flex flex-col justify-center items-center gap-1"
    >
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          open ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </button>
  );
}
