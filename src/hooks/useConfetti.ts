'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
  const burst = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Center main blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#F7A8C4', '#E8557C', '#6B2B3F', '#FFFCF7', '#FFD700'],
    });

    // Side cannons after brief delay
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FFD6E8', '#F7A8C4', '#E8557C'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FFD6E8', '#F7A8C4', '#E8557C'],
      });
    }, 150);
  }, []);

  return { burst };
}
