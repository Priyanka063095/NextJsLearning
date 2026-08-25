import { UserRound, Boxes, Repeat, Clock, TriangleAlert, Radar } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureCard } from "./subcomponents/FeatureCard";

const CAPABILITIES = [
  {
    icon: UserRound,
    title: "Inventory Location Visibility",
    description:
      "Map inventory to warehouse zones, racks, bays and pallet positions so teams can quickly understand where stock is physically located.",
  },
  {
    icon: Boxes,
    title: "Pallet & Stock Mapping",
    description:
      "Connect pallets, SKUs and storage positions to create a structured inventory view across the warehouse.",
  },
  {
    icon: Repeat,
    title: "Inventory Reconciliation",
    description:
      "Compare physical stock with expected records and surface missing, excess, misplaced or mismatched inventory for action.",
  },
  {
    icon: Clock,
    title: "Inventory Aging Intelligence",
    description:
      "Identify aging, slow-moving and long-dwelling inventory by location, SKU or storage zone to support better stock rotation.",
  },
  {
    icon: TriangleAlert,
    title: "Exception & Discrepancy Detection",
    description:
      "Prioritise inventory mismatches, empty expected locations and unexpected stock positions instead of reviewing every location manually.",
  },
  {
    icon: Radar,
    title: "Drone & Automated Inventory Capture",
    description:
      "Extend inventory visibility using automated or drone-based capture for faster verification of pallet positions and high-bay storage locations.",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="rams-container bg-white pt-28 pb-28 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44">
      <Reveal className="mx-auto mb-20 max-w-[900px] text-center sm:mb-24">
        <Eyebrow className="mb-5">Capabilities</Eyebrow>
        <h2 className="text-[40px] leading-[1.0] font-bold tracking-[-0.04em] text-carbon sm:text-[60px] lg:text-[78px]">
          From stock visibility <br />
          <span className="text-graphite/50">to inventory control.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-graphite/65 sm:text-[15px]">
          RAMS connects inventory location, physical verification, reconciliation and analytics so
          teams can understand not only what stock exists, but where it is, how long it has been
          there and where discrepancies are building up.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08} className="h-full">
            <FeatureCard {...item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
