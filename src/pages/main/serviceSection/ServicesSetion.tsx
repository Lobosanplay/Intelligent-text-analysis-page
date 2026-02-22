import ServiceCard from "./components/ServicesCard";

export default function Services() {
  return (
    <section
      id="services"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28"
    >
      <div className="max-w-7xl w-full flex flex-col items-center text-center space-y-6">
        <p className="text-sm tracking-widest text-purple-400 uppercase">
          Services
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Powerful AI tools to understand your content
        </h2>

        <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
          Our platform analyzes text, audio and video using advanced artificial
          intelligence models to transform raw information into clear,
          structured and actionable insights.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full auto-rows-[260px]">
          <ServiceCard
            size="large"
            type="summary"
            title="Content Summarization"
            desc="Generate accurate summaries from long documents, audio recordings and video content instantly."
          />

          <ServiceCard
            size="large"
            type="media"
            title="Audio & Video Analysis"
            desc="Automatically process multimedia files to extract meaning, structure conversations and identify important moments."
          />

          <ServiceCard
            size="normal"
            type="sentiment"
            title="Sentiment Analysis"
            desc="Detect emotional tone and opinion trends across conversations, feedback and large datasets."
          />

          <ServiceCard
            size="normal"
            type="topics"
            title="Topic Extraction"
            desc="Identify key themes, concepts and recurring subjects using advanced NLP techniques."
          />

          <ServiceCard
            size="normal"
            type="dashboard"
            title="Insight Dashboards"
            desc="Transform processed data into structured insights ready for visualization and decision-making."
          />

          <ServiceCard
            size="normal"
            type="comparison"
            title="File Comparison"
            desc="Compare documents and transcripts to detect differences, similarities and contextual changes."
          />
        </div>
      </div>
    </section>
  );
}
