'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PropImage from '@/components/ui/PropImage';
import Vinyl from '@/components/ui/Vinyl';
import GiftBox from '@/components/ui/GiftBox';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useTypeSound } from '@/hooks/useTypeSound';
import { useAudio } from '@/hooks/useAudio';
import { useConfetti } from '@/hooks/useConfetti';
import { useSceneStore } from '@/store/useSceneStore';
import { assets } from '@/lib/assets';
import { content } from '@/lib/content';
import { DecoStar, CheckeredPatch, Sparkle } from '@/components/ui/Decorations';

const { audio, finale } = content;

type GiftType = 'letter' | 'flower' | 'box';

export default function GiftScene() {
  const reset = useSceneStore((s) => s.reset);
  const setGiftPick = useSceneStore((s) => s.setGiftPick);
  const { burst } = useConfetti();

  const [activeItem, setActiveItem] = useState<GiftType | null>(null);

  // Audio for box detail
  const hasFile = audio.mode === 'file';
  const hasSpotify = audio.mode === 'spotify';
  const { playing, progress, failed, hasSource, toggle, seek } = useAudio(hasFile ? audio.file : null);

  // Typewriter for letter detail
  const [letterOpened, setLetterOpened] = useState(false);
  const { tick, ding } = useTypeSound();
  const { shown, done, skip } = useTypewriter(content.letter, {
    enabled: activeItem === 'letter' && letterOpened,
    speed: 40,
    startDelay: 700,
    onChar: (ch) => (ch === '\n' ? ding() : tick()),
  });

  const selectItem = (type: GiftType, idx: number) => {
    setActiveItem(type);
    setGiftPick(idx);
    burst();
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[580px]">
      <AnimatePresence mode="wait">
        {activeItem === null ? (
          /* ========================================================= */
          /* CHOICE VIEW                                               */
          /* ========================================================= */
          <motion.div
            key="choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4 w-full max-w-5xl relative"
          >
            {/* Decorative elements */}
            <CheckeredPatch size={72} className="absolute -top-4 -left-6 hidden sm:block" rotate={-12} delay={0.1} />
            <CheckeredPatch size={64} className="absolute -top-2 -right-4 hidden sm:block" rotate={8} delay={0.15} />
            <DecoStar size={36} className="absolute top-0 left-1/4 hidden sm:block" delay={0.2} />

            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif-it text-4xl text-plum sm:text-5xl italic drop-shadow-xs"
            >
              Choose Your Gifts
            </motion.h2>
            <p className="text-xl text-plum/90 font-hand mb-2 font-bold">แตะที่ของขวัญแต่ละชิ้นเพื่อเปิดดูได้เลยนะ 💕</p>

            {/* 3 Items Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full place-items-center">
              {/* Item 1: Envelope Letter */}
              <motion.button
                onClick={() => selectItem('letter', 0)}
                whileHover={{ scale: 1.12, y: -12 }}
                whileTap={{ scale: 0.94 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="flex flex-col items-center gap-2 cursor-pointer group w-full focus:outline-hidden"
              >
                <div className="h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 relative grid place-items-center drop-shadow-[0_12px_24px_rgba(107,43,63,0.25)] transition-transform group-hover:scale-105">
                  <PropImage
                    src={assets.envelope.closed}
                    alt="จดหมายอวยพร"
                    fallback="💌"
                    sizes="300px"
                    priority
                    className="h-full w-full"
                  />
                </div>
                <span className="font-script text-2xl sm:text-3xl text-plum font-bold group-hover:text-rose transition">
                  จดหมายอวยพร 💌
                </span>
              </motion.button>

              {/* Item 2: Flower Bouquet */}
              <motion.button
                onClick={() => selectItem('flower', 1)}
                whileHover={{ scale: 1.15, rotate: 6, y: -12 }}
                whileTap={{ scale: 0.94 }}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
                }}
                className="flex flex-col items-center gap-2 cursor-pointer group w-full focus:outline-hidden"
              >
                <div className="h-52 w-52 sm:h-60 sm:w-60 md:h-80 md:w-72 relative grid place-items-center drop-shadow-[0_12px_24px_rgba(107,43,63,0.25)] transition-transform group-hover:scale-105">
                  <PropImage
                    src={assets.flower}
                    alt="ช่อดอกไม้"
                    fallback="💐"
                    sizes="300px"
                    priority
                    className="h-full w-full rotate-6"
                  />
                </div>
                <span className="font-script text-2xl sm:text-3xl text-plum font-bold group-hover:text-rose transition">
                  ช่อดอกไม้ 💐
                </span>
              </motion.button>

              {/* Item 3: Gift Box */}
              <motion.button
                onClick={() => selectItem('box', 2)}
                whileHover={{ scale: 1.12, y: -12 }}
                whileTap={{ scale: 0.94 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }}
                className="flex flex-col items-center gap-2 cursor-pointer group w-full focus:outline-hidden"
              >
                <div className="h-52 w-52 sm:h-60 sm:w-60 md:h-72 md:w-72 relative grid place-items-center drop-shadow-[0_12px_24px_rgba(107,43,63,0.25)] transition-transform group-hover:scale-105">
                  <PropImage
                    src={assets.gift.closed}
                    alt="กล่องของขวัญ"
                    fallback="🎁"
                    sizes="300px"
                    priority
                    className="h-full w-full"
                  />
                </div>
                <span className="font-script text-2xl sm:text-3xl text-plum font-bold group-hover:text-rose transition">
                  กล่องเซอร์ไพรส์ 🎁
                </span>
              </motion.button>
            </div>

            {/* Closing Birthday Wish & Celebration Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex flex-col items-center gap-3 text-center"
            >
              <p className="whitespace-pre-line font-script text-3xl sm:text-4xl leading-tight text-rose font-bold">
                {finale.closing}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                <motion.button
                  onClick={burst}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border-[3px] border-dashed border-plum
                             bg-pink-soft/80 px-6 py-2.5 font-hand text-xl font-bold text-plum
                             shadow-[3px_3px_0_var(--color-plum)] transition-all cursor-pointer
                             hover:bg-rose hover:text-white hover:border-solid"
                >
                  ฉลองอีกที 🎉
                </motion.button>
                <button
                  onClick={reset}
                  className="text-lg font-bold text-plum/80 underline-offset-4 hover:underline hover:text-plum cursor-pointer"
                >
                  เริ่มต้นใหม่ ↺
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* DETAIL VIEW                                               */
          /* ========================================================= */
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center w-full max-w-6xl relative"
          >
            {/* Top-Left Back Button */}
            <div className="w-full flex justify-start mb-2 z-30">
              <motion.button
                onClick={() => {
                  setActiveItem(null);
                  setLetterOpened(false);
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border-[3px] border-dashed border-plum
                           bg-pink-soft px-5 py-2 text-xl font-bold text-plum
                           shadow-[3px_3px_0_var(--color-plum)] transition cursor-pointer
                           hover:bg-rose hover:text-white hover:border-solid
                           active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                ← ย้อนกลับ
              </motion.button>
            </div>

            {/* DETAIL 1: ENVELOPE LETTER VIEW */}
            {activeItem === 'letter' && (
              <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
                <AnimatePresence mode="wait">
                  {!letterOpened ? (
                    <motion.div
                      key="envelope-closed"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif-it text-4xl sm:text-5xl text-plum italic"
                      >
                        Happy Birthday
                      </motion.h2>

                      <motion.button
                        onClick={() => setLetterOpened(true)}
                        whileHover={{ scale: 1.06, y: -6 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-72 w-[420px] sm:h-80 sm:w-[520px] cursor-pointer focus:outline-hidden transition-transform"
                      >
                        <PropImage
                          src={assets.envelope.open}
                          alt="เปิดจดหมาย"
                          fallback="💌"
                          sizes="520px"
                          priority
                          className="h-full w-full drop-shadow-md"
                        />
                      </motion.button>
                      <p className="text-xl text-plum/90 font-hand font-bold animate-pulse">แตะที่ซองจดหมายเพื่ออ่านข้อความ 💌</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="envelope-open"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => !done && skip()}
                      className="w-full rounded-2xl border-3 border-plum bg-white/95 p-8 sm:p-10 text-left shadow-[var(--shadow-pop-lg)] cursor-pointer relative overflow-hidden"
                    >
                      {assets.letter && (
                        <div className="pointer-events-none absolute inset-0 opacity-15">
                          <PropImage src={assets.letter} alt="" fallback="" sizes="600px" className="h-full w-full" />
                        </div>
                      )}

                      {/* Heart seal decoration */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <div className="h-12 w-12 rounded-full bg-rose/90 border-2 border-plum grid place-items-center shadow-md">
                          <span className="text-white text-xl">💗</span>
                        </div>
                      </motion.div>

                      <p className="relative min-h-[14rem] whitespace-pre-wrap font-hand text-3xl sm:text-4xl leading-10 text-ink z-10">
                        {shown}
                        {!done && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.55, repeat: Infinity }}
                            className="ml-1 inline-block h-7 w-[3px] translate-y-1 bg-rose"
                          />
                        )}
                      </p>
                      {done && (
                        <div className="mt-6 text-right z-10 relative">
                          <p className="font-script text-5xl text-rose font-bold">💕</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* DETAIL 2: FLOWER BOUQUET VIEW */}
            {activeItem === 'flower' && (
              <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 w-full min-h-[480px] md:min-h-[540px] px-2 sm:px-6">
                {/* Left Area: Character + Sticker Bubbles */}
                <div className="relative flex flex-col items-center w-full md:w-[45%] gap-2">
                  {/* Header: "flowers for my sweetheart!" */}
                  <motion.div
                    initial={{ scale: 0.8, rotate: -8 }}
                    animate={{ scale: 1, rotate: -3 }}
                    className="self-start ml-2 sm:ml-6 z-20"
                  >
                    <h3 className="font-hand text-3xl sm:text-4xl md:text-5xl text-ink leading-tight font-bold tracking-wide drop-shadow-xs select-none">
                      flowers for <br />
                      my sweetheart! 💕
                    </h3>
                  </motion.div>

                  {/* Character + stickers wrapper */}
                  <div className="relative">
                    {/* Character */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                      className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 relative z-10"
                    >
                      <PropImage
                        src={assets.sticker.yes}
                        alt="character"
                        fallback="🥺"
                        sizes="280px"
                        priority
                        className="h-full w-full object-contain"
                      />
                    </motion.div>

                    {/* Sticker: "my favorite person" */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
                      animate={{ opacity: 1, scale: 1, rotate: 6 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -top-2 -right-24 sm:-right-28 z-20"
                    >
                      <span className="inline-block rounded-full border-2 border-plum bg-rose/90 px-3 py-1 font-hand text-base sm:text-lg font-bold text-white shadow-[3px_3px_0_var(--color-plum)] select-none whitespace-nowrap">
                        my favorite person 💕
                      </span>
                    </motion.div>

                    {/* Sticker: "i'm your #1 fan" */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, rotate: -14 }}
                      animate={{ opacity: 1, scale: 1, rotate: -8 }}
                      transition={{ delay: 0.35 }}
                      className="absolute -bottom-2 -left-8 sm:-left-10 z-20"
                    >
                      <span className="inline-block rounded-full border-2 border-plum bg-pink-soft px-3 py-1 font-hand text-base sm:text-lg font-bold text-plum shadow-[3px_3px_0_var(--color-plum)] select-none whitespace-nowrap">
                        you&apos;re my sunshine ☀️
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Right Area: Bouquet */}
                <div className="flex flex-col items-center justify-center w-full md:w-[55%] z-10">
                  <motion.div
                    initial={{ scale: 0.9, rotate: 10 }}
                    animate={{ scale: 1.05, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 14 }}
                    className="h-[320px] w-[280px] sm:h-[400px] sm:w-[340px] md:h-[480px] md:w-[400px] relative grid place-items-center cursor-pointer"
                  >
                    <PropImage
                      src={assets.flower}
                      alt="ช่อดอกทิวลิป"
                      fallback="💐"
                      sizes="440px"
                      priority
                      className="h-full w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.18)]"
                    />
                  </motion.div>
                </div>

                {/* Checkered decoration */}
                <CheckeredPatch size={56} className="absolute bottom-0 left-0 hidden md:block" rotate={-10} delay={0.3} />
              </div>
            )}

            {/* DETAIL 3: GIFT BOX & MUSIC VIEW */}
            {activeItem === 'box' && (
              <div className="flex flex-col items-center gap-3 w-full">
                {/* "happy birthday" handwriting header */}
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl font-hand text-3xl sm:text-4xl text-plum/80 font-bold"
                >
                  ฟังเพลงแล้วเปิดกล่องของขวัญได้เลย
                </motion.h2>

                <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2 md:gap-8 items-start">
                  {/* Left Column: Vinyl Player */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                      {/* Vinyl record + song info overlay */}
                      {hasSpotify ? (
                        <div className="w-full max-w-sm overflow-hidden rounded-xl border-[3px] border-plum shadow-[var(--shadow-pop)]">
                          <iframe
                            src={audio.spotifyUrl}
                            width="100%"
                            height="152"
                            allow="encrypted-media; clipboard-write"
                            loading="lazy"
                            title={audio.title}
                            style={{ border: 0, display: 'block' }}
                          />
                        </div>
                      ) : (
                        <>
                          <Vinyl
                            playing={playing}
                            onToggle={toggle}
                            title={audio.title}
                            coverSrc={assets.albumCover}
                            size="md"
                            disabled={!hasSource || failed}
                          />
                        </>
                      )}
                    </div>

                    {/* Song info card below vinyl */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 rounded-xl border-2 border-plum bg-white/90 px-4 py-2.5 shadow-sm"
                    >
                      {hasSpotify ? (
                        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-plum bg-pink-soft text-xl" aria-hidden="true">🎵</span>
                      ) : (
                        <button
                          type="button"
                          onClick={toggle}
                          disabled={!hasSource || failed}
                          aria-label={!hasSource ? 'ยังไม่มีเพลงให้เล่น' : failed ? 'ไม่พบไฟล์เพลง' : playing ? 'หยุดเพลงจากแถบควบคุม' : 'เล่นเพลงจากแถบควบคุม'}
                          className="grid h-10 w-10 place-items-center rounded-full bg-rose text-white border-2 border-plum cursor-pointer
                                     shadow-[2px_2px_0_var(--color-plum)] hover:scale-110 transition
                                     disabled:cursor-not-allowed disabled:bg-muted disabled:hover:scale-100"
                        >
                          {playing ? '⏸' : '▶'}
                        </button>
                      )}
                      <div className="text-left">
                        <p className="font-hand text-lg font-bold text-plum leading-tight">{audio.title}</p>
                        <p className="font-hand text-sm text-plum/60">{audio.artist}</p>
                      </div>
                    </motion.div>

                    {hasFile && !failed && (
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={progress}
                        onChange={(e) => seek(Number(e.target.value))}
                        aria-label="เลื่อนตำแหน่งเพลง"
                        className="h-2 w-full max-w-[240px] cursor-pointer appearance-none rounded-full bg-pink-soft accent-rose"
                      />
                    )}
                    {hasFile && failed && (
                      <p className="text-base text-plum/80 font-bold">ไม่พบไฟล์เพลง — ลองตรวจสอบพาธไฟล์อีกครั้งนะ</p>
                    )}
                    {!hasFile && !hasSpotify && (
                      <p className="max-w-[270px] text-center text-base text-plum/80 font-bold">
                        ยังไม่ได้เพิ่มเพลง — ใส่ไฟล์เพลงหรือ Spotify ใน <code>src/lib/content.ts</code> แล้วเข็มกับแผ่นจะเริ่มทำงานพร้อมเสียง
                      </p>
                    )}
                  </div>

                  {/* Right Column: Surprise gift box */}
                  <div className="flex flex-col items-center gap-3">
                    <GiftBox onOpen={burst} />
                  </div>
                </div>

                {/* Decorative corner elements */}
                <Sparkle size={24} className="absolute bottom-4 right-4" delay={0.3} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
