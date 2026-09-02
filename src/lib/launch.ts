// 3 September 2026, 00:00 in Asia/Bangkok (UTC+7).
export const LAUNCH_AT = Date.UTC(2026, 8, 2, 17, 0, 0);

export const isLaunched = (now = Date.now()) => now >= LAUNCH_AT;
