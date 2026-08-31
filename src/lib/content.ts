import type { Gift } from '@/types';

export const content = {
  name: 'มายด์',
  title: 'Happy Birthday 💖',
  cakeSub: 'make a wish... แล้วเป่าเทียนกันเถอะ 🎂',
  blowHint: 'แตะที่เทียนหรือเป่าลมใส่ไมค์เพื่อดับเทียน ✨',
  cakeDone: 'สุขสันต์วันเกิดนะ! ขอให้ทุกความปรารถนาเป็นจริง 🎉',

  accept: {
    title: 'มีของขวัญพิเศษจะมอบให้... 🎁',
    sub: 'อยากรับไว้ไหมคะ?',
    yesBtn: 'รับสิคะ! 💕',
    noBtn: 'ไม่เอาหรอก 😜',
    noTrolls: [
      'ไม่เอาจริงเหรอ? 🥺',
      'กด YES เถอะนะ~ 💕',
      'หนีไปไหนไม่ได้หรอก! 😆',
      'ใจร้ายจังเลย 😭',
      'ลองกดใหม่อีกทีสิ 💖',
    ],
  },

  letter: `ถึงคนพิเศษของเรา 🎂

ขอให้วันเกิดปีนี้เต็มไปด้วยรอยยิ้ม
สุขภาพแข็งแรง สมหวังทุกอย่างที่ตั้งใจ
และมีเราอยู่ข้าง ๆ คอยซัพพอร์ตเธอนะ

ขอบคุณที่เป็นความสุขให้กันเสมอ
รักนะ ❤️`,

  letterScene: {
    tapHint: 'แตะซองเพื่อเปิดจดหมาย 💌',
    from: 'จากใจ',
    signature: 'ตัวเราเอง ✨',
    next: 'มีของขวัญรออยู่นะ →',
  },

  gift: {
    question: 'เลือกกล่องที่ชอบมา 1 ใบ ✨',
    hint: 'ใบไหนก็ได้~ ข้างในมีเซอร์ไพรส์ 😌',
    boxes: [
      { emoji: '🌷', label: 'ดอกไม้ไม่มีวันเหี่ยว', color: 'bg-pink-base' },
      { emoji: '🎵', label: 'เพลงที่อยากให้ฟัง',   color: 'bg-pink-soft' },
      { emoji: '📸', label: 'ความทรงจำของเรา',     color: 'bg-cream' },
    ],
    reveal: 'เลือกใบไหน... ก็ได้ความรักทั้งหมดนั่นแหละ 💝',
    next: 'ไปรับช่อดอกไม้กัน →',
  },

  flower: {
    title: 'ช่อดอกไม้สำหรับเธอ 💐',
    sub: 'เปรียบเหมือนความสดใสที่เธอมีให้เสมอ',
    note: 'จัดช่อนี้ขึ้นมาด้วยใจ มอบให้เธอคนเดียวเลยนะ 💕',
    next: 'ฟังเพลง & ดูภาพทรงจำกัน →',
  },

  song: { title: 'My Love Mine All Mine', src: '/audio/song.mp3' },

  photos: [
    { src: '/photos/photo1.jpg', caption: 'our favorite day 🌸' },
    { src: '/photos/photo2.jpg', caption: 'always smiling with you ✨' },
    { src: '/photos/photo3.jpg', caption: 'my person ❤️' },
    { src: '/photos/photo4.jpg', caption: 'forever and always 🎀' },
  ],

  finale: {
    title: 'Happy Birthday Mind! 🎉',
    sub: 'ขอบคุณที่เดินเดินทางร่วมกันมา ขอให้เป็นปีที่น่ารักสดใสที่สุดนะ!',
    replay: 'เริ่มต้นเล่นอีกครั้ง 🔄',
  },
} as const;

export const GIFTS: Gift[] = [
  { id: 'bouquet', emoji: '🌷', label: 'ดอกไม้ไม่มีวันเหี่ยว' },
  { id: 'music', emoji: '🎵', label: 'เพลงที่อยากให้ฟัง' },
  { id: 'memories', emoji: '📸', label: 'ความทรงจำของเรา' },
];
