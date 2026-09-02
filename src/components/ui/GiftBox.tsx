'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import PropImage from './PropImage';
import { assets } from '@/lib/assets';
import { content } from '@/lib/content';

const { letter } = content.gift;
const hasGiftLink = letter.link && !letter.link.includes('xxxxxxxx');
const finaleItems = [
  { src: assets.finale.heartRose, left: '7%', bottom: '28%', size: 58, delay: 0 },
  { src: assets.finale.sparkle, left: '77%', bottom: '37%', size: 50, delay: 0.25 },
  { src: assets.finale.heartPink, left: '17%', bottom: '12%', size: 48, delay: 0.55 },
  { src: assets.finale.flower, left: '72%', bottom: '7%', size: 54, delay: 0.8 },
  { src: assets.finale.capsule, left: '43%', bottom: '14%', size: 42, delay: 1.1 },
  { src: assets.finale.dot, left: '53%', bottom: '32%', size: 38, delay: 1.35 },
] as const;

interface GiftBoxProps {
  onOpen?: () => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const reveal = () => {
    if (!open) {
      setOpen(true);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([18, 35, 20]);
      }
      onOpen?.();
    }
  };

  useEffect(() => {
    if (open) cardRef.current?.focus();
  }, [open]);

  return (
    <div className="relative flex w-full flex-col items-center">
      <AnimatePresence>
        {open && !reduced && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden="true">
            {finaleItems.map((item) => (
              <motion.img
                key={item.src}
                src={item.src}
                alt=""
                initial={{ opacity: 0, x: 0, y: 18, scale: 0.65, rotate: -12 }}
                animate={{ opacity: [0, 1, 1, 0], x: [0, 10, -8, 4], y: [18, -42, -116, -170], scale: [0.65, 1, 0.9, 0.72], rotate: [-12, 8, -7, 14] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.4, delay: item.delay, repeat: Infinity, ease: 'easeOut' }}
                style={{ left: item.left, bottom: item.bottom, width: item.size, height: item.size }}
                className="absolute object-contain drop-shadow-md"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={reveal}
        aria-expanded={open}
        aria-controls="gift-message"
        aria-label={open ? 'กล่องของขวัญถูกเปิดแล้ว' : 'เปิดกล่องของขวัญ'}
        whileHover={open ? undefined : { scale: 1.05, y: -8 }}
        whileTap={open ? undefined : { scale: 0.96 }}
        animate={open ? { scale: 1 } : reduced ? undefined : { y: [0, -7, 0] }}
        transition={open ? { duration: 0.25 } : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 h-60 w-60 cursor-pointer rounded-2xl focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rose sm:h-72 sm:w-72"
      >
        <PropImage
          src={open ? assets.gift.open : assets.gift.closed}
          alt={open ? 'กล่องของขวัญที่เปิดแล้ว' : 'กล่องของขวัญที่ยังปิดอยู่'}
          fallback="🎁"
          sizes="288px"
          priority
          className="h-full w-full object-contain drop-shadow-[0_16px_22px_rgba(107,43,63,0.28)]"
        />
        {!open && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-plum bg-rose px-4 py-1.5 font-hand text-lg font-bold text-white shadow-[3px_3px_0_var(--color-plum)]">
            แตะเพื่อเปิด 🎀
          </span>
        )}
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="gift-message"
            ref={cardRef}
            tabIndex={-1}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="relative z-10 mt-2 w-full max-w-[360px] overflow-hidden rounded-2xl border-[3px] border-plum bg-cream px-6 py-6 text-center shadow-[var(--shadow-pop-lg)] focus:outline-none"
          >
            {assets.letter && (
              <div className="pointer-events-none absolute inset-0 opacity-20">
                <PropImage src={assets.letter} alt="" fallback="" sizes="360px" className="h-full w-full" />
              </div>
            )}
            <div className="relative z-10">
              <span className="text-4xl" aria-hidden="true">💗✨</span>
              <h3 className="mt-1 font-script text-3xl font-bold text-rose">{letter.heading}</h3>
              <p className="mt-3 whitespace-pre-line font-hand text-lg font-bold leading-relaxed text-plum">{letter.body}</p>
              {letter.signOff && (
                <p className="mt-4 font-script text-xl font-bold text-plum/80">{letter.signOff}</p>
              )}
              {hasGiftLink ? (
                <a
                  href={letter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-full border-[3px] border-dashed border-plum bg-rose px-6 py-2.5 font-hand text-lg font-bold text-white shadow-[4px_4px_0_var(--color-plum)] transition hover:scale-105 hover:border-solid active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  {letter.cta} 🎁
                </a>
              ) : (
                <p className="mt-5 rounded-xl border-2 border-dashed border-plum/50 bg-white/75 px-4 py-2 font-hand text-sm font-bold text-plum/75">
                  ใส่ลิงก์ของขวัญจริงใน <code>src/lib/content.ts</code> เพื่อเปิดใช้งานปุ่มรับของขวัญ
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
