type TierAccent = "orange" | "indigo" | "emerald";

type TierCardProps = {
  letter: string;
  tierLabel: string;
  intensity: number;
  title: string;
  description: string;
  bullets: string[];
  accent: TierAccent;
};

const ACCENT: Record<
  TierAccent,
  { line: string; badgeBg: string; badgeText: string; label: string; dot: string }
> = {
  orange: {
    line: "#FF6A00",
    badgeBg: "linear-gradient(135deg, #FFE1CC 0%, #FFC79A 100%)",
    badgeText: "#B14700",
    label: "#FF6A00",
    dot: "#FF6A00",
  },
  indigo: {
    line: "#4A8BE8",
    badgeBg: "linear-gradient(135deg, #DDEAFF 0%, #B3D0FF 100%)",
    badgeText: "#1F5CB2",
    label: "#4A8BE8",
    dot: "#4A8BE8",
  },
  emerald: {
    line: "#2FA76A",
    badgeBg: "linear-gradient(135deg, #D4F1E1 0%, #A4E2BE 100%)",
    badgeText: "#146F42",
    label: "#2FA76A",
    dot: "#2FA76A",
  },
};

export function TierCard({
  letter,
  tierLabel,
  intensity,
  title,
  description,
  bullets,
  accent,
}: TierCardProps) {
  const c = ACCENT[accent];

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.016) 100%)",
        boxShadow: "0 40px 100px -40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
      }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 h-[3px]" style={{ background: c.line }} />
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <div className="mb-8 flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[28px] font-extrabold"
            style={{ background: c.badgeBg, color: c.badgeText }}
          >
            {letter}
          </div>
          <div className="min-w-0">
            <div
              className="font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase"
              style={{ color: c.label }}
            >
              {tierLabel}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {Array.from({ length: 3 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: index < intensity ? c.dot : "rgba(255,255,255,0.12)" }}
                />
              ))}
              <span className="ml-1.5 font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
                Control intensity
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-[22px] leading-[1.2] font-bold tracking-[-0.02em] sm:text-[24px]">
          {title}
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.65] text-white/60">{description}</p>

        <ul className="mt-8 space-y-3 border-t border-white/[0.06] pt-8">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-[13.5px] leading-[1.5] text-white/75">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: c.dot }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
