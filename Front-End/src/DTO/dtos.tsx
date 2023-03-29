export interface Room {
    roomid: string;
    hotelid: string;
    roomNumber: number;
    hotelName?: string;
    category: number;
    address: string;
    fullAddress?: string;
    price: number;
    amenities: string;
    capacity: number;
    seaview: boolean;
    mountainview: boolean;
    extendable: boolean;
    damages: boolean;
  }
  