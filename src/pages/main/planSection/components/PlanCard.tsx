import { useState } from "react";

export interface PlanCardProps {
  title: string;
  version: "Free" | "Starter" | "Premium";
  pricePerMonth?: number;
  pricePerYear?: number;
  description: string;
  included: string[];
  highlighted?: boolean;
}

export default function PlanCard({
  title,
  version,
  pricePerMonth,
  pricePerYear,
  description,
  included,
  highlighted,
}: PlanCardProps) {
  const [priceYear, setPriceYear] = useState(false);

  const isPremium = version === "Premium";

  return (
    <article
      className={`
        relative flex flex-col justify-between
        w-full max-w-sm rounded-2xl
        bg-black border overflow-hidden
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        ${
          highlighted
            ? "border-purple-500 shadow-purple-500/20"
            : "border-neutral-800 hover:border-neutral-600"
        }
      `}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition pointer-events-none bg-linear-to-b from-white/5 to-transparent" />

      <div
        className="relative p-4 mt-2 flex flex-col w-[95%] m-auto
        rounded-2xl space-y-6
        bg-linear-to-br from-purple-900/40 via-purple-950/20 to-transparent
        border border-purple-500/20"
      >
        <div
          className="
           absolute inset-0 rounded-2xl
           bg-linear-to-b from-white/5 to-transparent
           pointer-events-none
         "
        />

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-white leading-tight">
            {title}
            <span className="block text-sm text-neutral-400 font-normal">
              {version} Plan
            </span>
          </h3>

          {isPremium && (
            <div className="flex gap-1 bg-neutral-900 p-1 rounded-full shrink-0">
              <button
                onClick={() => setPriceYear(false)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  !priceYear
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setPriceYear(true)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  priceYear
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-white text-4xl font-bold">
            {pricePerMonth !== undefined && (
              <>
                ${isPremium && priceYear ? pricePerYear : pricePerMonth}
                <span className="text-neutral-400 text-lg font-normal ml-1">
                  {isPremium && priceYear ? "/year" : "/month"}
                </span>
              </>
            )}
          </div>

          <p className="text-neutral-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="p-8 flex flex-col grow">
        <span className="text-neutral-300 text-sm">What's included</span>

        <ul className="mt-4 space-y-3 grow">
          {included.map((item, index) => (
            <li
              key={index}
              className="text-neutral-400 text-sm flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              {item}
            </li>
          ))}
        </ul>

        <button
          className={`
            mt-8 py-3 rounded-xl font-semibold transition
            ${
              highlighted
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-neutral-900 hover:bg-neutral-800 text-white"
            }
          `}
        >
          Get Started
        </button>
      </div>
    </article>
  );
}
