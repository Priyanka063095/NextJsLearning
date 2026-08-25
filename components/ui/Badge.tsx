import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  size?: "default" | "sm";
  className?: string;
};

export function Badge({ children, size = "default", className = "" }: BadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-[10.5px] tracking-[0.22em]"
      : "px-3.5 py-1.5 text-[11px] tracking-[0.18em]";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 font-mono font-semibold text-white/70 uppercase backdrop-blur ${sizeClasses} ${className}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </span>
  );
}
