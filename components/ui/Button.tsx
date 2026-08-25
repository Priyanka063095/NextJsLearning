import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-white text-black hover:-translate-y-px hover:bg-white/90",
    outline: "border border-white/15 text-white hover:bg-white/[0.06]",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      )}
    </Link>
  );
}
