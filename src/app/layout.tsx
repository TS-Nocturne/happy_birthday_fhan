import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="min-h-dvh overflow-x-hidden">{children}</body>
    </html>
  );
}
