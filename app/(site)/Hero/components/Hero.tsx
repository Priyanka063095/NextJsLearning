import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DashboardFrame } from "./subcomponents/DashboardFrame";
import rackVisibility from "@/assets/rack-visibility.svg";

const HERO_TAGS = ["Inventory visibility", "Reconciliation intelligence", "Exception-led control"];

const RECONCILIATION_FEED = [
  { id: "P-102384", location: "B-04-12", status: "OK" as const },
  { id: "P-102385", location: "B-04-13", status: "OK" as const },
  { id: "P-102386", location: "C-05-07", status: "PHANTOM" as const },
  { id: "P-102387", location: "B-05-01", status: "OK" as const },
  { id: "P-102388", location: "B-05-02", status: "OK" as const },
  { id: "P-102389", location: "C-07-03", status: "MISPLACED" as const },
  { id: "P-102390", location: "B-06-08", status: "OK" as const },
  { id: "P-102391", location: "B-07-04", status: "OK" as const },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white"
      style={{
        background: "radial-gradient(80% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 55%, #08080A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 20%, rgba(255,106,0,0.22), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      />

      <div className="rams-container relative pt-40 pb-24 sm:pt-48 sm:pb-32 lg:pt-56 lg:pb-40">
        <Reveal className="mx-auto max-w-[1080px] text-center">
          <Badge>Inventory Intelligence</Badge>
          <h1 className="mt-8 text-[56px] leading-[0.98] font-bold tracking-[-0.045em] sm:text-[84px] lg:text-[112px]">
            <span className="block text-white">Know what you have.</span>
            <span
              className="block"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Know where it is.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-white/60 sm:text-[15px]">
            RAMS turns inventory movement, location and reconciliation data into a connected
            intelligence layer — helping warehouse teams improve stock visibility, accuracy, aging
            control and inventory productivity.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {HERO_TAGS.map((tag) => (
              <Badge key={tag} size="sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="#cta" icon>
              Assess My Inventory
            </Button>
            <Button href="#capabilities" variant="outline">
              Explore Capabilities
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2} y={32} className="relative mx-auto mt-20 max-w-[1240px] sm:mt-24">
          <DashboardFrame eyebrow="Inventory Twin · Sydney DC" title="Zone B — reconciliation live" live>
            <div className="flex flex-wrap items-center gap-2 px-6 pb-5 sm:gap-3 sm:px-8 sm:pb-6">
              {[
                { label: "Accuracy", value: "98.2%", accent: true },
                { label: "Exceptions", value: "12" },
                { label: "Aging", value: "7.4%" },
              ].map((stat) => (
                <span
                  key={stat.label}
                  className="inline-flex items-baseline gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
                >
                  <span className="font-mono text-[9px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    {stat.label}
                  </span>
                  <span
                    className={`text-[13px] font-bold tracking-[-0.01em] tabular-nums sm:text-[14px] ${
                      stat.accent ? "text-accent" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </span>
                </span>
              ))}
            </div>

            <div className="mx-4 mb-6 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:mx-8 sm:mb-8 sm:grid-cols-[1.55fr_1fr] sm:gap-6">
              <div
                className="relative overflow-hidden rounded-xl border border-white/10 p-3.5 sm:p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/45 uppercase">
                    Rack Visibility · Aisle B-04
                  </p>
                  <div className="flex items-center gap-3 font-mono text-[9px] font-bold tracking-[0.14em] text-white/55 uppercase">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-sm bg-accent" /> Exception
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-sm bg-white/40" /> Pallet
                    </span>
                  </div>
                </div>
                <div className="relative aspect-400/240 w-full">
                  <Image
                    src={rackVisibility}
                    alt=""
                    aria-hidden
                    fill
                    priority
                    sizes="(min-width: 640px) 60vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs font-medium text-accent">
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
                  Exception · B-04 · L1 · Slot 4 — phantom stock
                </p>
              </div>

              <div
                className="relative h-56 overflow-hidden rounded-xl border border-white/10 sm:h-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/6 px-4 pt-4 pb-3 sm:px-5">
                    <p className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/45 uppercase">
                      Reconciliation Feed
                    </p>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-[0.14em] text-white/55 uppercase">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                      Streaming
                    </span>
                  </div>
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    <div className="ticker-track flex flex-col">
                      {[...RECONCILIATION_FEED, ...RECONCILIATION_FEED].map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex h-10.5 items-center gap-2.5 border-b border-white/4 px-4 sm:px-5"
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                              item.status === "OK"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-accent/20 text-accent"
                            }`}
                          >
                            {item.status === "OK" ? "✓" : "!"}
                          </span>
                          <span className="flex-1 truncate font-mono text-[10.5px] font-semibold text-white tabular-nums">
                            {item.id}
                          </span>
                          <span className="font-mono text-[9.5px] text-white/50 tabular-nums">
                            {item.location}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-4"
                      style={{ background: "linear-gradient(to bottom, #06090C, transparent)" }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-6"
                      style={{ background: "linear-gradient(to top, #06090C, transparent)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DashboardFrame>
        </Reveal>
      </div>
    </section>
  );
}
