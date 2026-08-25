import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StatCard } from "./subcomponents/StatCard";

const RESULTS = [
  {
    value: "99%",
    label: "Inventory Accuracy",
    description:
      "Physical counts reconciled against system records with sub-1% variance across every site.",
    source: "CH Robinson",
  },
  {
    value: "$1.2M",
    label: "Working Capital Freed",
    description:
      "Aging and slow-moving stock exposure reduced, releasing working capital in the first year of rollout.",
    source: "Kellanova",
  },
  {
    value: "75%",
    label: "Faster Cycle Counts",
    description:
      "Guided rack-level verification cut cycle-count time from hours to minutes for warehouse teams.",
    source: "DHL Supply Chain",
  },
  {
    value: "60%",
    label: "Fewer Discrepancies",
    description:
      "Location-level reconciliation removed phantom-stock and misplacement discrepancies at source.",
    source: "Kuehne+Nagel",
  },
  {
    value: "0",
    label: "Reconciliation Backlog",
    description:
      "Continuous reconciliation eliminated the month-end backlog for the operations team across facilities.",
    source: "Toll Group",
  },
  {
    value: "100%",
    label: "Location Visibility",
    description:
      "Every rack, bay and zone digitally identified — a single source of truth for stock location.",
    source: "GXO",
  },
];

export function ProvenResults() {
  return (
    <section
      id="proven-results"
      className="py-28 sm:py-36 lg:py-44"
      style={{ background: "rgba(247, 242, 232, 0.3)" }}
    >
      <div className="rams-container">
        <Reveal className="mx-auto mb-20 max-w-225 text-center sm:mb-24">
          <Eyebrow className="mb-5">Proven Results</Eyebrow>
          <h2 className="text-[40px] leading-none font-bold tracking-[-0.04em] text-carbon sm:text-[60px] lg:text-[78px]">
            Real outcomes from <br />
            <span className="text-graphite/50">real deployments.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-220 text-[14px] leading-[1.55] text-graphite/65 sm:text-[15px]">
            Global operations teams trust RAMS Inventory Intelligence to protect accuracy, working
            capital and reconciliation performance across their networks.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((result, index) => (
            <Reveal key={result.label} delay={index * 0.06} className="h-full">
              <StatCard {...result} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
