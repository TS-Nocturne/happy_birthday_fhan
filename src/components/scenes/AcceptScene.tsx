'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import PropImage from '@/components/ui/PropImage';
import { useSceneStore } from '@/store/useSceneStore';
import { content } from '@/lib/content';
import { assets } from '@/lib/assets';

const { accept } = content;

export default function AcceptScene() {
  const next = useSceneStore((s) => s.next);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [trollIdx, setTrollIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNo = () => {
    const randX = (Math.random() - 0.5) * 240;
    const randY = (Math.random() - 0.5) * 160;
    setNoPos({ x: randX, y: randY });
    setTrollIdx((prev) => (prev + 1) % accept.noTrolls.length);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col items-center gap-6 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h2 className="font-script text-4xl sm:text-5xl text-plum font-bold drop-shadow-xs">{accept.title}</h2>
        <p className="text-2xl text-plum/90 font-hand">{accept.sub}</p>
      </motion.div>

      {/* Character Image Illustration */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="h-56 w-56 sm:h-64 sm:w-64 relative grid place-items-center drop-shadow-md"
      >
        <PropImage
          src={trollIdx > 0 ? assets.sticker.no : assets.sticker.yes}
          alt="ตัวละครน่ารัก"
          fallback="🥺"
          sizes="280px"
          priority
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* Playful Troll Hint */}
      {trollIdx > 0 && (
        <motion.p
          key={trollIdx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-bold text-2xl text-rose font-hand bg-white/90 px-4 py-1.5 rounded-full border-2 border-plum shadow-xs"
        >
          {accept.noTrolls[trollIdx]}
        </motion.p>
      )}

      {/* Visual Hierarchy: Dominant CTA YES Button vs Secondary Runaway NO Button */}
      <div className="relative mt-3 flex items-center justify-center gap-6 min-h-[90px] w-full">
        {/* Dominant YES Button */}
        <motion.button
          onClick={next}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 font-bold font-hand text-3xl px-10 py-4 rounded-full bg-rose text-white border-[3px] border-plum shadow-[4px_4px_0_var(--color-plum)] hover:bg-rose/95 cursor-pointer"
        >
          {accept.yesBtn}
        </motion.button>

        {/* Secondary Runaway NO Button */}
        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          onPointerEnter={moveNo}
          onTouchStart={moveNo}
          onClick={moveNo}
          className="rounded-full border-2 border-plum/60 bg-white/80 px-5 py-2.5 font-hand text-lg font-bold text-plum/70 shadow-[2px_2px_0_rgba(107,43,63,0.3)] hover:bg-pink-soft cursor-pointer opacity-75"
        >
          {accept.noBtn}
        </motion.button>
      </div>
    </div>
  );
}
