import { Reveal } from "@/components/ui/Reveal";

const HERO_STATS = [
  {
    value: "100",
    suffix: "%",
    label: "Location Visibility",
    description: "Know where inventory sits across every rack, bay and zone.",
  },
  {
    value: "98",
    suffix: "%+",
    label: "Inventory Accuracy",
    description: "Physical counts reconciled against expected system records.",
  },
  {
    value: "RAG",
    suffix: "",
    label: "Aging Signal",
    description: "Slow-moving and aging stock surfaced before it becomes exposure.",
  },
  {
    value: "1",
    suffix: "",
    label: "Control Layer",
    description: "Discrepancies, exceptions and reconciliation in one place.",
  },
];

export function HeroStats() {
  return (
    <section
      aria-label="Key inventory metrics"
      className="relative border-t border-white/10 text-white"
      style={{ background: "#08080A" }}
    >
      <div className="rams-container relative grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {HERO_STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06} className="px-6 py-10 sm:px-8 sm:py-12">
            <p className="text-[30px] leading-[1.0] font-bold tracking-[-0.02em] tabular-nums sm:text-[34px] lg:text-[38px]">
              {stat.value}
              <span className="text-[18px] font-semibold text-white/50 sm:text-[20px]">
                {stat.suffix}
              </span>
            </p>
            <p className="mt-4 text-[15px] font-bold tracking-[-0.01em] text-white sm:text-[16px]">
              {stat.label}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5] text-white/50 sm:text-[14px]">
              {stat.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
