'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  src: string | null;
  alt: string;
  /** ใช้ตอนรูปหาย/ยังไม่มี */
  fallback: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function PropImage({
  src, alt, fallback, className, sizes = '320px', priority,
}: Props) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className={cn('grid place-items-center', className)} role="img" aria-label={alt}>
        <span className="text-7xl drop-shadow-[0_3px_0_rgb(107_43_63/.2)]">{fallback}</span>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setBroken(true)}
        className="object-contain drop-shadow-[0_6px_12px_rgb(107_43_63/.18)]"
      />
    </div>
  );
}
