import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

export default function ButtonLetsStarted() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const grad1 = useRef<HTMLDivElement>(null);
  const grad2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(grad1.current, {
      rotate: 360,
      duration: 14,
      ease: "none",
      repeat: -1,
    });

    gsap.to(grad2.current, {
      rotate: -360,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    const wrapper = wrapperRef.current!;
    const button = buttonRef.current!;

    const move = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);

      if (distance < 160) {
        gsap.to(button, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.4)",
        });
      }
    };

    const leave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1,0.4)",
      });
    };

    window.addEventListener("mousemove", move);
    wrapper.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      wrapper.removeEventListener("mouseleave", leave);
    };
  });

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center justify-center w-52 h-20 mt-10"
    >
      <button
        ref={buttonRef}
        className="
          relative overflow-hidden
          rounded-full
          border border-neutral-800
          bg-transparent
          px-6 py-4
          text-white font-semibold
          shadow-[0_0_30px_rgba(0,0,0,0.6)]
        "
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            ref={grad1}
            className="absolute inset-[-20%]"
            style={{
              background:
                "conic-gradient(from 0deg,rgba(168,85,247,0.55), rgba(168,85,247,0.15) 25%, transparent 40%, rgba(220,38,38,0.45) 65%, transparent 85%)",
              filter: "blur(18px)",
            }}
          />

          <div
            ref={grad2}
            className="absolute inset-[-20%]"
            style={{
              background:
                "conic-gradient(from 180deg, rgba(99,102,241,0.35), transparent 30%, rgba(147,51,234,0.4), transparent 60%)",
              filter: "blur(22px)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        <div className="absolute inset-[1.5px] rounded-full bg-black/60 backdrop-blur-sm" />

        <Link to="/login" className="relative z-10">
          Let's Started
        </Link>
      </button>
    </div>
  );
}
