import { Card } from "@/components/ui/Card";

type StatCardProps = {
  value: string;
  label: string;
  description: string;
  source: string;
};

export function StatCard({ value, label, description, source }: StatCardProps) {
  return (
    <Card shine className="flex h-full flex-col">
      <div
        className="text-[44px] leading-[0.95] font-bold tracking-[-0.035em] tabular-nums sm:text-[52px]"
        style={{
          backgroundImage: "linear-gradient(135deg, #FF6A00 0%, #FF8A3C 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {value}
      </div>
      <p className="mt-4 font-mono text-[11px] font-bold tracking-[0.18em] text-carbon uppercase">
        {label}
      </p>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-graphite/65">{description}</p>
      <p className="mt-6 border-t border-[#e8e8ed] pt-5 font-mono text-[11px] font-semibold tracking-[0.14em] text-graphite/50 uppercase">
        {source}
      </p>
    </Card>
  );
}
