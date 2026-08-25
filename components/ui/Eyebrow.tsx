import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[11px] font-semibold tracking-[0.22em] text-accent uppercase ${className}`}
    >
      {children}
    </p>
  );
}
