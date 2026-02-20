import FeatureCard from "./components/FeatureCard";

// Temporaly section
export default function About() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-3xl space-y-6">
        <p className="text-sm tracking-widest text-purple-400 uppercase">
          About the platform
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Intelligent analysis for text, audio and video content
        </h2>

        <p className="text-white/70 text-lg leading-relaxed">
          Intelligent Text Analysis is a SaaS platform designed to transform
          unstructured content into actionable insights. Upload documents,
          recordings or videos and instantly obtain summaries, sentiment
          analysis, topic extraction and structured information ready to use.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        <FeatureCard
          title="Automatic Summaries"
          desc="Generate concise summaries from long documents, meetings or multimedia content in seconds."
        />

        <FeatureCard
          title="Sentiment Analysis"
          desc="Understand emotional tone and contextual meaning across conversations, reviews or reports."
        />

        <FeatureCard
          title="Topic Extraction"
          desc="Identify key themes and important concepts automatically using advanced NLP models."
        />

        <FeatureCard
          title="Scalable Insights"
          desc="Build dashboards, compare files and unlock deeper analytics as new features evolve."
        />
      </div>
    </section>
  );
}
