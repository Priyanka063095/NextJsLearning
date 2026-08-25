import Link from "next/link";
import { Globe, ShieldCheck } from "lucide-react";
import type { SVGProps } from "react";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-.98 1.83-2.02 3.77-2.02 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.94-3.06-1.95 0-2.25 1.44-2.25 2.96V21h-4V9Z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.11.38-2.02 1-2.74-.1-.26-.44-1.31.1-2.72 0 0 .82-.27 2.7 1.05a9.14 9.14 0 0 1 4.92 0c1.87-1.32 2.69-1.05 2.69-1.05.54 1.41.2 2.46.1 2.72.62.72 1 1.63 1 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.94 4.75 12 4.75 12 4.75s-5.94 0-7.64.49a2.75 2.75 0 0 0-1.94 1.95A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .42 4.81c.24.97.98 1.7 1.94 1.95 1.7.49 7.64.49 7.64.49s5.94 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.42-4.81ZM10 15.02V8.98L15.5 12 10 15.02Z" />
    </svg>
  );
}

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Solutions",
    links: [
      "Rack Intelligence",
      "MHE Intelligence",
      "Inventory Intelligence",
      "Warehouse Execution",
      "Management Intelligence",
    ],
  },
  {
    title: "Platform",
    links: [
      "Digital Twin",
      "AI Operational Intelligence",
      "Execution Engine",
      "Integrations",
      "Security",
    ],
  },
  {
    title: "Hardware",
    links: ["AI Cameras", "OmniBox Edge", "OmniBox AI", "LiDAR", "Driver Monitoring"],
  },
  {
    title: "Industries",
    links: ["3PL & Logistics", "Retail & E-commerce", "Manufacturing", "Cold Chain", "Automotive"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Newsroom", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Case Studies", "Whitepapers", "Blog", "Support"],
  },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Use", "Cookies", "Accessibility", "Sitemap"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex flex-col leading-none text-white">
              <span className="text-xl font-extrabold tracking-tight">
                RAMS<span className="text-accent">.</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] text-zinc-400">
                DIGITAL
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Operational intelligence for the modern warehouse. Engineering, AI and real-time
              visibility — unified in one platform.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: LinkedinIcon, label: "LinkedIn" },
                { icon: GithubIcon, label: "GitHub" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-3 lg:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-white">{column.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href={column.title === "Resources" && link === "Blog" ? "/blog" : "#"}
                        className="text-sm text-zinc-400 hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
              <ShieldCheck className="h-4 w-4" />
              Trust &amp; Security
            </p>
            <p className="text-base font-semibold text-white">
              Enterprise-grade security, audited and certified.
            </p>
            <p className="max-w-md text-sm text-zinc-400">
              RAMS meets the security, privacy and reliability standards trusted by global
              enterprise operations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {["SOC 2", "SOC 2 · TYPE I"].map((label) => (
              <div
                key={label}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-white/15 text-center text-[9px] font-bold text-zinc-300"
              >
                <span>AICPA</span>
                <span className="text-accent">SOC 2</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} RAMS Global. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {LEGAL_LINKS.map((label) => (
              <Link
                key={label}
                href={label === "Sitemap" ? "/sitemap.xml" : "#"}
                className="hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            United Kingdom (EN)
          </p>
        </div>
      </div>
    </footer>
  );
}
