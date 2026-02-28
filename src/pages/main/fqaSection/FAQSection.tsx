import FAQItem from "./comoponents/FaqItem";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is the AI Intelligence Layer?",
      answer:
        "It is a system that transforms documents, audio, and video into structured insights using artificial intelligence. Instead of manually reviewing files, the platform automatically generates summaries, extracts topics, and analyzes sentiment.",
    },
    {
      question: "What types of files can I analyze?",
      answer:
        "You can upload text documents, audio recordings, and video files. The platform processes the content and converts it into readable insights and structured information.",
    },
    {
      question: "How fast are the analysis results?",
      answer:
        "Most analyses are generated within seconds depending on file size. The goal of the platform is to reduce hours of manual review into instant understanding.",
    },
    {
      question: "What features are currently available?",
      answer:
        "The current MVP includes automatic summaries, topic extraction, and basic sentiment analysis. File comparison and advanced automation workflows are planned for future releases.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Your files are processed securely and are only used to generate analysis results. We are building the platform with privacy and secure storage practices as a priority.",
    },
    {
      question: "Who is this platform for?",
      answer:
        "Researchers, creators, businesses, and teams who need to quickly understand large amounts of content without manually reviewing every file.",
    },
  ];

  return (
    <section
      id="faqs"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-28"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
        Frequently Asked Questions
      </h2>

      <p className="text-neutral-400 mt-4 text-center max-w-2xl">
        Everything you need to know about how our AI transforms documents and
        media into actionable insights.
      </p>

      <div className="mt-14 w-full max-w-lg space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}
