'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useSceneStore, useSceneIndex } from '@/store/useSceneStore';
import { SCENE_ORDER, type SceneId } from '@/types';
import { cn } from '@/lib/cn';
import SoundToggle from '@/components/SoundToggle';
import { assets } from '@/lib/assets';
import { ScrapbookCorners } from '@/components/ui/Decorations';

const variants = {
  enter: (dir: 1 | -1) => ({ opacity: 0, y: dir > 0 ? 28 : -28, scale: 0.96 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir: 1 | -1) => ({ opacity: 0, y: dir > 0 ? -28 : 28, scale: 0.96 }),
};

interface StageProps {
  scenes: Record<SceneId, ReactNode>;
}

export default function Stage({ scenes }: StageProps) {
  const scene = useSceneStore((s) => s.scene);
  const direction = useSceneStore((s) => s.direction);
  const go = useSceneStore((s) => s.go);
  const index = useSceneIndex();

  return (
    <main className="grid min-h-dvh place-items-center p-2 sm:p-4 md:p-6">
      <div
        className={cn(
          'relative w-full max-w-[1240px] min-h-[min(92dvh,780px)]',
          'overflow-hidden rounded-2xl border-[3px] border-plum bg-cream',
          'shadow-[var(--shadow-pop-lg)] flex flex-col justify-between',
        )}
      >
        {/* Background Paper Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 bg-cover bg-center grid-paper"
          style={{ backgroundImage: `url(${assets.bg})` }}
        />

        {/* Scrapbook Corner Decorations */}
        <ScrapbookCorners />

        {/* Sound toggle button */}
        <SoundToggle />

        {/* Active Scene Container */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 z-20">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.section
              key={scene}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center justify-center gap-4 text-center z-10 my-auto"
            >
              {scenes[scene]}
            </motion.section>
          </AnimatePresence>
        </div>

        {/* Stage dots navigation & step indicator */}
        <div className="relative z-30 flex items-center justify-between px-6 pb-4 pt-2">
          <nav className="mx-auto flex items-center gap-2.5">
            {SCENE_ORDER.map((id, i) => (
              <button
                key={id}
                onClick={() => go(id)}
                aria-label={`ไปฉากที่ ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-3.5 rounded-full border-2 border-plum transition-all cursor-pointer shadow-xs',
                  i === index ? 'w-8 bg-rose' : 'w-3.5 bg-pink-deep hover:bg-rose/80',
                )}
              />
            ))}
          </nav>

          <span className="absolute right-5 bottom-3 font-bold text-sm text-plum bg-pink-soft/90 px-3 py-1 rounded-full border-2 border-plum shadow-[2px_2px_0_var(--color-plum)] select-none">
            {index + 1} / {SCENE_ORDER.length}
          </span>
        </div>
      </div>
    </main>
  );
}
