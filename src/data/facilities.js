export const FACILITIES = [
  { img: 'rooftop.jpg', title: { en: 'Rooftop Garden', zh: '屋顶花园' }, text: { en: 'Timber benches under an open Mersing sky.', zh: '在丰盛港的开阔天空下，坐在木长椅上歇一歇。' }, alt: 'Rooftop garden with wooden benches on green turf', size: 'wide' },
  { img: 'courtyard.jpg', title: { en: 'Garden Courtyard', zh: '花园庭院' }, text: { en: 'Greenery, a spiral stair and a bicycle ready to ride.', zh: '绿植、旋转楼梯，还有一辆随时可骑的单车。' }, alt: 'White courtyard with plants, spiral staircase and a red bicycle', size: 'tall' },
  { img: 'lobby.jpg', title: { en: 'Lobby & Lounge', zh: '大堂与休息区' }, text: { en: 'Sunlit timber tables to work, read or plan the day.', zh: '洒满阳光的木桌，适合工作、阅读或规划行程。' }, alt: 'Bright lobby with timber tables and the reception desk' },
  { img: 'pantry.jpg', title: { en: 'Coffee & Snack Corner', zh: '咖啡与小食角' }, text: { en: 'Coffee, tea and biscuits, on the house.', zh: '咖啡、茶和饼干，免费享用。' }, alt: 'Coffee sachets, biscuits and mugs laid out on a table' },
];

export const AMENITIES = [
  { label: { en: 'Free Wi-Fi', zh: '免费 Wi-Fi' }, path: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01' },
  { label: { en: 'Coffee & Tea', zh: '咖啡与茶' }, path: 'M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 3v2M11 3v2' },
  { label: { en: 'Rooftop Garden', zh: '屋顶花园' }, path: 'M3 21h18M5 21V10l7-6 7 6v11M10 21v-6h4v6' },
  { label: { en: 'Lounge Area', zh: '休息区' }, path: 'M3 11h18v6H3zM5 17v3M19 17v3M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4' },
  { label: { en: 'Smart TV', zh: '智能电视' }, path: 'M4.5 4h15A1.5 1.5 0 0 1 21 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 14.5v-9A1.5 1.5 0 0 1 4.5 4zM8 20h8M12 16v4' },
  { label: { en: 'Non-Smoking', zh: '全面禁烟' }, path: 'M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM5 5l14 14' },
];

export const LOCATION = {
  name: 'Seaway Hotel',
  lines: ['11, Jalan Abu Bakar, Mersing Kechil,', "86800 Mersing, Johor Darul Ta'zim"],
  info: [
    { icon: 'clock', title: { en: 'Check-in & Check-out', zh: '入住与退房' }, text: { en: 'Check-in: from 3:00 PM  |  Check-out: by 12:00 PM', zh: '入住：下午 3:00 起  |  退房：中午 12:00 前' } },
    { icon: 'parking', title: { en: 'Driving & Parking', zh: '自驾与停车' }, text: { en: 'Free parking is available around the hotel.', zh: '酒店周边提供免费停车位。' } },
  ],
};

export const CONTACT = {
  phone: '+60 X-XXX XXXX',
  phoneHref: 'tel:+60000000000',
  email: 'hello@seawayhotel.com',
  address: "11, Jalan Abu Bakar, Mersing Kechil, 86800 Mersing, Johor Darul Ta'zim",
  mapsQuery: '11, Jalan Abu Bakar, Mersing Kechil, 86800 Mersing, Johor',
  socials: { facebook: '#', instagram: '#', whatsapp: '#' },
};

export const NAV = [
  { id: 'home', label: { en: 'Home', zh: '首页' } },
  { id: 'rooms', label: { en: 'Our Rooms', zh: '客房' } },
  { id: 'facilities', label: { en: 'Our Facilities', zh: '酒店设施' } },
  { id: 'location', label: { en: 'How to Get There', zh: '交通指南' } },
  { id: 'contact', label: { en: 'Contact Us', zh: '联系我们' } },
];
