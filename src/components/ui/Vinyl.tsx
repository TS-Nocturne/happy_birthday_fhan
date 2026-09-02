'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

interface VinylProps {
  playing?: boolean;
  onToggle?: () => void;
  title?: string;
  coverSrc?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export default function Vinyl({
  playing = false,
  onToggle,
  title = 'เพลงของเรา',
  coverSrc,
  size = 'md',
  disabled = false,
}: VinylProps) {
  const reduced = useReducedMotion();
  const spinning = playing && !reduced;
  const box = size === 'sm' ? 'h-44 w-44 sm:h-52 sm:w-52' : 'h-56 w-56 sm:h-64 sm:w-64';

  return (
    <div className={`relative ${box}`}>
      <motion.button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={disabled ? 'ยังไม่มีเพลงให้เล่น' : playing ? 'หยุดเพลง' : 'เล่นเพลง'}
        aria-pressed={disabled ? undefined : playing}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { duration: 4, repeat: Infinity, ease: 'linear' }
            : { duration: 0.4 }
        }
        whileHover={{ scale: 1.06, rotate: 4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute inset-0 rounded-full border-[3px] border-plum
                   shadow-[var(--shadow-pop)] focus-visible:outline-2
                   focus-visible:outline-offset-4 focus-visible:outline-rose cursor-pointer transition-transform
                   disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          background:
            'repeating-radial-gradient(circle at 50% 50%, #2B1A22 0 4px, #3D2530 4px 8px)',
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 grid h-[38%] w-[38%] -translate-x-1/2
                     -translate-y-1/2 place-items-center overflow-hidden rounded-full border-[3px]
                     border-plum bg-pink-base"
        >
          {coverSrc ? (
            <Image src={coverSrc} alt="" fill sizes="120px" className="object-cover" />
          ) : (
            <span className="px-1 text-center font-script text-xs leading-tight text-plum sm:text-sm font-bold">
              {title}
            </span>
          )}
        </span>
        <span
          className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2
                     rounded-full border-2 border-plum bg-cream"
        />
      </motion.button>

      <motion.div
        animate={{ rotate: playing ? -14 : 12 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        aria-hidden="true"
        className={`pointer-events-none absolute z-10 origin-[78%_50%] ${
          size === 'sm'
            ? '-right-1 -top-1.5 sm:-right-2 sm:-top-2 w-[125px] sm:w-[145px]'
            : '-right-1 -top-1.5 sm:-right-2 sm:-top-2 w-[150px] sm:w-[170px]'
        }`}
      >
        <Image
          src="/props/tonearm.png"
          alt="เข็มแผ่นเสียง"
          width={669}
          height={373}
          className="w-full h-auto drop-shadow-md"
          priority
        />
      </motion.div>
    </div>
  );
}
