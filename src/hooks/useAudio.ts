'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useAudio(src: string | null) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = new Audio(src);
    el.loop = true;
    el.preload = 'metadata';

    const onTime = () =>
      setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
    const onErr = () => {
      setFailed(true);
      setPlaying(false);
    };
    const onEnded = () => setPlaying(false);

    el.addEventListener('timeupdate', onTime);
    el.addEventListener('error', onErr);
    el.addEventListener('ended', onEnded);
    ref.current = el;

    return () => {
      el.pause();
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('error', onErr);
      el.removeEventListener('ended', onEnded);
      ref.current = null;
    };
  }, [src]);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setFailed(false);
      el.play().then(() => setPlaying(true)).catch(() => {
        setFailed(true);
        setPlaying(false);
      });
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  const seek = useCallback((pct: number) => {
    const el = ref.current;
    if (!el?.duration) return;
    el.currentTime = (pct / 100) * el.duration;
    setProgress(pct);
  }, []);

  return { playing, progress, failed, hasSource: Boolean(src), toggle, seek };
}
