import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  highlight?: boolean;
  radius?: "md" | "lg";
  shine?: boolean;
  className?: string;
};

export function Card({
  children,
  tone = "light",
  highlight = false,
  radius = "md",
  shine = false,
  className = "",
}: CardProps) {
  const toneClasses =
    tone === "dark"
      ? highlight
        ? "border-transparent bg-gradient-to-b from-accent to-accent/80 text-black shadow-[0_40px_100px_-40px_rgba(255,106,0,0.5)]"
        : "border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] text-white backdrop-blur-xl"
      : "border-[#e8e8ed] bg-white text-carbon shadow-[0_1px_2px_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(0,0,0,0.06)]";

  const radiusClass = radius === "lg" ? "rounded-3xl" : "rounded-xl";

  return (
    <div
      className={`${radiusClass} border p-8 transition-all duration-300 hover:-translate-y-1 sm:p-9 ${
        shine ? "shine-card" : ""
      } ${toneClasses} ${className}`}
    >
      {children}
    </div>
  );
}
