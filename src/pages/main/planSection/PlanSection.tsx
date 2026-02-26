import PlanCard from "./components/PlanCard";
import type { PlanCardProps } from "./components/PlanCard";

export default function PlanSection() {
  const data: PlanCardProps[] = [
    {
      title: "Explorer",
      version: "Free",
      pricePerMonth: 0,
      description:
        "Start analyzing documents and media files with essential AI insights.",
      included: [
        "Text file analysis",
        "Automatic summaries",
        "Basic topic extraction",
        "Basic sentiment analysis",
        "Limited monthly usage",
        "Community support",
      ],
    },
    {
      title: "Creator",
      version: "Starter",
      pricePerMonth: 9,
      description:
        "For creators and professionals who need deeper insights and higher limits.",
      included: [
        "Text + audio/video processing",
        "Extended summaries",
        "Advanced topic extraction",
        "Improved sentiment analysis",
        "Higher monthly usage limits",
        "Analysis history",
        "Priority processing",
      ],
    },
    {
      title: "Intelligence",
      version: "Premium",
      pricePerMonth: 19,
      pricePerYear: 180,
      description:
        "Advanced AI analysis and automation for teams and growing businesses.",
      included: [
        "Unlimited analysis (fair use)",
        "Multi-file comparison (coming soon)",
        "AI-powered document insights",
        "Workflow automation",
        "Faster processing queue",
        "API access (future-ready)",
        "Priority support",
        "Early access to new AI features",
      ],
      highlighted: true,
    },
  ];

  return (
    <section
      id="plans"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28 bg-black"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
        Choose your plan
      </h2>

      <p className="text-neutral-400 mt-4 text-center max-w-xl">
        From simple summaries to intelligent document workflows — grow at your
        own pace.
      </p>
      <div className="mt-16 grid gap-8 w-full max-w-sm md:max-w-4xl lg:max-w-6xl md:grid-cols-2 lg:grid-cols-3">
        {data.map((plan, index) => (
          <PlanCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
}
