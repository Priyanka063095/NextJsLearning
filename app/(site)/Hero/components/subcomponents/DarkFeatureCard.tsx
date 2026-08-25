"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

type DarkFeatureCardProps = {
  label: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
  percent: number;
  highlight?: boolean;
};

export function DarkFeatureCard({
  label,
  title,
  description,
  statLabel,
  statValue,
  percent,
  highlight = false,
}: DarkFeatureCardProps) {
  return (
    <Card
      tone="dark"
      highlight={highlight}
      radius="lg"
      className="flex h-full min-h-[420px] flex-col"
    >
      <p
        className={`flex items-center gap-2 font-mono text-[10.5px] font-semibold tracking-[0.22em] uppercase ${
          highlight ? "text-black/85" : "text-white/75"
        }`}
      >
        <span className={`h-[7px] w-[7px] rounded-full ${highlight ? "bg-black" : "bg-accent"}`} />
        {label}
      </p>
      <div className="mt-5 flex flex-col gap-4">
        <h3 className="text-[24px] leading-[1.15] font-bold tracking-[-0.02em] sm:text-[26px]">
          {title}
        </h3>
        <p
          className={`text-[14.5px] leading-[1.65] ${highlight ? "text-black/70" : "text-white/60"}`}
        >
          {description}
        </p>
      </div>
      <div className="mt-auto pt-6">
        <div
          className={`rounded-[14px] p-4 ${
            highlight ? "border border-black/15 bg-white/25" : "border border-white/10 bg-black/25"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-[13px] font-medium ${highlight ? "text-black/75" : "text-white/65"}`}
            >
              {statLabel}
            </span>
            <span
              className={`text-[14px] font-bold tabular-nums ${highlight ? "text-black" : "text-white"}`}
            >
              {statValue}
            </span>
          </div>
          <div
            className={`mt-2.5 h-2 overflow-hidden rounded-full ${
              highlight ? "bg-black/15" : "bg-white/10"
            }`}
          >
            <motion.div
              className={`h-full rounded-full ${highlight ? "bg-black" : "bg-accent"}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
