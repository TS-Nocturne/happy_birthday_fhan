'use client';

import { motion } from 'motion/react';
import PropImage from '@/components/ui/PropImage';
import { useSceneStore } from '@/store/useSceneStore';
import { content } from '@/lib/content';
import { assets } from '@/lib/assets';
import { BuntingGarland, DecoStar } from '@/components/ui/Decorations';

export default function CakeScene() {
  const next = useSceneStore((s) => s.next);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full max-w-2xl relative">
      {/* Decorative stars flanking the title */}
      <div className="absolute -top-2 left-6 sm:left-16 z-10">
        <DecoStar size={36} delay={0.1} />
      </div>
      <div className="absolute -top-2 right-6 sm:right-16 z-10">
        <DecoStar size={36} delay={0.15} />
      </div>

      {/* Bunting garland across the top */}
      <BuntingGarland className="mb-0" />

      {/* Title area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-0.5 -mt-3 text-center"
      >
        <div className="relative inline-block">
          <h1 className="font-script text-5xl sm:text-7xl text-plum drop-shadow-xs leading-tight text-center">
            Happy Birthday Fhan
          </h1>
          <span className="absolute -right-8 sm:-right-10 top-1 text-3xl sm:text-4xl pointer-events-none select-none">✨</span>
        </div>
        <p className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-plum uppercase font-sans mt-1 text-center">
          MAKE A WISH!!
        </p>
      </motion.div>

      {/* Cake Image */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        className="h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 relative grid place-items-center my-1 drop-shadow-lg"
      >
        <PropImage
          src={assets.cake.lit}
          alt="เค้กวันเกิด"
          fallback="🎂"
          sizes="420px"
          priority
          className="h-full w-full object-contain"
        />
      </motion.div>

      {/* "BLOW THE CANDLE" Button — dashed border scrapbook style */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-1"
      >
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-3 rounded-full border-[3px] border-dashed border-plum
                     bg-pink-soft/80 px-8 py-3 font-hand text-xl sm:text-2xl font-bold text-plum
                     shadow-[3px_3px_0_var(--color-plum)] transition-all cursor-pointer
                     hover:bg-rose hover:text-white hover:border-solid
                     active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {content.letterScene.next}
        </motion.button>
      </motion.div>
    </div>
  );
}
