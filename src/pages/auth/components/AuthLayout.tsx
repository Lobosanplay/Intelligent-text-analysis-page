import { type ReactNode, useRef } from "react";
import AuthBackground from "./AuthBackground";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: Props) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      textRef.current?.children || [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <AuthBackground />
      <Link
        to="/"
        className="absolute top-6 left-6 z-500 text-sm text-neutral-400 hover:text-white transition"
      >
        ← Back to home
      </Link>
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-8 min-h-screen">
        <div className="flex col-span-5 items-center justify-center px-6">
          <div ref={textRef} className="max-w-lg z-20 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white leading-tight">
              {title}
            </h1>

            <p className="mt-6 text-neutral-400 text-lg">{subtitle}</p>
          </div>
        </div>

        <div className="absolute left-[20%] top-[30%] w-125 h-125 bg-purple-500/20 blur-[140px] rounded-full opacity-60" />
        <div className="absolute left-[10%] bottom-[20%] w-100 h-100 bg-blue-500/20 blur-[120px] rounded-full opacity-50" />
        <div className="relative z-10 col-span-3 flex items-center justify-center px-6 lg:px-16">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </section>
  );
}
