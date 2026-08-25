import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DarkFeatureCard } from "./subcomponents/DarkFeatureCard";

const CARDS = [
  {
    label: "Inventory Visibility",
    title: "See inventory by location, not just by quantity.",
    description:
      "Connect stock with zones, racks, bays and pallet positions so teams can understand exactly where inventory is stored.",
    statLabel: "Location mapping",
    statValue: "96%",
    percent: 96,
  },
  {
    label: "Reconciliation Intelligence",
    title: "Turn stock mismatches into clear actions.",
    description:
      "Compare physical inventory with expected records and focus teams on missing, misplaced or excess stock.",
    statLabel: "Inventory accuracy",
    statValue: "98.2%",
    percent: 98,
    highlight: true,
  },
  {
    label: "Aging & Exceptions",
    title: "Find the inventory that needs attention first.",
    description:
      "Surface aging stock, long dwell time and recurring discrepancies before they affect space, working capital or service levels.",
    statLabel: "Exceptions resolved",
    statValue: "84%",
    percent: 84,
  },
];

export function InventoryControlDark() {
  return (
    <section
      id="inventory-control"
      className="relative overflow-hidden text-white"
      style={{
        background: "radial-gradient(80% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 60%, #08080A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 20%, rgba(255,106,0,0.14), transparent 70%)",
        }}
      />
      <div className="rams-container relative py-28 sm:py-36 lg:py-44">
        <Reveal className="mx-auto mb-20 max-w-[900px] text-center sm:mb-24">
          <Eyebrow className="mb-5">Inventory Control</Eyebrow>
          <h2 className="text-[40px] leading-[1.0] font-bold tracking-[-0.04em] sm:text-[60px] lg:text-[78px]">
            <span className="text-white">See it clearly.</span> <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Reconcile it continuously.
            </span>
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {CARDS.map((card, index) => (
            <Reveal key={card.label} delay={index * 0.1} className="h-full">
              <DarkFeatureCard {...card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
