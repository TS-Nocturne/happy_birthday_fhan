import { NextResponse } from 'next/server';
import { isLaunched } from '@/lib/launch';

const ACCESS_COOKIE = 'birthday_access';

export async function POST(request: Request) {
  if (!isLaunched()) {
    return NextResponse.json({ ok: false, reason: 'not_released' }, { status: 403 });
  }

  const body: unknown = await request.json().catch(() => null);
  const passcode =
    body && typeof body === 'object' && 'passcode' in body
      ? (body as { passcode?: unknown }).passcode
      : null;
  const expectedPasscode = process.env.SITE_PASSCODE ?? '0309';

  if (typeof passcode !== 'string' || passcode !== expectedPasscode) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: 'granted',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
