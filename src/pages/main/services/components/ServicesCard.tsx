import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import SummaryAnimation from "../animations/SummaryAnimation";
import SentimentAnimation from "../animations/SentimentAnimation";
import TopicsAnimation from "../animations/TopicsAnimation";
import MediaAnalysisAnimation from "../animations/MediaAnalysisAnimation";
import ComparisonAnimation from "../animations/ComparisonAnimation";
import DashboardAnimation from "../animations/DashboardAnimation";

type ServiceType =
  | "summary"
  | "sentiment"
  | "topics"
  | "media"
  | "comparison"
  | "dashboard";

interface Props {
  title: string;
  desc: string;
  type: ServiceType;
  size: "large" | "normal";
}

export default function ServiceCard({
  title,
  desc,
  type,
  size = "normal",
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(el, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 0 60px rgba(168,85,247,0.35)",
      duration: 0.35,
      ease: "power2.out",
    });

    el.addEventListener("mouseenter", () => tl.play());
    el.addEventListener("mouseleave", () => tl.reverse());
  });

  const renderAnimation = () => {
    switch (type) {
      case "summary":
        return <SummaryAnimation />;
      case "sentiment":
        return <SentimentAnimation />;
      case "topics":
        return <TopicsAnimation />;
      case "media":
        return <MediaAnalysisAnimation />;
      case "comparison":
        return <ComparisonAnimation />;
      case "dashboard":
        return <DashboardAnimation />;
    }
  };

  const sizeClasses = {
    large: "md:col-span-2",
    wide: "md:col-span-2",
    normal: "",
  };

  return (
    <div
      ref={cardRef}
      className={`
        ${sizeClasses[size]}
        group relative rounded-2xl border border-gray-700
        bg-black/40 backdrop-blur-xl
        p-8 text-left transition-all duration-300
        flex flex-col justify-between
        overflow-hidden
      `}
    >
      {renderAnimation()}

      <div className="text-left space-y-2">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
