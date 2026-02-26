import CardInfo from "./components/CardInfo";
export default function WhyUsSection() {
  const data = [
    {
      title: "Built for analysis",
      description:
        "Designed specifically to transform files into structured intelligence.",
    },
    {
      title: "Instant understanding",
      description:
        "Get summaries, topics, and sentiment analysis automatically.",
    },
    {
      title: "Save hours of work",
      description: "Skip manual reading and extract insights in seconds.",
    },
    {
      title: "Ready to scale",
      description: "Grow from simple analysis to automated AI workflows.",
    },
  ];

  return (
    <section
      id="why-us"
      className="
        relative z-10
        min-h-screen
        flex flex-col items-center justify-center
        px-6 py-28
      "
    >
      <div className="text-center max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Why Choose Us
        </h2>

        <p className="text-neutral-400 mt-5 text-lg">
          Turn documents, audio, and video into clear insights — instantly and
          without complexity.
        </p>
      </div>

      <div
        className="
          mt-16
          grid gap-8
          w-full max-w-5xl
          grid-cols-1 md:grid-cols-2
        "
      >
        {data.map((item, index) => (
          <CardInfo
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
