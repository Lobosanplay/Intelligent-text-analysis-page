export default function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <article
      className="
        group relative
        rounded-2xl
        border border-white/10
        bg-white/3
        backdrop-blur-md
        p-6
        text-left
        transition-all duration-300
        hover:border-purple-400/40
        hover:bg-white/6
      "
    >
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>

      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-linear-to-br from-purple-500/10 to-transparent" />
    </article>
  );
}
