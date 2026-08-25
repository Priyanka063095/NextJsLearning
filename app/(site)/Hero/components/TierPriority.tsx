import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TierCard } from "./subcomponents/TierCard";

const TIERS = [
  {
    letter: "A",
    tierLabel: "Tier 1 · Highest Priority",
    intensity: 3,
    title: "High-value / Critical Inventory",
    description:
      "Items requiring the strongest visibility and tighter operational control because they contribute the highest value or business impact.",
    bullets: [
      "Higher cycle-count frequency",
      "Stricter location accuracy",
      "Closer aging & exception monitoring",
    ],
    accent: "orange" as const,
  },
  {
    letter: "B",
    tierLabel: "Tier 2 · Balanced Control",
    intensity: 2,
    title: "Moderate-value Inventory",
    description:
      "Items that need balanced control — regular verification and replenishment visibility without the same intensity as A-class inventory.",
    bullets: ["Periodic cycle counting", "Movement & dwell-time monitoring", "Exception-based review"],
    accent: "indigo" as const,
  },
  {
    letter: "C",
    tierLabel: "Tier 3 · Simplified Control",
    intensity: 1,
    title: "Lower-value / High-volume Inventory",
    description:
      "Items that may represent a larger number of SKUs but comparatively lower inventory value, allowing simpler control policies.",
    bullets: [
      "Simplified counting strategy",
      "Bulk movement visibility",
      "Space & replenishment optimisation",
    ],
    accent: "emerald" as const,
  },
];

export function TierPriority() {
  return (
    <section
      id="abc-analysis"
      className="relative overflow-hidden text-white"
      style={{
        background: "radial-gradient(90% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 60%, #08080A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 -left-40 h-[720px] w-[720px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(255,106,0,0.14), transparent 70%)",
        }}
      />
      <div className="rams-container relative py-28 sm:py-36 lg:py-44">
        <Reveal className="mx-auto mb-20 max-w-[900px] text-center sm:mb-24">
          <Eyebrow className="mb-5">ABC Inventory Analysis</Eyebrow>
          <h2 className="text-[40px] leading-[1.0] font-bold tracking-[-0.04em] sm:text-[60px] lg:text-[78px]">
            <span className="text-white">Focus attention</span> <br />
            <span
              className="whitespace-nowrap"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              where value matters most.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-white/60 sm:text-[15px]">
            Classify inventory into A, B and C categories using consumption value, movement and
            business criticality — so teams apply the right level of control, cycle counting and
            replenishment attention.
          </p>
        </Reveal>
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {TIERS.map((tier, index) => (
            <Reveal key={tier.letter} delay={index * 0.1} className="h-full">
              <TierCard {...tier} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
