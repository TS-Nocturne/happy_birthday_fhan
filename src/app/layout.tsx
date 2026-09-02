import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import AccessGate from '@/components/AccessGate';
import { isLaunched, LAUNCH_AT } from '@/lib/launch';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happy Birthday Fhan 💌',
  openGraph: {
    title: 'Happy Birthday Fhan 💌',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#FFD6E8',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const unlocked = cookieStore.get('birthday_access')?.value === 'granted';
  const launched = isLaunched();

  return (
    <html lang="th">
      <body className="min-h-dvh overflow-x-hidden">
        {launched && unlocked ? children : <AccessGate launched={launched} launchAt={LAUNCH_AT} />}
      </body>
    </html>
  );
}
