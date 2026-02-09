"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Cinzel, Great_Vibes, Playfair_Display } from "next/font/google";

// --- FONT CONFIGURATION ---
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600"] });

// --- TYPES ---
interface Petal {
  id: number;
  content: string;
  left: number;
  duration: number;
}

// --- MAIN CONTENT COMPONENT ---
function ValentineContent() {
  const searchParams = useSearchParams();

  // Get data from URL or use defaults
  const partnerName = searchParams.get("partnerName") || "My Dearest";
  const message = searchParams.get("message") || "Will you be my Valentine?";

  const [accepted, setAccepted] = useState(false);
  const [petals, setPetals] = useState<Petal[]>([]);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // 1. Falling Petals Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const content = Math.random() > 0.5 ? "🌸" : "🌹";
      const left = Math.random() * 100; // vw
      const duration = Math.random() * 3 + 2; // seconds

      setPetals((prev) => [...prev, { id, content, left, duration }]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, duration * 1000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // 2. "No" Button Runaway Logic
  // 2. "No" Button Runaway Logic
  const moveNoButton = () => {
    if (!containerRef.current || !noBtnRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = noBtnRef.current.getBoundingClientRect();

    // Calculate available space
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    // Generate random coordinates
    const randomX = Math.random() * (maxX + 150);
    const randomY = Math.random() * (maxY + 150);

    // Add a slight random rotation (-15 to +15 degrees) for a natural feel
    const randomRotate = Math.random() * 50 - 35;

    const btn = noBtnRef.current;

    // Apply styles
    btn.style.position = "absolute";
    // Cubic-bezier gives it a "springy" or "snappy" feel, much smoother than linear
    btn.style.transition = "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.transform = `rotate(${randomRotate}deg)`;
  };

  // 3. "Yes" Button Logic
  const handleAccept = () => {
    // Play Audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    }

    // Trigger Confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff4d6d", "#ff9a9e", "#ffffff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff4d6d", "#ff9a9e", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setAccepted(true);
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb] bg-[length:400%_400%] animate-gradient-move gap-4">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source
          src="https://cdn.pixabay.com/download/audio/2022/02/07/audio_65842884a2.mp3?filename=romantic-piano-11277.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Falling Petals Layer */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-10vh] text-xl pointer-events-none animate-float-petal opacity-0"
          style={{
            left: `${petal.left}vw`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          {petal.content}
        </div>
      ))}

      {/* Main Card */}
      {!accepted ? (
        <div className="relative z-10 w-[min(92%,420px)] p-10 bg-white/60 backdrop-blur-xl rounded-[32px] text-center shadow-[0_20px_60px_rgba(255,100,120,0.25)] border border-white/60 animate-card-in">
          {/* Inner Glow / Heart Aura */}
          <div className="absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-b from-white/40 to-transparent opacity-80 pointer-events-none" />

          {/* Partner Name - Deep Rose */}
          <h1
            className={`${greatVibes.className} text-6xl text-[#d90429] mb-4 drop-shadow-sm break-words leading-tight min-h-[50px]`}
          >
            {partnerName}
          </h1>

          {/* Message - Deep Wine */}
          <h2
            className={`${playfair.className} text-[20px] text-[#641220] mb-4 leading-relaxed whitespace-pre-wrap italic`}
          >
            {message}
          </h2>

          {/* YES Button - Gradient Rose */}
          <button
            onClick={handleAccept}
            className={`${cinzel.className} z-20 my-2 px-9 py-3.5 rounded-full border-none text-base font-semibold cursor-pointer transition-all duration-200 shadow-lg bg-gradient-to-r from-[#ff4d6d] to-[#ff758f] text-white shadow-rose-300/50 hover:-translate-y-1 hover:shadow-rose-400/70 active:scale-95`}
          >
            Yes 💖
          </button>
          <div
            ref={containerRef}
            className="relative h-20 flex justify-center items-start gap-5"
          >
            {/* NO Button - Glassy White */}
            <button
              ref={noBtnRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton} // Touch support
              className={`${cinzel.className} px-9 py-3.5 rounded-full border-none text-base font-semibold cursor-pointer transition-all duration-200 shadow-md bg-white/80 text-gray-500 backdrop-blur-sm hover:bg-white`}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        /* Success Overlay */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[32px] text-center max-w-[90%] animate-pop-in shadow-[0_20px_60px_rgba(255,100,120,0.35)] border border-white/60">
            <img
              src="https://media.tenor.com/rkZe2fpDISoAAAAj/bubu.gif"
              className="w-44 h-auto mx-auto mb-5"
              alt="Cute Bear"
            />
            <div
              className={`${greatVibes.className} text-5xl text-[#d90429] mb-2`}
            >
              Happy Valentine's, {partnerName} 💝
            </div>
            <div className="text-base text-[#641220] tracking-widest mt-3 font-serif uppercase font-bold">
              I LOVE YOU ENDLESSLY
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// --- DEFAULT EXPORT WITH SUSPENSE ---
export default function ValentinePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-pink-100 text-rose-500 font-serif animate-pulse">
          Loading love...
        </div>
      }
    >
      <ValentineContent />
    </Suspense>
  );
}
