'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, x: 2, y: 2 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-dashed border-plum px-7 py-2.5 text-xl font-bold tracking-wide transition-all cursor-pointer',
        'shadow-[var(--shadow-pop)] active:shadow-[1px_1px_0_var(--color-plum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose',
        'hover:border-solid',
        variant === 'primary' && 'bg-rose text-white hover:bg-rose/90',
        variant === 'secondary' && 'bg-pink-base text-plum hover:bg-pink-deep',
        variant === 'ghost' && 'bg-cream text-plum hover:bg-pink-soft',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
