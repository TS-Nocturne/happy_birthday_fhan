'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PropImage from './PropImage';
import { assets } from '@/lib/assets';
import { content } from '@/lib/content';

const { letter } = content.gift;

export default function GiftEnvelope() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Envelope button with hover affordance */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05, y: -6, rotate: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={open}
        className="relative h-48 w-full max-w-[300px] rounded-lg cursor-pointer
                   focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose transition-transform"
      >
        <PropImage
          src={open ? assets.envelope.open : assets.envelope.closed}
          alt={open ? 'ซองจดหมายเปิดอยู่' : 'ซองจดหมายปิดอยู่'}
          fallback="💌"
          sizes="300px"
          className="h-full w-full object-contain drop-shadow-md"
        />
      </motion.button>

      {/* OPEN Heart Button - matching reference style */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 relative cursor-pointer"
        >
          {/* Heart shape container */}
          <div className="relative h-20 w-24 grid place-items-center">
            {/* Heart SVG background */}
            <svg
              viewBox="0 0 100 90"
              className="absolute inset-0 w-full h-full drop-shadow-md"
            >
              <path
                d="M50 85 C25 65 0 50 0 30 C0 13 13 0 30 0 C39 0 47 5 50 12 C53 5 61 0 70 0 C87 0 100 13 100 30 C100 50 75 65 50 85Z"
                fill="var(--color-rose)"
                stroke="var(--color-plum)"
                strokeWidth="3"
              />
            </svg>
            <span className="relative z-10 font-hand text-xl font-bold text-white tracking-wider select-none">
              OPEN
            </span>
          </div>
        </motion.button>
      )}

      {/* Card inside envelope */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="relative -mt-6 w-full max-w-[320px] overflow-hidden rounded-xl
                       border-[3px] border-plum bg-cream px-6 py-6 text-center
                       shadow-[var(--shadow-pop-lg)] z-20"
          >
            {assets.letter && (
              <div className="pointer-events-none absolute inset-0 opacity-25">
                <PropImage src={assets.letter} alt="" fallback="" sizes="320px" className="h-full w-full" />
              </div>
            )}

            <div className="relative z-10">
              <h4 className="font-script text-3xl font-bold text-rose">{letter.heading}</h4>
              <p className="mt-3 whitespace-pre-line font-hand text-lg leading-relaxed text-plum font-bold">
                {letter.body}
              </p>
              {letter.signOff && (
                <p className="mt-4 font-script text-xl text-plum/80 font-bold">{letter.signOff}</p>
              )}

              <a
                href={letter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full border-[3px] border-dashed border-plum bg-rose
                           px-7 py-3 font-hand text-xl font-bold text-white shadow-[4px_4px_0_var(--color-plum)]
                           transition hover:scale-106 hover:bg-rose/95 hover:border-solid active:translate-y-0.5 cursor-pointer"
              >
                {letter.cta} 🎁
              </a>
              <p className="mt-2.5 font-hand text-sm font-bold text-plum/70">{letter.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
