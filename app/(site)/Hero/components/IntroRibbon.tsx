"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { PartyPopper, Scissors } from "lucide-react";

const STORAGE_KEY = "rams-intro-seen";

function subscribe() {
  return () => {};
}

function getSeenSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

function getSeenServerSnapshot() {
  return true;
}

const CONFETTI_COLORS = ["#FF6A00", "#FF8A3C", "#FFFFFF", "#2BCB74", "#FFD166"];

type ConfettiPiece = {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
};

function createConfetti(count: number, idOffset = 0): ConfettiPiece[] {
  return Array.from({ length: count }, (_, index) => ({
    id: idOffset + index,
    left: 50 + (Math.random() - 0.5) * 70,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.15,
    duration: 1.4 + Math.random() * 0.9,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 180,
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

const GOLD_TRIM = "1.5px solid rgba(255,214,120,0.85)";
const PETAL_GRADIENT = "linear-gradient(135deg, #FF9552, #C24500)";
const PETAL_GRADIENT_R = "linear-gradient(225deg, #FF9552, #C24500)";

function RibbonBow({ cutting }: { cutting: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        cutting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* top petal */}
      <span
        className="absolute bottom-1/2 h-10 w-7 -translate-y-1 rounded-t-full rounded-b-[20%] sm:h-12 sm:w-9"
        style={{ background: PETAL_GRADIENT, border: GOLD_TRIM, boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.25)" }}
      />
      <span className="absolute bottom-1/2 h-5 w-3.5 -translate-y-2.5 rounded-t-full rounded-b-[20%] bg-white/35 sm:h-6 sm:w-4" />

      {/* left petal */}
      <span
        className="absolute h-9 w-14 -translate-x-3 -rotate-[30deg] rounded-[60%_40%_60%_40%] sm:h-11 sm:w-17"
        style={{
          background: PETAL_GRADIENT,
          border: GOLD_TRIM,
          boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.25), 0 6px 14px -6px rgba(0,0,0,0.4)",
        }}
      />
      <span className="absolute h-4 w-9 -translate-x-4 -rotate-[30deg] rounded-[60%_40%_60%_40%] bg-white/35 sm:h-5 sm:w-11" />

      {/* right petal */}
      <span
        className="absolute h-9 w-14 translate-x-3 rotate-[30deg] rounded-[40%_60%_40%_60%] sm:h-11 sm:w-17"
        style={{
          background: PETAL_GRADIENT_R,
          border: GOLD_TRIM,
          boxShadow: "inset 4px -4px 8px rgba(0,0,0,0.25), 0 6px 14px -6px rgba(0,0,0,0.4)",
        }}
      />
      <span className="absolute h-4 w-9 translate-x-4 rotate-[30deg] rounded-[40%_60%_40%_60%] bg-white/35 sm:h-5 sm:w-11" />

      {/* bottom-left tail */}
      <span
        className="absolute top-[54%] h-11 w-5 -translate-x-5 rotate-[26deg]"
        style={{
          background: "linear-gradient(180deg, #FF6A00, #C24500)",
          border: GOLD_TRIM,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 78%, 50% 100%, 0% 78%)",
        }}
      />
      {/* bottom-right tail */}
      <span
        className="absolute top-[54%] h-11 w-5 translate-x-5 -rotate-[26deg]"
        style={{
          background: "linear-gradient(180deg, #FF6A00, #C24500)",
          border: GOLD_TRIM,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 78%, 50% 100%, 0% 78%)",
        }}
      />

      {/* center knot */}
      <span
        className="absolute z-10 h-5 w-8 rounded-sm sm:h-6 sm:w-10"
        style={{
          background: "linear-gradient(135deg, #FFD166, #C9932A)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

type Phase = "idle" | "cutting" | "celebrating" | "leaving";

export function IntroRibbon() {
  const seen = useSyncExternalStore(subscribe, getSeenSnapshot, getSeenServerSnapshot);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dismissed, setDismissed] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const visible = !seen && !dismissed;
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
    setConfetti(createConfetti(60));

    window.setTimeout(() => {
      setPhase("celebrating");
      setConfetti((prev) => [...prev, ...createConfetti(40, prev.length)]);
    }, 550);

    window.setTimeout(() => {
      setPhase("leaving");
    }, 2300);

    window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setDismissed(true);
    }, 2800);
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
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--drift": `${piece.drift}px`,
            "--rotation": `${piece.rotation}deg`,
          } as CSSProperties}
        />
      ))}

      <div className="relative z-10 flex w-full flex-col items-center gap-12 sm:gap-16">
        <div className="relative mx-auto flex min-h-33 w-full max-w-140 flex-col items-center px-6 text-center sm:min-h-38">
          <div
            className={`absolute inset-0 flex flex-col items-center transition-all duration-500 ${
              celebrating ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <p className="font-mono text-[11px] font-bold tracking-[0.28em] text-accent uppercase">
              RAMS Digital
            </p>
            <h2 className="mt-4 text-[32px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[44px]">
              We&rsquo;re officially live.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.6] text-white/60 sm:text-[15px]">
              Cut the ribbon to step inside.
            </p>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
              celebrating ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <PartyPopper aria-hidden className="h-9 w-9 text-accent sm:h-10 sm:w-10" />
            <h2 className="mt-3 text-[32px] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[44px]">
              Welcome aboard!
            </h2>
            <p className="mt-3 text-[14px] leading-[1.6] text-white/60 sm:text-[15px]">
              Stepping into RAMS Digital&hellip;
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCut}
          disabled={cutAway}
          aria-label="Cut the ribbon to enter the site"
          className="group relative flex w-full items-center border-0 bg-transparent p-0 disabled:pointer-events-none"
          style={{ cursor: cutAway ? "default" : "pointer" }}
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

          <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-28 sm:w-28">
            <RibbonBow cutting={cutAway} />
            <span
              aria-hidden
              className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-all duration-200 sm:h-18 sm:w-18 ${
                cutAway ? "scale-105 opacity-100" : "scale-90 opacity-0 group-hover:scale-105 group-hover:opacity-100"
              }`}
              style={{ boxShadow: "0 20px 60px -20px rgba(255,106,0,0.5)" }}
            >
              <Scissors
                aria-hidden
                className={`h-7 w-7 text-white transition-transform duration-300 sm:h-8 sm:w-8 ${
                  cutAway ? "rotate-45 scale-110" : "group-hover:rotate-12"
                }`}
              />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
