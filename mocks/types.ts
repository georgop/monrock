export type Category = {
    id:number;
    name:string;
}

export type LocationMarker = {
    latitude:number;
    longitude:number;
    availability: 0 | 1 | 2;
    category: Category;
    availableMonitors: number;
    totalMonitors: number;
    advertistingDays: string;
    viewsPerDay: string;
    targetAudience: string;
}