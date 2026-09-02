'use client';

import { useCallback, useRef } from 'react';
import { useSceneStore } from '@/store/useSceneStore';

export function useTypeSound() {
  const soundOn = useSceneStore((s) => s.soundOn);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastRef = useRef(0);

  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      const AC = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  /** Typewriter keystroke tick sound */
  const tick = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    if (now - lastRef.current < 0.02) return;
    lastRef.current = now;

    const len = Math.floor(ctx.sampleRate * 0.03);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1600 + Math.random() * 900;
    bp.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    src.connect(bp).connect(gain).connect(ctx.destination);
    src.start(now);
    src.stop(now + 0.05);
  }, [soundOn, getCtx]);

  /** High pitch bell ding on newline */
  const ding = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1320, now);
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }, [soundOn, getCtx]);

  return { tick, ding };
}
