import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden text-white"
      style={{
        background: "radial-gradient(80% 100% at 50% 100%, #1D1D1F 0%, #0E0E0F 55%, #08080A 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[560px]"
        style={{
          background: "radial-gradient(60% 60% at 50% 100%, rgba(255,106,0,0.22), transparent 70%)",
        }}
      />
      <div className="rams-container relative py-28 sm:py-36 lg:py-44">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <Badge>Better visibility. Better inventory decisions.</Badge>
          <h2 className="mt-8 text-[44px] leading-[0.98] font-bold tracking-[-0.045em] sm:text-[72px] lg:text-[96px]">
            <span className="block text-white">Make inventory visible,</span>
            <span
              className="block"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              accurate and actionable.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-[880px] text-[14px] leading-[1.55] text-white/60 sm:text-[15px]">
            Talk to RAMS Digital about inventory mapping, reconciliation, aging intelligence and
            automated inventory visibility for your warehouse network.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="mailto:hello@rams.digital" icon>
              Assess My Inventory
            </Button>
            <Button href="mailto:sales@rams.digital" variant="outline">
              Talk to sales
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
