interface CardInfoProps {
  title: string;
  description: string;
}

export default function CardInfo({ title, description }: CardInfoProps) {
  return (
    <div
      className="
        group relative w-full
        rounded-2xl p-8
        bg-black border border-neutral-800
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:border-purple-500/70
        hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.25)]
        overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0 opacity-0
          group-hover:opacity-100
          transition duration-500
          bg-linear-to-b from-white/5 via-transparent to-transparent
          pointer-events-none
        "
      />

      <div
        className="
          w-10 h-10 mb-6 rounded-lg
          bg-neutral-900 border border-neutral-700
          flex items-center justify-center
          text-purple-400
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        ✦
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
        {title}
      </h3>

      <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  );
}
