export const content = {
  accept: {
    title: 'มีของขวัญวันเกิดมาส่งงง',
    sub: 'อยากได้มั้ยคั้บบ',
    yesBtn: 'อยาก',
    noBtn: 'ไม่อยาก',
    noTrolls: [
      'แน่ใจน้าา',
      'จะไม่อยากได้จริงๆหรออ',
      'เตรียมมาให้เลยนะะ',
      'เอาไปเถอะน้าา',
    ],
  },

  letter: `สุขสันต์วันเกิดนะค้าบ

อายุ 16 แล้วน้าา เล่นจุดพักใจได้ละะ

ขอให้ปีนี้เป็นปีที่ดี ทำอะไรก็ประสบความสำเร็จไปทุกอย่าง มีเงินเยอะๆ 
เจอแต่คนที่น่ารักเข้ามาในชีวิตน้าา`,

  letterScene: {
    tapHint: 'จิ้มที่ซองเพื่อเปิดอ่านเลย 💌',
    next: 'ไปดูของขวัญกันต่อ →',
  },

  gift: {
    letter: {
      heading: 'Happy Birthday',
      body: 'เอาไปใช้น้าา',
      signOff: '',
      cta: 'รับของขวัญ 🧧',
      link: process.env.NEXT_PUBLIC_TRUEMONEY_GIFT_URL ?? '',
      note: 'กดแล้วจะเปิดแอป TrueMoney ให้เลย',
    },
  },

  finale: {
    title: 'เพลงนี้ให้เธอ 🎵',
    subtitle: 'กดเข็มลงแล้วฟังไปด้วยกันนะ',
    closing: 'สุขสันต์วันเกิดครับ 💗',
    replay: 'ดูอีกรอบ ↺',
  },

  audio: {
    mode: 'file' as 'file' | 'spotify' | 'none',
    file: '/audio/birthday-song.mp3',
    title: 'บังเอิญพบทานตะวัน(.png)',
    artist: 'PURPEECH',
    spotifyUrl: 'https://open.spotify.com/track/5Vsv5o4ibovJhVKhdftHSs?si=7235e7fb77084654',
  },
} as const;
