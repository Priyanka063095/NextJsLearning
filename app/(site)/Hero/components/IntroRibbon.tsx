"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import { PartyPopper } from "lucide-react";

const STORAGE_KEY = "rams-intro-seen";

const SCISSORS_CURSOR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 30 30'><g transform='rotate(180 15 15)'><g fill='none' stroke='#0e0e0f' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><circle cx='6' cy='6' r='3'/><path d='M8.12 8.12 12 12'/><path d='M20 4 8.12 15.88'/><circle cx='6' cy='18' r='3'/><path d='M14.8 14.8 20 20'/></g><g fill='none' stroke='#ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='6' cy='6' r='3'/><path d='M8.12 8.12 12 12'/><path d='M20 4 8.12 15.88'/><circle cx='6' cy='18' r='3'/><path d='M14.8 14.8 20 20'/></g></g></svg>`;
const SCISSORS_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(SCISSORS_CURSOR_SVG)}") 30 30, pointer`;

function subscribe() {
  return () => {};
}

function getSeenSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

function getSeenServerSnapshot() {
  return true;
}

const CONFETTI_COLORS = [
  "#FF6A00",
  "#FF8A3C",
  "#FFFFFF",
  "#2BCB74",
  "#FFD166",
  "#4EA8FF",
  "#FF4FA3",
  "#A78BFA",
  "#FF5C5C",
  "#3DDBD9",
];

type ConfettiPiece = {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
  shape: "rect" | "circle";
  size: number;
};

function createConfetti(count: number, idOffset = 0): ConfettiPiece[] {
  return Array.from({ length: count }, (_, index) => ({
    id: idOffset + index,
    left: 50 + (Math.random() - 0.5) * 84,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.25,
    duration: 1.4 + Math.random() * 1.1,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 220,
    shape: Math.random() < 0.4 ? "circle" : "rect",
    size: 6 + Math.random() * 6,
  }));
}

function RibbonHalf({ side, cutting }: { side: "left" | "right"; cutting: boolean }) {
  const isLeft = side === "left";
  return (
    <div
      className={`ribbon-half relative h-12 flex-1 transition-transform duration-700 ease-in sm:h-14 ${
        isLeft ? "origin-right" : "origin-left"
      } ${cutting ? (isLeft ? "translate-y-[70vh] rotate-[-22deg]" : "translate-y-[70vh] rotate-[22deg]") : ""}`}
    >
      <div
        aria-hidden
        className={`absolute top-1/2 h-9 w-9 -translate-y-1/2 rounded-[45%] sm:h-11 sm:w-11 ${
          isLeft ? "-left-3 rotate-[24deg] sm:-left-4" : "-right-3 -rotate-[24deg] sm:-right-4"
        }`}
        style={{
          background: "linear-gradient(135deg, #A83600, #6E2200)",
          boxShadow: "inset 0 2px 5px rgba(0,0,0,0.4)",
        }}
      />
      <div
        aria-hidden
        className={`absolute top-1/2 h-4 w-7 -translate-y-1/2 sm:h-5 sm:w-8 ${
          isLeft ? "-left-6 sm:-left-7" : "-right-6 sm:-right-7"
        }`}
        style={{
          background: "#6E2200",
          clipPath: isLeft ? "polygon(100% 0%, 0% 50%, 100% 100%)" : "polygon(0% 0%, 100% 50%, 0% 100%)",
        }}
      />

      <div
        className="absolute inset-0 overflow-hidden transition-[clip-path] duration-200"
        style={{
          background: "linear-gradient(180deg, #FF9552 0%, #FF6A00 45%, #C24500 100%)",
          clipPath: cutting
            ? isLeft
              ? "polygon(0% 0%, 100% 0%, 88% 50%, 100% 100%, 0% 100%)"
              : "polygon(12% 50%, 0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          boxShadow: "0 10px 30px -10px rgba(255,106,0,0.55)",
        }}
      >
        <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[#FFD166]/70" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-[#FFD166]/70" />
        <span aria-hidden className="absolute inset-x-0 top-[24%] h-[3px] bg-white/35" />
        <span
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 2px, transparent 2px, transparent 10px)",
          }}
        />
      </div>
    </div>
  );
}

const GOLD_TRIM = "rgba(255,214,120,0.85)";

function RibbonBow({ cutting }: { cutting: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 -27 140 185"
      className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
        cutting ? "opacity-0" : "opacity-100"
      }`}
    >
      <defs>
        <linearGradient id="bow-loop-l" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF9552" />
          <stop offset="100%" stopColor="#C24500" />
        </linearGradient>
        <linearGradient id="bow-loop-r" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF9552" />
          <stop offset="100%" stopColor="#C24500" />
        </linearGradient>
        <linearGradient id="bow-tail" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="100%" stopColor="#C24500" />
        </linearGradient>
        <linearGradient id="bow-knot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB066" />
          <stop offset="55%" stopColor="#FF6A00" />
          <stop offset="100%" stopColor="#C24500" />
        </linearGradient>
      </defs>

      {/* tails */}
      <path
        d="M66,47 L42,153 L66,123 L69,51 Z"
        fill="url(#bow-tail)"
        stroke={GOLD_TRIM}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M74,47 L98,153 L74,123 L71,51 Z"
        fill="url(#bow-tail)"
        stroke={GOLD_TRIM}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* left loop */}
      <path
        d="M70,46 C 50,-18 10,-22 6,22 C 2,62 34,78 70,46 Z"
        fill="url(#bow-loop-l)"
        stroke={GOLD_TRIM}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* <path
        d="M60,28 C 44,20 22,21 12,32"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="4"
        strokeLinecap="round"
      /> */}

      {/* right loop */}
      <path
        d="M70,46 C 90,-18 130,-22 134,22 C 138,62 106,78 70,46 Z"
        fill="url(#bow-loop-r)"
        stroke={GOLD_TRIM}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* <path
        d="M80,28 C 96,20 118,21 128,32"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="4"
        strokeLinecap="round"
      /> */}

      {/* center knot */}
      <rect x="53" y="34" width="34" height="24" rx="9" fill="url(#bow-knot)" stroke={GOLD_TRIM} strokeWidth="1.5" />
      <rect x="60" y="41" width="20" height="3.5" rx="1.75" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

type Phase = "idle" | "cutting" | "celebrating" | "leaving";

export function IntroRibbon() {
  const seen = useSyncExternalStore(subscribe, getSeenSnapshot, getSeenServerSnapshot);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dismissed, setDismissed] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const visible = !dismissed;
  const cutAway = phase !== "idle";
  const celebrating = phase === "celebrating" || phase === "leaving";

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  function handleCut() {
    setPhase("cutting");
    setConfetti(createConfetti(90));

    window.setTimeout(() => {
      setPhase("celebrating");
      setConfetti((prev) => [...prev, ...createConfetti(80, prev.length)]);
    }, 550);

    window.setTimeout(() => {
      setConfetti((prev) => [...prev, ...createConfetti(70, prev.length)]);
    }, 1150);

    window.setTimeout(() => {
      setPhase("leaving");
    }, 2700);

    window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setDismissed(true);
    }, 3200);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to RAMS Digital"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden text-white transition-opacity duration-500"
      style={{
        background: "radial-gradient(80% 100% at 50% 0%, #1D1D1F 0%, #0E0E0F 55%, #08080A 100%)",
        opacity: phase === "leaving" ? 0 : 1,
        pointerEvents: cutAway ? "none" : "auto",
      }}
    >
      {cutAway && (
        <span
          aria-hidden
          className="cut-flash pointer-events-none absolute h-24 w-24 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,190,130,0.9), rgba(255,106,0,0.3) 55%, transparent 100%)",
          }}
        />
      )}

      {confetti.map((piece) => (
        <span
          key={piece.id}
          aria-hidden
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: piece.shape === "circle" ? `${piece.size}px` : "8px",
            height: piece.shape === "circle" ? `${piece.size}px` : "14px",
            borderRadius: piece.shape === "circle" ? "50%" : "2px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--drift": `${piece.drift}px`,
            "--rotation": `${piece.rotation}deg`,
          } as CSSProperties}
        />
      ))}

      <div className="relative z-10 flex w-full flex-col items-center gap-12 sm:gap-16">
        <div className="relative mx-auto flex min-h-50 w-full max-w-full flex-col items-center px-6 text-center sm:min-h-70">
          <div
            className={`absolute inset-0 flex flex-col items-center transition-all duration-500 ${
              celebrating ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <Image
              src="/RAMS_Logo_White.svg"
              alt="RAMS Digital"
              width={180}
              height={90}
              priority
            />
            {/* <p className="mt-5 font-mono text-[11px] font-bold tracking-[0.28em] text-accent uppercase">
              RAMS Digital
            </p> */}
            <h2 className="text-[56px] leading-[0.98] font-bold tracking-[-0.045em] sm:text-[84px] lg:text-[90px] mt-10">
              We&rsquo;re officially live.
            </h2>
            {/* <p className="mt-4 text-[14px] leading-[1.6] text-white/60 sm:text-[15px]">
              Cut the ribbon to step inside.
            </p> */}
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
              celebrating ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <PartyPopper aria-hidden className="party-pop-bounce h-9 w-9 text-accent sm:h-10 sm:w-10" />
            <h2 className="mt-3 text-[32px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[44px]">
              Welcome aboard!
            </h2>
            {/* <p className="mt-3 text-[14px] leading-[1.6] text-white/60 sm:text-[15px]">
              Stepping into RAMS Digital&hellip;
            </p> */}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCut}
          disabled={cutAway}
          aria-label="Cut the ribbon to enter the site"
          className="group relative flex w-full items-center border-0 bg-transparent p-0 disabled:pointer-events-none"
          style={{ cursor: cutAway ? "default" : SCISSORS_CURSOR }}
        >
          <span
            aria-hidden
            className="absolute left-3 h-2.5 w-2.5 rounded-full bg-white/25 shadow-[0_0_0_3px_rgba(255,255,255,0.08)] sm:left-6"
          />

          <RibbonHalf side="left" cutting={cutAway} />
          <RibbonHalf side="right" cutting={cutAway} />

          <span
            aria-hidden
            className="absolute right-3 h-2.5 w-2.5 rounded-full bg-white/25 shadow-[0_0_0_3px_rgba(255,255,255,0.08)] sm:right-6"
          />

          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-42 w-30 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-50 sm:w-36">
            <RibbonBow cutting={cutAway} />
          </div>
        </button>
      </div>
    </div>
  );
}
