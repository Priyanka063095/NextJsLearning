import { Boxes, Warehouse, ChartLine, ShieldCheck } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "./subcomponents/FeatureCard";

const AUDIENCES = [
  {
    icon: Boxes,
    title: "For inventory teams",
    eyebrow: "Find discrepancies faster.",
    description:
      "Prioritise reconciliation and reduce time spent searching for missing or misplaced stock across the warehouse.",
  },
  {
    icon: Warehouse,
    title: "For warehouse operations",
    eyebrow: "Better put-away and retrieval.",
    description:
      "Improve pallet-flow decisions with clearer location, occupancy and movement visibility across every zone.",
  },
  {
    icon: ChartLine,
    title: "For management",
    eyebrow: "Every site on one view.",
    description:
      "Track inventory accuracy, aging exposure and unresolved exceptions across warehouses from a common framework.",
  },
  {
    icon: ShieldCheck,
    title: "For audit & control",
    eyebrow: "Stronger traceability, always.",
    description:
      "Build audit-grade traceability around physical stock verification, reconciliation history and exception closure.",
  },
];

export function AudienceGrid() {
  return (
    <section id="audience" className="rams-container bg-white py-28 sm:py-36 lg:py-44">
      <Reveal className="mx-auto mb-20 max-w-[900px] text-center sm:mb-24">
        <Eyebrow className="mb-5">Operational Value</Eyebrow>
        <h2 className="text-[40px] leading-[1.0] font-bold tracking-[-0.04em] text-carbon sm:text-[60px] lg:text-[78px]">
          Inventory intelligence <br />
          <span className="text-graphite/50">for every decision layer.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-graphite/65 sm:text-[15px]">
          RAMS gives different teams the same inventory truth — without forcing them to work from
          disconnected spreadsheets, physical counts and isolated system records.
        </p>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCES.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="h-full">
            <FeatureCard {...item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
