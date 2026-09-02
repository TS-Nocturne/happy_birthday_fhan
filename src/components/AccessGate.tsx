'use client';

import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AccessGateProps {
  launched: boolean;
  launchAt: number;
}

function Countdown({ launchAt }: Pick<AccessGateProps, 'launchAt'>) {
  const [remaining, setRemaining] = useState(() => Math.max(0, launchAt - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = Math.max(0, launchAt - Date.now());
      setRemaining(next);
      if (next === 0) window.location.reload();
    }, 1000);
    return () => window.clearInterval(timer);
  }, [launchAt]);

  const totalSeconds = Math.ceil(remaining / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const units = [
    { label: 'วัน', value: days },
    { label: 'ชม.', value: hours },
    { label: 'นาที', value: minutes },
    { label: 'วินาที', value: seconds },
  ];

  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <motion.section
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="grid w-full max-w-lg gap-6 rounded-3xl border-[3px] border-plum bg-cream p-8 text-center shadow-[var(--shadow-pop-lg)]"
      >
        <span className="text-5xl" aria-hidden="true">🎁</span>
        <p className="font-hand text-xl font-bold text-plum/75">เว็บจะเปิดวันที่ 3 กันยายน 2026 เวลา 00:00 น.</p>
        <div className="grid grid-cols-4 gap-2" aria-live="polite" aria-label="เวลาที่เหลือก่อนเปิดเว็บ">
          {units.map((unit) => (
            <div key={unit.label} className="rounded-xl border-2 border-plum bg-white px-2 py-3 shadow-sm">
              <p className="font-script text-3xl font-bold text-rose tabular-nums">{String(unit.value).padStart(2, '0')}</p>
              <p className="font-hand text-sm font-bold text-plum/70">{unit.label}</p>
            </div>
          ))}
        </div>
        <p className="font-hand font-bold text-plum/70">รออีกนิดนะ 💗</p>
      </motion.section>
    </main>
  );
}

function PasscodeForm() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(false);

    try {
      const response = await fetch('/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      if (!response.ok) {
        setError(true);
        setPasscode('');
        return;
      }

      window.location.reload();
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <motion.form
        onSubmit={unlock}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="grid w-full max-w-sm gap-5 rounded-3xl border-[3px] border-plum bg-cream p-8 text-center shadow-[var(--shadow-pop-lg)]"
      >
        <span className="text-5xl" aria-hidden="true">💌</span>
        <div>
          <h1 className="font-script text-4xl font-bold text-plum">มีข้อความถึง Fhan</h1>
          <p className="mt-2 font-hand text-lg font-bold text-plum/75">กรอกรหัสเพื่อเปิดดูนะ</p>
        </div>
        <label className="grid gap-2 text-left font-hand font-bold text-plum" htmlFor="passcode">
          รหัสผ่าน
          <input
            id="passcode"
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            required
            maxLength={12}
            value={passcode}
            onChange={(event) => setPasscode(event.target.value)}
            className="w-full rounded-xl border-[3px] border-plum bg-white px-4 py-3 text-center text-2xl tracking-[0.45em] text-plum outline-none transition focus:border-rose focus:ring-4 focus:ring-pink-base"
          />
        </label>
        {error && <p className="font-hand font-bold text-rose" role="alert">รหัสยังไม่ถูกต้อง ลองอีกครั้งนะ</p>}
        <button
          type="submit"
          disabled={submitting || !passcode}
          className="rounded-full border-[3px] border-plum bg-rose px-6 py-3 font-hand text-xl font-bold text-white shadow-[4px_4px_0_var(--color-plum)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'กำลังเปิด…' : 'เปิดข้อความ ✨'}
        </button>
      </motion.form>
    </main>
  );
}

export default function AccessGate({ launched, launchAt }: AccessGateProps) {
  return launched ? <PasscodeForm /> : <Countdown launchAt={launchAt} />;
}
