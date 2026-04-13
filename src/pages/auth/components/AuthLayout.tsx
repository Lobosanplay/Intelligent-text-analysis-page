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
        className="absolute top-6 left-6 z-50 text-sm text-neutral-400 hover:text-white transition"
      >
        ← Back to home
      </Link>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-8 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 pt-24 pb-10 lg:pt-0 lg:pb-0 lg:col-span-4">
          <div ref={textRef} className="max-w-lg text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>

            <p className="mt-3 md:mt-4 lg:mt-6 text-neutral-400 text-sm md:text-base lg:text-lg">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 pb-12 lg:pb-0 lg:px-16 lg:col-span-4">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <div className="absolute left-[10%] top-[20%] w-72 h-72 md:w-96 md:h-96 bg-purple-500/20 blur-[100px] md:blur-[140px] rounded-full opacity-50" />
        <div className="absolute left-[5%] bottom-[10%] w-64 h-64 md:w-80 md:h-80 bg-blue-500/20 blur-[80px] md:blur-[120px] rounded-full opacity-40" />
      </div>
    </section>
  );
}
