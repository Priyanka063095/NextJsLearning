import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardFrame } from "./subcomponents/DashboardFrame";

const CHART_PATH =
  "M0,180 C90,165 140,175 210,145 C300,105 350,130 430,105 C520,82 575,98 650,68 C735,38 790,62 900,52";

const STAT_TILES = [
  { label: "Inventory Accuracy", value: "98.2%", accent: true },
  { label: "Locations Verified", value: "1,842" },
  { label: "Open Exceptions", value: "12" },
  { label: "Aging Exposure", value: "7.4%" },
];

export function AnalyticsLayer() {
  return (
    <section
      id="analytics-layer"
      className="relative overflow-hidden text-white"
      style={{
        background: "radial-gradient(80% 100% at 50% 100%, #1D1D1F 0%, #0E0E0F 60%, #08080A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[720px] w-[720px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(255,106,0,0.18), transparent 70%)",
        }}
      />
      <div className="rams-container relative py-28 sm:py-36 lg:py-44">
        <Reveal className="mx-auto mb-16 max-w-[1180px] text-center sm:mb-20">
          <Eyebrow className="mb-5">Analytics Layer</Eyebrow>
          <h2 className="text-[36px] leading-[1.05] font-bold tracking-[-0.04em] sm:text-[54px] lg:text-[68px]">
            <span className="block text-white sm:whitespace-nowrap">
              See inventory accuracy, aging
            </span>
            <span
              className="block sm:whitespace-nowrap"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              and exceptions in one view.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-white/60 sm:text-[15px]">
            Go beyond static stock counts. Analyse discrepancy trends, aging exposure, location
            utilisation and reconciliation performance across warehouse zones and sites.
          </p>
        </Reveal>

        <Reveal delay={0.15} y={32} className="mx-auto max-w-[1240px]">
          <DashboardFrame
            eyebrow="Inventory Intelligence Overview"
            title="Warehouse Inventory Dashboard"
            live
            liveLabel="RECONCILIATION ACTIVE"
          >
            <div className="grid grid-cols-2 gap-3 px-6 pb-5 sm:px-8 lg:grid-cols-4">
              {STAT_TILES.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
                  }}
                >
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    {stat.label}
                  </span>
                  <p
                    className={`mt-1.5 text-[24px] leading-none font-bold tracking-[-0.025em] tabular-nums sm:text-[28px] ${
                      stat.accent ? "text-accent" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-6 mb-6 sm:mx-8 sm:mb-8">
              <div
                className="relative h-[220px] overflow-hidden rounded-xl border border-white/[0.06] sm:h-[260px]"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "100% 48px, 72px 100%",
                }}
              >
                <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-white/60 uppercase">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    Accuracy
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-[0.16em] text-white/60 uppercase">
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                    WMS baseline
                  </div>
                </div>
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 900 260"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="inv-chart-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#FF6A00" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#FF6A00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,150 L900,150"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                  <path d={CHART_PATH} fill="none" stroke="#FF6A00" strokeWidth="3" />
                  <path
                    d={`${CHART_PATH} L900,260 L0,260 Z`}
                    fill="url(#inv-chart-fill)"
                  />
                </svg>
              </div>
            </div>
          </DashboardFrame>
        </Reveal>
      </div>
    </section>
  );
}
