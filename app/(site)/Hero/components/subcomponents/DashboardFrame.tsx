import type { ReactNode } from "react";

type DashboardFrameProps = {
  eyebrow: string;
  title: string;
  live?: boolean;
  liveLabel?: string;
  children: ReactNode;
};

export function DashboardFrame({
  eyebrow,
  title,
  live,
  liveLabel = "LIVE",
  children,
}: DashboardFrameProps) {
  return (
    <div
      className="rounded-[28px] border border-white/10 p-3.5"
      style={{
        background: "linear-gradient(rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        boxShadow:
          "0 60px 140px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 20px 60px -20px rgba(255,106,0,0.15)",
      }}
    >
      <div
        className="rounded-[18px] border border-white/[0.06]"
        style={{ background: "linear-gradient(180deg, #0A0F14 0%, #06090C 100%)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 pb-4 sm:p-8 sm:pb-6">
          <div>
            <p className="mb-1.5 font-mono text-[10.5px] font-bold tracking-[0.22em] text-white/45 uppercase">
              {eyebrow}
            </p>
            <h3 className="text-[18px] leading-[1.15] font-bold tracking-[-0.01em] text-white sm:text-[20px]">
              {title}
            </h3>
          </div>
          {live && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10.5px] font-bold tracking-[0.14em]"
              style={{ background: "rgba(43,203,116,0.13)", color: "#54DE91" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2BCB74" }} />
              {liveLabel}
            </span>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
