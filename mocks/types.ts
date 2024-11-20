import { VideoInfo } from "utils/pickVideoAndExtractInfo";

//Category can be 'Gas stations' or 'Clinics' or 'Cafes' or 'Restaurants' or 'Public spaces'
export type Category = {
    id:number;
    name:string;
}

export type MonitorSchedule = {
    date:string;
    bookedAdSpaces:number;
}[]

export type Monitor = {
    id:number;
    name:string;
    specs:string[];
    maxVideoAdSpacePerDay:string;
    image:string;
    totalAdSpaces:number;
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
    monitors: {monitor:Monitor, schedule:MonitorSchedule}[];
}


export type Playback = {
    id: string;
    selectedVideos: VideoInfo[];
    selectedMonitor: {
        monitor: Monitor;
        advertisingSpotName: string;
        address: string;
    } | undefined;
    totalAdSpace: number;
    totalCost: number;
    dates: Record<string, {price:number}>;
  };

  