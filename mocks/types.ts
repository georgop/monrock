import { VideoInfo } from "utils/pickVideoAndExtractInfo";

//Category can be 'Gas stations' or 'Clinics' or 'Cafes' or 'Restaurants' or 'Public spaces'
export type Category = {
    id:number;
    name:string;
}

export type Monitor = {
    id:number;
    name:string;
    specs:string[];
    maxVideoAdSpacePerDay:string;
    image:string;
}

export type AdvertisingSpot = {
    id:number;
    latitude:number;
    longitude:number;
    availability: 0 | 1 | 2;
    category: Category;
    name:string;
    availableMonitors: number;
    totalMonitors: number;
    address: string;
    advertistingDays: string;
    viewsPerDay: string;
    targetAudience: string;
    workingHours: string;
    images: string[];
    monitors: Monitor[];
}


export type Playback = {
    id:string;
    selectedVideos: VideoInfo[];
    selectedMonitor: {
      monitor: { id: string; name: string; image: string };
      advertisingSpotName: string;
      address: string;
    };
    price: number;
    date: string;
  };