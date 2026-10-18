// Search engine (SEO) settings.
// SITE_URL: the address the site lives at, with no slash at the end.
// Change it to the real domain (e.g. 'https://seawayhotel.com.my') once it is connected.
import { WINGS, lowestRate, totalRooms, minRate } from './rooms';
import { AMENITIES, CONTACT, LOCATION } from './facilities';

export const SITE_URL = 'https://xinhuidemo.tech';

/** Path of each language version: English at /, Chinese at /zh/. */
export const LANG_PATH = { en: '/', zh: '/zh/' };
export const langFromPath = (path) => (/^\/zh(\/|$)/.test(path) ? 'zh' : 'en');

const highestRate = Math.max(...WINGS.flatMap((w) => w.rooms.flatMap((r) => r.rates.map((x) => x[2]))));

export const SEO = {
  en: {
    title: 'Seaway Hotel Mersing | Boutique Hotel in Mersing, Johor',
    description: `Seaway Hotel is a calm boutique hotel in the heart of Mersing, Johor. Wabi-Tatami and Business Axis rooms from RM${lowestRate}, rooftop garden, garden courtyard and free parking.`,
    locale: 'en_MY',
  },
  zh: {
    title: 'Seaway Hotel 丰盛港酒店 | 柔佛丰盛港市中心精品酒店',
    description: `Seaway Hotel 位于柔佛丰盛港市中心，是一间宁静的精品酒店。Wabi-Tatami 与 Business Axis 两翼客房，房价 RM${lowestRate} 起，设有屋顶花园、花园庭院及免费停车位。`,
    locale: 'zh_CN',
  },
};

export const OG_IMAGE = '/og-image.jpg';

/** Placeholder contact details (still containing X or '#') are left out of the search data. */
const isReal = (v) => Boolean(v) && v !== '#' && !/X/.test(v);

/** Schema.org "Hotel" data that Google reads to show the hotel's details in search. */
export function hotelSchema(lang) {
  const sameAs = Object.values(CONTACT.socials).filter(isReal);
  return {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: LOCATION.name,
    url: SITE_URL + LANG_PATH[lang],
    description: SEO[lang].description,
    image: ['hero-building.jpg', 'lobby.jpg', 'rooftop.jpg', 'courtyard.jpg'].map((f) => `${SITE_URL}/images/${f}`),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11, Jalan Abu Bakar, Mersing Kechil',
      addressLocality: 'Mersing',
      postalCode: '86800',
      addressRegion: 'Johor',
      addressCountry: 'MY',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapsQuery)}`,
    checkinTime: '15:00',
    checkoutTime: '12:00',
    priceRange: `RM${lowestRate} - RM${highestRate}`,
    currenciesAccepted: 'MYR',
    numberOfRooms: totalRooms,
    amenityFeature: [...AMENITIES.map((a) => a.label.en), 'Free Parking'].map((name) => ({
      '@type': 'LocationFeatureSpecification', name, value: true,
    })),
    makesOffer: WINGS.flatMap((w) => w.rooms.map((r) => ({
      '@type': 'Offer',
      name: `${w.label} · ${r.name[lang]}`,
      price: minRate(r),
      priceCurrency: 'MYR',
    }))),
    ...(isReal(CONTACT.phone) && { telephone: CONTACT.phone }),
    ...(sameAs.length && { sameAs }),
  };
}
