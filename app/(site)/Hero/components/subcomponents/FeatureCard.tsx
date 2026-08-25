import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  number?: string;
  eyebrow?: string;
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  number,
  eyebrow,
}: FeatureCardProps) {
  return (
    <Card shine className="group flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.08] text-accent transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-[22px] w-[22px]" aria-hidden />
        </span>
        {number && (
          <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-zinc-400 uppercase">
            {number}
          </span>
        )}
      </div>
      <h3 className="text-[20px] leading-[1.2] font-semibold tracking-[-0.02em] text-carbon sm:text-[22px]">
        {title}
      </h3>
      {eyebrow && (
        <p className="mt-2 text-[14px] leading-[1.4] font-semibold text-accent">{eyebrow}</p>
      )}
      <p className="mt-3 text-[14.5px] leading-[1.6] text-graphite/65">{description}</p>
    </Card>
  );
}
