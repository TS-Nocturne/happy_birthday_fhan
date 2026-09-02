'use client';

import { useSceneStore } from '@/store/useSceneStore';

export default function SoundToggle() {
  const soundOn = useSceneStore((s) => s.soundOn);
  const toggle = useSceneStore((s) => s.toggleSound);

  return (
    <button
      onClick={toggle}
      aria-label={soundOn ? 'ปิดเสียง' : 'เปิดเสียง'}
      aria-pressed={soundOn}
      className="absolute right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border-2 border-plum bg-pink-soft text-xl text-plum shadow-[3px_3px_0_var(--color-plum)] transition hover:scale-108 hover:bg-rose hover:text-white cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-2 focus-visible:outline-rose"
    >
      {soundOn ? '🔊' : '🔇'}
    </button>
  );
}
