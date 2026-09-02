'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface Options {
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
  onChar?: (ch: string) => void;
}

export function useTypewriter(
  text: string,
  { speed = 40, startDelay = 300, enabled = true, onChar }: Options = {},
) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);
  const cbRef = useRef(onChar);
  cbRef.current = onChar;

  useEffect(() => {
    if (!enabled) {
      setShown('');
      setDone(false);
      return;
    }

    if (reduced) {
      setShown(text);
      setDone(true);
      return;
    }

    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const start = setTimeout(function step() {
      if (i >= text.length) {
        setDone(true);
        return;
      }
      const ch = text[i];
      i += 1;
      setShown(text.slice(0, i));
      cbRef.current?.(ch);

      const delay =
        ch === '\n' ? speed * 6 : ch === ' ' ? speed * 1.6 : speed * (0.75 + Math.random() * 0.6);
      timer = setTimeout(step, delay);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, enabled, reduced]);

  const skip = () => {
    setShown(text);
    setDone(true);
  };

  return { shown, done, skip };
}
