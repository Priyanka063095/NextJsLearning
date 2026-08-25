"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Menu, Search, X } from "lucide-react";

type MenuColumn = {
  heading: string;
  items: { label: string; href: string }[];
};

type MegaMenu = {
  columns: MenuColumn[];
  promo: { eyebrow: string; title: string; href: string };
  viewAllHref: string;
};

type NavLink = {
  label: string;
  href: string;
  menu?: MegaMenu;
};

const NAV_LINKS: NavLink[] = [
  {
    label: "Solutions",
    href: "/#capabilities",
    menu: {
      columns: [
        {
          heading: "Capabilities",
          items: [
            { label: "Inventory Location Visibility", href: "/#capabilities" },
            { label: "Pallet & Stock Mapping", href: "/#capabilities" },
            { label: "Inventory Reconciliation", href: "/#capabilities" },
          ],
        },
        {
          heading: "More",
          items: [
            { label: "Inventory Aging Intelligence", href: "/#capabilities" },
            { label: "Exception & Discrepancy Detection", href: "/#capabilities" },
            { label: "Drone & Automated Capture", href: "/#capabilities" },
          ],
        },
      ],
      promo: { eyebrow: "Capabilities", title: "Explore every capability", href: "/#capabilities" },
      viewAllHref: "/#capabilities",
    },
  },
  {
    label: "Platform",
    href: "/#analytics-layer",
    menu: {
      columns: [
        {
          heading: "Platform",
          items: [
            { label: "Analytics Layer", href: "/#analytics-layer" },
            { label: "Inventory Control", href: "/#inventory-control" },
            { label: "ABC Tier Priority", href: "/#abc-analysis" },
          ],
        },
      ],
      promo: { eyebrow: "Live Dashboard", title: "See the platform in action", href: "/#analytics-layer" },
      viewAllHref: "/#analytics-layer",
    },
  },
  { label: "Hardware", href: "#" },
  { label: "Services", href: "#" },
  {
    label: "Industries",
    href: "/#audience",
    menu: {
      columns: [
        {
          heading: "By team",
          items: [
            { label: "Inventory Teams", href: "/#audience" },
            { label: "Warehouse Operations", href: "/#audience" },
            { label: "Management", href: "/#audience" },
            { label: "Audit & Control", href: "/#audience" },
          ],
        },
      ],
      promo: {
        eyebrow: "Operational Value",
        title: "Inventory intelligence for every team",
        href: "/#audience",
      },
      viewAllHref: "/#audience",
    },
  },
  {
    label: "Resources",
    href: "/blog",
    menu: {
      columns: [
        {
          heading: "Learn",
          items: [
            { label: "Latest Insights", href: "/#insights" },
            { label: "All Articles", href: "/blog" },
          ],
        },
      ],
      promo: { eyebrow: "Blog", title: "Read the latest insight", href: "/blog" },
      viewAllHref: "/blog",
    },
  },
  {
    label: "Company",
    href: "/#proven-results",
    menu: {
      columns: [
        {
          heading: "Company",
          items: [
            { label: "Proven Results", href: "/#proven-results" },
            { label: "About", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Contact", href: "/#cta" },
          ],
        },
      ],
      promo: {
        eyebrow: "Proven Results",
        title: "Real outcomes from real deployments",
        href: "/#proven-results",
      },
      viewAllHref: "/#proven-results",
    },
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hidden, setHidden] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      const id = window.setTimeout(() => setOverHero(false), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: "-140px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 80) {
          setHidden(false);
        } else if (delta > 4) {
          setHidden(true);
          setActiveMenu(null);
        } else if (delta < -4) {
          setHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openMenu(label: string) {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(label);
  }

  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  }

  const panelOpen = activeMenu !== null;
  const activeLink = NAV_LINKS.find((link) => link.label === activeMenu);
  const dark = overHero && !panelOpen;

  return (
    <header
      onMouseEnter={() => setHeaderHovered(true)}
      onMouseLeave={() => setHeaderHovered(false)}
      className={`sticky top-0 z-50 text-white transition-transform duration-300 ease-out ${
        hidden && !headerHovered ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="hidden items-center justify-between gap-4 border-b border-white/5 bg-zinc-950 px-6 py-2 text-[12.5px] text-white/60 sm:flex">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-white/45">
            <Globe className="h-3.5 w-3.5" aria-hidden />
            GLOBAL
          </span>
          {showAnnouncement && (
            <p className="font-medium tracking-wide">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
              Introducing RAMS AI Vision — Intelligent Warehouse Perception
            </p>
          )}
        </div>
        <div className="flex items-center gap-5 font-mono text-[11px] font-medium tracking-wide">
          <button type="button" className="flex items-center gap-1 hover:text-white">
            English
            <ChevronDown className="h-3 w-3" aria-hidden />
          </button>
          <Link href="/#cta" className="hover:text-white">
            Contact
          </Link>
          <Link href="/blog" className="hover:text-white">
            Support
          </Link>
          <Link
            href="/#cta"
            className="rounded-full border border-white/15 px-2.5 py-0.5 font-semibold text-white/75 hover:border-white/30 hover:text-white"
          >
            Platform Login
          </Link>
          {showAnnouncement && (
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setShowAnnouncement(false)}
              className="text-white/45 hover:text-white"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
        </div>
      </div>

      <div
        onMouseLeave={scheduleClose}
        className={`absolute w-full border-b duration-200 ${
          dark
            ? "border-white/10 bg-black text-white"
            : panelOpen
              ? "border-black/10 bg-zinc-100 text-carbon"
              : "border-[#e8e8ed] bg-white text-carbon"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-8">
          <Link href="/" className="flex flex-col leading-none">
            <span className="relative inline-block text-xl font-extrabold tracking-tight">
              RAMS
              <span
                aria-hidden
                className="absolute -top-1 -right-2.5 h-2.5 w-2.5 bg-accent"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />
            </span>
            <span
              className={`text-[10px] font-semibold tracking-[0.3em] ${
                dark ? "text-zinc-400" : "text-graphite/60"
              }`}
            >
              DIGITAL
            </span>
          </Link>

          <nav className="hidden items-center gap-7 font-mono text-xs font-normal tracking-[0.14em] md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onMouseEnter={() => link.menu && openMenu(link.label)}
                className={`border-b py-1 transition-colors ${
                  activeMenu === link.label
                    ? "border-accent text-accent"
                    : `border-transparent ${
                        dark ? "text-zinc-300 hover:text-white" : "text-graphite hover:text-carbon"
                      }`
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className={`hidden rounded-full p-2 sm:inline-flex ${
                dark
                  ? "text-zinc-300 hover:bg-white/10 hover:text-white"
                  : "text-graphite hover:bg-black/5 hover:text-carbon"
              }`}
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              href="/#cta"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200 md:inline-flex"
            >
              Assess My Inventory
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
              className={`relative inline-flex h-8 w-8 items-center justify-center rounded-full md:hidden ${
                dark ? "text-zinc-200 hover:bg-white/10" : "text-carbon hover:bg-black/5"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeLink?.menu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={() => openMenu(activeLink.label)}
              className="absolute inset-x-0 top-full hidden border-t border-black/10 bg-white text-carbon shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)] md:block"
            >
              <div className="rams-container flex items-center justify-between py-5">
                <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-graphite/50 uppercase">
                  {activeLink.label}
                </p>
                <Link
                  href={activeLink.menu.viewAllHref}
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80"
                >
                  View all {activeLink.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <div className="border-t border-[#e8e8ed]" />
              <div className="rams-container flex gap-16 py-10">
                <div className="grid flex-1 grid-cols-2 gap-10">
                  {activeLink.menu.columns.map((column) => (
                    <div key={column.heading} className="flex flex-col gap-3">
                      <p className="font-mono text-[10.5px] font-bold tracking-[0.18em] text-graphite/45 uppercase">
                        {column.heading}
                      </p>
                      <ul className="flex flex-col gap-3">
                        {column.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setActiveMenu(null)}
                              className="text-[14.5px] font-medium text-carbon hover:text-accent"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link
                  href={activeLink.menu.promo.href}
                  onClick={() => setActiveMenu(null)}
                  className="group flex w-[260px] shrink-0 flex-col justify-end rounded-2xl p-5"
                  style={{
                    background: "radial-gradient(80% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 60%, #08080A 100%)",
                  }}
                >
                  <p className="font-mono text-[10.5px] font-bold tracking-[0.2em] text-accent uppercase">
                    {activeLink.menu.promo.eyebrow}
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.3] font-semibold text-white">
                    {activeLink.menu.promo.title}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/70 group-hover:text-white">
                    Learn more <span aria-hidden>→</span>
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col gap-1 overflow-hidden border-t border-white/10 bg-zinc-950 px-6 md:hidden"
          >
            <div className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-semibold text-zinc-200 hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black"
              >
                Assess My Inventory
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
