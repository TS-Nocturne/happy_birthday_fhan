'use client';

import { motion } from 'motion/react';

/* ──────────────────────────────────────────────
   Decorative Star (3D-ish, filled)
   ────────────────────────────────────────────── */
export function DecoStar({
  size = 48,
  className = '',
  delay = 0,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 14 }}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={`pointer-events-none select-none drop-shadow-md ${className}`}
    >
      <path
        d="M24 2 L29.5 17.5 L46 18 L33 28.5 L37.5 45 L24 35 L10.5 45 L15 28.5 L2 18 L18.5 17.5 Z"
        fill="var(--color-plum)"
        stroke="var(--color-plum)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 6 L28 17 L40 17.5 L31 25.5 L34 39 L24 31 L14 39 L17 25.5 L8 17.5 L20 17 Z"
        fill="var(--color-rose)"
        opacity="0.6"
      />
    </motion.svg>
  );
}

/* ──────────────────────────────────────────────
   Checkered / Gingham Patch
   ────────────────────────────────────────────── */
export function CheckeredPatch({
  size = 80,
  className = '',
  rotate = 0,
  delay = 0,
}: {
  size?: number;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: rotate - 10 }}
      animate={{ opacity: 0.7, scale: 1, rotate }}
      transition={{ delay, duration: 0.5 }}
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: `
          repeating-conic-gradient(
            var(--color-pink-deep) 0% 25%,
            var(--color-pink-soft) 0% 50%
          ) 0 0 / 16px 16px`,
        border: '2px solid var(--color-pink-deep)',
        boxShadow: '2px 2px 6px rgba(107,43,63,0.12)',
      }}
    />
  );
}

/* ──────────────────────────────────────────────
   Metallic Sparkle / Asterisk
   ────────────────────────────────────────────── */
export function Sparkle({
  size = 28,
  className = '',
  delay = 0,
}: {
  size?: number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 12 }}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* 4-point star / sparkle */}
      <path
        d="M14 0 C14.5 10 18 13.5 28 14 C18 14.5 14.5 18 14 28 C13.5 18 10 14.5 0 14 C10 13.5 13.5 10 14 0Z"
        fill="var(--color-plum)"
        opacity="0.7"
      />
    </motion.svg>
  );
}

/* ──────────────────────────────────────────────
   Washi Tape Strip
   ────────────────────────────────────────────── */
export function WashiTape({
  width = 120,
  className = '',
  rotate = 0,
}: {
  width?: number;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width,
        height: 24,
        transform: `rotate(${rotate}deg)`,
        background: `repeating-linear-gradient(
          90deg,
          var(--color-pink-deep) 0 4px,
          var(--color-pink-soft) 4px 8px
        )`,
        opacity: 0.5,
        borderRadius: 2,
      }}
    />
  );
}

/* ──────────────────────────────────────────────
   Bunting / Flag Garland (for Cake Scene)
   ────────────────────────────────────────────── */
export function BuntingGarland({ className = '' }: { className?: string }) {
  const flags = Array.from({ length: 11 }, (_, i) => i);

  return (
    <motion.svg
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      viewBox="0 0 600 80"
      fill="none"
      className={`pointer-events-none select-none w-full max-w-xl ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Symmetrical drooping string */}
      <path
        d="M20 15 Q150 48 300 48 Q450 48 580 15"
        stroke="var(--color-plum)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Triangular flags along the curve */}
      {flags.map((i) => {
        const t = (i + 0.5) / flags.length;
        const x = Number((20 + t * 560).toFixed(2));
        const y = Number((15 + Math.sin(t * Math.PI) * 33).toFixed(2));
        const colors = [
          'var(--color-rose)',
          'var(--color-pink-base)',
          'var(--color-plum)',
          'var(--color-pink-deep)',
          'var(--color-cream)',
        ];

        return (
          <motion.polygon
            key={i}
            points={`${x - 8},${y} ${x + 8},${y} ${x},${y + 22}`}
            fill={colors[i % colors.length]}
            stroke="var(--color-plum)"
            strokeWidth="1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ delay: 0.15 + i * 0.04 }}
          />
        );
      })}
    </motion.svg>
  );
}

/* ──────────────────────────────────────────────
   Corner Decorations (Assembled)
   Places stars, checkered patches, sparkles around container corners.
   ────────────────────────────────────────────── */
export function ScrapbookCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Top-left star */}
      <DecoStar size={42} className="absolute -top-1 left-4" delay={0.05} />

      {/* Top-right checkered */}
      <CheckeredPatch size={56} className="absolute -top-3 right-16" rotate={12} delay={0.1} />

      {/* Bottom-left checkered */}
      <CheckeredPatch size={64} className="absolute -bottom-4 left-8" rotate={-8} delay={0.15} />

      {/* Bottom-right star */}
      <DecoStar size={36} className="absolute bottom-6 right-4" delay={0.2} />

      {/* Scattered sparkles */}
      <Sparkle size={22} className="absolute top-12 right-6" delay={0.25} />
      <Sparkle size={18} className="absolute bottom-16 left-2" delay={0.3} />
      <Sparkle size={24} className="absolute top-1/3 -left-1" delay={0.35} />
      <Sparkle size={20} className="absolute top-1/4 right-12" delay={0.4} />

      {/* Additional checkered patches in mid areas */}
      <CheckeredPatch size={48} className="absolute top-1/2 -left-4" rotate={15} delay={0.2} />
      <CheckeredPatch size={52} className="absolute top-1/3 -right-3" rotate={-6} delay={0.25} />

      {/* Washi tape accents */}
      <WashiTape width={80} className="absolute top-0 left-1/4" rotate={-3} />
      <WashiTape width={60} className="absolute bottom-0 right-1/3" rotate={5} />
    </div>
  );
}
