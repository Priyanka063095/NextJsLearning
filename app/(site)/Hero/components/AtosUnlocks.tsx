import { ChartColumn, Waypoints, Layers } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "./subcomponents/FeatureCard";

const UNLOCKS = [
  {
    icon: ChartColumn,
    number: "01",
    title: "Measure pallet movement frequency",
    description:
      "See how many times each pallet is moved over a day, shift or selected period. High-frequency movement can reveal fast-moving inventory, unnecessary re-handling and avoidable touchpoints.",
  },
  {
    icon: Waypoints,
    number: "02",
    title: "Understand where every pallet moves",
    description:
      "Track the sequence of locations a pallet passes through during the day — from storage to staging, picking, dispatch or another rack position — to identify inefficient movement patterns.",
  },
  {
    icon: Layers,
    number: "03",
    title: "Smarter Storage Height Decisions",
    description:
      "Frequently accessed A-class inventory can be evaluated for lower, faster-to-reach storage positions, while slower-moving stock can be considered for higher levels — supporting safer and more efficient slotting decisions.",
  },
];

export function AtosUnlocks() {
  return (
    <section className="bg-[#F5F5F7] py-28 sm:py-36 lg:py-44">
      <div className="rams-container">
        <Reveal className="mb-10 flex items-center gap-4">
          <Eyebrow className="shrink-0">What ATOS Unlocks</Eyebrow>
          <span
            aria-hidden
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,106,0,0.35) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)",
            }}
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UNLOCKS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <FeatureCard {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
