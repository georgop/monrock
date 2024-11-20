import { faker } from '@faker-js/faker';
import { Category, AdvertisingSpot, Monitor , MonitorSchedule } from './types';

const categories: Category[] = [
    { id: 1, name: 'Gas stations' },
    { id: 2, name: 'Clinics' },
    { id: 3, name: 'Cafes' },
    { id: 4, name: 'Restaurants' },
    { id: 5, name: 'Public spaces' },
];

const calculateAvailability = (monitors: { monitor: Monitor; schedule: MonitorSchedule }[]): 0 | 1 | 2 => {
  // Calculate the overall availability status
  const totalAdSpaces = monitors.reduce((total, { monitor }) => total + monitor.totalAdSpaces, 0);
  const bookedAdSpaces = monitors.reduce(
    (total, { schedule }) => total + schedule.reduce((sum, day) => sum + day.bookedAdSpaces, 0),
    0
  );

  const remainingAdSpaces = totalAdSpaces - bookedAdSpaces;

  // Determine availability level
  if (remainingAdSpaces === totalAdSpaces) {
    return 0; // Full availability
  } else if (remainingAdSpaces > 0) {
    return 1; // Medium availability
  }
  return 2; // No availability
};

faker.seed(123);

const generateMonitorSchedule = (monitor: Monitor): MonitorSchedule => {
  const today = new Date();
  return Array.from({ length: 186 }, (_, dayOffset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);

    const bookedAdSpaces = faker.number.int({ min: 0, max: monitor.totalAdSpaces });

    return {
      date: date.toISOString().split('T')[0],
      bookedAdSpaces,
    };
  });
};

const generateLocationMarker = (
  index: number,
  latitude: number,
  longitude: number,
  name: string,
  address: string
): AdvertisingSpot => {
  const selectedMonitors = Array.from({ length: 4 }, (_, i) =>
    monitors[(index + i) % monitors.length]
  );

  const monitorDetails = selectedMonitors.map((monitor, monitorIndex) => ({
    monitor,
    schedule: generateMonitorSchedule(monitor),
  }));

  const availability = calculateAvailability(monitorDetails);

  return {
    id: faker.number.int({ min: 0, max: 100000000 }),
    latitude,
    longitude,
    availability:0,
    name: name,
    address: address,
    category: categories[(categories.length + index) % categories.length],
    availableMonitors: 4,
    totalMonitors: 4,
    advertistingDays: `${faker.number.int({ min: 1, max: 30 })} days`,
    viewsPerDay: `${faker.number.int({ min: 500, max: 2000 })} views`,
    targetAudience: `${faker.number.int({ min: 18, max: 55 })} - ${faker.number.int({ min: 56, max: 80 })} years`,
    workingHours: `${faker.number.int({ min: 8, max: 10 })}:00 - ${faker.number.int({ min: 18, max: 22 })}:00`,
    images: selectedMonitors.map((monitor) => monitor.image),
    monitors: monitorDetails,
  };
};


const monitors: Monitor[] = [
  { 
    id: 1, 
    name: "Basement Monitor", 
    specs: ["32' LED", "Full HD", "1920x1080", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://i.pinimg.com/736x/3c/1b/86/3c1b8600c5de03007146e826aa5d7c22.jpg" ,
    totalAdSpaces: 6,
  },
  { 
    id: 2, 
    name: "Main Entrance Monitor", 
    specs: ["55' OLED", "4K Ultra HD", "3840x2160", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.adworld.ie/wp-content/uploads/2024/09/Picture-1.jpg" ,
    totalAdSpaces: 6,
  },
  { 
    id: 3, 
    name: "Museum Monster Screen", 
    specs: ["160' MicroLED", "8K Ultra HD", "7680x4320", "21:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://img.freepik.com/premium-photo/public-display-signboard-mall-wood_641503-253297.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 4, 
    name: "Lobby Display", 
    specs: ["85' QLED", "4K Ultra HD", "4096x2160", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.univiewlcd.com/wp-content/uploads/2023/10/Uniview-outdoor-information-kiosk-for-shopping-mall.png",
    totalAdSpaces: 6,
  },
  { 
    id: 5, 
    name: "Cafeteria Screen", 
    specs: ["50' OLED", "Full HD", "1920x1080", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.pickcel.com/assets/img/digital-signage/digital-standees.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 6, 
    name: "Conference Hall Display", 
    specs: ["120' MicroLED", "6K Ultra HD", "6144x3160", "21:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.vistarmedia.com/hs-fs/hubfs/Tina%20New%20Files%20(temporary)/Venue%20Screens%20with%20People/Mall_Screen_Outdoor_PeopleWalking_1920x1080_6.jpg?width=1920&name=Mall_Screen_Outdoor_PeopleWalking_1920x1080_6.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 7, 
    name: "Outdoor Billboard", 
    specs: ["200' LED", "4K HDR", "3840x2160", "32:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://elonexoutdoormedia.co.uk/wp-content/uploads/2023/05/Elonex-MerryHill-XLScreen-2023_15.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 8, 
    name: "Gaming Zone Display", 
    specs: ["27' IPS Panel", "2K Ultra HD", "2560x1440", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.pantallasledlemon.com/wp-content/uploads/2021/03/mupis-les-supermercados.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 9, 
    name: "Atrium Display", 
    specs: ["95' QLED", "5K Ultra HD", "5120x2880", "21:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://elonexoutdoormedia.co.uk/wp-content/uploads/2023/05/Elonex-MerryHill-XLScreen-2023_15.jpg",
    totalAdSpaces: 6,
  },
  { 
    id: 10, 
    name: "Retail Promo Screen", 
    specs: ["42' LED", "4K Ultra HD", "3840x2160", "16:9"], 
    maxVideoAdSpacePerDay: "6 spaces of 20'", 
    image: "https://www.daktronics.com/media/r42nvwgr/shopping-centers_street-furniture.jpg",
    totalAdSpaces: 6,
  }
];
const athensLocationMarkers: { latitude: number; longitude: number; name: string; address:string; }[] = [
  { latitude: 37.9838, longitude: 23.7275, name: "Syntagma Square", address: "Syntagma Square, Athens, Greece" }, // Syntagma Square
  { latitude: 37.9643, longitude: 23.7284, name: "Acropolis", address: "Acropolis, Athens, Greece" }, // Acropolis
  { latitude: 37.9519, longitude: 23.7288, name: "Plaka", address: "Plaka, Athens, Greece" }, // Plaka
  { latitude: 37.9772, longitude: 23.7345, name: "Monastiraki", address: "Monastiraki, Athens, Greece" }, // Monastiraki
  { latitude: 37.9964, longitude: 23.7661, name: "Panathenaic Stadium", address: "Panathenaic Stadium, Athens, Greece" }, // Panathenaic Stadium
  { latitude: 37.9715, longitude: 23.7258, name: "Ermou Street", address: "Ermou Street, Athens, Greece" }, // Ermou Street
  { latitude: 37.9624, longitude: 23.7336, name: "Lycabettus Hill", address: "Lycabettus Hill, Athens, Greece" }, // Lycabettus Hill
  { latitude: 37.9925, longitude: 23.7610, name: "Temple of Olympian Zeus", address: "Temple of Olympian Zeus, Athens, Greece" }, // Temple of Olympian Zeus
  { latitude: 37.9752, longitude: 23.7384, name: "Athens Central Market", address: "Athens Central Market, Athens, Greece" }, // Athens Central Market
  { latitude: 37.9755, longitude: 23.7077, name: "Kerameikos Cemetery", address: "Kerameikos Cemetery, Athens, Greece" }, // Kerameikos Cemetery
  { latitude: 37.9794, longitude: 23.7162, name: "Ancient Agora", address: "Ancient Agora, Athens, Greece" }, // Ancient Agora
  { latitude: 37.9855, longitude: 23.7411, name: "National Garden", address: "National Garden, Athens, Greece" }, // National Garden
  { latitude: 37.9946, longitude: 23.7327, name: "Zappeion Hall", address: "Zappeion Hall, Athens, Greece" }, // Zappeion Hall
  { latitude: 37.9758, longitude: 23.7172, name: "Stoa of Attalos", address: "Stoa of Attalos, Athens, Greece" }, // Stoa of Attalos
  { latitude: 37.9788, longitude: 23.7095, name: "Technopolis (Gazi)", address: "Technopolis (Gazi), Athens, Greece" }, // Technopolis (Gazi)
  { latitude: 37.9845, longitude: 23.7333, name: "Hadrian's Arch", address: "Hadrian's Arch, Athens, Greece" }, // Hadrian's Arch
  { latitude: 37.9567, longitude: 23.7486, name: "Philopappos Hill", address: "Philopappos Hill, Athens, Greece" }, // Philopappos Hill
  { latitude: 37.9790, longitude: 23.7512, name: "National Library of Greece", address: "National Library of Greece, Athens, Greece" }, // National Library of Greece
  { latitude: 37.9582, longitude: 23.7052, name: "Pnyx", address: "Pnyx, Athens, Greece" }, // Pnyx
  { latitude: 37.9479, longitude: 23.7493, name: "Kaisariani Monastery", address: "Kaisariani Monastery, Athens, Greece" }, // Kaisariani Monastery
  { latitude: 37.9753, longitude: 23.7314, name: "Museum of Cycladic Art", address: "Museum of Cycladic Art, Athens, Greece" }, // Museum of Cycladic Art
  { latitude: 37.9814, longitude: 23.7140, name: "Byzantine and Christian Museum", address: "Byzantine and Christian Museum, Athens, Greece" }, // Byzantine and Christian Museum
  { latitude: 37.9782, longitude: 23.7254, name: "Numismatic Museum of Athens", address: "Numismatic Museum of Athens, Athens, Greece" }, // Numismatic Museum of Athens
  { latitude: 37.9750, longitude: 23.7271, name: "Benaki Museum", address: "Benaki Museum, Athens, Greece" }, // Benaki Museum
  { latitude: 37.9900, longitude: 23.7383, name: "Panepistimiou Street", address: "Panepistimiou Street, Athens, Greece" }, // Panepistimiou Street
  { latitude: 37.9833, longitude: 23.7277, name: "Hellenic Parliament", address: "Hellenic Parliament, Athens, Greece" }, // Hellenic Parliament
  { latitude: 37.9702, longitude: 23.7350, name: "Athens War Museum", address: "Athens War Museum, Athens, Greece" }, // Athens War Museum
  { latitude: 37.9570, longitude: 23.7291, name: "Stavros Niarchos Foundation", address: "Stavros Niarchos Foundation, Athens, Greece" }, // Stavros Niarchos Foundation
  { latitude: 37.9512, longitude: 23.7216, name: "Hill of the Muses", address: "Hill of the Muses, Athens, Greece" }, // Hill of the Muses
  { latitude: 37.8188, longitude: 23.9145, name: "Cape Sounion", address: "Cape Sounion, Athens, Greece" }, // Cape Sounion
  { latitude: 38.0452, longitude: 23.8103, name: "Marathon Archaeological Museum", address: "Marathon Archaeological Museum, Athens, Greece" }, // Marathon Archaeological Museum
  { latitude: 38.0704, longitude: 23.8750, name: "Marathon Beach", address: "Marathon Beach, Athens, Greece" }, // Marathon Beach
  { latitude: 37.9153, longitude: 23.7045, name: "Vouliagmeni Lake", address: "Vouliagmeni Lake, Athens, Greece" }, // Vouliagmeni Lake
  { latitude: 38.0202, longitude: 23.7400, name: "Penteli Mountain", address: "Penteli Mountain, Athens, Greece" }, // Penteli Mountain
  { latitude: 38.0255, longitude: 23.8313, name: "Rafina Port", address: "Rafina Port, Athens, Greece" }, // Rafina Port
  { latitude: 37.8986, longitude: 23.7222, name: "Glyfada Beach", address: "Glyfada Beach, Athens, Greece" }, // Glyfada Beach
  { latitude: 38.0565, longitude: 23.7963, name: "Nea Makri Beach", address: "Nea Makri Beach, Athens, Greece" }, // Nea Makri Beach
  { latitude: 37.9025, longitude: 23.7508, name: "Kavouri Beach", address: "Kavouri Beach, Athens, Greece" }, // Kavouri Beach
  { latitude: 37.9295, longitude: 23.9266, name: "Porto Rafti Beach", address: "Porto Rafti Beach, Athens, Greece" }, // Porto Rafti Beach
  { latitude: 37.8605, longitude: 23.7936, name: "Varkiza Beach", address: "Varkiza Beach, Athens, Greece" }, // Varkiza Beach
  { latitude: 37.9690, longitude: 23.6286, name: "Piraeus Port", address: "Piraeus Port, Athens, Greece" }, // Piraeus Port
  { latitude: 38.0812, longitude: 23.8245, name: "Schinias National Park", address: "Schinias National Park, Athens, Greece" }, // Schinias National Park
  { latitude: 38.1450, longitude: 23.8545, name: "Agia Marina Beach", address: "Agia Marina Beach, Athens, Greece" }, // Agia Marina Beach
  { latitude: 37.9808, longitude: 23.7145, name: "Gazi Neighborhood", address: "Gazi Neighborhood, Athens, Greece" }, // Gazi Neighborhood
  { latitude: 38.0105, longitude: 23.6823, name: "Kifisia", address: "Kifisia, Athens, Greece" }, // Kifisia
  { latitude: 38.0489, longitude: 23.8550, name: "Artemis Beach", address: "Artemis Beach, Athens, Greece" }, // Artemis Beach
  { latitude: 37.9301, longitude: 23.7448, name: "Voula Beach", address: "Voula Beach, Athens, Greece" }, // Voula Beach
  { latitude: 37.8673, longitude: 23.7352, name: "Anavyssos", address: "Anavyssos, Athens, Greece" }, // Anavyssos
  { latitude: 37.9165, longitude: 23.7441, name: "Alimos Marina", address: "Alimos Marina, Athens, Greece" }, // Alimos Marina
  { latitude: 37.8958, longitude: 23.7557, name: "Elliniko", address: "Elliniko, Athens, Greece" }, // Elliniko
  { latitude: 37.9411, longitude: 23.7805, name: "Hellenikon Experience Park", address: "Hellenikon Experience Park, Athens, Greece" }, // Hellenikon Experience Park
  { latitude: 38.1114, longitude: 23.8567, name: "Pikermi", address: "Pikermi, Athens, Greece" }, // Pikermi
  { latitude: 38.1462, longitude: 23.8572, name: "Lavrio Port", address: "Lavrio Port, Athens, Greece" }, // Lavrio Port
  { latitude: 37.8106, longitude: 23.9489, name: "Temple of Poseidon, Sounion", address: "Temple of Poseidon, Sounion, Athens, Greece" }, // Temple of Poseidon, Sounion
  { latitude: 37.9552, longitude: 23.7422, name: "Kaisariani Forest", address: "Kaisariani Forest, Athens, Greece" }, // Kaisariani Forest
  { latitude: 37.9800, longitude: 23.7240, name: "Areopagus Hill", address: "Areopagus Hill, Athens, Greece" }, // Areopagus Hill
  { latitude: 38.0160, longitude: 23.6850, name: "Melissia", address: "Melissia, Athens, Greece" }, // Melissia
  { latitude: 38.0405, longitude: 23.6945, name: "Ekali", address: "Ekali, Athens, Greece" }, // Ekali
  { latitude: 38.0675, longitude: 23.7923, name: "Dionysos", address: "Dionysos, Athens, Greece" }, // Dionysos
  { latitude: 37.9848, longitude: 23.7272, name: "Mitropoleos Square", address: "Mitropoleos Square, Athens, Greece" }, // Mitropoleos Square
  { latitude: 37.9738, longitude: 23.7136, name: "Psirri", address: "Psirri, Athens, Greece" }, // Psirri
  { latitude: 38.0211, longitude: 23.7545, name: "Gerakas", address: "Gerakas, Athens, Greece" }, // Gerakas
  { latitude: 37.8922, longitude: 23.7504, name: "Voula", address: "Voula, Athens, Greece" }, // Voula
  { latitude: 38.1210, longitude: 23.9190, name: "Oropos", address: "Oropos, Athens, Greece" }, // Oropos
  { latitude: 38.0080, longitude: 23.6875, name: "Penteli Cave", address: "Penteli Cave, Athens, Greece" }, // Penteli Cave
  { latitude: 37.9208, longitude: 23.7477, name: "Marina Flisvos", address: "Marina Flisvos, Athens, Greece" }, // Marina Flisvos
  { latitude: 38.0115, longitude: 23.7855, name: "Pallini", address: "Pallini, Athens, Greece" }, // Pallini
  { latitude: 38.0682, longitude: 23.9443, name: "Nea Styra Port", address: "Nea Styra Port, Athens, Greece" }, // Nea Styra Port
  { latitude: 38.1206, longitude: 23.8587, name: "Sesi Beach", address: "Sesi Beach, Athens, Greece" }, // Sesi Beach
  { latitude: 38.0853, longitude: 23.7568, name: "Mount Hymettus", address: "Mount Hymettus, Athens, Greece" }, // Mount Hymettus
];

export const advertisingSpots: AdvertisingSpot[] = [
    ...athensLocationMarkers.map((coords , index)=> generateLocationMarker(index,coords.latitude, coords.longitude, coords.name,coords.address)),
];

