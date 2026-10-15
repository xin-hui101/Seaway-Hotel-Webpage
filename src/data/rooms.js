// Room data taken from the Seaway price lists (Wabi-Tatami and Business Axis wings).
// Text fields are { en, zh } pairs. rates: [view, number of rooms, price in RM]
const V = {
  street: { en: 'Street View', zh: '街景' },
  none: { en: 'No View', zh: '无景观' },
  garden: { en: 'Garden View', zh: '花园景' },
  view: { en: 'With View', zh: '有景观' },
};
const g = (n) => ({ en: `${n} guests`, zh: `可住 ${n} 人` });
const C = {
  wifi: { en: 'Free Wi-Fi', zh: '免费 Wi-Fi' },
  tv: { en: 'Smart TV', zh: '智能电视' },
  shower: { en: 'Rain shower', zh: '花洒淋浴' },
  desk: { en: 'Work desk', zh: '办公桌' },
  view: { en: 'With view', zh: '有景观' },
};

export const WINGS = [
  {
    id: 'wabi',
    label: 'Wabi-Tatami',
    desc: { en: 'Raised oak platforms · warm & grounded', zh: '日式橡木地台 · 温暖沉稳' },
    rooms: [
      {
        name: { en: 'Deluxe Triple Room', zh: '豪华三人房' },
        beds: { en: 'King bed ×1 · Super single ×1', zh: '特大床 ×1 · 加大单人床 ×1' },
        desc: { en: 'Our most spacious room, with a separate lounge corner, writing desk and a large window over the street.', zh: '酒店最宽敞的房型，设有独立休息角、书桌和面向街道的大窗。' },
        chips: [g(3), { en: 'Lounge sofa', zh: '休息沙发' }, C.desk],
        rates: [[V.view, 1, 228]],
        photos: ['wt-deluxe-triple.jpg', 'wt-deluxe-lounge.jpg', 'wt-bathroom.jpg'],
        tag: { en: 'Most spacious', zh: '最宽敞' },
      },
      {
        name: { en: 'Double Room', zh: '双人房' },
        beds: { en: 'King bed on a raised oak platform', zh: '橡木地台上的特大床' },
        desc: { en: 'Low Japanese-style platform bed, warm cove lighting and soft linen. Pick the street-view room for morning light over Jalan Abu Bakar.', zh: '日式低地台床、温暖灯带和柔软床品。选街景房，早上就能看到 Jalan Abu Bakar 的晨光。' },
        chips: [g(2), C.wifi, C.tv],
        rates: [[V.street, 2, 168], [V.none, 2, 128]],
        photos: ['wt-double-street.jpg', 'wt-double-noview.jpg', 'wt-double-noview2.jpg'],
      },
      {
        name: { en: 'Twin Room', zh: '双床房' },
        beds: { en: '2 single beds on an oak platform', zh: '橡木地台上的 2 张单人床' },
        desc: { en: 'Two beds side by side under a glowing timber headboard. Ideal for friends or colleagues travelling together.', zh: '两张床并排在发光的木质床头板下，适合朋友或同事结伴出行。' },
        chips: [g(2), C.wifi, C.shower],
        rates: [[V.garden, 1, 168], [V.none, 1, 128]],
        photos: ['wt-twin-garden.jpg', 'wt-twin-noview.jpg', 'wt-bathroom.jpg'],
      },
      {
        name: { en: 'Triple Room', zh: '三人房' },
        beds: { en: 'King bed ×1 · Super single ×1', zh: '特大床 ×1 · 加大单人床 ×1' },
        desc: { en: 'A family-sized platform room with a view, plus a dark-stone bathroom with a halo-lit mirror.', zh: '适合家庭的有景观地台房，配深色石材浴室和环形灯镜。' },
        chips: [g(3), C.view, C.shower],
        rates: [[V.view, 3, 188]],
        photos: ['wt-triple.jpg', 'wt-triple2.jpg', 'wt-bathroom.jpg'],
        tag: { en: 'Family', zh: '家庭' },
      },
      {
        name: { en: 'Quadruple Room', zh: '四人房' },
        beds: { en: 'King bed ×1 · Super single ×2', zh: '特大床 ×1 · 加大单人床 ×2' },
        desc: { en: 'Three beds on one long oak platform, so the whole family stays together in one calm room.', zh: '三张床在同一个长橡木地台上，一家人可以安静地住在同一间房。' },
        chips: [g(4), C.view, C.wifi],
        rates: [[V.view, 1, 218]],
        photos: ['wt-family.jpg'],
        tag: { en: 'Family', zh: '家庭' },
      },
    ],
  },
  {
    id: 'business',
    label: 'Business Axis',
    desc: { en: 'Charcoal & white · crisp & modern', zh: '炭灰与白 · 简洁现代' },
    rooms: [
      {
        name: { en: 'Superior Double', zh: '高级双人房' },
        beds: { en: '1 double bed', zh: '1 张双人床' },
        desc: { en: 'Crisp charcoal-and-white styling with its own balcony looking out over the street.', zh: '炭灰与白的利落风格，附带可俯瞰街道的私人阳台。' },
        chips: [g(2), { en: 'Balcony', zh: '阳台' }, C.wifi],
        rates: [[V.street, 3, 188]],
        photos: ['ba-superior-double.jpg', 'ba-facade.jpg'],
        tag: { en: 'Balcony', zh: '阳台' },
      },
      {
        name: { en: 'Standard Double', zh: '标准双人房' },
        beds: { en: '1 double bed', zh: '1 张双人床' },
        desc: { en: 'A clean, quiet double with a view, a work desk and warm lighting along the headboard.', zh: '干净安静的有景观双人房，配办公桌和床头暖光。' },
        chips: [g(2), { en: 'Non-smoking', zh: '禁烟' }, C.wifi],
        rates: [[V.view, 4, 168]],
        photos: ['ba-standard-double.jpg'],
      },
      {
        name: { en: 'Standard Twin', zh: '标准双床房' },
        beds: { en: '2 single beds', zh: '2 张单人床' },
        desc: { en: 'Two plush single beds, a long desk and a wall-mounted TV. Simple and practical for work trips.', zh: '两张舒适单人床、长书桌和壁挂电视，简单实用，适合出差。' },
        chips: [g(2), C.desk, C.tv],
        rates: [[V.view, 1, 168], [V.none, 1, 148]],
        photos: ['ba-twin-view.jpg', 'ba-twin-noview.jpg'],
      },
    ],
  },
];

export const minRate = (room) => Math.min(...room.rates.map((r) => r[2]));
export const totalRooms = WINGS.reduce((n, w) => n + w.rooms.reduce((m, r) => m + r.rates.reduce((k, x) => k + x[1], 0), 0), 0);
export const totalTypes = WINGS.reduce((n, w) => n + w.rooms.length, 0);
export const lowestRate = Math.min(...WINGS.flatMap((w) => w.rooms.map(minRate)));
export const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;
