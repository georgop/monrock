import { faker } from '@faker-js/faker';
import { Category, AdvertisingSpot, Monitor } from './types';

const categories: Category[] = [
    { id: 1, name: 'Gas stations' },
    { id: 2, name: 'Clinics' },
    { id: 3, name: 'Cafes' },
    { id: 4, name: 'Restaurants' },
    { id: 5, name: 'Public spaces' },
];

const generateMonitor = (): Monitor => ({
    id: faker.number.int(),
    name: faker.commerce.productName(),
    specs: [faker.commerce.productMaterial(), faker.commerce.productAdjective()],
    maxVideoAdSpacePerDay: `${faker.number.int({ min: 5, max: 20 })} hours`,
    image:faker.image.url(),
});

const generateLocationMarker = (latitude: number, longitude: number, city: string): AdvertisingSpot => ({
    id: faker.number.int({min:0,max:418}),
    latitude,
    longitude,
    availability: faker.number.int({ min: 0, max: 2 }) as 0 | 1 | 2,
    name: faker.company.name(),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`, // Fully random address
    category: categories[faker.number.int({ min: 0, max: categories.length - 1 })],
    availableMonitors: faker.number.int({ min: 1, max: 10 }),
    totalMonitors: faker.number.int({ min: 10, max: 20 }),
    advertistingDays: `${faker.number.int({ min: 1, max: 30 })} days`,
    viewsPerDay: `${faker.number.int({ min: 500, max: 2000 })} views`,
    targetAudience: `${faker.number.int({ min: 18, max: 55 })} - ${faker.number.int({ min: 56, max: 80 })} years`,
    workingHours: `${faker.number.int({ min: 8, max: 10 })}:00 - ${faker.number.int({ min: 18, max: 22 })}:00`,
    images: Array.from({ length: 3 }, () => faker.image.url()),
    monitors: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, generateMonitor),
});

const athensLocationMarkers: { latitude: number; longitude: number }[] = [
  { latitude: 37.9838, longitude: 23.7275 }, // Syntagma Square
  { latitude: 37.9643, longitude: 23.7284 }, // Acropolis
  { latitude: 37.9519, longitude: 23.7288 }, // Plaka
  { latitude: 37.9772, longitude: 23.7345 }, // Monastiraki
  { latitude: 37.9964, longitude: 23.7661 }, // Panathenaic Stadium
  { latitude: 37.9715, longitude: 23.7258 }, // Ermou Street
  { latitude: 37.9624, longitude: 23.7336 }, // Lycabettus Hill
  { latitude: 37.9925, longitude: 23.7610 }, // Temple of Olympian Zeus
  { latitude: 37.9752, longitude: 23.7384 }, // Athens Central Market
];

const thessalonikiLocationMarkers: { latitude: number; longitude: number }[] = [
  { latitude: 40.6401, longitude: 22.9444 }, // White Tower
  { latitude: 40.6340, longitude: 22.9492 }, // Aristotelous Square
  { latitude: 40.6338, longitude: 22.9354 }, // Rotunda of Galerius
  { latitude: 40.6385, longitude: 22.9340 }, // Ano Poli (Upper Town)
  { latitude: 40.6404, longitude: 22.9439 }, // Thessaloniki Archaeological Museum
  { latitude: 40.6393, longitude: 22.9349 }, // Byzantine Walls
  { latitude: 40.6370, longitude: 22.9484 }, // Ladadika District
  { latitude: 40.6366, longitude: 22.9499 }, // Church of Agios Dimitrios
  { latitude: 40.6405, longitude: 22.9483 }, // Ataturk Museum
  { latitude: 40.6402, longitude: 22.9356 }, // Galerius Palace
];

const realisticData: AdvertisingSpot[] = [
  { 
    id:420,
    latitude: 37.9833, longitude: 23.7690, availability: 0, 
    name: "National Archaeological Museum", 
    address: "Patission 44, Athens", 
    category: categories[1], 
    availableMonitors: 3, totalMonitors: 5, advertistingDays: "15 days", 
    viewsPerDay: "1000 views", targetAudience: "18 - 55 years", workingHours: "9:00 - 17:00", 
    images: ["https://s3-alpha-sig.figma.com/img/9399/ef27/73e6ab04520bfc0a2e38adb8a8a09b01?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i95CIB~69fs6iBpoFXaju3Qvzm7w0luOtHVEF9EV7x4CkMpH0j9FyN~BQdktrFDOT2xX3sqJi-6TOBAgjO~KuLykZeSfwVORs8QTqO1DKh8isJY3MY0JqIrp3NxzloG8jp60chFuzAqLKj4~1yB7frQIFkl2CDRWpEqwRdGqA1UABGZTlYUC5aZSWSKvag~PTNWSS43nIbzZFJkTdK8KK4ur9B0yLg6ZqtVvzNTb~nWynZJFQeZNaoF9PVQo9huYwd3zM6NVFM17HdFp8PHMA9pUVyoJaGzWApp0VUm-NTtwj6Rb7ib5I508AY10ReThW8mx9Sc0ak9B0WX8FXWvug__", "https://s3-alpha-sig.figma.com/img/43f7/d69a/afdcdc205c28cb74463c468cfd76bc04?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Od90oIa82XEYovauMr1MxzbT7ku1NlVvGNtrLc0jEZqDoEaAESXY2T9uZ8aPg5k6P3PguQaOpR6TXxSdmY3nl8wETvy1cnV9oaIqff1EX~9-C5yvY5~KP8hLIad~6R-difBD82MLQCr4PLttyxNm3sShV5KeeZb8kbzlgSRGD4TY09yYpY9Sbb-rDg3HGhnE6JChGveiOXkMhMQXeBoLS4l-Ps1cuESpV93IhUKKg1CUN2qpRoDA3JbdFIa1HaSINGc~f5A7Hq42k873lk4324f1KBdMQ-3aJU96tK7X2oxLjbtNqrmIy6o1dhb28m5fFmnwWyQXAT1mQJX-Ydxw-A__", "https://s3-alpha-sig.figma.com/img/250e/2741/07ca2ec06299a22b279817adc4b1b3f5?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FxRNY8JhNs~sen5BWQHF-8zVKbrN7Ty20uAweRARTssdZ5kujUZTRwq9xXA~WeN5iqxSnVnyYBv~KZVG0r2YeU~Jpgw9keny~Lu4GlIzx594WNjMZAgTv5338HD9wRY6FUhfDXgaW9s6~WRRLkmKvv-tIeppWfks-fFG5DNp7CIEcdnM2HullHvx40f7ZEVkcl37pUqj~7m0KfQIVxH1UHBDqLhRua2E9NrNk7yzljTvO42IPoKIZMZC~2cjozgUSaJdOYGW6CGq5HX2zixkGZRU8B-i29NERGnNDRCqqgAM5sWZxdCDcNtxqv01XCQYDOQwJUX2Uiu9FlQglweR5A__"],
    monitors: [
    { id: 1, name: "Basement Monitor", specs: ["14' QLED","2K IPS Panel","2160x3840", "9:16"], maxVideoAdSpacePerDay: "8 spaces of 20'" , image:"https://s3-alpha-sig.figma.com/img/9399/ef27/73e6ab04520bfc0a2e38adb8a8a09b01?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i95CIB~69fs6iBpoFXaju3Qvzm7w0luOtHVEF9EV7x4CkMpH0j9FyN~BQdktrFDOT2xX3sqJi-6TOBAgjO~KuLykZeSfwVORs8QTqO1DKh8isJY3MY0JqIrp3NxzloG8jp60chFuzAqLKj4~1yB7frQIFkl2CDRWpEqwRdGqA1UABGZTlYUC5aZSWSKvag~PTNWSS43nIbzZFJkTdK8KK4ur9B0yLg6ZqtVvzNTb~nWynZJFQeZNaoF9PVQo9huYwd3zM6NVFM17HdFp8PHMA9pUVyoJaGzWApp0VUm-NTtwj6Rb7ib5I508AY10ReThW8mx9Sc0ak9B0WX8FXWvug__"},
    { id: 2, name: "Main Entrance Monitor", specs: ["85' QLED","4K Ultra HD","4096x1820", "9:16"], maxVideoAdSpacePerDay: "2 spaces of 20'",image:"https://s3-alpha-sig.figma.com/img/43f7/d69a/afdcdc205c28cb74463c468cfd76bc04?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Od90oIa82XEYovauMr1MxzbT7ku1NlVvGNtrLc0jEZqDoEaAESXY2T9uZ8aPg5k6P3PguQaOpR6TXxSdmY3nl8wETvy1cnV9oaIqff1EX~9-C5yvY5~KP8hLIad~6R-difBD82MLQCr4PLttyxNm3sShV5KeeZb8kbzlgSRGD4TY09yYpY9Sbb-rDg3HGhnE6JChGveiOXkMhMQXeBoLS4l-Ps1cuESpV93IhUKKg1CUN2qpRoDA3JbdFIa1HaSINGc~f5A7Hq42k873lk4324f1KBdMQ-3aJU96tK7X2oxLjbtNqrmIy6o1dhb28m5fFmnwWyQXAT1mQJX-Ydxw-A__" },
    { id: 3, name: "Museum Monster Screen", specs: ["160' QLED","5K Ultra HD","2160x3840", "9:16"], maxVideoAdSpacePerDay: "64 spaces of 20'",image:"https://s3-alpha-sig.figma.com/img/250e/2741/07ca2ec06299a22b279817adc4b1b3f5?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FxRNY8JhNs~sen5BWQHF-8zVKbrN7Ty20uAweRARTssdZ5kujUZTRwq9xXA~WeN5iqxSnVnyYBv~KZVG0r2YeU~Jpgw9keny~Lu4GlIzx594WNjMZAgTv5338HD9wRY6FUhfDXgaW9s6~WRRLkmKvv-tIeppWfks-fFG5DNp7CIEcdnM2HullHvx40f7ZEVkcl37pUqj~7m0KfQIVxH1UHBDqLhRua2E9NrNk7yzljTvO42IPoKIZMZC~2cjozgUSaJdOYGW6CGq5HX2zixkGZRU8B-i29NERGnNDRCqqgAM5sWZxdCDcNtxqv01XCQYDOQwJUX2Uiu9FlQglweR5A__" },
  ] },
];

export const advertisingSpots: AdvertisingSpot[] = [
    ...athensLocationMarkers.map(coords=> generateLocationMarker(coords.latitude, coords.longitude, 'Athens')), ...realisticData,
    ...thessalonikiLocationMarkers.map(coords => generateLocationMarker(coords.latitude, coords.longitude, 'Thessaloniki')),
];
